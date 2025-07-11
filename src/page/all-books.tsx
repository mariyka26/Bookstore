import { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { BookList } from '../components/book-list';
import { BookCoverPreviewModal } from '../components/book-cover-preview-modal';
import type { OutletContextType } from '../types/types';

export function AllBooks(): React.ReactElement {
    const { query } = useParams();
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>();

    useEffect(() => {
        const isDefaultQuery = !query || query === 'all';
        const title = isDefaultQuery
            ? 'All Books'
            : `Найденные книги по запросу "${query}"`;

        setTitle(title);
        setShowSubscribe(isDefaultQuery);
    }, [query, setTitle, setShowSubscribe]);

    return (
        <>
            <BookList />
            <BookCoverPreviewModal />
        </>
    );
}