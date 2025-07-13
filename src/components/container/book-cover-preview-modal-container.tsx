import { useAppDispatch, useAppSelector } from '../../redux/store'
import { hideCoverPreview, clearCoverPreview } from '../../redux/book-cover-preview-slice'
import { BookCoverPreviewModal } from '../ui/book-cover-preview-modal'

export function BookCoverPreviewModalContainer() {
    const { data, isShownModal } = useAppSelector((s) => s.bookCoverPreview)
    const dispatch = useAppDispatch()

    if (!data) return null

    const handleClose = () => {
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