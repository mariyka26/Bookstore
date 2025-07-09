// components/CardBookTile.tsx
import { CardBookBase } from './cart-book-base';
import StarIcon from '../assets/star.svg';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { showCoverPreview, setCoverPreview } from '../redux/book-cover-preview-slice'
import { useAppDispatch } from '../redux/store';
import { Link } from 'react-router';
import type { BookType } from '../types/books';

export function CardBookTile(book: BookType) {
    const dispatch = useAppDispatch();

    function handleClickCoverPreview() {
        dispatch(setCoverPreview(book))
        dispatch(showCoverPreview())
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
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <img key={i} src={StarIcon} alt="*" className="h-4 w-4" />
                                ))}
                            </div>

                            <button onClick={toggleFav}>
                                {isFav ? (
                                    <HeartSolid className="h-5 w-5 text-rose-500" />
                                ) : (
                                    <HeartOutline className="h-5 w-5 text-rose-500" />
                                )}
                            </button>
                        </div>

                        <Link
                            to={`/books/${book.isbn13}`}
                            className="mt-4 w-full text-center text-xs bg-green-600 text-white py-2 rounded-lg"
                        >
                            Читать далее
                        </Link>
                    </div>
                </div>
            )}
        </CardBookBase>
    );
}
