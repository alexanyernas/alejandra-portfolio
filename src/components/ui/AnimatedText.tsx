interface AnimatedTextProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  className = '',
  tag = 'h2',
}: AnimatedTextProps) {
  const Tag = tag
  return <Tag className={className}>{text}</Tag>
}
