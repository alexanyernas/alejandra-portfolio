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

const PAGE_SIZE = 6

export default function Projects() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

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
              onClick={() => handleFilterChange(filter.value as FilterCategory)}
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
          {paginatedProjects.map((project, index) => {
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer bg-primary-50 dark:bg-dark-card text-text-secondary dark:text-text-muted hover:bg-primary-100 dark:hover:bg-dark-card-hover disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer ${
                  currentPage === page
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-primary-50 dark:bg-dark-card text-text-secondary dark:text-text-muted hover:bg-primary-100 dark:hover:bg-dark-card-hover'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer bg-primary-50 dark:bg-dark-card text-text-secondary dark:text-text-muted hover:bg-primary-100 dark:hover:bg-dark-card-hover disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
