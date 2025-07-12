import { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { BookListContainer } from '../components/container/book-list-grid-container';
import type { OutletContextType } from '../types/books';
import { BookCoverPreviewModalContainer } from '../components/container/book-cover-preview-modal-container';

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
            <BookListContainer />
            <BookCoverPreviewModalContainer />
        </>
    );
}