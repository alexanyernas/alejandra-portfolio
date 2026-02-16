import AnimatedText from './AnimatedText'
import ScrollReveal from './ScrollReveal'

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal className="text-center mb-16 md:mb-20">
      <span className="inline-block text-primary font-semibold text-sm tracking-[3px] uppercase mb-4">
        {label}
      </span>

      <AnimatedText
        text={title}
        tag="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary dark:text-white"
      />

      {subtitle && (
        <p className="mt-4 text-text-secondary dark:text-text-muted text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full" />
    </ScrollReveal>
  )
}
