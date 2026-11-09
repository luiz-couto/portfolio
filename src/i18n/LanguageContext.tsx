import { createContext, useContext } from 'react'
import en from '../content/i18n/en.json'
import ptBR from '../content/i18n/pt-BR.json'

export const translations = { en, 'pt-BR': ptBR } as const
export type Language = keyof typeof translations

export const LANGUAGE_STORAGE_KEY = 'language'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

/** The UI-string dictionary for the current language. */
export function useT() {
  const { lang } = useLanguage()
  return translations[lang]
}

/** Picks the localized variant of a content object, falling back to EN. */
export function pickLocalized<T>(lang: Language, en: T, ptBr?: T): T {
  return lang === 'pt-BR' && ptBr !== undefined ? ptBr : en
}
