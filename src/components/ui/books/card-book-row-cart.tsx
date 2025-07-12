import { XMarkIcon } from '@heroicons/react/24/outline';
import type { BookType } from '../../../types/books';

type Props = {
    book: BookType;
    qty: number;
    totalPrice: number;
    onQtyChange: (newQty: number) => void;
    onRemove: () => void;
};

export function CardBookRowCart({
    book,
    qty,
    totalPrice,
    onQtyChange,
    onRemove,
}: Props): React.ReactElement {
    return (
        <div className="relative flex flex-wrap md:flex-nowrap items-center gap-6 p-4 rounded-2xl shadow-sm hover:shadow-md transition bg-white">
            <img
                src={book.image}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-md flex-shrink-0"
            />

            <div className="flex flex-col flex-grow min-w-0">
                <h3 className="font-semibold text-sm lg:text-base mb-1 leading-snug line-clamp-2">
                    {book.title}
                </h3>

                {/* Количество */}
                <div className="flex items-center gap-4 mt-2">
                    <button
                        onClick={() => onQtyChange(Math.max(1, qty - 1))}
                        className="text-xl px-2"
                    >
                        −
                    </button>
                    <span className="w-4 text-center text-sm">{qty}</span>
                    <button
                        onClick={() => onQtyChange(qty + 1)}
                        className="text-xl px-2"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Итоговая цена */}
            <div className="ml-auto flex flex-col items-end text-right gap-2">
                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>

            <button onClick={onRemove} className="absolute top-3 right-3" aria-label="Remove from cart">
                <XMarkIcon className="h-4 w-4 opacity-60 hover:opacity-100" />
            </button>
        </div>
    );
}