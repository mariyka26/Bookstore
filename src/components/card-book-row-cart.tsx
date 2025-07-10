import { useAppDispatch } from '../redux/store';
import { removeFromCart, updateQty } from '../redux/books-slice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CardBookBase } from './cart-book-base';
import { useState, useEffect } from 'react';
import type { BookType } from '../types/books';

type BookWithQty = BookType & { qty?: number };

export function CardBookRowCart(book: BookWithQty) {
    const initialQty = book.qty ?? 1;
    const [qty, setQty] = useState(initialQty);
    const dispatch = useAppDispatch();

    // сохраняем новое количество в redux + localStorage
    useEffect(() => {
        dispatch(updateQty({ isbn13: book.isbn13, qty }));
    }, [qty]);

    const numericPrice = parseFloat(book.price.replace(/[^0-9.]/g, '')) || 0;
    const totalPrice = (numericPrice * qty).toFixed(2);

    return (
        <CardBookBase book={book}>
            {() => (
                <div className="relative flex items-center gap-6 p-4 rounded-2xl shadow-sm hover:shadow-md transition ">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-md"
                    />

                    <div className="flex flex-col flex-grow">
                        <h3 className="font-semibold text-sm lg:text-base mb-1 leading-snug max-w-xl line-clamp-2">
                            {book.title}
                        </h3>

                        {/* Количество */}
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="text-xl px-2"
                            >
                                −
                            </button>
                            <span className="w-4 text-center text-sm">{qty}</span>
                            <button
                                onClick={() => setQty((q) => q + 1)}
                                className="text-xl px-2"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Итоговая цена */}
                    <div className="ml-auto flex flex-col items-end text-right gap-2">
                        <span className="text-xl font-bold">${totalPrice}</span>
                    </div>

                    <button
                        onClick={() => dispatch(removeFromCart(book.isbn13))}
                        className="absolute top-3 right-3"
                        aria-label="Remove from cart"
                    >
                        <XMarkIcon className="h-4 w-4 opacity-60 hover:opacity-100" />
                    </button>
                </div>
            )}
        </CardBookBase>
    );
}
