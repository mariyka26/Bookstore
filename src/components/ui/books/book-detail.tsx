import type { BookDetailsProps } from '../../../types/book-ui'

export function BookDetail({
    book,
    isFav,
    isInCart,
    onToggleFav,
    onAddToCart,
    previewLink,
}: BookDetailsProps): React.ReactElement {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-10 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Обложка + лайк */}
                <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <div className="aspect-w-3 aspect-h-4 w-64">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="rounded-xl object-cover shadow-md"
                        />
                    </div>
                    <button
                        onClick={onToggleFav}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 hover:bg-white/90 shadow"
                        aria-label="Toggle Favorite"
                    >
                        {isFav ? (
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-rose-500">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                2 6 4 4 6.5 4c1.74 0 3.41 1.11 
                                4.13 2.81h.74C14.09 5.11 15.76 4 
                                17.5 4 20 4 22 6 22 8.5c0 
                                3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-rose-500 fill-none" strokeWidth={2}>
                                <path d="M12.1 21.1l-1.1-1.02C5.14 15.24 2 
                                12.31 2 8.5 2 6 4.02 4 6.5 
                                4c1.73 0 3.41 1.13 4.13 
                                2.8h2.73C14.09 5.13 15.77 
                                4 17.5 4 19.97 4 22 6 22 
                                8.5c0 3.81-3.13 6.74-8.92 
                                11.58l-1 1.02z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Описание книги */}
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold text-gray-800">{book.title}</h1>
                    <span className="text-2xl text-emerald-600 font-bold">{book.price}</span>

                    <table className="text-sm text-gray-700">
                        <tbody>
                            {book.authors && (
                                <tr>
                                    <td className="pr-4 text-gray-500">Authors:</td>
                                    <td>{book.authors}</td>
                                </tr>
                            )}
                            {book.publisher && (
                                <tr>
                                    <td className="pr-4 text-gray-500">Publisher:</td>
                                    <td>{book.publisher}</td>
                                </tr>
                            )}
                            {book.language && (
                                <tr>
                                    <td className="pr-4 text-gray-500">Language:</td>
                                    <td>{book.language}</td>
                                </tr>
                            )}
                            {book.format && (
                                <tr>
                                    <td className="pr-4 text-gray-500">Format:</td>
                                    <td>{book.format}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <button
                            onClick={onAddToCart}
                            className={`cursor-pointer ${isInCart 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gray-800 hover:bg-gray-700'} 
                                text-white px-6 py-3 rounded-xl transition flex items-center gap-2`}
                        >
                            {isInCart ? (
                                <>
                                    <span>Added to cart</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            ) : (
                                'Add to cart'
                            )}
                        </button>

                        {previewLink && (
                            <a
                                href={previewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
                            >
                                Preview book
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {book.desc && (
                <>
                    <h2 className="mt-12 text-xl font-medium border-b pb-2 mb-4">Description</h2>
                    <p className="leading-relaxed text-sm text-gray-700 whitespace-pre-line">
                        {book.desc}
                    </p>
                </>
            )}
        </div>
    )
}
