import { useAppDispatch } from '../../redux/store';
import { clearCart } from '../../redux/books-slice';
import { CartSummary } from '../ui/сart-summary';
import type { BookWithQty } from '../../types/books';

type Props = {
    items: BookWithQty[];
};

export function CartSummaryContainer({ items }: Props) {
    const dispatch = useAppDispatch();

    const sumTotal = items.reduce((acc, book) => {
        const price = parseFloat(book.price.replace(/[^0-9.]/g, '')) || 0;
        const qty = book.qty ?? 1;
        return acc + price * qty;
    }, 0);

    const vat = sumTotal * 0.15;
    const total = sumTotal + vat;

    const handleCheckout = () => {
        console.log('Order summary:', {
            items,
            sumTotal: sumTotal.toFixed(2),
            vat: vat.toFixed(2),
            total: total.toFixed(2),
        });
        dispatch(clearCart());
    };

    return (
        <CartSummary
            items={items}
            sumTotal={sumTotal}
            vat={vat}
            total={total}
            onCheckout={handleCheckout}
        />
    );
}