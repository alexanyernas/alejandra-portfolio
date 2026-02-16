import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/data/projects'

interface LightboxProps {
  project: Project | null
  onClose: () => void
}

export default function Lightbox({ project, onClose }: LightboxProps) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setCurrentImage(0)
  }, [project])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrentImage((p) => (p > 0 ? p - 1 : project.imagesCount - 1))
      if (e.key === 'ArrowRight') setCurrentImage((p) => (p < project.imagesCount - 1 ? p + 1 : 0))
    },
    [project, onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Project info */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <h3 className="text-white font-bold text-lg md:text-xl">{project.name}</h3>
          <p className="text-white/60 text-sm">
            {currentImage + 1} / {project.imagesCount}
          </p>
        </div>

        {/* Image container */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={`/projects/${project.folder}/${currentImage + 1}.webp`}
              alt={`${project.name} - Imagen ${currentImage + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        {project.imagesCount > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImage((p) => (p > 0 ? p - 1 : project.imagesCount - 1))
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImage((p) => (p < project.imagesCount - 1 ? p + 1 : 0))
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots */}
        {project.imagesCount > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: project.imagesCount }).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImage(i)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentImage ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
