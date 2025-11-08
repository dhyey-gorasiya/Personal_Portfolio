import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';

const ROLES = ['Frontend Engineer', 'UI/UX Enthusiast', 'Open Source Contributor'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const full = ROLES[index % ROLES.length];
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplay(full.slice(0, i));
      if (i === full.length) {
        clearInterval(interval);
        setTimeout(() => setIndex((v) => v + 1), 1600);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [index]);

  const avatarAnimationUrl = useMemo(
    () => `https://assets9.lottiefiles.com/packages/lf20_tno6cg2w.json`,
    []
  );

  // Floating animation for avatar
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Rotating glow animation
  const rotatingGlow = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  // Scale animation for badge
  const badgeAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Button hover animations
  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { scale: 0.95 }
  };

  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.95, 0.36, 1]
      }
    }
  };

  // Consistent particle positions (using seed values) - Reduced for performance
  const particles = useMemo(() => [
    { left: 10, top: 20, width: 150, height: 150, x: 30, y: -20, duration: 12, delay: 0 },
    { left: 80, top: 10, width: 120, height: 120, x: -40, y: 25, duration: 15, delay: 2 },
    { left: 40, top: 30, width: 160, height: 160, x: 20, y: 15, duration: 16, delay: 1.5 },
  ], []);

  // Glowing stars/particles for background - Reduced for performance
  const stars = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const seed = i * 17 + 7;
      return {
        left: (seed * 23) % 100,
        top: (seed * 31) % 100,
        size: (seed % 3) + 1,
        duration: (seed % 5) + 3,
        delay: (seed % 4) * 0.5,
        opacity: 0.3 + (seed % 3) * 0.2,
      };
    });
  }, []);

  return (
    <section id="home" aria-label="Hero" className="relative isolate overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-accent/5 dark:bg-accent/10 blur-xl"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Subtle purple glow from center-right */}
        <motion.div
          className="absolute rounded-full blur-2xl opacity-30 dark:opacity-20"
          style={{
            width: '600px',
            height: '600px',
            left: '60%',
            top: '40%',
            background: 'radial-gradient(circle, rgba(124, 92, 255, 0.4), transparent 70%)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Additional gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(124, 92, 255, 0.3), transparent 50%)',
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Glowing stars/particles */}
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white dark:bg-accent/40"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            animate={{
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute rounded-full blur-2xl opacity-20 dark:opacity-10"
          style={{
            width: '400px',
            height: '400px',
            left: '20%',
            top: '10%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute rounded-full blur-2xl opacity-15 dark:opacity-8"
          style={{
            width: '300px',
            height: '300px',
            left: '75%',
            top: '70%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
        <motion.div
          variants={staggerContainer(0.15, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={fadeUp}>
            {/* Animated badge */}
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-800 dark:text-muted font-medium"
              variants={textReveal}
              animate={badgeAnimation}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-secondary inline-block"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
              Available for work
            </motion.span>

            {/* Animated heading with gradient effect */}
            <motion.h1
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight text-slate-900 dark:text-text"
              variants={textReveal}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent whitespace-nowrap">
                Dhyey Gorasiya
              </span>
            </motion.h1>
            <motion.h2
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-slate-900 dark:text-text"
              variants={textReveal}
            >
              Building minimal, accessible web experiences.
            </motion.h2>

            <motion.p
              className="mt-4 text-slate-700 dark:text-muted max-w-prose"
              variants={textReveal}
            >
              I craft responsive interfaces with React, Tailwind, and delightful motion.
            </motion.p>

            {/* Animated buttons */}
            <motion.div
              className="mt-6 flex items-center gap-3"
              variants={textReveal}
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('projects');
                  if (element) {
                    const navbarHeight = 64;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', '#projects');
                  }
                }}
                className="group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-background bg-accent hover:shadow-glow transition duration-200 ease-smooth"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                View Projects
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    const navbarHeight = 64;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', '#contact');
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-slate-900 dark:text-text bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition duration-200 ease-smooth"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Animated typing text */}
            <motion.div
              className="mt-6 font-code"
              variants={textReveal}
            >
              <span className="text-slate-800 dark:text-text">{display}</span>
              <motion.span
                aria-hidden
                className="ml-1 inline-block w-3 h-6 align-middle bg-slate-900 dark:bg-text"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="sr-only">Current role: {display}</span>
            </motion.div>
          </motion.div>

          {/* Animated avatar section */}
          <motion.div
            variants={fadeUp}
            className="justify-self-center"
            animate={floatingAnimation}
          >
            <div className="relative">
              {/* Rotating glow effect */}
              <motion.div
                className="absolute -inset-8 blur-3xl opacity-20 dark:opacity-30 bg-[radial-gradient(ellipse_at_center,theme(colors.accent),transparent_60%)]"
                animate={rotatingGlow}
                aria-hidden
              />

              {/* Pulsing ring around avatar */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/20 dark:border-accent/30"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              />

              {/* Animated professional character (Lottie) */}
              <motion.div
                className="relative z-10 h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full ring-2 ring-slate-200 dark:ring-white/10 shadow-glow overflow-hidden bg-transparent"
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -5, 5, -5, 0],
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  scale: {
                    duration: 0.8,
                    ease: [0.22, 0.95, 0.36, 1]
                  },
                  opacity: {
                    duration: 0.8,
                    ease: [0.22, 0.95, 0.36, 1]
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                aria-label="Professional animated avatar"
              >
                <lottie-player
                  src={avatarAnimationUrl}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                ></lottie-player>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


