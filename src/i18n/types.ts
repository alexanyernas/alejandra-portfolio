export interface Translations {
  nav: {
    home: string
    about: string
    experience: string
    projects: string
    contact: string
  }
  hero: {
    available: string
    greeting: string
    roles: string[]
    description: string
    viewProjects: string
    contact: string
    scroll: string
    yearsExp: string
    ofExperience: string
    teacher: string
    university: string
  }
  about: {
    label: string
    title: string
    subtitle: string
    bio: string[]
    stats: {
      years: string
      yearsLabel: string
      projects: string
      projectsLabel: string
      tools: string
      toolsLabel: string
    }
    technicalTitle: string
    softTitle: string
    softSkills: string[]
  }
  experience: {
    label: string
    title: string
    subtitle: string
    jobs: {
      title: string
      company: string
      period: string
      current: boolean
      responsibilities: string[]
    }[]
  }
  projects: {
    label: string
    title: string
    subtitle: string
    filters: { label: string; value: string }[]
    items: { id: number; name: string; description: string }[]
  }
  contact: {
    label: string
    title: string
    subtitle: string
    cta: string
    ctaHighlight: string
    methods: {
      name: string
      description: string
    }[]
  }
  footer: {
    role: string
    madeWith: string
  }
}
