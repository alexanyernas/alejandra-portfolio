import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { es } from '@/i18n/es'
import { en } from '@/i18n/en'
import type { Translations } from '@/i18n/types'

export type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: Translations
}

const translations: Record<Language, Translations> = { es, en }

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language | null
    return stored ?? 'es'
  })

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'es' ? 'en' : 'es'
      localStorage.setItem('language', next)
      document.documentElement.lang = next
      return next
    })
  }, [])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
