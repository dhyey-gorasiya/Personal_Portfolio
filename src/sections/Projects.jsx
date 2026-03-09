import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import data from '../data/projects.json';
import ProjectModal from '../components/ProjectModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const updateCardsPerView = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1024) setCardsPerView(3);
    else if (w >= 640) setCardsPerView(2);
    else setCardsPerView(1);
  }, []);

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [updateCardsPerView]);

  const maxIndex = Math.max(0, data.length - cardsPerView);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Each card is (100 / data.length)% of track; moving by 1 card = translateX(-100/data.length %)
  const translatePercent = (index / data.length) * 100;

  return (
    <section id="projects" aria-label="Projects" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-heading font-semibold text-slate-900 dark:text-text">Featured Projects</h2>

        <div className="mt-8 flex items-stretch gap-4">
          {/* Previous - left side */}
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous project"
            className="flex-shrink-0 self-center p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-surface/80 text-slate-700 dark:text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent hover:text-white hover:border-accent transition-colors shadow-md -translate-y-2"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel viewport */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <motion.div
              className="flex"
              style={{
                width: `${(data.length / cardsPerView) * 100}%`,
              }}
              animate={{ x: `-${translatePercent}%` }}
              transition={{ duration: 0.4, ease: [0.22, 0.95, 0.36, 1] }}
            >
              {data.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / data.length}%` }}
                >
                  <motion.article
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group h-full rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(p)}
                  >
                    <div className="relative">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white/90 dark:from-background/70 to-transparent" aria-hidden />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" aria-hidden>
                        <span className="text-white font-medium text-sm bg-accent/80 backdrop-blur-sm px-4 py-2 rounded-md">
                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-slate-900 dark:text-text">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-700 dark:text-muted line-clamp-2">{p.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-slate-600 dark:text-muted">{t}</span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        {String(p.links.demo).toUpperCase() !== 'NA' && (
                          <a
                            href={p.links.demo}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-accent hover:underline"
                          >
                            Demo
                          </a>
                        )}
                        {String(p.links.code).toUpperCase() !== 'NA' && (
                          <a
                            href={p.links.code}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-secondary hover:underline"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next - right side */}
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next project"
            className="flex-shrink-0 self-center p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-surface/80 text-slate-700 dark:text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent hover:text-white hover:border-accent transition-colors shadow-md -translate-y-2"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2 flex-wrap" role="tablist" aria-label="Project position">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Go to position ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                index === i
                  ? 'w-6 bg-accent'
                  : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
