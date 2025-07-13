import type { BookCardRowFavoriteProps } from '../../../types/book-ui'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { RatingStarsContainer } from '../../container/rating-stars-container'

export function CardBookRowFavorite({
    book,
    isFav,
    rating,
    onToggleFav,
    onRate,
    onNavigateToDetails
}: BookCardRowFavoriteProps) {
    return (
        <div 
            className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
            onClick={onNavigateToDetails}
        >
            <div className="flex flex-col sm:flex-row w-full divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {/* Обложка */}
                <div 
                    className="sm:w-1/4 md:w-1/5 p-5 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-xl shadow-sm"
                    />
                </div>

                {/* Контент */}
                <div className="sm:w-3/4 md:w-4/5 p-5 flex flex-col justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900 line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-sm text-gray-500">{book.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div 
                            className="flex items-center gap-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="text-lg font-bold text-green-600">{book.price}</span>
                            <RatingStarsContainer
                                value={rating}
                                onRate={onRate}
                                isbn13={book.isbn13}
                            />
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFav();
                            }}
                            className="text-rose-500 hover:scale-110 transition-transform"
                            aria-label="Toggle favorite"
                        >
                            {isFav ? (
                                <HeartSolid className="h-6 w-6" />
                            ) : (
                                <HeartOutline className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
