import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Link, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const CV_PATH = '/cv/CV_Alejandra_Giannattasio.pdf'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${CV_PATH}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-dark-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-dark-border flex-shrink-0">
              <p className="font-semibold text-text-primary dark:text-white text-sm">
                CV — Alejandra Giannattasio
              </p>

              <div className="flex items-center gap-2">
                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-dark-border text-text-secondary dark:text-text-muted hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {t.hero.copied}
                    </>
                  ) : (
                    <>
                      <Link className="w-3.5 h-3.5" />
                      {t.hero.copyLink}
                    </>
                  )}
                </button>

                {/* Download */}
                <a
                  href={CV_PATH}
                  download="CV_Alejandra_Giannattasio.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white hover:bg-primary-dark transition-all duration-200 shadow-sm shadow-primary/25"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.hero.downloadCV}
                </a>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary dark:text-text-muted hover:bg-gray-100 dark:hover:bg-dark-card-hover transition-colors cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <iframe
              src={CV_PATH}
              title="CV Alejandra Giannattasio"
              className="w-full flex-1"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
