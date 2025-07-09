import HeartSolidIcon from '../assets/heart-solid.svg';
import HeartIcon from '../assets/heart-regular.svg';
import CloseIcon from '../assets/close.svg';
import type { BookType } from '../types/books';
import { useState } from 'react';
import { CardBookBase } from './cart-book-base';

export function CardBookRowCart(book: BookType) {
    const [qty, setQty] = useState(1);

    return (
        <CardBookBase book={book}>
            {({ isFav, toggleFav }) => (
                <div className="relative flex items-center gap-6 p-4 rounded-2xl shadow-sm">
                    <img src={book.image} alt={book.title} className="w-24 h-32 rounded-lg" />

                    <div className="flex flex-col flex-grow">
                        <h3 className="font-semibold text-sm lg:text-base mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-xs text-gray-500 mb-4">{book.subtitle}</p>

                        {/* количество */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>&minus;</button>
                            <span className="w-4 text-center">{qty}</span>
                            <button onClick={() => setQty((q) => q + 1)}>+</button>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-xl font-bold">{book.price}</span>
                        <button onClick={toggleFav}>
                            <img src={isFav ? HeartSolidIcon : HeartIcon} className="h-5 w-5" />
                        </button>
                    </div>

                    <button onClick={toggleFav} className="absolute top-3 right-3">
                        <img src={CloseIcon} className="h-4 w-4" />
                    </button>
                </div>
            )}
        </CardBookBase>
    );
}