import { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { BookListVertical } from '../components/ui/books/book-list-vertical'
import { useAppSelector } from '../redux/store'
import type { OutletContextType } from '../types/books'
import { CartSummaryContainer } from '../components/container/cart-summary-container'

export function CartBooks(): React.ReactElement {
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
    const cartItems = useAppSelector((s) => s.books.cart)

    useEffect(() => {
        setTitle('Your cart')
        setShowSubscribe(false)
    }, [setTitle, setShowSubscribe])

    return (
        <>
            <BookListVertical
                books={cartItems}
                variant="cart"
                emptyText="Your cart is empty"
            />

            <CartSummaryContainer items={cartItems} />
        </>
    )
}