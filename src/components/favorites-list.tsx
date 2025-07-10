import { CardBookRowFavorite } from './card-book-row-favorite';
import { CardBookRowCart } from './card-book-row-cart';
import type { BookType } from '../types/books';

type Variant = 'favorite' | 'cart';

type Props = {
    books: BookType[];
    variant: Variant;
    emptyText?: string;
};

export function BookListVertical({ books, variant, emptyText = 'Здесь пока пусто' }: Props) {
    if (!books.length) {
        return <p className="text-center text-gray-500">{emptyText}</p>;
    }

    return (
        <div className="space-y-4">
            {books.map((book) => {
                const key = book.isbn13;
                return variant === 'favorite' ? (
                    <CardBookRowFavorite key={key} {...book} />
                ) : (
                    <CardBookRowCart key={key} {...book} />
                );
            })}
        </div>
    );
}
