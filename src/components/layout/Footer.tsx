import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ui/ScrollReveal'

const socialLinks = [
  { icon: Github, href: 'https://github.com/alegiannattasio', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/alegiannattasio/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:alegiannattasioxd@gmail.com', label: 'Email' },
]

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-dark dark:bg-dark-bg text-white py-12 border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-serif font-bold gradient-text">Alejandra Giannattasio</h3>
            <p className="text-white/50 text-sm mt-1">{t.footer.role}</p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-white/40 text-sm flex items-center gap-1.5">
            &copy; {currentYear} &middot; {t.footer.madeWith} <Heart className="w-3.5 h-3.5 text-primary inline fill-primary" />
          </p>
        </ScrollReveal>
      </div>
    </footer>
  )
}
