import type { BookType } from '../../../types/books';
import { BookCardContainer } from '../../container/book-card-container';
import { PaginationContainer } from '../../container/pagination-container';

type Props = {
    books: BookType[];
    currentPage: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
};

export function BookList({
    books,
    currentPage,
    total,
    limit,
    onPageChange,
}: Props) {
    if (!books.length) return <p className="text-center text-gray-500">Список пуст</p>;

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
    );
}
