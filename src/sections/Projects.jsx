import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import data from '../data/projects.json';
import ProjectModal from '../components/ProjectModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SWIPE_THRESHOLD = 50;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const swipeStart = useRef({ x: 0, y: 0 });
  const justSwiped = useRef(false);
  const mouseDownOnCarousel = useRef(false);

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

  const handleSwipeEnd = useCallback(
    (endX) => {
      const dx = swipeStart.current.x - endX;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx > 0) {
        justSwiped.current = true;
        goNext();
      } else {
        justSwiped.current = true;
        goPrev();
      }
    },
    [maxIndex, index]
  );

  const touchStart = (e) => {
    swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const touchEnd = (e) => {
    if (!e.changedTouches[0]) return;
    handleSwipeEnd(e.changedTouches[0].clientX);
  };
  const mouseDown = (e) => {
    mouseDownOnCarousel.current = true;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const mouseUp = (e) => {
    if (mouseDownOnCarousel.current) {
      handleSwipeEnd(e.clientX);
      mouseDownOnCarousel.current = false;
    }
  };
  const onCardClick = (p) => {
    if (justSwiped.current) {
      justSwiped.current = false;
      return;
    }
    setSelectedProject(p);
  };

  // Each card is (100 / data.length)% of track; moving by 1 card = translateX(-100/data.length %)
  const translatePercent = (index / data.length) * 100;

  const navButtonClass =
    'p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-surface text-slate-700 dark:text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent hover:text-white hover:border-accent transition-colors shadow-md';

  return (
    <section id="projects" aria-label="Projects" className="relative py-14 sm:py-15 md:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-heading font-semibold text-slate-900 dark:text-text">
          Featured Projects
          <span className="ml-2 text-lg font-normal border border-slate-200 dark:border-white/10 rounded-md px-2 py-0.5 text-slate-500 dark:text-muted ">{data.length}</span>
        </h2>

        <div className="mt-8 flex items-stretch gap-4">
          {/* Previous - left side (hidden on mobile) */}
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous project"
            className={`flex-shrink-0 self-center ${navButtonClass} -translate-y-2 hidden sm:flex`}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel viewport - touch/mouse swipe */}
          <div
            className="flex-1 min-w-0 overflow-hidden touch-pan-y select-none"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseLeave={() => { mouseDownOnCarousel.current = false; }}
          >
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
                    className="group h-full rounded-xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer"
                    onClick={() => onCardClick(p)}
                  >
                    <div className="relative">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white/90 dark:from-background/70 to-transparent" aria-hidden />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" aria-hidden>
                        <span className="text-white font-medium text-sm bg-accent px-4 py-2 rounded-md">
                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-slate-900 dark:text-text">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-700 dark:text-muted line-clamp-2">{p.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs rounded bg-slate-100 dark:bg-white/10 px-2 py-1 text-slate-600 dark:text-muted">{t}</span>
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

          {/* Next - right side (hidden on mobile) */}
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next project"
            className={`flex-shrink-0 self-center ${navButtonClass} -translate-y-2 hidden sm:flex`}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile: Prev + Dots + Next | Desktop: Dots only */}
        <div className="mt-6 flex justify-center items-center gap-3 sm:gap-2 flex-wrap" role="tablist" aria-label="Project position">
          {/* Mobile-only Prev (left of dots) */}
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous project"
            className={`${navButtonClass} sm:hidden`}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          {/* Dot indicators */}
          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  index === i ? 'w-6 bg-accent' : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/30'
                }`}
              />
            ))}
          </div>
          {/* Mobile-only Next (right of dots) */}
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next project"
            className={`${navButtonClass} sm:hidden`}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
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
