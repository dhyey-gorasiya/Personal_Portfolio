import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleArrowKeys = (e) => {
      if (!project?.images) return;
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleArrowKeys);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, project, onClose]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 dark:bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.95, 0.36, 1] }}
            className="fixed inset-2 sm:inset-4 md:inset-6 z-50 overflow-hidden max-w-6xl mx-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="h-full w-full bg-white dark:bg-surface rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200 dark:border-white/10">
                <h2 id="modal-title" className="text-lg sm:text-xl font-heading font-semibold text-slate-900 dark:text-text">
                  {project.title}
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

              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* Image Gallery */}
                {project.images && project.images.length > 0 && (
                  <div className="relative bg-slate-50 dark:bg-slate-900/20">
                    <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={project.images[currentImageIndex]}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="max-w-full max-h-full object-contain"
                        />
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/80 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
                            aria-label="Previous image"
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/80 dark:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
                            aria-label="Next image"
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}

                      {/* Image Indicators */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-2 rounded-full transition-all ${index === currentImageIndex
                                ? 'w-8 bg-white dark:bg-white'
                                : 'w-2 bg-white/70 dark:bg-white/50 hover:bg-white/90 dark:hover:bg-white/75'
                                }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Strip */}
                    {project.images.length > 1 && (
                      <div className="p-4 flex gap-2 overflow-x-auto">
                        {project.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                              ? 'border-accent ring-2 ring-accent/20'
                              : 'border-transparent hover:border-slate-300 dark:hover:border-white/20'
                              }`}
                            aria-label={`View image ${index + 1}`}
                          >
                            <img
                              src={img}
                              alt={`${project.title} thumbnail ${index + 1}`}
                              className="w-20 h-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Project Details */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-text mb-2">About This Project</h3>
                    <p className="text-slate-700 dark:text-muted leading-relaxed">{project.description}</p>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-text mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-muted">
                            <span className="text-accent mt-1 flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-text mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm rounded-md bg-accent/10 dark:bg-accent/20 text-accent px-3 py-1.5 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-background bg-accent hover:shadow-glow transition-all duration-200 ease-smooth"
                    >
                      View Demo
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-text bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-all duration-200 ease-smooth"
                    >
                      View Code
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

