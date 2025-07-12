// containers/BookCardContainer.tsx
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
    toggleFavorite,
    setRating,
    addToCart,
    removeFromCart,
    updateQty,
} from '../../redux/books-slice';
import {
    setCoverPreview,
    showCoverPreview
} from '../../redux/book-cover-preview-slice';
import { CardBookTile } from '../ui/books/card-book-tile';
import { CardBookRowFavorite } from '../ui/books/card-book-row-favorite';
import { CardBookRowCart } from '../ui/books/card-book-row-cart';
import { BookDetail } from '../ui/books/book-detail';
import type { BookType } from '../../types/books';

type View = 'tile' | 'row' | 'details' | 'cart';

type Props = {
    book: BookType & { qty?: number };
    view: View;
    onRateBook?: (rating: number) => void;
};

export function BookCardContainer({ book, view, onRateBook }: Props): React.ReactElement {
    const dispatch = useAppDispatch();
    const rating = useAppSelector((s) => s.books.ratings[book.isbn13] || 0);
    const isFav = useAppSelector((s) => s.books.favorites.some((b) => b.isbn13 === book.isbn13));
    const [qty, setQty] = useState(book.qty ?? 1);

    useEffect(() => {
        if (view === 'cart') {
            dispatch(updateQty({ isbn13: book.isbn13, qty }));
        }
    }, [qty, view, book.isbn13, dispatch]);

    const onToggleFav = () => dispatch(toggleFavorite(book));

    // Используем переданную функцию onRateBook, если она есть, иначе используем локальную
    const onRate = (value: number) => {
        if (onRateBook) {
            onRateBook(value);
        } else {
            dispatch(setRating({ isbn13: book.isbn13, rating: value }));
        }
    };

    const onAddToCart = () => dispatch(addToCart(book));
    const onPreview = () => {
        dispatch(setCoverPreview(book));
        dispatch(showCoverPreview());
    };
    const onRemove = () => dispatch(removeFromCart(book.isbn13));
    const previewLink = book.pdf ? Object.values(book.pdf)[0] : null;

    if (view === 'tile') {
        return (
            <CardBookTile
                book={book}
                rating={rating}
                isFav={isFav}
                onToggleFav={onToggleFav}
                onRate={onRate}
                onPreview={onPreview}
            />
        );
    }

    if (view === 'row') {
        return (
            <CardBookRowFavorite
                book={book}
                rating={rating}
                isFav={isFav}
                onToggleFav={onToggleFav}
                onRate={onRate}
            />
        );
    }

    if (view === 'cart') {
        const price = parseFloat(book.price.replace(/[^0-9.]/g, '')) || 0;
        const total = price * qty;

        return (
            <CardBookRowCart
                book={book}
                qty={qty}
                totalPrice={total}
                onQtyChange={setQty}
                onRemove={onRemove}
            />
        );
    }

    return (
        <BookDetail
            book={book}
            isFav={isFav}
            onToggleFav={onToggleFav}
            onAddToCart={onAddToCart}
            previewLink={previewLink}
        />
    );
}
