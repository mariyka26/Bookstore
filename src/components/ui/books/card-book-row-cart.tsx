import { XMarkIcon } from '@heroicons/react/24/outline'
import type { CardBookRowCartProps } from '../../../types/book-ui'

export function CardBookRowCart({
    book,
    qty,
    totalPrice,
    onQtyChange,
    onRemove,
    onNavigateToDetails
}: CardBookRowCartProps): React.ReactElement {
    return (
        <div 
            className="relative flex flex-col md:flex-row gap-4 sm:gap-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition w-full p-5 cursor-pointer"
            onClick={onNavigateToDetails}
        >
            {/* Обложка */}
            <div 
                className="w-full md:w-1/5 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-xl shadow-sm"
                />
            </div>

            {/* Инфо + Кол-во */}
            <div className="w-full md:w-3/5 flex flex-col justify-between gap-4 text-center md:text-left">
                <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900 line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-500">{book.subtitle}</p>
                </div>

                <div 
                    className="flex justify-center md:justify-start items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => onQtyChange(Math.max(1, qty - 1))}
                        className="text-xl text-gray-700 hover:text-black px-2"
                    >
                        −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{qty}</span>
                    <button
                        onClick={() => onQtyChange(qty + 1)}
                        className="text-xl text-gray-700 hover:text-black px-2"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Цена */}
            <div className="w-full md:w-1/5 flex justify-center md:justify-end items-center mt-2 md:mt-0">
                <span className="text-xl font-semibold text-green-600">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Кнопка удалить */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove from cart"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    )
}
