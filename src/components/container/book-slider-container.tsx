import { useAppSelector } from '../../redux/store'
import { BookSlider } from '../ui/books/book-slider'
import type { BookType, BookSliderContainerProps } from '../../types/books'
import type { ReactElement } from 'react'

export function BookSliderContainer({ type, title }: BookSliderContainerProps): ReactElement {
    const { recentlyViewed, ratings } = useAppSelector((s) => s.books)

    let books: BookType[] = []

    if (type === 'recent') {
        books = recentlyViewed
    }

    if (type === 'popular') {
        books = [...recentlyViewed]
            .filter((b) => ratings[b.isbn13])
            .sort((a, b) => (ratings[b.isbn13] ?? 0) - (ratings[a.isbn13] ?? 0))
    }

    return <BookSlider books={books} title={title} />
}