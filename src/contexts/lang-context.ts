import { createContext } from 'react'
import type { LangContextType } from '../types/types'

export const initialState: LangContextType = {
    lang: 'en',
    setLang: () => { },
}

export const LangContext = createContext<LangContextType>(initialState)