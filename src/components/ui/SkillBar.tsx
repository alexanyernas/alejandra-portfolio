import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { TechnicalSkill } from '@/data/skills'

interface SkillBarProps {
  skill: TechnicalSkill
  index: number
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  const { ref, isVisible } = useScrollReveal()
  const delay = Math.min(index * 0.06, 0.4)

  return (
    <div
      ref={ref}
      className={`reveal reveal-up ${isVisible ? 'visible' : ''} group`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
          <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
        </div>
        <span className="font-medium text-text-primary dark:text-white text-sm">{skill.name}</span>
        <span className="ml-auto text-xs text-text-muted font-medium">{skill.level}%</span>
      </div>
      <div className="h-2 bg-primary-50 dark:bg-primary-900/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${0.2 + delay}s`,
          }}
        />
      </div>
    </div>
  )
}
