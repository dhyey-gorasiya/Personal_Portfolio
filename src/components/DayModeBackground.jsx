import { motion } from "framer-motion";
import JetAirplaneSvg from "./JetAirplaneSvg";

// Stable cloud configs. Scale applied so clouds render bigger; duration varies a lot per cloud.
const CLOUD_SCALE = 2.6;
const CLOUD_CONFIGS = [
    { top: 12, puffs: [[0, 0, 45], [55, -18, 38], [110, 5, 42], [35, 22, 32], [85, 15, 28]], opacity: 0.94, duration: 42 },
    { top: 28, puffs: [[0, 10, 50], [60, -10, 40], [120, 8, 45], [30, 25, 35], [90, 20, 30], [150, 5, 38]], opacity: 0.9, duration: 22 },
    { top: 45, puffs: [[0, 5, 40], [45, -12, 35], [90, 0, 38], [25, 20, 28]], opacity: 0.92, duration: 35 },
    { top: 62, puffs: [[0, 0, 48], [50, -15, 40], [100, 5, 42], [70, 18, 32], [130, 12, 36]], opacity: 0.88, duration: 28 },
    { top: 18, puffs: [[0, 8, 36], [40, -8, 30], [75, 5, 32], [20, 18, 24]], opacity: 0.91, duration: 52 },
    { top: 52, puffs: [[0, 5, 44], [52, -12, 38], [105, 3, 40], [35, 20, 30], [80, 15, 28]], opacity: 0.89, duration: 30 },
    // Low fluffy clouds
    { top: 72, puffs: [[0, 5, 42], [48, -14, 36], [95, 2, 40], [30, 22, 30], [70, 16, 28], [120, 8, 34]], opacity: 0.9, duration: 38 },
    { top: 78, puffs: [[0, 8, 38], [42, -10, 32], [85, 4, 36], [25, 20, 26], [65, 14, 24]], opacity: 0.88, duration: 32 },
    { top: 84, puffs: [[0, 3, 44], [52, -12, 38], [100, 6, 42], [35, 24, 32], [80, 18, 30]], opacity: 0.87, duration: 36 },
    { top: 88, puffs: [[0, 6, 40], [45, -8, 34], [88, 0, 38], [28, 18, 28], [72, 12, 26]], opacity: 0.86, duration: 34 },
];

// Birds flying left to right – stable configs (top %, duration, size, delay)
const BIRD_CONFIGS = [
    { top: 42, duration: 14, size: 20, delay: 0 },
    { top: 58, duration: 18, size: 16, delay: 4 },
    { top: 75, duration: 12, size: 22, delay: 2 },
    { top: 38, duration: 16, size: 18, delay: 7 },
    { top: 68, duration: 20, size: 14, delay: 1 },
    { top: 52, duration: 15, size: 19, delay: 5 },
];

// Indian flag colors for jet smoke trails (saffron, white, green)
const SAFFRON = "#FF9933";
const FLAG_WHITE = "#FFFFFF";
const FLAG_GREEN = "#138808";

// Jet flies left to right – small size so it looks far away
const JET_DURATION = 38;
const JET_DELAY = 0;
const JET_TOP = "44%";
const FORMATION_WIDTH = 120;
const FORMATION_HEIGHT = 115;

function SingleJetWithSmoke({ smokeColor, smokeRgb, position }) {
    const gradient = `linear-gradient(to left, transparent 0%, ${smokeRgb} 3%, ${smokeRgb} 12%, ${smokeColor} 28%, ${smokeColor} 40%, ${smokeRgb} 58%, transparent 100%)`;
    return (
        <div
            className="absolute"
            style={{
                ...position,
                width: 70,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                transform: "rotate(-3deg)",
                overflow: "visible",
            }}
        >
            <div
                className="absolute"
                style={{
                    right: "30%",
                    top: "45%",
                    transform: "translateY(-50%)",
                    width: 200,
                    height: 6,
                    marginRight: "8px",
                    pointerEvents: "none",
                    background: gradient,
                    filter: "blur(3px)",
                    borderRadius: "2px",
                }}
            />
            <JetAirplaneSvg
                width="50%"
                height="50%"
                style={{ flexShrink: 0, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
            />
        </div>
    );
}

function FlyingJet() {
    // Vertical formation: orange (top), white (middle), green (bottom)
    const jets = [
        { smokeColor: SAFFRON, smokeRgb: "rgba(255,153,51,0.85)", position: { left: "50%", top: 0, transform: "translateX(-50%)" } },
        { smokeColor: FLAG_WHITE, smokeRgb: "rgba(255,255,255,0.9)", position: { left: "100%", top: 20, transform: "translateX(-50%)" } },
        { smokeColor: FLAG_GREEN, smokeRgb: "rgba(19,136,8,0.85)", position: { left: "50%", top: 40, transform: "translateX(-50%)" } },
    ];
    return (
        <motion.div
            className="absolute"
            style={{
                top: JET_TOP,
                left: "-140px",
                width: FORMATION_WIDTH,
                height: FORMATION_HEIGHT,
                overflow: "visible",
                filter: "blur(1.5px)",
            }}
            initial={{ x: 0 }}
            animate={{ x: "140vw" }}
            transition={{
                duration: JET_DURATION,
                repeat: Infinity,
                delay: JET_DELAY,
                ease: "linear",
            }}
        >
            {/* Smoke – front edge at plane’s back/tail so it reads as coming from the rear */}
            {jets.map((jet, i) => (
                <SingleJetWithSmoke
                    key={i}
                    smokeColor={jet.smokeColor}
                    smokeRgb={jet.smokeRgb}
                    position={jet.position}
                />
            ))}
        </motion.div>
    );
}

function FlyingBird({ config, index }) {

    const flapSpeed = 0.45 + (index % 3) * 0.08;

    return (
        <motion.div
            className="absolute"
            style={{
                top: `${config.top}%`,
                left: "-50px",
                width: config.size,
                height: config.size,
                filter: "blur(1.5px)",
            }}
            animate={{
                x: "110vw",
                y: [0, -5, 2, -3, 0],
                rotate: [-5, -2, -4]
            }}
            transition={{
                x: {
                    duration: config.duration,
                    repeat: Infinity,
                    delay: config.delay,
                    ease: "linear"
                },
                y: {
                    duration: flapSpeed * 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                rotate: {
                    duration: flapSpeed * 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
        >
            <svg viewBox="0 0 40 30" style={{ width: "100%", height: "100%" }}>

                {/* body */}
                <ellipse cx="18" cy="15" rx="3" ry="2" fill="rgba(35,33,30,0.9)" />

                {/* LEFT WING */}
                <motion.path
                    d="M18 15 Q8 5 2 8"
                    stroke="rgba(35,33,30,0.9)"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                        d: [
                            "M18 15 Q8 5 2 8",
                            "M18 15 Q10 18 2 18",
                            "M18 15 Q8 5 2 8"
                        ]
                    }}
                    transition={{
                        duration: flapSpeed,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* RIGHT WING */}
                <motion.path
                    d="M18 15 Q28 5 38 8"
                    stroke="rgba(35,33,30,0.9)"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                        d: [
                            "M18 15 Q28 5 38 8",
                            "M18 15 Q28 18 38 18",
                            "M18 15 Q28 5 38 8"
                        ]
                    }}
                    transition={{
                        duration: flapSpeed,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

            </svg>
        </motion.div>
    );
}

function Cloud({ config, index }) {
    const s = CLOUD_SCALE;
    const rightmost = Math.max(...config.puffs.map(([x, , r]) => (x + r) * s)) + 80;
    const boxShadow = config.puffs
        .map(([x, y, r]) => `${x * s}px ${y * s}px ${r * 1.2 * s}px ${r * 0.55 * s}px rgba(255,255,255,0.93)`)
        .join(", ");

    return (
        <motion.div
            key={index}
            className="absolute"
            style={{
                width: 1,
                height: 1,
                top: `${config.top}%`,
                left: `-${rightmost}px`,
                opacity: config.opacity,
                filter: "blur(10px)",
                boxShadow,
                willChange: "transform",
            }}
            animate={{ x: "130vw" }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

function DayModeBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-visible pointer-events-none">

            {/* Sky Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, #87CEFA 0%, #BDE0FE 40%, #E3F2FD 100%)",
                }}
            />

            {/* Sun Glow */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    right: "8%",
                    top: "18%",
                    width: "220px",
                    height: "220px",
                    background:
                        "radial-gradient(circle, rgba(255,245,180,0.9) 0%, rgba(255,220,120,0.7) 40%, rgba(255,220,120,0.2) 70%, transparent 80%)",
                    filter: "blur(10px)",
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.9, 1, 0.9],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Clouds – stable configs, fluffy cumulus-style puffs */}
            {CLOUD_CONFIGS.map((config, i) => (
                <Cloud config={config} index={i} />
            ))}

            {/* Jet with Indian flag smoke (saffron, white, green) */}
            <FlyingJet />

            {/* Birds flying left to right */}
            {BIRD_CONFIGS.map((config, i) => (
                <FlyingBird config={config} index={i} />
            ))}

            {/* Floating Light Particles */}
            {/* {[...Array(40)].map((_, i) => {
                const size = Math.random() * 3 + 1;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            background: "rgba(255,255,255,0.8)",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            filter: "blur(1px)",
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                );
            })} */}
        </div>
    );
}

export default DayModeBackground;