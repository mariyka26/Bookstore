import { BookCardContainer } from '../../container/book-card-container'
import type { BookType } from '../../../types/books';
import { BookCoverPreviewModalContainer } from '../../container/book-cover-preview-modal-container';

type Props = {
    books: BookType[];
    isLoading: boolean;
    error: string | null;
};

export function NewBooks({ books }: Props) {
    return (
        <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-14">
                {books.map((book) => (
                    <BookCardContainer key={book.isbn13} book={book} view="tile" />
                ))}
            </div>
            <BookCoverPreviewModalContainer />
        </>
    );
}