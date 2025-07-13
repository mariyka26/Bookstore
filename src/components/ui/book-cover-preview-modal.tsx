import { Modal } from './modal'
import type { BookCoverPreviewModalProps } from '../../types/book-ui'

export function BookCoverPreviewModal({ isShown, image, title, onClose }: BookCoverPreviewModalProps) {
    return (
        <Modal isOpen={isShown} onClose={onClose} title={title}>
            <img src={image} alt={title} className="w-full rounded-md" />
        </Modal>
    )
}