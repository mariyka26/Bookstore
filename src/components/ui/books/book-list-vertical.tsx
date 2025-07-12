import type { BookType } from '../../../types/books';
import { BookCardContainer } from '../../container/book-card-container';

type Variant = 'favorite' | 'cart';

type Props = {
    books: BookType[];
    variant: Variant;
    emptyText?: string;
    onRate?: (isbn13: string, rating: number) => void;
};

export function BookListVertical({ books, variant, emptyText = 'Здесь пока пусто', onRate }: Props) {
    if (!books.length) {
        return <p className="text-center text-gray-500">{emptyText}</p>;
    }

    const view = variant === 'favorite' ? 'row' : 'cart';

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
    );
}
