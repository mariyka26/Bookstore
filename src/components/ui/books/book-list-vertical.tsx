import type { BookListVerticalProps } from '../../../types/book-ui'
import { BookCardContainer } from '../../container/book-card-container'

export function BookListVertical({ books, variant, emptyText = 'Здесь пока пусто', onRate }: BookListVerticalProps) {
    if (!books.length) {
        return <p className="text-center text-gray-500">{emptyText}</p>
    }

    const view = variant === 'favorite' ? 'row' : 'cart'

    return (
        <div className="space-y-4">
            {books.map((book) => (
                <BookCardContainer
                    key={book.isbn13}
                    book={book}
                    view={view}
                    onRateBook={onRate ? (rating) => onRate(book.isbn13, rating) : undefined}
                />
            ))}
        </div>
    )
}