import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '-50px 0px' })
  const dirClass = direction !== 'none' ? `reveal-${direction}` : ''

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
