import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { BookListVertical } from '../components/favorites-list'
import { useAppSelector } from '../redux/store';
import type { OutletContextType } from '../types/types'

export function FavoriteBooks(): React.ReactElement {
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
    const favorites = useAppSelector((s) => s.books.favorites);

    useEffect(() => {
        setTitle('Favorites')
        setShowSubscribe(false);
    }, [setTitle, setShowSubscribe])

    return <BookListVertical
  books={favorites}
  variant="favorite"
  emptyText="Добавьте книги в избранное ♥"
/>;
}