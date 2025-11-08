import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated gradient line */}
      <motion.div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(to right, rgba(124, 92, 255, 0.8), rgba(59, 130, 246, 0.8), rgba(34, 211, 238, 0.8))',
          boxShadow: '0 0 10px rgba(124, 92, 255, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* Subtle background glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(124, 92, 255, 0.2), rgba(59, 130, 246, 0.2), transparent)',
          filter: 'blur(1px)',
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-600 dark:text-muted">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-slate-700 dark:text-slate-300"
          >
            © {currentYear} Dhyey Gorasiya
          </motion.p>

          {/* Navigation Links */}
          <nav aria-label="Footer">
            <ul className="flex items-center gap-6">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
                  className="relative text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Projects
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
                  className="relative text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            </ul>
          </nav>
        </div>

        {/* Decorative particles */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => {
            const seed = i * 13 + 7;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '2px',
                  height: '2px',
                  left: `${(seed * 19) % 100}%`,
                  top: `${(seed * 23) % 100}%`,
                  background: 'rgba(124, 92, 255, 0.3)',
                  boxShadow: '0 0 4px rgba(124, 92, 255, 0.5)',
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                aria-hidden
              />
            );
          })}
        </div>
      </div>
    </footer>
  );
}


