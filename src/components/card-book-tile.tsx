// components/CardBookTile.tsx
import { CardBookBase } from './cart-book-base';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { showCoverPreview, setCoverPreview } from '../redux/book-cover-preview-slice'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Link } from 'react-router';
import { RatingStars } from './rating-stars';
import { setRating } from '../redux/books-slice';
import type { BookType } from '../types/books';

export function CardBookTile(book: BookType) {
    const dispatch = useAppDispatch();
    const rating = useAppSelector((s) => s.books.ratings[book.isbn13] || 0);

    function handleClickCoverPreview() {
        dispatch(setCoverPreview(book))
        dispatch(showCoverPreview())
    }

    function handleRate(value: number) {
        dispatch(setRating({ isbn13: book.isbn13, rating: value }));
    }

    return (
        <CardBookBase book={book}>
            {({ isFav, toggleFav }) => (
                <div className="p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="bg-white rounded-xl overflow-hidden flex flex-col items-center p-6">
                        <div onClick={handleClickCoverPreview}>
                            <img src={book.image} alt={book.title} className="h-50 w-42 object-cover mb-4" />
                        </div>

                        <h3 className="text-center font-semibold text-sm lg:text-base mb-1 line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{book.subtitle}</p>

                        {/* цена + звёзды + сердечко */}
                        <div className="flex items-center justify-between w-full">
                            <span className="text-base font-semibold">{book.price}</span>
                            <RatingStars value={rating} onRate={handleRate} />

                            <button onClick={toggleFav}>
                                {isFav ? (
                                    <HeartSolid className="h-5 w-5 text-rose-500" />
                                ) : (
                                    <HeartOutline className="h-5 w-5 text-rose-500" />
                                )}
                            </button>
                        </div>

                        <Link
                            to={`/book/${book.isbn13}`}
                            className="mt-4 w-full text-center text-xs bg-teal-600 text-white py-2 rounded-lg"
                        >
                            Читать далее
                        </Link>
                    </div>
                </div>
            )}
        </CardBookBase>
    );
}
