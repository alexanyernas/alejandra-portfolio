import { CheckCircle2, Award, GraduationCap } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillBar from '@/components/ui/SkillBar'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { technicalSkills } from '@/data/skills'
import { useLanguage } from '@/contexts/LanguageContext'
import profileImg from '@/assets/me.webp'

export default function About() {
  const { t } = useLanguage()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal({ rootMargin: '-50px 0px' })
  const { ref: softRef, isVisible: softVisible } = useScrollReveal({ rootMargin: '-50px 0px' })

  const stats = [
    { icon: Award, number: t.about.stats.years, label: t.about.stats.yearsLabel },
    { icon: GraduationCap, number: t.about.stats.projects, label: t.about.stats.projectsLabel },
    { icon: CheckCircle2, number: t.about.stats.tools, label: t.about.stats.toolsLabel },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading label={t.about.label} title={t.about.title} />

        {/* Bio */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 dark:shadow-primary/5">
                <img src={profileImg} alt="Alejandra Giannattasio" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/20 rounded-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-6">
                {t.about.bio[0].split('.')[0]}.
                <span className="gradient-text"> {t.about.bio[0].split('.').slice(1).join('.').trim()}</span>
              </h3>

              <div className="space-y-4 text-text-secondary dark:text-text-muted leading-relaxed text-base">
                <p>{t.about.bio[1]}</p>
              </div>

              <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`reveal reveal-up ${statsVisible ? 'visible' : ''} text-center p-4 rounded-2xl bg-primary-50/50 dark:bg-dark-card border border-primary/5 dark:border-dark-border`}
                    style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold gradient-text">{stat.number}</p>
                    <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills */}
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">&#128736;&#65039;</span>
                </div>
                {t.about.technicalTitle}
              </h3>
              <div className="space-y-5">
                {technicalSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">&#128161;</span>
                </div>
                {t.about.softTitle}
              </h3>
              <div ref={softRef} className="grid grid-cols-1 gap-3">
                {t.about.softSkills.map((skill, i) => (
                  <div
                    key={skill}
                    className={`reveal reveal-scale ${softVisible ? 'visible' : ''} group flex items-center gap-3 p-4 rounded-xl bg-primary-50/50 dark:bg-dark-card border border-primary/5 dark:border-dark-border hover:border-primary/20 dark:hover:border-primary/30 hover:bg-primary-50 dark:hover:bg-dark-card-hover transition-all duration-300`}
                    style={{ transitionDelay: `${Math.min(i * 0.05, 0.3)}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-text-primary dark:text-white">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
