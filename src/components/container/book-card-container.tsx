import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import {
    toggleFavorite,
    setRating,
    addToCart,
    removeFromCart,
    updateQty,
} from '../../redux/books-slice'
import {
    setCoverPreview,
    showCoverPreview
} from '../../redux/book-cover-preview-slice'
import { CardBookTile } from '../ui/books/card-book-tile'
import { CardBookRowFavorite } from '../ui/books/card-book-row-favorite'
import { CardBookRowCart } from '../ui/books/card-book-row-cart'
import { BookDetail } from '../ui/books/book-detail'
import { Notification } from '../ui/notification'
import type { BookCardContainerProps } from '../../types/books'

export function BookCardContainer({ book, view, onRateBook }: BookCardContainerProps): React.ReactElement {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const rating = useAppSelector((s) => s.books.ratings[book.isbn13] || 0)
    const isFav = useAppSelector((s) => s.books.favorites.some((b) => b.isbn13 === book.isbn13))
    const [qty, setQty] = useState(book.qty ?? 1)
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        if (view === 'cart') {
            dispatch(updateQty({ isbn13: book.isbn13, qty }))
        }
    }, [qty, view, book.isbn13, dispatch])

    const onToggleFav = () => dispatch(toggleFavorite(book))

    const onRate = (value: number) => {
        if (onRateBook) {
            onRateBook(value)
        } else {
            dispatch(setRating({ isbn13: book.isbn13, rating: value }))
        }
    }

    const onAddToCart = () => {
        dispatch(addToCart(book))
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
    }

    const onPreview = () => {
        dispatch(setCoverPreview(book))
        dispatch(showCoverPreview())
    }

    const onNavigateToDetails = () => {
        navigate(`/book/${book.isbn13}`)
    }

    const onRemove = () => dispatch(removeFromCart(book.isbn13))
    const previewLink = book.pdf ? Object.values(book.pdf)[0] : null

    return (
        <>
            {view === 'tile' && (
                <CardBookTile
                    book={book}
                    rating={rating}
                    isFav={isFav}
                    onToggleFav={onToggleFav}
                    onRate={onRate}
                    onPreview={onPreview}
                />
            )}

            {view === 'row' && (
                <CardBookRowFavorite
                    book={book}
                    rating={rating}
                    isFav={isFav}
                    onToggleFav={onToggleFav}
                    onRate={onRate}
                    onNavigateToDetails={onNavigateToDetails}
                />
            )}

            {view === 'cart' && (
                <CardBookRowCart
                    book={book}
                    qty={qty}
                    totalPrice={parseFloat(book.price.replace(/[^0-9.]/g, '')) * qty || 0}
                    onQtyChange={setQty}
                    onRemove={onRemove}
                    onNavigateToDetails={onNavigateToDetails}
                />
            )}

            {view === 'details' && (
                <BookDetail
                    book={book}
                    isFav={isFav}
                    onToggleFav={onToggleFav}
                    onAddToCart={onAddToCart}
                    previewLink={previewLink}
                />
            )}

            <Notification
                message="Book added to cart"
                isVisible={showNotification}
            />
        </>
    )
}
