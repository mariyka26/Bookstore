import { Modal } from './modal'
import { hideCoverPreview, clearCoverPreview } from '../redux/book-cover-preview-slice'
import { useAppDispatch, useAppSelector } from '../redux/store'

export function BookCoverPreviewModal() {
    const { data, isShownModal } = useAppSelector((s) => s.bookCoverPreview);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(hideCoverPreview());
        dispatch(clearCoverPreview());
    };

    if (!data) return null;  // ⬅️ нет картинки — нет модалки

    return (
        <Modal
            isOpen={isShownModal}
            onClose={handleClose}
            title={data.title}     /* опционально показываем заголовок */
        >
            <img
                src={data.image}
                alt={data.title}
                className="w-full rounded-md"
            />
        </Modal>
    );
}