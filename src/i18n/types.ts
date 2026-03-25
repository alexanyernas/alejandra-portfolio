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
    viewCV: string
    downloadCV: string
    copyLink: string
    copied: string
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
    featuredLabel: string
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
    form: {
      title: string
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      subject: string
      subjectPlaceholder: string
      subjectOptions: { label: string; value: string }[]
      message: string
      messagePlaceholder: string
      send: string
      sending: string
      success: string
      successDetail: string
      error: string
      errorDetail: string
      retry: string
      errors: {
        nameRequired: string
        nameMin: string
        emailRequired: string
        emailInvalid: string
        subjectRequired: string
        messageRequired: string
        messageMin: string
      }
    }
  }
  footer: {
    role: string
    madeWith: string
  }
}
