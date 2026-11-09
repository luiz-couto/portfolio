import { useEffect, useState, type ReactNode } from 'react'
import {
  LANGUAGE_STORAGE_KEY,
  LanguageContext,
  type Language,
} from './LanguageContext'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'pt-BR'
      ? 'pt-BR'
      : 'en'
  })

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
