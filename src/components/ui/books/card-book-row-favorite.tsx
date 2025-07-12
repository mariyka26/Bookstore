import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import type { BookType } from '../../../types/books';
import { RatingStarsContainer } from '../../container/rating-stars-container';

type Props = {
    book: BookType;
    isFav: boolean;
    rating: number;
    onToggleFav: () => void;
    onRate: (value: number) => void;
};

export function CardBookRowFavorite({
    book,
    isFav,
    rating,
    onToggleFav,
    onRate,
}: Props): React.ReactElement {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="flex flex-col sm:flex-row w-full">
                {/* Обложка */}
                <div className="sm:w-1/4 md:w-1/5 p-4 flex justify-center">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-lg"
                    />
                </div>

                {/* Контент */}
                <div className="sm:w-3/4 md:w-4/5 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-sm lg:text-base mb-1 line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-xs text-gray-500">{book.subtitle}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <span className="text-xl font-bold">{book.price}</span>
                            <RatingStarsContainer
                                value={rating}
                                onRate={onRate}
                                isbn13={book.isbn13}
                            />
                        </div>
                        
                        {/* Кнопка "избранное" */}
                        <button
                            onClick={onToggleFav}
                            className="mt-2 sm:mt-0"
                            aria-label="Toggle favorite"
                        >
                            {isFav ? (
                                <HeartSolid className="h-5 w-5 text-rose-500" />
                            ) : (
                                <HeartOutline className="h-5 w-5 text-rose-500" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
