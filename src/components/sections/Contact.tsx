import { MessageCircle, Mail, Linkedin, Github, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'

const contactData = [
  {
    detail: '+58 412 013 7644',
    icon: MessageCircle,
    url: 'https://wa.me/+584120137644',
    gradient: 'from-[#25D366] to-[#128C7E]',
  },
  {
    detail: 'alegiannattasioxd@gmail.com',
    icon: Mail,
    url: 'mailto:alegiannattasioxd@gmail.com',
    gradient: 'from-[#EA4335] to-[#D44638]',
  },
  {
    detail: 'alegiannattasio',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/alegiannattasio/',
    gradient: 'from-[#0077B5] to-[#00A0DC]',
  },
  {
    detail: 'alegiannattasio',
    icon: Github,
    url: 'https://github.com/alegiannattasio',
    gradient: 'from-[#333] to-[#6e5494]',
  },
]

export default function Contact() {
  const { t } = useLanguage()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ rootMargin: '-50px 0px' })

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface dark:bg-dark-card/30 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionHeading label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle} />

        <ScrollReveal className="text-center mb-16">
          <p className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary dark:text-white">
            {t.contact.cta}
            <span className="gradient-text">{t.contact.ctaHighlight}</span>
          </p>
        </ScrollReveal>

        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
          {contactData.map((method, i) => {
            const translated = t.contact.methods[i]
            return (
              <a
                key={method.url}
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal reveal-up ${cardsVisible ? 'visible' : ''} group relative bg-white dark:bg-dark-card rounded-2xl p-6 border border-primary/5 dark:border-dark-border hover:border-primary/15 dark:hover:border-primary/20 shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex items-center gap-5`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">
                      {translated.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-text-muted">{translated.description}</p>
                  <p className="text-sm text-text-secondary dark:text-text-muted font-medium truncate mt-0.5">{method.detail}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
