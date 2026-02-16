import { Briefcase, MapPin } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-24 md:py-32 bg-surface dark:bg-dark-card/30 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionHeading label={t.experience.label} title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent md:-translate-x-px" />

          {t.experience.jobs.map((exp, index) => (
            <ScrollReveal
              key={`${exp.company}-${exp.period}`}
              delay={Math.min(index * 0.08, 0.3)}
              className={`relative flex items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-3 h-3 rounded-full border-4 ${
                  exp.current
                    ? 'bg-primary border-primary-100 dark:border-primary-900 shadow-lg shadow-primary/30'
                    : 'bg-white dark:bg-dark-card border-primary/30'
                }`} />
              </div>

              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm dark:shadow-none border border-primary/5 dark:border-dark-border hover:shadow-md dark:hover:border-primary/15 transition-all duration-300 group">
                  <div className={`flex items-center gap-2 mb-3 ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      exp.current
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 dark:bg-dark-border text-text-muted'
                    }`}>
                      {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary dark:text-white mb-1 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>

                  <div className={`flex items-center gap-1.5 mb-4 text-primary ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium">{exp.company}</span>
                  </div>

                  <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    {exp.responsibilities.map((resp) => (
                      <li
                        key={resp}
                        className={`flex items-start gap-2 text-sm text-text-secondary dark:text-text-muted ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5 text-primary/40 mt-1 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
