import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PROFILE_GALLERY_IMAGES = [
  'https://i.postimg.cc/L5mD921g/shared-image.jpg',
  'https://i.postimg.cc/9Fzn3TQ0/IMG-20260104-203126.jpg',
];

const timeline = [
  { company: 'Spectra Technovision Pvt. Ltd.', title: 'Full Stack Developer', time: 'Oct 2025 — Present', desc: 'Developing web applications and APIs using Anguler, Node.js, and MySQL.', location: 'Ahmedabad' },
  { company: 'Spectra Technovision Pvt. Ltd.', title: 'Intern Full Stack Developer', time: 'Apr 2025 — Oct 2025', desc: 'Developing web applications and APIs using Anguler, Node.js, and MySQL.', location: 'Ahmedabad' },
  { company: 'Proficient Recruitment Services Pvt. Ltd. ', title: 'Intern Angular Developer', time: 'Mar 2024 — Dec 2024', desc: 'Developing web applications using Anguler.', location: 'Ahmedabad' },
];


function ProfileImageModal({ isOpen, onClose, images = PROFILE_GALLERY_IMAGES }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    const handleArrow = (e) => {
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleArrow);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrow);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, images.length]);

  const goPrev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const goNext = () => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-4 sm:inset-8 z-50 flex flex-col max-w-5xl mx-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Profile gallery"
          >
            <div className="flex-1 min-h-0 flex flex-col bg-white dark:bg-surface rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
                <span className="text-sm text-slate-600 dark:text-muted">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-muted"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-h-0 relative flex items-center justify-center p-4">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-surface/90 shadow-lg border border-slate-200 dark:border-white/10 hover:bg-accent hover:text-white"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Gallery ${currentIndex + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-full w-auto max-w-full object-contain rounded-lg"
                  />
                </AnimatePresence>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-surface/90 shadow-lg border border-slate-200 dark:border-white/10 hover:bg-accent hover:text-white"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center gap-2 py-3 flex-shrink-0">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-accent' : 'w-2 bg-slate-300 dark:bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  return createPortal(modalContent, document.body);
}

export default function About() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

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
    <section id="about" aria-label="About" className="relative py-14 sm:py-15 md:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={fadeUp} className="md:col-span-1 flex flex-col items-center md:items-start">
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="relative w-full md:w-auto flex justify-center md:inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl"
              aria-label="View profile gallery"
            >
              {/* Soft orbiting glow */}
              <motion.div
                className="absolute -inset-6 rounded-2xl blur-3xl opacity-25 bg-[radial-gradient(circle_at_center,theme(colors.accent/60),transparent_60%)]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                aria-hidden
              />
              {/* Avatar with hover tilt - full width & centered on mobile */}
              <motion.img
                src="https://i.postimg.cc/L5mD921g/shared-image.jpg"
                alt="Profile"
                loading="lazy"
                className="relative w-full aspect-square md:w-48 md:h-48 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-white/10 shadow-glow"
                width={384}
                height={384}
                whileHover={{ rotate: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              />
            </button>
            <h2 className="mt-6 text-2xl font-heading font-semibold text-slate-900 dark:text-text">About Me</h2>
            <p className="mt-2 text-slate-700 dark:text-muted">Detail-oriented Full Stack Developer with hands-on experience in Angular, React, JavaScript, and modern web technologies. Passionate about building responsive, high-performance applications and improving user experience through clean and efficient code.</p>
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
                <h3 className="font-medium text-slate-900 dark:text-text">Location</h3>
                <p className="text-slate-600 dark:text-muted mt-1">Remote / Worldwide</p>
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
                <h3 className="font-medium text-slate-900 dark:text-text">Experience</h3>
                <p className="text-slate-600 dark:text-muted mt-1">1+ years</p>
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
                <h3 className="font-medium text-slate-900 dark:text-text">Specialty</h3>
                <p className="text-slate-600 dark:text-muted mt-1">React, TypeScript, Anguler, Tailwind CSS</p>
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
                <h3 className="font-medium text-slate-900 dark:text-text">Interests</h3>
                <p className="text-slate-600 dark:text-muted mt-1">Web Development, Web designing</p>
              </motion.div>
            </motion.div>
            <div className="mt-8">
              <h3 className="font-heading font-semibold text-lg text-slate-900 dark:text-text">Timeline</h3>
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
                  {timeline.map((item, i) => (
                    <motion.li key={i} className="relative" custom={i} variants={timelineItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                      <span className="absolute top-1/2 -translate-y-1/2 left-[-1.8125rem] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-white dark:ring-background shadow-glow" aria-hidden />
                      <motion.div
                        className="rounded-lg bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-medium text-accent uppercase tracking-wide">{item.company}</p>
                          <p className="mt-2 text-sm text-slate-600 dark:text-muted">{item.location}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-slate-900 dark:text-text">{item.title}</p>
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

      <ProfileImageModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </section>
  );
}


