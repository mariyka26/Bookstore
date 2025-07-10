import type { BookWithQty } from '../types/books';
import { useAppDispatch } from '../redux/store';
import { clearCart } from '../redux/books-slice';

type Props = {
    items: BookWithQty[];
};

export function CartSummary({ items }: Props) {
    const dispatch = useAppDispatch();

    const sumTotal = items.reduce((acc: number, book: BookWithQty) => {
        const price = parseFloat(book.price.replace(/[^0-9.]/g, '')) || 0;
        const qty = book.qty ?? 1;
        return acc + price * qty;
    }, 0);

    const vat = sumTotal * 0.15;
    const totalWithVat = sumTotal + vat;

    const handleCheckout = () => {
        console.log('Order summary:', {
            items,
            sumTotal: sumTotal.toFixed(2),
            vat: vat.toFixed(2),
            total: totalWithVat.toFixed(2),
        });
        dispatch(clearCart());
    };

    return (
        <div className="p-6 rounded-2xl shadow-md bg-white max-w-md ml-auto mt-8">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Sum total:</span>
                <span className="font-semibold">${sumTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">VAT (15%):</span>
                <span className="font-semibold">${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 border-t pt-2">
                <span className="text-base font-medium">Total:</span>
                <span className="text-base font-bold">${totalWithVat.toFixed(2)}</span>
            </div>
            <button
                onClick={handleCheckout}
                className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
            >
                Check Out
            </button>
        </div>
    );
}
