import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useLanguage } from '@/contexts/LanguageContext'
import profileImg from '@/assets/me.webp'

export default function Hero() {
  const { t } = useLanguage()
  const typedText = useTypewriter(t.hero.roles, 80, 40, 2500)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100/50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card/50 transition-colors duration-300"
    >
      {/* Background orbs - pure CSS for GPU acceleration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-primary-light/20 to-primary/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-1/4 left-[10%] w-16 h-16 border-2 border-primary/10 dark:border-primary/20 rounded-xl animate-float-shape-1" />
        <div className="absolute top-1/3 right-[15%] w-10 h-10 bg-primary/5 dark:bg-primary/10 rounded-full animate-float-shape-2" />
        <div className="absolute bottom-1/4 right-[10%] w-20 h-20 border-2 border-primary-light/10 dark:border-primary-light/20 rounded-full animate-float-shape-3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.hero.available}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
            >
              <span className="text-text-primary dark:text-white">{t.hero.greeting}</span>
              <br />
              <span className="gradient-text">Alejandra</span>
              <br />
              <span className="gradient-text">Giannattasio</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-10 mb-6"
            >
              <span className="text-xl md:text-2xl text-text-secondary dark:text-text-muted font-light">
                {typedText}
                <span className="cursor-blink text-primary font-light">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-text-secondary dark:text-text-muted text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer"
              >
                {t.hero.viewProjects}
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 border-2 border-primary/20 hover:border-primary text-text-primary dark:text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {t.hero.contact}
              </button>
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8c52ff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#c874ff" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#8c52ff" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <circle cx="150" cy="150" r="145" fill="none" stroke="url(#ring-gradient)" strokeWidth="2" strokeDasharray="20 10" />
                </svg>
              </div>

              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden animate-pulse-glow p-1 bg-gradient-to-br from-primary via-primary-light to-primary">
                <img src={profileImg} alt="Alejandra Giannattasio" className="w-full h-full object-cover rounded-full" />
              </div>

              <div className="absolute -right-4 top-8 glass rounded-2xl px-4 py-3 shadow-lg animate-badge-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">&#10024;</span>
                  <div>
                    <p className="text-xs font-bold text-text-primary dark:text-white">{t.hero.yearsExp}</p>
                    <p className="text-[10px] text-text-muted">{t.hero.ofExperience}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-12 glass rounded-2xl px-4 py-3 shadow-lg animate-badge-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">&#127891;</span>
                  <div>
                    <p className="text-xs font-bold text-text-primary dark:text-white">{t.hero.teacher}</p>
                    <p className="text-[10px] text-text-muted">{t.hero.university}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-2 text-text-muted cursor-pointer animate-bounce-scroll"
          onClick={() => scrollTo('about')}
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  )
}
