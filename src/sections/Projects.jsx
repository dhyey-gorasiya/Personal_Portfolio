import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import data from '../data/projects.json';
import { fadeUp, staggerContainer } from '../utils/motion';
import ProjectModal from '../components/ProjectModal';

const ALL = 'All';

export default function Projects() {
  const tags = useMemo(() => [ALL, ...Array.from(new Set(data.flatMap((p) => p.tags)))], []);
  const [filter, setFilter] = useState(ALL);
  const [selectedProject, setSelectedProject] = useState(null);
  const filtered = useMemo(() => (filter === ALL ? data : data.filter((p) => p.tags.includes(filter))), [filter]);

  return (
    <section id="projects" aria-label="Projects" className="relative py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-heading font-semibold">Featured Projects</h2>
          {/* <div role="tablist" aria-label="Project filters" className="hidden sm:flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={filter === t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${filter === t ? 'bg-accent text-background border-transparent' : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-muted border-slate-200 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10'
                  }`}
              >
                {t}
              </button>
            ))}
          </div> */}
        </div>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group rounded-xl bg-white/60 dark:bg-surface/60 border border-slate-200 dark:border-white/5 overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(p)}
            >
              <div className="relative">
                <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-background/70 to-transparent" aria-hidden />
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
                  <a
                    href={p.links.demo}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-accent hover:underline"
                  >
                    Demo
                  </a>
                  <a
                    href={p.links.code}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-secondary hover:underline"
                  >
                    Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}


