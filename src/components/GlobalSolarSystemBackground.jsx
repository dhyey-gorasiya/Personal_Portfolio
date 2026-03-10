import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Sun position
const SUN_POSITION = { x: "85%", y: "50%" };

const PLANETS = [
  { name: "Mercury", size: 14, orbitRadius: 100, duration: 10, color: "#8C8C8C", angleOffset: 0 },
  { name: "Venus", size: 18, orbitRadius: 140, duration: 15, color: "#FF8C42", angleOffset: 45 },
  { name: "Earth", size: 20, orbitRadius: 180, duration: 20, color: "#4A90E2", angleOffset: 90 },
  { name: "Mars", size: 16, orbitRadius: 220, duration: 25, color: "#CD5C5C", angleOffset: 135 },
  { name: "Jupiter", size: 60, orbitRadius: 300, duration: 40, color: "#D8CA9D", angleOffset: 180 },
  { name: "Saturn", size: 50, orbitRadius: 380, duration: 50, color: "#FAD5A5", angleOffset: 225, hasRings: true },
  { name: "Uranus", size: 32, orbitRadius: 450, duration: 60, color: "#4FD0E7", angleOffset: 270 },
  { name: "Neptune", size: 30, orbitRadius: 520, duration: 70, color: "#4166F5", angleOffset: 315 },
];

function ShootingStar({ id, onComplete }) {

  const trajectory = useMemo(() => {
    let startX;
    let startY = Math.random() * window.innerHeight;

    if (Math.random() < 0.7) {
      startX = Math.random() * (window.innerWidth * 0.6);
    } else {
      startX = Math.random() * window.innerWidth;
    }

    const distanceX = -(450 + Math.random() * 350);
    const distanceY = 250 + Math.random() * 200;

    const endX = startX + distanceX;
    const endY = startY + distanceY;

    const angleRad = Math.atan2(distanceY, distanceX);
    const angleDeg = (angleRad * 180) / Math.PI;

    return { startX, startY, endX, endY, angleDeg };
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: 0, top: 0 }}
      initial={{
        x: trajectory.startX,
        y: trajectory.startY,
        opacity: 0,
      }}
      animate={{
        x: trajectory.endX,
        y: trajectory.endY,
        opacity: [0, 1, 1, 0.4, 0],
      }}
      transition={{
        duration: 1.2,
        ease: "linear",
        times: [0, 0.15, 0.7, 0.9, 1],
      }}
      onAnimationComplete={() => onComplete(id)}
    >

      {/* rotation layer */}
      <div
        style={{
          position: "absolute",
          transformOrigin: "100% 50%",
          transform: `rotate(${trajectory.angleDeg}deg)`
        }}
      >

        {/* Tail */}
        <motion.div
          style={{
            position: "absolute",
            right: "6px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.45) 70%, rgba(255,255,255,0.8) 90%)",
            filter: "blur(0.2px)",
          }}
          initial={{ width: 20 }}
          animate={{ width: 260 }}
          transition={{ duration: 1.2, ease: "linear" }}
        />

        {/* Head */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 6px white, 0 0 10px rgba(255,255,255,0.8)",
          }}
        />

      </div>
    </motion.div>
  );
}

function SolarSystemContent() {
  const [shootingStars, setShootingStars] = useState([]);

  const backgroundStars = useMemo(() => {
    return [...Array(180)].map(() => ({
      size: Math.random() * 2.2 + 0.6,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      brightness: Math.random() * 0.6 + 0.4
    }));
  }, []);

  useEffect(() => {
    let timeoutId;

    const createStar = () => {

      // do not spawn if tab is hidden
      if (document.hidden) {
        scheduleNext();
        return;
      }

      const count = Math.random() < 0.35 ? 2 : 1;

      setShootingStars((prev) => {
        const newStars = [...prev];

        for (let i = 0; i < count; i++) {
          newStars.push({ id: Date.now() + Math.random() + i });
        }

        // limit star memory (performance)
        return newStars.slice(-25);
      });

      scheduleNext();
    };

    const scheduleNext = () => {
      const nextSpawn = Math.random() * 1500 + 600;
      timeoutId = setTimeout(createStar, nextSpawn);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  const removeStar = (id) => {
    setShootingStars((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      {/* SUN */}
      <div
        className="absolute"
        style={{
          left: SUN_POSITION.x,
          top: SUN_POSITION.y,
          width: "120px",
          height: "120px",
          marginLeft: "-60px",
          marginTop: "-60px",
          borderRadius: "50%",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #FFF8DC, #FFE4B5, #FFD700, #FFA500)",
            boxShadow:
              "inset -20px -20px 50px rgba(255,140,0,0.2), 0 0 20px rgba(255,215,0,0.4)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* ORBITS */}
      {PLANETS.map((planet, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: SUN_POSITION.x,
            top: SUN_POSITION.y,
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,0.3)",
          }}
        />
      ))}

      {/* PLANETS */}
      {PLANETS.map((planet) => (
        <motion.div
          key={planet.name}
          className="absolute"
          style={{
            left: SUN_POSITION.x,
            top: SUN_POSITION.y,
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
          }}
          animate={{ rotate: [planet.angleOffset, planet.angleOffset + 360] }}
          transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
        >
          <div
            style={{
              width: planet.size,
              height: planet.size,
              background: planet.color,
              borderRadius: "50%",
              position: "absolute",
              left: planet.orbitRadius - planet.size / 2,
              top: -planet.size / 2,
              boxShadow: `0 0 20px ${planet.color}`,
            }}
          />
        </motion.div>
      ))}

      {/* BACKGROUND STARS */}
      {backgroundStars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            borderRadius: "50%",
            background: "white",
            opacity: star.brightness,

            boxShadow: `
        0 0 ${star.size * 2}px rgba(255,255,255,0.9),
        0 0 ${star.size * 4}px rgba(255,255,255,0.6)
      `,
          }}
          animate={{
            opacity: [
              star.brightness * 0.6,
              star.brightness * 0.9,
              star.brightness,
              star.brightness * 0.85,
              star.brightness * 0.7,
              star.brightness * 0.9,
            ],
            scale: [1, 1.05, 1.1, 1.05, 1],
          }}
          transition={{
            duration: star.duration + 2,   // slower twinkle
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* SHOOTING STARS */}
      {shootingStars.map((star) => (
        <ShootingStar key={star.id} id={star.id} onComplete={removeStar} />
      ))}
    </>
  );
}

export default function GlobalSolarSystemBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <SolarSystemContent />
    </div>
  );
}