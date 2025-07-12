import { Modal } from './modal'

type Props = {
    isShown: boolean;
    image: string;
    title: string;
    onClose: () => void;
};

export function BookCoverPreviewModal({ isShown, image, title, onClose }: Props) {
    return (
        <Modal isOpen={isShown} onClose={onClose} title={title}>
            <img src={image} alt={title} className="w-full rounded-md" />
        </Modal>
    );
}