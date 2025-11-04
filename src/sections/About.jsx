import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';

export default function About() {
  const cardHover = {
    rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: {
      y: -4,
      boxShadow: '0 10px 30px rgba(124, 92, 255, 0.12)',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const timelineItem = {
    hidden: { opacity: 0, x: -12 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 0.95, 0.36, 1], delay: i * 0.08 }
    })
  };

  return (
    <section id="about" aria-label="About" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={fadeUp} className="md:col-span-1">
            <div className="relative inline-block">
              {/* Soft orbiting glow */}
              <motion.div
                className="absolute -inset-6 rounded-2xl blur-3xl opacity-25 bg-[radial-gradient(circle_at_center,theme(colors.accent/60),transparent_60%)]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                aria-hidden
              />
              {/* Avatar with hover tilt */}
              <motion.img
                src="https://i.postimg.cc/L5mD921g/shared-image.jpg"
                alt="Profile"
                loading="lazy"
                className="relative w-48 h-48 rounded-2xl object-cover ring-2 ring-white/10 shadow-glow"
                width={384}
                height={384}
                whileHover={{ rotate: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              />
            </div>
            <h2 className="mt-6 text-2xl font-heading font-semibold">About Me</h2>
            <p className="mt-2 text-muted">Full Stack Developer focused on building web applications and APIs using Anguler, Node.js, and MySQL.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-2">
            <motion.div
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden"
                whileHover="hover"
                animate="rest"
                variants={cardHover}
              >
                <h3 className="font-medium">Location</h3>
                <p className="text-slate-600 dark:text-muted">Remote / Worldwide</p>
                <motion.span
                  className="pointer-events-none absolute -inset-px rounded-xl"
                  style={{ background: 'linear-gradient(120deg, rgba(124,92,255,0.12), transparent 40%, rgba(59,130,246,0.12))' }}
                  animate={{ opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden"
                whileHover="hover"
                animate="rest"
                variants={cardHover}
              >
                <h3 className="font-medium">Experience</h3>
                <p className="text-slate-600 dark:text-muted">1+ years</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden"
                whileHover="hover"
                animate="rest"
                variants={cardHover}
              >
                <h3 className="font-medium">Specialty</h3>
                <p className="text-slate-600 dark:text-muted">React, TypeScript, Anguler, Tailwind CSS</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden"
                whileHover="hover"
                animate="rest"
                variants={cardHover}
              >
                <h3 className="font-medium">Interests</h3>
                <p className="text-slate-600 dark:text-muted">Web Development, UI/UX Design</p>
              </motion.div>
            </motion.div>
            <div className="mt-8">
              <h3 className="font-heading font-semibold text-lg">Timeline</h3>
              <div className="relative mt-4 pl-6">
                {/* Animated vertical line */}
                <motion.span
                  className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-accent/70 via-accent/30 to-transparent rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  aria-hidden
                />
                <ol className="space-y-6">
                  {[{
                    title: 'Full Stack Developer', time: 'Oct 2025 — Present', desc: 'Developing web applications and APIs using Anguler, Node.js, and MySQL.'
                  }, {
                    title: 'Junior Full Stack Developer', time: 'Apr 2025 — Oct 2025', desc: 'Developing web applications and APIs using Anguler, Node.js, and MySQL.'
                  }, {
                    title: 'Intern', time: 'Mar 2024 — Dec 2024', desc: 'Developing web applications using Anguler.'
                  }].map((item, i) => (
                    <motion.li key={i} className="relative" custom={i} variants={timelineItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                      <span className="absolute top-1/2 -translate-y-1/2 left-[-1.8125rem] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background shadow-glow" aria-hidden />
                      <motion.div
                        className="rounded-lg bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium">{item.title}</p>
                          <span className="text-xs text-slate-600 dark:text-muted">{item.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-muted">{item.desc}</p>
                      </motion.div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


