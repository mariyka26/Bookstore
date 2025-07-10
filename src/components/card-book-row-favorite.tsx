import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import type { BookType } from '../types/books';
import { CardBookBase } from './cart-book-base';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { RatingStars } from './rating-stars';
import { setRating } from '../redux/books-slice';

export function CardBookRowFavorite(book: BookType) {
    const dispatch = useAppDispatch();
    const rating = useAppSelector((s) => s.books.ratings[book.isbn13] || 0);

    function handleRate(value: number) {
        dispatch(setRating({ isbn13: book.isbn13, rating: value }));
    }

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
                            <RatingStars value={rating} onRate={handleRate} />
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