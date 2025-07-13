import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { clearCart } from '../../redux/books-slice'
import { CartSummary } from '../ui/сart-summary'
import { Notification } from '../ui/notification'
import type { CartSummaryContainerProps } from '../../types/books'

export function CartSummaryContainer({ items }: CartSummaryContainerProps) {
    const dispatch = useAppDispatch()
    const [showNotification, setShowNotification] = useState(false)
    const [lastOrderItems, setLastOrderItems] = useState<typeof items>([])
    const [showSummary, setShowSummary] = useState(true)

    useEffect(() => {
        if (items.length > 0) {
            setLastOrderItems(items)
        }
    }, [items])

    const sumTotal = lastOrderItems.reduce((acc, book) => {
        const price = parseFloat(book.price.replace(/[^0-9.]/g, '')) || 0
        const qty = book.qty ?? 1
        return acc + price * qty
    }, 0)

    const vat = sumTotal * 0.15
    const total = sumTotal + vat

    const handleCheckout = () => {
        console.log('Order summary:', {
            items: lastOrderItems,
            sumTotal: sumTotal.toFixed(2),
            vat: vat.toFixed(2),
            total: total.toFixed(2),
        })
        dispatch(clearCart())
        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 3000)
    }

    if (!showSummary) return null

    return (
        <>
            <CartSummary
                items={items.length > 0 ? items : lastOrderItems}
                sumTotal={sumTotal}
                vat={vat}
                total={total}
                onCheckout={handleCheckout}
                disabled={items.length === 0}
            />
            <Notification
                message="Thank you for your purchase!"
                isVisible={showNotification}
            />
        </>
    )
}