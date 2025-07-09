import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import StarIcon from '../assets/star.svg';
import type { BookType } from '../types/books';
import { CardBookBase } from './cart-book-base';

export function CardBookRowFavorite(book: BookType) {
    return (
        <CardBookBase book={book}>
            {({ isFav, toggleFav }) => (
                <div className="flex items-center gap-6 p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                    {/* обложка */}
                    <img src={book.image} alt={book.title} className="w-24 h-32 rounded-lg flex-shrink-0" />

                    {/* инфо */}
                    <div className="flex flex-col flex-grow">
                        <h3 className="font-semibold text-sm lg:text-base mb-1 line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-xs text-gray-500">{book.subtitle}</p>

                        {/* цена + звёзды */}
                        <div className="mt-4 flex items-center gap-8">
                            <span className="text-xl font-bold">{book.price}</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <img key={i} src={StarIcon} alt="*" className="h-4 w-4" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* сердечко справа */}
                    <button onClick={toggleFav}>
                        {isFav ? (
                            <HeartSolid className="h-5 w-5 text-rose-500" />
                        ) : (
                            <HeartOutline className="h-5 w-5 text-rose-500" />
                        )}
                    </button>
                </div>
            )}
        </CardBookBase>
    );
}