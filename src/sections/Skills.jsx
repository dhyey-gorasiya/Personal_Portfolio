import { useState } from 'react';
import skills from '../data/skills.json';
import { motion, useAnimation } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';

function SkillCard({ skill, index }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();

  const handleInView = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      controls.start({ opacity: 1, scale: 1 });

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = skill.level / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= skill.level) {
          setCount(skill.level);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={handleInView}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 92, 255, 0.1) 0%, rgba(0, 229, 196, 0.1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 92, 255, 0.3) 0%, rgba(0, 229, 196, 0.3) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <motion.span
            className="font-medium text-slate-900 dark:text-text text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {skill.name}
          </motion.span>
          <motion.span
            className="text-sm font-semibold text-accent tabular-nums"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            aria-label={`${skill.level} percent`}
          >
            {count}%
          </motion.span>
        </div>

        {/* Progress bar container */}
        <div className="relative h-3 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          {/* Animated progress bar */}
          <motion.div
            className="h-full rounded-full accent-gradient relative overflow-hidden"
            initial={{ width: 0 }}
            animate={hasAnimated ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{
              duration: 2,
              delay: 0.2 + index * 0.1,
              ease: [0.22, 0.95, 0.36, 1]
            }}
            style={{
              background: 'linear-gradient(90deg, #7C5CFF 0%, #00E5C4 100%)',
              boxShadow: '0 0 10px rgba(124, 92, 255, 0.5)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-2xl font-heading font-semibold text-slate-900 dark:text-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 0.95, 0.36, 1] }}
        >
          Skills
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.15, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}


