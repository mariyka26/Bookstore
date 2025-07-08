import type { BookType } from './books';
export type LangType = 'en' | 'ru'

export interface LangContextType {
    lang: LangType
    setLang: (lang: LangType) => void
}



export interface OutletContextType {
    setTitle: (title: string) => void;
    setBreadcrumbs: (breadcrumbs: Array<{ label: string; to: string }>) => void;
    setShowSubscribe: (showSubscribe: boolean) => void;
}

export interface LayoutContextType {
    title: string;
    setTitle: (title: string) => void;
    breadcrumbs: Array<{ label: string; to: string }>;
    setBreadcrumbs: (breadcrumbs: Array<{ label: string; to: string }>) => void;
    showSubscribe: boolean;
    setShowSubscribe: (showSubscribe: boolean) => void;
}

export type BookPreviewStateType = {
    isShownModal: boolean
    data: BookType | null
}