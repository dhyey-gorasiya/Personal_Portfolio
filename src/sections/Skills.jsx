import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import skills from '../data/skills.json';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';

const VISIBLE_SKILLS_LIMIT = 7;

function SkillsModal({ isOpen, onClose, allSkills }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!allSkills?.length) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 dark:bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.95, 0.36, 1] }}
            className="fixed inset-2 sm:inset-4 md:inset-6 z-50 overflow-hidden max-w-4xl mx-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skills-modal-title"
          >
            <div className="flex flex-col min-h-0 w-full flex-1 bg-white dark:bg-surface rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200 dark:border-white/10">
                <h2 id="skills-modal-title" className="text-2xl font-heading font-semibold text-slate-900 dark:text-text">
                  All Skills
                  <span className="ml-2 text-lg font-normal border border-slate-200 dark:border-white/10 rounded-md px-2 py-0.5 text-slate-500 dark:text-muted ">{allSkills.length}</span>
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-text"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      className="rounded-xl bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-text">{skill.name}</span>
                        <span className="text-sm font-semibold text-accent tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: index * 0.04, ease: [0.22, 0.95, 0.36, 1] }}
                          style={{
                            background: 'linear-gradient(90deg, #7C5CFF 0%, #00E5C4 100%)',
                            boxShadow: '0 0 10px rgba(124, 92, 255, 0.4)',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

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
  const [showAllSkillsOpen, setShowAllSkillsOpen] = useState(false);
  const hasMoreThanEight = skills.length > 8;
  const visibleSkills = hasMoreThanEight ? skills.slice(0, VISIBLE_SKILLS_LIMIT) : skills;

  return (
    <section id="skills" aria-label="Skills" className="relative py-16 sm:py-24 md:py-24 overflow-hidden">
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
          <span className="ml-2 text-lg font-normal border border-slate-200 dark:border-white/10 rounded-md px-2 py-0.5 text-slate-500 dark:text-muted ">{skills.length}</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.15, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visibleSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
          {hasMoreThanEight && (
            <motion.button
              type="button"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden cursor-pointer"
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAllSkillsOpen(true)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 92, 255, 0.1) 0%, rgba(0, 229, 196, 0.1) 100%)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="font-medium text-slate-700 dark:text-muted group-hover:text-accent transition-colors">
                  Show more
                </span>
                <svg className="w-5 h-5 text-accent opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="relative z-10 text-sm text-slate-500 dark:text-muted/80 mt-1">
                +{skills.length - VISIBLE_SKILLS_LIMIT} skills
              </span>
            </motion.button>
          )}
        </motion.div>
      </div>

      <SkillsModal
        isOpen={showAllSkillsOpen}
        onClose={() => setShowAllSkillsOpen(false)}
        allSkills={skills}
      />
    </section>
  );
}


