export type LangType = 'en' | 'ru'

export interface LangContextType {
    lang: LangType
    setLang: (lang: LangType) => void
}

