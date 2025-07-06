import React from 'react';
import { Link } from 'react-router';
import type { BookType, BooksStateType } from '../types/books';
import { useAppDispatch, useAppSelector, type RootState } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/books-slice';

import HeartSolidIcon from '../assets/heart-solid.svg';
import HeartIcon from '../assets/heart-regular.svg';
import StarIcon from '../assets/star.svg';

const pastelBg = [
    'bg-blue-50',
    'bg-red-50',
    'bg-indigo-50',
    'bg-emerald-50',
    'bg-pink-50',
    'bg-purple-50',
] as const;

/* ------- типизация пропов ------- */
type CardBookProps = BookType & { index: number };

export const CardBook: React.FC<CardBookProps> = ({
    title,
    subtitle,
    image,
    price,
    isbn13,
    index,
}) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector<RootState, BooksStateType['favorites']>(
        (s) => s.books.favorites,
    );

    const isFav = favorites.some((b) => b.isbn13 === isbn13);

    const toggleFav = () =>
        isFav ? dispatch(removeFavorite(isbn13)) : dispatch(addFavorite({ title, subtitle, image, price, isbn13, url: '' }));

    const bgClass = pastelBg[index % pastelBg.length];

    return (
        <div className={`${bgClass} p-4 rounded-2xl shadow-sm hover:shadow-md transition`}>
            <div className="bg-white rounded-xl overflow-hidden flex flex-col items-center p-6">
                {/* обложка */}
                <img
                    src={image}
                    alt={title}
                    className="h-50 w-42 object-cover mb-4 drop-shadow-sm"
                />

                {/* заголовок */}
                <h3 className="text-center font-semibold text-sm lg:text-base mb-1 line-clamp-2">
                    {title}
                </h3>

                {/* подзаголовок */}
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{subtitle}</p>

                {/* цена • звёзды • избранное */}
                <div className="flex items-center justify-between w-full">
                    <span className="text-base font-semibold text-gray-900">{price}</span>

                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src={StarIcon} alt="*" className="h-4 w-4" />
                        ))}
                    </div>

                    <button onClick={toggleFav}>
                        <img
                            src={isFav ? HeartSolidIcon : HeartIcon}
                            alt="favorite"
                            className="h-5 w-5"
                        />
                    </button>
                </div>

                {/* ссылка «Читать» */}
                <Link
                    to={`/books/${isbn13}`}
                    className="mt-4 w-full text-center text-xs lg:text-sm font-medium
                     bg-green-600 text-white py-2 rounded-lg hover:bg-green-700
                     transition-colors"
                >
                    Читать далее
                </Link>
            </div>
        </div>
    );
};
