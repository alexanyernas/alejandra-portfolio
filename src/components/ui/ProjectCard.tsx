import { Eye } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
  translatedName: string
  translatedDescription: string
}

export default function ProjectCard({ project, index, onClick, translatedName, translatedDescription }: ProjectCardProps) {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '-30px 0px' })
  const delay = Math.min(index * 0.06, 0.36)

  return (
    <div
      ref={ref}
      className={`reveal reveal-up ${isVisible ? 'visible' : ''} group cursor-pointer`}
      style={{ transitionDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-primary-50 dark:bg-dark-card aspect-[4/3] shadow-sm dark:shadow-none dark:border dark:border-dark-border">
        <img
          src={`/projects/${project.folder}/1.webp`}
          alt={translatedName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full mb-3 backdrop-blur-sm">
              {project.category === 'web' ? 'Web' : 'Mobile'}
            </span>
            <h3 className="text-white font-bold text-lg mb-1">{translatedName}</h3>
            <p className="text-white/70 text-sm">{translatedDescription}</p>
          </div>

          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <Eye className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
