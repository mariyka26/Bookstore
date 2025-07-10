import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { BookListVertical } from '../components/favorites-list'
import { useAppSelector } from '../redux/store';
import { CartSummary } from '../components/сart-summary';
import type { OutletContextType } from '../types/types'

export function CartBooks(): React.ReactElement {
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>();
    const cartItems = useAppSelector((s) => s.books.cart);

    useEffect(() => {
        setTitle('Your cart');
        setShowSubscribe(false);
    }, [setTitle, setShowSubscribe]);

    return (
        <>
            <BookListVertical
                books={cartItems}
                variant="cart"
                emptyText="Корзина пуста"
            />

            <CartSummary items={cartItems} />
        </>
    );
}