import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { BookListVertical } from '../components/favorites-list'
import { useAppSelector } from '../redux/store';
import { BookSlider } from '../components/book-slider';
import type { OutletContextType } from '../types/types'

export function FavoriteBooks(): React.ReactElement {
  const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
  const favorites = useAppSelector((s) => s.books.favorites);
  const allBooks = useAppSelector((s) => s.books.list);
  const ratings = useAppSelector((s) => s.books.ratings);
  const popularBooks = [...allBooks]
    .filter((book) => ratings[book.isbn13])
    .sort((a, b) => (ratings[b.isbn13] ?? 0) - (ratings[a.isbn13] ?? 0));

  useEffect(() => {
    setTitle('Favorites')
    setShowSubscribe(false);
  }, [setTitle, setShowSubscribe])

  return (<>
    <BookListVertical
      books={favorites}
      variant="favorite"
      emptyText="Добавьте книги в избранное ♥"
    />
    <BookSlider
      books={popularBooks}
      title="Popular Books"
    />
  </>
  )
}