import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import Lightbox from '@/components/ui/Lightbox'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { projects } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project } from '@/data/projects'

type FilterCategory = 'all' | 'web' | 'mobile'

export default function Projects() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const getTranslation = (id: number) => {
    const item = t.projects.items.find((i) => i.id === id)
    return { name: item?.name ?? '', description: item?.description ?? '' }
  }

  return (
    <section id="projects" className="py-24 md:py-32 bg-white dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle} />

        {/* Filters */}
        <ScrollReveal className="flex justify-center gap-3 mb-12">
          {t.projects.filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value as FilterCategory)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-primary-50 dark:bg-dark-card text-text-secondary dark:text-text-muted hover:bg-primary-100 dark:hover:bg-dark-card-hover'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const translated = getTranslation(project.id)
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                translatedName={translated.name}
                translatedDescription={translated.description}
              />
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
