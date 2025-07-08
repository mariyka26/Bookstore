import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { BookList } from '../components/book-list'
import { BookCoverPreviewModal } from '../components/book-cover-preview-modal'
import type { OutletContextType } from '../types/types'

export function Main(): React.ReactElement {
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()

    useEffect(() => {
        setTitle('New Releases Books')
        setShowSubscribe(true);
    }, [setTitle, setShowSubscribe])

    return (
        <>
            <BookList />
            <BookCoverPreviewModal />
        </>
    );
}