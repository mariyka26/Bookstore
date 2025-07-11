// pages/BookDetailsPage.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
    fetchBookDetails,
    clearBookDetails
} from '../redux/book-details-slice';
import { addToCart, addToRecentlyViewed } from '../redux/books-slice';
import { CardBookBase } from './cart-book-base';
import type { BookType } from '../types/books';


export function BookDetails(): React.ReactElement {
    // ISBN из маршрута
    const { isbn13 = '' } = useParams<{ isbn13?: string }>();

    const dispatch = useAppDispatch();
    const {
        data: book,
        isLoading,
        error,
    } = useAppSelector((state) => state.bookDetails);

    const firstPdfUrl = book?.pdf ? Object.values(book.pdf)[0] : '';

    // Загружаем данные книги и чистим при размонтировании
    useEffect(() => {
        if (isbn13) {
            dispatch(fetchBookDetails(isbn13));
        }

        return () => {
            dispatch(clearBookDetails());
        };
    }, [isbn13, dispatch]);

    useEffect(() => {
        if (book) {
            dispatch(addToRecentlyViewed(book)); // 👈 сюда
        }
    }, [book, dispatch]);

    /* -------------------- UI -------------------- */
    if (isLoading) {
        return <p className="p-8 text-center">Loading…</p>;
    }

    if (error || !book) {
        return (
            <p className="p-8 text-center text-red-500">
                Ошибка: {error ?? 'Book not found'}
            </p>
        );
    }

    return (
        <>
            <CardBookBase book={book as BookType}>
                {({ isFav, toggleFav }) => (
                    <div className="container mx-auto max-w-5xl px-4 py-8">

                        <div className="grid md:grid-cols-[260px_1fr] gap-8">
                            {/* Левая колонка — обложка + сердечко */}
                            <div className="relative">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-64 mx-auto rounded-lg"
                                />

                                {/* Сердечко */}
                                <button
                                    onClick={toggleFav}
                                    className="absolute top-2 right-2 p-1 rounded-md hover:bg-white/40"
                                >
                                    {isFav ? (
                                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-rose-500">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.11 4.13 2.81h.74C14.09 5.11 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-6 w-6 stroke-rose-500 fill-none"
                                            strokeWidth={2}
                                        >
                                            <path d="M12.1 21.1l-1.1-1.02C5.14 15.24 2 12.31 2 8.5 2 6 4.02 4 6.5 4c1.73 0 3.41 1.13 4.13 2.8h2.73C14.09 5.13 15.77 4 17.5 4 19.97 4 22 6 22 8.5c0 3.81-3.13 6.74-8.92 11.58l-1 1.02z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Правая колонка — характеристики */}
                            <div className="flex flex-col gap-6">
                                <span className="text-3xl font-semibold">{book.price}</span>

                                <table className="text-sm">
                                    <tbody>
                                        {book.authors && (
                                            <tr>
                                                <td className="pr-4 text-gray-500">Authors</td>
                                                <td>{book.authors}</td>
                                            </tr>
                                        )}
                                        {book.publisher && (
                                            <tr>
                                                <td className="pr-4 text-gray-500">Publisher</td>
                                                <td>{book.publisher}</td>
                                            </tr>
                                        )}
                                        {book.language && (
                                            <tr>
                                                <td className="pr-4 text-gray-500">Language</td>
                                                <td>{book.language}</td>
                                            </tr>
                                        )}
                                        {book.format && (
                                            <tr>
                                                <td className="pr-4 text-gray-500">Format</td>
                                                <td>{book.format}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <button
                                    onClick={() => dispatch(addToCart(book as BookType))}
                                    className="self-start bg-gray-800 text-white px-6 py-3 rounded-lg"
                                >
                                    Add to cart
                                </button>

                                {book.pdf && Object.values(book.pdf).length > 0 && (
                                    <a
                                        href={Object.values(book.pdf)[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="self-start border border-gray-300 text-gray-800 px-6 py-3 rounded-lg"
                                    >
                                        Preview book
                                    </a>
                                )}

                            </div>
                        </div>

                        {/* Табы – только описание */}
                        <div className="mt-10 border-b">
                            <button className="px-4 py-2 border-b-2 border-gray-800 font-medium">
                                Description
                            </button>
                        </div>

                        <p className="mt-6 leading-relaxed text-sm whitespace-pre-line">
                            {book.desc}
                        </p>
                    </div>
                )}
            </CardBookBase>
        </>
    );
}