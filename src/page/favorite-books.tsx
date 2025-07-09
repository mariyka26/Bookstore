import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { FavoriteBooksList } from '../components/favorites-list'
import type { OutletContextType } from '../types/types'

export function FavoriteBooks(): React.ReactElement {
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()

    useEffect(() => {
        setTitle('Favorites')
        setShowSubscribe(false);
    }, [setTitle, setShowSubscribe])

    return (
        <>
            <FavoriteBooksList />
        </>
    );
}