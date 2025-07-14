import type { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { hideCoverPreview, clearCoverPreview } from '../../redux/book-cover-preview-slice'
import { BookCoverPreviewModal } from '../ui/book-cover-preview-modal'

export function BookCoverPreviewModalContainer(): ReactElement | null {
    const { data, isShownModal } = useAppSelector((s) => s.bookCoverPreview)
    const dispatch = useAppDispatch()

    if (!data) return null

    const handleClose = (): void => {
        dispatch(hideCoverPreview())
        dispatch(clearCoverPreview())
    }

    return (
        <BookCoverPreviewModal
            isShown={isShownModal}
            image={data.image}
            title={data.title}
            onClose={handleClose}
        />
    )
}