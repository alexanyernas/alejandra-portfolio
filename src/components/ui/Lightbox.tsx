import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/data/projects'

interface LightboxProps {
  project: Project | null
  onClose: () => void
}

const ZOOM_FACTOR = 3
const ZOOM_PANEL_SIZE = 280

interface ZoomState {
  x: number   // 0–1 fraction of image width
  y: number   // 0–1 fraction of image height
  imgW: number
  imgH: number
}

export default function Lightbox({ project, onClose }: LightboxProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [zoom, setZoom] = useState<ZoomState | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setCurrentImage(0)
    setZoom(null)
  }, [project])

  useEffect(() => {
    setZoom(null)
  }, [currentImage])

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setZoom({ x, y, imgW: rect.width, imgH: rect.height })
  }

  // Lens dimensions (the area on the image that maps to the zoom panel)
  const lensW = zoom ? zoom.imgW / ZOOM_FACTOR : 0
  const lensH = zoom ? zoom.imgH / ZOOM_FACTOR : 0
  const lensLeft = zoom ? Math.max(0, Math.min(zoom.imgW - lensW, zoom.x * zoom.imgW - lensW / 2)) : 0
  const lensTop  = zoom ? Math.max(0, Math.min(zoom.imgH - lensH, zoom.y * zoom.imgH - lensH / 2)) : 0

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
          <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoom(null)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                ref={imgRef}
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

            {/* Lens indicator */}
            {zoom && (
              <div
                className="absolute pointer-events-none border-2 border-white/80 bg-white/10 backdrop-blur-[1px]"
                style={{
                  left: lensLeft,
                  top: lensTop,
                  width: lensW,
                  height: lensH,
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Zoom panel */}
        {zoom && (
          <div
            className="hidden lg:block absolute bottom-16 right-6 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden pointer-events-none"
            style={{
              width: ZOOM_PANEL_SIZE,
              height: ZOOM_PANEL_SIZE,
              backgroundImage: `url(/projects/${project.folder}/${currentImage + 1}.webp)`,
              backgroundSize: `${ZOOM_FACTOR * 100}%`,
              backgroundPosition: `${zoom.x * 100}% ${zoom.y * 100}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

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
