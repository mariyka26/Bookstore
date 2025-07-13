import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchBookDetails, clearBookDetails } from '../redux/book-details-slice'
import { addToRecentlyViewed } from '../redux/books-slice'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import type { OutletContextType } from '../types/books'
import { BookCardContainer } from '../components/container/book-card-container'
import { BookSliderContainer } from '../components/container/book-slider-container'

export function BookDetailsPage(): React.ReactElement | null {
    const { isbn13 } = useParams<{ isbn13: string }>()
    const dispatch = useAppDispatch()
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
    const book = useAppSelector((state) => state.bookDetails.data)

    useEffect(() => {
        if (isbn13) {
            dispatch(fetchBookDetails(isbn13))
        }

        return () => {
            dispatch(clearBookDetails())
        }
    }, [isbn13, dispatch])

    useEffect(() => {
        if (!book) return
        setTitle(book.title)
        setShowSubscribe(true)

        dispatch(addToRecentlyViewed(book))
    }, [book, setTitle, setShowSubscribe, dispatch])

    if (!book) return null

    return (
        <>
            <BookCardContainer book={book} view="details" />
            <BookSliderContainer type="recent" title="You recently viewed" />
        </>
    )
}