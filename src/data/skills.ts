export interface TechnicalSkill {
  name: string
  icon: string
  level: number
}

export const technicalSkills: TechnicalSkill[] = [
  { name: 'Figma', icon: '/skills/figma.svg', level: 95 },
  { name: 'Adobe XD', icon: '/skills/xd.svg', level: 100 },
  { name: 'Sketch', icon: '/skills/sketch.svg', level: 75 },
  { name: 'Illustrator', icon: '/skills/illustrator.svg', level: 100 },
  { name: 'Photoshop', icon: '/skills/photoshop.svg', level: 75 },
  { name: 'Canva', icon: '/skills/canva.svg', level: 100 },
  { name: 'WordPress', icon: '/skills/wordpress.svg', level: 90 },
  { name: 'Jira', icon: '/skills/jira.svg', level: 100 },
  { name: 'Trello', icon: '/skills/trello.svg', level: 100 },
]

export const softSkills: string[] = [
  'Creatividad',
  'Liderazgo',
  'Trabajo en equipo',
  'Resolución de problemas',
  'Metodologías ágiles',
  'Comunicación efectiva',
  'Redacción',
  'Tolerancia al estrés',
]
