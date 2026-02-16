export interface Experience {
  title: string
  company: string
  period: string
  current: boolean
  responsibilities: string[]
}

export const experiences: Experience[] = [
  {
    title: 'Líder de Marketing & Diseñadora UI/UX',
    company: 'PAiCore Technologies',
    period: '2022 - Actualidad',
    current: true,
    responsibilities: [
      'Mantenimiento de página web y redes sociales',
      'Creación de contenido gráfico comercial',
      'Diseños UI/UX para proyectos internos y externos',
    ],
  },
  {
    title: 'Cofundadora & Diseñadora UI/UX',
    company: 'Punicorp',
    period: '2021 - 2023',
    current: false,
    responsibilities: [
      'Mantenimiento web y gestión de redes sociales',
      'Creación de banners y contenido visual',
      'Diseño de interfaces de usuario',
    ],
  },
  {
    title: 'Cofundadora',
    company: 'EDUCA2',
    period: '2018 - 2021',
    current: false,
    responsibilities: [
      'Diseño de contenido educativo digital',
      'Dictado de cursos y talleres',
      'Mantenimiento web y branding',
    ],
  },
  {
    title: 'Preparadora Universitaria',
    company: 'Universidad Central de Venezuela',
    period: '2019 - Actualidad',
    current: true,
    responsibilities: [
      'Introducción a la Informática',
      'Interacción Humano-Computador',
      'Tópicos Avanzados de IHC',
    ],
  },
  {
    title: 'Marketing Digital & Ventas',
    company: 'Mipto Tech',
    period: '2019',
    current: false,
    responsibilities: [
      'Estrategia de marketing digital',
      'Gestión de plataformas freelance',
      'Captación de clientes',
    ],
  },
]
