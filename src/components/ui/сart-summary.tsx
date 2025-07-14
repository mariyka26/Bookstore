import type { CartSummaryProps } from '../../types/book-ui'

export function CartSummary({ sumTotal, vat, total, onCheckout, disabled = false }: CartSummaryProps) {

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
                <span className="text-base font-bold">${total.toFixed(2)}</span>
            </div>
            <button
                onClick={onCheckout}
                disabled={disabled}
                className={`w-full py-2 px-4 ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-500'} text-white rounded-lg transition`}
            >
                Check Out
            </button>
        </div>
    )
}