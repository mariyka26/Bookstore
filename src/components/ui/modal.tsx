import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import type { ModalProps } from '../../types/book-ui'

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => (
    <Transition show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={onClose}
        >
            <div className="min-h-screen px-4 text-center">
                {/* —‑‑‑ полупрозрачный фон —‑‑‑ */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 z-40" aria-hidden="true" />
                </Transition.Child>

                {/* трюк для вертикального центрирования */}
                <span className="inline-block h-screen align-middle" aria-hidden="true">
                    &#8203
                </span>

                {/* —‑‑‑ сама карточка —‑‑‑ */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 scale-95 translate-y-4"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 scale-95 translate-y-4"
                >

                    <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left
               align-middle transition-all transform bg-white shadow-xl rounded-lg
               relative z-50"  >
                        {/* заголовок */}
                        {title && (
                            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                                {title}
                            </Dialog.Title>
                        )}

                        {/* контент */}
                        {children}

                        {/* футер с кнопкой закрытия (по желанию) */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md
                           hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                           focus:ring-gray-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
)