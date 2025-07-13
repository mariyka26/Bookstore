import type { BookListGridProps } from '../../../types/book-ui'
import { BookCardContainer } from '../../container/book-card-container'
import { PaginationContainer } from '../../container/pagination-container'

export function BookListGrid({ books, currentPage, total, limit, onPageChange }: BookListGridProps) {
    if (!books.length) return <p className="text-center text-gray-500">Список пуст</p>

    return (
        <div>
            <div
                className="grid gap-8 
        sm:grid-cols-2 
        lg:grid-cols-3
        xl:gap-x-12 xl:gap-y-14"
            >
                {books.map((book) => (
                    <BookCardContainer key={book.isbn13} book={book} view="tile" />
                ))}
            </div>

            <PaginationContainer
                total={total}
                currentPage={currentPage}
                limit={limit}
                onPageChange={onPageChange}
            />
        </div>
    )
}
