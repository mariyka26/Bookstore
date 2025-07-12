import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router';
import type { BookType } from '../../../types/books';
import { RatingStarsContainer } from '../../container/rating-stars-container';

type Props = {
    book: BookType;
    isFav: boolean;
    rating: number;
    onToggleFav: () => void;
    onRate: (value: number) => void;
    onPreview: () => void;
};

export function CardBookTile({
    book,
    isFav,
    rating,
    onToggleFav,
    onRate,
    onPreview,
}: Props): React.ReactElement {
    return (
        <div className="p-4 h-full">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col h-full p-4">
                {/* Обложка */}
                <div
                    className="relative w-42 h-60 mx-auto mb-4 cursor-pointer group"
                    onClick={onPreview}
                >
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFav();
                        }}
                        className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white shadow"
                    >
                        {isFav ? (
                            <HeartSolid className="h-5 w-5 text-rose-500" />
                        ) : (
                            <HeartOutline className="h-5 w-5 text-rose-500" />
                        )}
                    </button>
                </div>

                {/* Контент */}
                <div className="flex flex-col flex-1">
                    <h3 className="text-sm lg:text-base font-semibold text-gray-800 text-center line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1 mb-3 line-clamp-2">
                        {book.subtitle}
                    </p>

                    <div className="mt-auto pt-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-emerald-600">{book.price}</span>
                            <RatingStarsContainer
                                value={rating}
                                onRate={onRate}
                                isbn13={book.isbn13}
                            />
                        </div>
                        <NavLink
                            to={`/book/${book.isbn13}`}
                            className="block w-full text-center text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl transition"
                        >
                            Read more
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
