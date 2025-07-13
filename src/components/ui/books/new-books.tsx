import { BookCardContainer } from '../../container/book-card-container'
import type { NewBooksProps } from '../../../types/book-ui'
import { BookCoverPreviewModalContainer } from '../../container/book-cover-preview-modal-container'

export function NewBooks({ books }: NewBooksProps) {
    return (
        <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-14">
                {books.map((book) => (
                    <BookCardContainer key={book.isbn13} book={book} view="tile" />
                ))}
            </div>
            <BookCoverPreviewModalContainer />
        </>
    )
}