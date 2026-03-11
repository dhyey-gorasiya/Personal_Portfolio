import { useEffect, useState } from 'react';
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

  // Floating animation for avatar
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
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

  return (
    <section id="home" aria-label="Hero" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-13 md:py-15">
        <motion.div
          variants={staggerContainer(0.15, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center"
        >
          <motion.div variants={fadeUp} className="md:col-span-3 pl-0 md:pl-10">
            {/* Animated badge */}
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-slate-200 dark:bg-white/10 px-3 py-1 text-xs text-slate-800 dark:text-muted font-medium"
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
              className="mt-5 text-3xl sm:text-4xl lg:text-6xl font-heading font-semibold tracking-tight text-slate-900 dark:text-text"
              variants={textReveal}
            >
              Hi, I'm
            </motion.h1>
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-heading font-semibold tracking-tight text-slate-900 dark:text-text"
              variants={textReveal}
            >
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
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-slate-900 dark:text-text bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 transition duration-200 ease-smooth"
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

          {/* Pop-out avatar: head above circle, bottom cut cleanly by circle curve */}
          <motion.div
            variants={fadeUp}
            className="hidden md:block justify-self-center md:col-span-2 mt-7"
            animate={floatingAnimation}
          >
            <svg width={0} height={0} aria-hidden>
              <defs>
                {/* Clip: top open; bottom cut exactly by circle arc so image fits in circle */}
                <clipPath id="hero-avatar-clip" clipPathUnits="objectBoundingBox">
                  <path d="M 0 0 H 1 V 0.609 A 0.391 0.391 0 0 1 0 0.609 Z" />
                </clipPath>
              </defs>
            </svg>
            <div className="relative h-96 w-96 overflow-visible">
              {/* Top half of circle - BEHIND avatar (head in front of this arc) */}
              <div className="absolute inset-0 h-1/2 overflow-hidden z-0 pointer-events-none" aria-hidden>
                <div className="w-full aspect-square rounded-full border-[3px] border-amber-400 dark:border-amber-400" />
              </div>

              {/* Avatar: natural scale (no zoom), head pops out, bottom cut by circle */}
              <motion.div
                className="absolute left-0 right-0 z-10 overflow-hidden rounded-full"
                style={{
                  top: '-28%',
                  height: '128%',
                  clipPath: 'url(#hero-avatar-clip)',
                }}
                // whileHover={{
                //   y: -20,
                //   transition: { duration: 0.25, ease: 'easeOut' },
                // }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.95, 0.36, 1] }}
              >
                <img
                  src="https://i.postimg.cc/k418S6N5/Chat-GPT-Image-Mar-11-2026-11-03-19-AM.png"
                  alt="Professional avatar"
                  className="absolute left-1/2 w-full h-[128%] -translate-x-1/2 object-cover object-[50%_35%] select-none"
                  style={{ top: '-18%' }}
                />
              </motion.div>

              {/* Bottom half of circle - IN FRONT (torso behind arc) */}
              <div className="absolute inset-0 h-1/2 top-1/2 overflow-hidden z-20 pointer-events-none" aria-hidden>
                <div className="absolute left-0 w-full aspect-square rounded-full border-[3px] border-amber-400 dark:border-amber-400" style={{ top: '-100%' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


