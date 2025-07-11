import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { BookCoverPreviewModal } from '../components/book-cover-preview-modal';
import { CardBookTile } from '../components/card-book-tile';
import type { OutletContextType } from '../types/types';
import type { BooksResponseType, BookType } from '../types/books';

type Props = {
    fetcher: () => Promise<BooksResponseType>;
};

export function NewBooks({ fetcher }: Props) {
    const { setShowSubscribe } = useOutletContext<OutletContextType>();

    const [books, setBooks] = useState<BookType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setShowSubscribe(false);

        fetcher()
            .then((data) => {
                setBooks(data.books);
                setIsLoading(false);
            })
            .catch(() => {
                setError('Ошибка загрузки книг');
                setIsLoading(false);
            });
    }, [fetcher, setShowSubscribe]);

    if (isLoading) return <p className="p-4">Загрузка...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <div className="grid gap-8 
                      sm:grid-cols-2 
                      lg:grid-cols-3
                      xl:gap-x-12 xl:gap-y-14">
                {books.map((book) => (
                    <CardBookTile key={book.isbn13} {...book} />
                ))}
            </div>
            <BookCoverPreviewModal />
        </>
    );
}
