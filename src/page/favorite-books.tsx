import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { BookListVertical } from '../components/ui/books/book-list-vertical'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { BookSliderContainer } from '../components/container/book-slider-container'
import type { OutletContextType } from '../types/books'
import { setRating } from '../redux/books-slice'

export function FavoriteBooks(): React.ReactElement {
  const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((s) => s.books.favorites)

  useEffect(() => {
    setTitle('Favorites')
    setShowSubscribe(false)
  }, [setTitle, setShowSubscribe])

  const handleRating = (isbn13: string, rating: number) => {
    dispatch(setRating({ isbn13, rating }))
  }

  return (
    <>
      <BookListVertical
        books={favorites}
        variant="favorite"
        emptyText="Add books to favorites ♥"
        onRate={handleRating}
      />
      <BookSliderContainer type="popular" title="Popular books" />
    </>
  )
}