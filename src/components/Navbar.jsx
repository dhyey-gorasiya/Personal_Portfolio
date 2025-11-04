import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';
import { fadeIn, transition } from '../utils/motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme('dark');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const linkRefs = useRef({});
  const linksContainerRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const handleHash = () => setActive(window.location.hash.replace('#', '') || 'home');
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Observe sections to update the active link while scrolling
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Find the section that's currently in view
      let currentSection = sections[0]?.id || 'home';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;

        if (scrollPosition >= sectionTop) {
          currentSection = section.id;
          break;
        }
      }

      setActive(currentSection);
    };

    // Use IntersectionObserver for better performance
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            // Update active section when it's in the upper portion of viewport
            if (rect.top <= 150) {
              setActive(entry.target.id);
            }
          }
        });
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '-100px 0px -60% 0px'
      }
    );

    sections.forEach((s) => io.observe(s));

    // Also use scroll listener for more responsive updates
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection(); // Initial check

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  // Position the underline under the active link
  useEffect(() => {
    const el = linkRefs.current[active];
    const cont = linksContainerRef.current;
    if (!el || !cont) return;
    const elRect = el.getBoundingClientRect();
    const contRect = cont.getBoundingClientRect();
    setUnderline({ left: elRect.left - contRect.left, width: elRect.width });
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current[active];
      const cont = linksContainerRef.current;
      if (!el || !cont) return;
      const elRect = el.getBoundingClientRect();
      const contRect = cont.getBoundingClientRect();
      setUnderline({ left: elRect.left - contRect.left, width: elRect.width });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  return (
    <motion.nav
      role="navigation"
      aria-label="Primary"
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-surface/70 border-b border-slate-200 dark:border-white/5"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="text-xl font-heading font-semibold tracking-tight text-slate-900 dark:text-text">
            <span className="accent-gradient bg-clip-text text-transparent">Portfolio</span>
          </a>
          <div className="hidden md:flex items-center gap-8 relative">
            <div ref={linksContainerRef} className="flex gap-6 text-sm font-medium text-slate-600 dark:text-muted relative">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActive(item.id)}
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  className={`py-1 transition-[color] duration-300 ease-smooth hover:text-slate-900 dark:hover:text-text ${active === item.id
                    ? 'text-slate-900 dark:text-text'
                    : 'text-slate-600 dark:text-muted'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 h-0.5 rounded accent-gradient"
              animate={{ left: underline.left, width: underline.width }}
              transition={transition}
            />
          </div>
          <div className="flex items-center gap-3">
            {/* <button
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={toggleTheme}
              className="p-2 rounded-md bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors duration-200"
            >
              {theme === 'dark' ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
            </button> */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-md bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
            </button>
          </div>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="md:hidden overflow-hidden border-t border-slate-200 dark:border-white/5"
      >
        <div className="px-4 py-3 space-y-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`block px-2 py-2 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${active === item.id
                ? 'text-slate-900 dark:text-text bg-black/5 dark:bg-white/5'
                : 'text-slate-600 dark:text-muted'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}


