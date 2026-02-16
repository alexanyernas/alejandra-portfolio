import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Moon, Sun, Languages } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

const socialLinks = [
  { icon: Github, href: 'https://github.com/alegiannattasio', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/alegiannattasio/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:alegiannattasioxd@gmail.com', label: 'Email' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = ['home', 'about', 'experience', 'projects', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,backdrop-filter,box-shadow] duration-200 ease-out ${
          isScrolled
            ? 'py-3 glass shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="relative"
          >
            <span className="text-xl font-serif font-bold gradient-text">AG</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-text-secondary dark:text-text-muted hover:text-text-primary dark:hover:text-white'
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-1">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              aria-label="Toggle language"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <div className="relative">
                <Languages className="w-4 h-4" />
                <span className="absolute -top-1 -right-2 text-[8px] font-bold text-primary">
                  {language === 'es' ? 'EN' : 'ES'}
                </span>
              </div>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-primary/10 mx-1" />

            {/* Social */}
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:bg-primary/10 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <div className="relative">
                <Languages className="w-4 h-4" />
                <span className="absolute -top-1 -right-2 text-[8px] font-bold text-primary">
                  {language === 'es' ? 'EN' : 'ES'}
                </span>
              </div>
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:bg-primary/10 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-primary dark:text-white hover:bg-primary/10 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-dark-card shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-primary/5 dark:border-dark-border">
                <span className="text-xl font-serif font-bold gradient-text">AG</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-text-primary dark:text-white" />
                </button>
              </div>

              <div className="flex-1 py-6 px-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 mb-1 cursor-pointer ${
                      activeSection === link.href.slice(1)
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary dark:text-text-muted hover:bg-primary/5 dark:hover:bg-primary/10'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="p-6 border-t border-primary/5 dark:border-dark-border flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
