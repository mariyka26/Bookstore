import type { ComponentType } from 'react'

// Типы для API и данных о книгах

export type BooksParamsType = {
    query: string
    page?: number
    limit?: number
}

export type BookType = {
    id: number
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    url: string
    qty?: number
    pdf?: Record<string, string>
    desc?: string
    authors?: string | string[]
    publisher?: string
    language?: string
    format?: string
}

export type BookWithQty = BookType & { qty?: number }

export type RawBooksApiResponse = {
    error: string
    total: string
    page: string
    books: BookType[]
}

export type BooksResponseType = {
    error: '0'
    total: string
    page: string
    books: BookType[]
}

export type BookDetailsType = {
    id: number
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    url: string
    desc: string
    rating: string
    year: string
    pages: string
    lang: string
    publisher: string
    authors: string[]
    format?: string
    language?: string
    pdf?: Record<string, string>
}

export type BookDetailsApiResponse = BookDetailsType

// Типы состояния для Redux‑слайсов

export type BooksStateType = {
    list: BookType[]
    total: number
    isLoading: boolean
    error: string | null
    favorites: BookType[]
    cart: BookType[]
    ratings: Record<string, number>
    recentlyViewed: BookType[]
}

export type BookDetailsState = {
    data: BookDetailsType | null
    isLoading: boolean
    error: string | null
}

export type BookPreviewStateType = {
    isShownModal: boolean
    data: BookType | null
}

export type BooksActionType = {
    type: string
    payload?: any
}

// Типы пропсов для компонентов

export type View = 'tile' | 'row' | 'details' | 'cart'

export type BookCardContainerProps = {
    book: BookType & { qty?: number }
    view: View
    onRateBook?: (rating: number) => void
}

export type BookSliderContainerProps = {
    type: 'recent' | 'popular'
    title: string
}

export type CartSummaryContainerProps = {
    items: BookWithQty[]
}

export interface HeaderContainerProps {
    container: ComponentType<{ children: React.ReactNode }>
}

export type PaginationContainerProps = {
    total: number
    currentPage: number
    limit?: number
    siblingCount?: number
    onPageChange: (page: number) => void
}

export type RatingStarsContainerProps = {
    value: number
    onRate?: (value: number) => void
    isbn13?: string
}

// Типы для контекстов и layout'а

export interface OutletContextType {
    setTitle: (title: string) => void
    setBreadcrumbs: (breadcrumbs: Array<{ label: string, to: string }>) => void
    setShowSubscribe: (showSubscribe: boolean) => void
}

export interface LayoutContextType {
    title: string
    setTitle: (title: string) => void
    breadcrumbs: Array<{ label: string, to: string }>
    setBreadcrumbs: (breadcrumbs: Array<{ label: string, to: string }>) => void
    showSubscribe: boolean
    setShowSubscribe: (showSubscribe: boolean) => void
}

// Вспомогательные типы

export type PageItem = number | 'DOTS'
