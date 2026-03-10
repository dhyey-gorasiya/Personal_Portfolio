import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/motion';
import emailjs from 'emailjs-com';

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
                  className={`mt-2 w-full rounded-lg bg-white dark:bg-surface border-2 transition-all duration-300 ${errors.name
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
                  className={`mt-2 w-full rounded-lg bg-white dark:bg-surface border-2 transition-all duration-300 ${errors.email
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
                  className={`mt-2 w-full rounded-lg bg-white dark:bg-surface border-2 transition-all duration-300 resize-none ${errors.message
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
            className="fixed bottom-6 inset-x-0 z-50 mx-auto w-fit rounded-lg bg-white dark:bg-surface border-2 border-accent/30 px-6 py-4 shadow-glow"
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
