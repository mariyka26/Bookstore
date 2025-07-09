// components/CardBookBase.tsx
import { type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import type { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/books-slice';
import type { BookType } from '../types/books';

/** Отдаём детям isFav + toggleFav + dispatch‑helpers */
export function CardBookBase({
    book,
    children,
}: {
    book: BookType;
    children: (ctx: {
        isFav: boolean;
        toggleFav: () => void;
        dispatch: ReturnType<typeof useAppDispatch>;
    }) => ReactNode;
}) {
    const dispatch = useAppDispatch();
    const isFav = useAppSelector((s: RootState) =>
        s.books.favorites.some((b) => b.isbn13 === book.isbn13),
    );
    const toggleFav = () => dispatch(toggleFavorite(book));

    return <>{children({ isFav, toggleFav, dispatch })}</>;
}