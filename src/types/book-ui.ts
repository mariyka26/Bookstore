import type { ReactNode, ChangeEvent, FormEvent } from 'react'
import type { ComponentType } from 'react'
import type { BookType, BookWithQty, BooksResponseType, PageItem } from './books'

// UI-компоненты для карточек книг

export type BookDetailsProps = {
    book: BookType
    isFav: boolean
    isInCart: boolean
    onToggleFav: () => void
    onAddToCart: () => void
    previewLink?: string | null
}

export type BookCardTileProps = {
    book: BookType
    isFav: boolean
    rating: number
    onToggleFav: () => void
    onRate: (value: number) => void
    onPreview: () => void
}

export type BookCardRowFavoriteProps = {
    book: BookType
    isFav: boolean
    rating: number
    onToggleFav: () => void
    onRate: (value: number) => void
    onNavigateToDetails: () => void
}

export type CardBookRowCartProps = {
    book: BookType
    qty: number
    totalPrice: number
    onQtyChange: (newQty: number) => void
    onRemove: () => void
    onNavigateToDetails: () => void
}

// Компоненты отображения списков книг

export type BookListGridProps = {
    books: BookType[]
    currentPage: number
    total: number
    limit: number
    onPageChange: (page: number) => void
}

export type BookListVerticalProps = {
    books: BookType[]
    variant: 'favorite' | 'cart'
    emptyText?: string
    onRate?: (isbn13: string, rating: number) => void
}

export type BookSliderProps = {
    books: BookType[]
    title: string
}

export type NewBooksProps = {
    books: BookType[]
    isLoading: boolean
    error: string | null
}

// Контейнеры

export type NewBooksContainerProps = {
    fetcher: () => Promise<BooksResponseType>
}

// Компоненты layout-а (header, main и др.)

export interface ContainerProps {
    children: ReactNode
}

export interface FooterProps {
    container: ComponentType<{ children: React.ReactNode }>
}

export interface HeaderProps {
    container: ComponentType<{ children: React.ReactNode }>
    query: string
    onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: FormEvent) => void
    favoritesCount: number
    cartCount: number
}

export interface MainProps {
    children: ReactNode
}

export interface TitleProps {
    children: ReactNode
}

// Модальные окна

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export type BookCoverPreviewModalProps = {
    isShown: boolean
    image: string
    title: string
    onClose: () => void
}

// Рейтинг

export type RatingStarsProps = {
    value: number
    hovered: number | null
    onRate: (value: number) => void
    onHover: (value: number | null) => void
}

// Подписка

export type SubscribeBlockProps = {
    email: string
    submitted: boolean
    onEmailChange: (value: string) => void
    onSubmit: () => void
}

// Пагинация

export type PaginationProps = {
    pages: PageItem[]
    currentPage: number
    onPageChange: (page: number) => void
}

// Корзина

export type CartSummaryProps = {
    items: BookWithQty[]
    sumTotal: number
    vat: number
    total: number
    onCheckout: () => void
    disabled?: boolean
}




