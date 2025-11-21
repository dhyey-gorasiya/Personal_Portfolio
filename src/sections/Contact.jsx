import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';
import emailjs from 'emailjs-com';

// Solar System Component with orbiting planets
function SolarSystem() {
  // Sun position (right side, center)
  const sunPosition = { x: '85%', y: '50%' };

  // Planets orbiting around the sun
  const planets = [
    { name: 'Mercury', size: 14, orbitRadius: 100, duration: 10, color: '#8C8C8C', angleOffset: 0, isGaseous: false },
    { name: 'Venus', size: 18, orbitRadius: 140, duration: 15, color: '#FF8C42', angleOffset: 45, isGaseous: false },
    { name: 'Earth', size: 20, orbitRadius: 180, duration: 20, color: '#4A90E2', angleOffset: 90, isGaseous: false },
    { name: 'Mars', size: 16, orbitRadius: 220, duration: 25, color: '#CD5C5C', angleOffset: 135, isGaseous: false },
    { name: 'Jupiter', size: 60, orbitRadius: 300, duration: 40, color: '#D8CA9D', angleOffset: 180, isGaseous: true },
    { name: 'Saturn', size: 50, orbitRadius: 380, duration: 50, color: '#FAD5A5', angleOffset: 225, isGaseous: true, hasRings: true },
    { name: 'Uranus', size: 32, orbitRadius: 450, duration: 60, color: '#4FD0E7', angleOffset: 270, isGaseous: true },
    { name: 'Neptune', size: 30, orbitRadius: 520, duration: 70, color: '#4166F5', angleOffset: 315, isGaseous: true },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Sun - Large glowing circle on the right */}
      <div
        className="absolute"
        style={{
          left: sunPosition.x,
          top: sunPosition.y,
          width: '120px',
          height: '120px',
          marginLeft: '-60px',
          marginTop: '-60px',
          borderRadius: '50%',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Outer glow layers - circular (reduced intensity) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 248, 220, 0.15) 0%, transparent 70%)',
            boxShadow: '0 0 40px rgba(255, 248, 220, 0.3), 0 0 60px rgba(255, 215, 0, 0.2), 0 0 80px rgba(255, 165, 0, 0.15)',
            filter: 'blur(1px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Middle glow layer (reduced) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 60%)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.35), 0 0 50px rgba(255, 165, 0, 0.25)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          aria-hidden="true"
        />

        {/* Sun core */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #FFF8DC, #FFE4B5, #FFD700, #FFA500)',
            boxShadow: 'inset -20px -20px 50px rgba(255, 140, 0, 0.2), 0 0 20px rgba(255, 215, 0, 0.4)',
          }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.85, 0.95, 0.85],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Orbital paths (circular orbits) - visible rings */}
      {planets.map((planet, index) => (
        <div
          key={`orbit-${index}`}
          className="absolute"
          style={{
            left: sunPosition.x,
            top: sunPosition.y,
            width: `${planet.orbitRadius * 2}px`,
            height: `${planet.orbitRadius * 2}px`,
            marginLeft: `-${planet.orbitRadius}px`,
            marginTop: `-${planet.orbitRadius}px`,
            borderRadius: '50%',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            boxShadow: '0 0 2px rgba(148, 163, 184, 0.2)',
          }}
          aria-hidden="true"
        />
      ))}


      {/* Planets orbiting around the sun */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute"
          style={{
            left: sunPosition.x,
            top: sunPosition.y,
            width: `${planet.orbitRadius * 2}px`,
            height: `${planet.orbitRadius * 2}px`,
            marginLeft: `-${planet.orbitRadius}px`,
            marginTop: `-${planet.orbitRadius}px`,
            transformOrigin: 'center center',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            rotate: [planet.angleOffset, planet.angleOffset + 360],
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          {/* Planet positioned at the orbit radius */}
          <div
            className="absolute"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              left: `${planet.orbitRadius - planet.size / 2}px`,
              top: `${-planet.size / 2}px`,
              borderRadius: '50%',
            }}
          >
            {/* Planet body */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  planet.name === 'Mercury'
                    ? `radial-gradient(circle at 30% 30%, #8C7853, #7A6B4F, #5C4E3A),
                       radial-gradient(circle at 20% 20%, rgba(0,0,0,0.4) 2%, transparent 4%),
                       radial-gradient(circle at 60% 50%, rgba(0,0,0,0.3) 1.5%, transparent 3%),
                       radial-gradient(circle at 80% 70%, rgba(0,0,0,0.35) 2%, transparent 4%)`
                    : planet.name === 'Venus'
                      ? `radial-gradient(circle at 30% 30%, #FFC649, #FFB347, #E8A87C),
                       radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.1) 40%, transparent 50%),
                       radial-gradient(circle at 40% 60%, rgba(200,180,160,0.4) 20%, transparent 30%)`
                      : planet.name === 'Earth'
                        ? `radial-gradient(circle at 30% 30%, #4A90E2, #357ABD, #2D5A8A),
                       radial-gradient(circle at 35% 45%, #5A9F5A 12%, #4A8F4A 15%, transparent 20%),
                       radial-gradient(circle at 55% 60%, #5A9F5A 10%, #4A8F4A 12%, transparent 18%),
                       radial-gradient(circle at 65% 35%, #5A9F5A 8%, transparent 12%),
                       radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 10%, rgba(255,255,255,0.2) 15%, transparent 20%),
                       radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 8%, transparent 12%)`
                        : planet.name === 'Mars'
                          ? `radial-gradient(circle at 30% 30%, #CD5C5C, #B84747, #8B2E2E),
                       radial-gradient(circle at 40% 50%, rgba(139,69,19,0.5) 15%, transparent 20%),
                       radial-gradient(circle at 60% 40%, rgba(160,82,45,0.4) 12%, transparent 18%),
                       radial-gradient(circle at 25% 70%, rgba(139,69,19,0.3) 10%, transparent 15%)`
                          : planet.name === 'Jupiter'
                            ? `linear-gradient(0deg, #D8CA9D 0%, #C9A961 12%, #D8CA9D 15%, #D8CA9D 18%, #C9A961 22%, #D8CA9D 25%, #D8CA9D 30%, #C9A961 35%, #D8CA9D 38%, #D8CA9D 42%, #C9A961 45%, #D8CA9D 48%, #D8CA9D 52%, #C9A961 55%, #D8CA9D 58%, #D8CA9D 62%, #C9A961 65%, #D8CA9D 68%, #D8CA9D 72%, #C9A961 75%, #D8CA9D 78%, #D8CA9D 82%, #C9A961 85%, #D8CA9D 88%, #D8CA9D 100%),
                       radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
                       radial-gradient(ellipse at 50% 40%, rgba(139,69,19,0.3) 0%, transparent 50%)`
                            : planet.name === 'Saturn'
                              ? `linear-gradient(0deg, #FAD5A5 0%, #E6C893 10%, #FAD5A5 12%, #FAD5A5 15%, #E6C893 18%, #FAD5A5 20%, #FAD5A5 25%, #E6C893 28%, #FAD5A5 30%, #FAD5A5 35%, #E6C893 38%, #FAD5A5 40%, #FAD5A5 45%, #E6C893 48%, #FAD5A5 50%, #FAD5A5 55%, #E6C893 58%, #FAD5A5 60%, #FAD5A5 65%, #E6C893 68%, #FAD5A5 70%, #FAD5A5 75%, #E6C893 78%, #FAD5A5 80%, #FAD5A5 85%, #E6C893 88%, #FAD5A5 90%, #FAD5A5 100%),
                       radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)`
                              : planet.name === 'Uranus'
                                ? `radial-gradient(circle at 30% 30%, #4FD0E7, #3DB5C9, #2A9BB3),
                       radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 50%),
                       linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 20%, rgba(255,255,255,0.1) 40%, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)`
                                : planet.name === 'Neptune'
                                  ? `radial-gradient(circle at 30% 30%, #4166F5, #2E52E8, #1E3FD6),
                       radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 30%),
                       linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%, rgba(255,255,255,0.08) 100%)`
                                  : `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd, ${planet.color}aa)`,
                boxShadow: `0 0 15px ${planet.color}40, 0 0 30px ${planet.color}20, inset 0 0 20px rgba(0,0,0,0.1)`,
              }}
            >
              {/* Planet rotation - highlight/shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: planet.duration * 0.25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: planet.name === 'Venus' || planet.name === 'Jupiter' || planet.name === 'Saturn'
                    ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 50%)'
                    : planet.name === 'Earth'
                      ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 55%)'
                      : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
                }}
                aria-hidden="true"
              />

              {/* Additional texture layer for rocky planets */}
              {(planet.name === 'Mercury' || planet.name === 'Mars') && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle at 15% 25%, rgba(0,0,0,0.3) 1%, transparent 2%),
                      radial-gradient(circle at 45% 60%, rgba(0,0,0,0.25) 0.8%, transparent 1.8%),
                      radial-gradient(circle at 75% 35%, rgba(0,0,0,0.28) 1.2%, transparent 2.2%),
                      radial-gradient(circle at 30% 75%, rgba(0,0,0,0.2) 0.9%, transparent 1.9%),
                      radial-gradient(circle at 65% 80%, rgba(0,0,0,0.22) 1%, transparent 2%)
                    `,
                  }}
                />
              )}
            </div>

            {/* Rings for Saturn */}
            {planet.hasRings && (
              <div
                className="absolute"
                style={{
                  width: `${planet.size * 1.8}px`,
                  height: `${planet.size * 1.8}px`,
                  left: `${-planet.size * 0.4}px`,
                  top: `${-planet.size * 0.4}px`,
                  borderRadius: '50%',
                  border: '2px solid rgba(245, 222, 179, 0.8)',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  boxShadow: '0 0 10px rgba(245, 222, 179, 0.5), inset 0 0 20px rgba(245, 222, 179, 0.3)',
                }}
              />
            )}
          </div>
        </motion.div>
      ))}

      {/* Starry background - Reduced for performance */}
      {[...Array(25)].map((_, i) => {
        const seed = i * 7 + 13;
        const size = (seed % 3) + 1;
        const left = (seed * 17) % 100;
        const top = (seed * 23) % 100;
        const duration = (seed % 4) + 2;
        const delay = (seed % 3);
        const isBright = (seed % 8) === 0;

        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              background: isBright ? '#FFD700' : '#64748B',
              opacity: isBright ? 0.8 : 0.4,
              boxShadow: isBright
                ? '0 0 4px rgba(255, 215, 0, 0.8)'
                : '0 0 2px rgba(100, 116, 139, 0.6)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            animate={{
              opacity: isBright ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
              scale: [1, isBright ? 1.5 : 1.2, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [toast, setToast] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const onSubmit = async (data) => {
    setToast(null);
    try {
      // Replace these with your values from EmailJS
      const SERVICE_ID = "service_ma8h1nl";
      const TEMPLATE_ID = "template_b3di1qm";
      const PUBLIC_KEY = "pzLyQrGRLccUQK4Ti";

      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      reset();
      setToast('Thanks! I will get back to you soon.');
    } catch (error) {
      setToast('Oops! There was an error. Please try again.');
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <section id="contact" aria-label="Contact" className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Animated background */}
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

      {/* Solar System Background */}
      <SolarSystem />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl font-heading font-semibold text-slate-900 dark:text-text mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 0.95, 0.36, 1] }}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-slate-700 dark:text-muted mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.95, 0.36, 1] }}
            >
              Have a project in mind? Let's work together to bring your ideas to life.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-text mb-2">
                  Name
                </label>
                <motion.input
                  id="name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 w-full rounded-lg bg-white/80 dark:bg-surface/80 backdrop-blur-sm border-2 transition-all duration-300 ${errors.name
                    ? 'border-red-400 focus:border-red-500'
                    : focusedField === 'name'
                      ? 'border-accent shadow-glow'
                      : 'border-slate-200 dark:border-white/10 focus:border-accent'
                    } px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 text-slate-900 dark:text-text placeholder:text-slate-400 dark:placeholder:text-muted`}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  {...register('name', { required: 'Name is required' })}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-300"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-text mb-2">
                  Email
                </label>
                <motion.input
                  id="email"
                  type="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 w-full rounded-lg bg-white/80 dark:bg-surface/80 backdrop-blur-sm border-2 transition-all duration-300 ${errors.email
                    ? 'border-red-400 focus:border-red-500'
                    : focusedField === 'email'
                      ? 'border-accent shadow-glow'
                      : 'border-slate-200 dark:border-white/10 focus:border-accent'
                    } px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 text-slate-900 dark:text-text placeholder:text-slate-400 dark:placeholder:text-muted`}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /.+@.+\..+/, message: 'Enter a valid email' },
                  })}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-300"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeUp}>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-text mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={5}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 w-full rounded-lg bg-white/80 dark:bg-surface/80 backdrop-blur-sm border-2 transition-all duration-300 resize-none ${errors.message
                    ? 'border-red-400 focus:border-red-500'
                    : focusedField === 'message'
                      ? 'border-accent shadow-glow'
                      : 'border-slate-200 dark:border-white/10 focus:border-accent'
                    } px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 text-slate-900 dark:text-text placeholder:text-slate-400 dark:placeholder:text-muted`}
                  placeholder="Tell me about your project"
                  aria-invalid={!!errors.message}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'At least 10 characters' },
                  })}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-300"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full rounded-lg px-6 py-4 bg-accent text-white dark:text-background font-semibold overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white dark:border-background border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
              </motion.div>
            </motion.form>
          </div>

          {/* Right side - Visual element (hidden on mobile, shown on desktop) */}
          <div className="hidden lg:block relative h-full min-h-[500px]">
            {/* Additional decorative elements can go here */}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 inset-x-0 z-50 mx-auto w-fit rounded-lg bg-white dark:bg-surface border-2 border-accent/30 px-6 py-4 shadow-glow backdrop-blur-sm"
          >
            <motion.p
              className="text-sm font-medium text-slate-900 dark:text-text flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-accent">✓</span>
              {toast}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
