// page/all-new-books.tsx
import { NewBooksContainer } from '../components/container/new-books-container';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { OutletContextType } from '../types/books';
import { requestNewBooks } from '../services/books';

export function AllNewBooks() {
    const { setTitle } = useOutletContext<OutletContextType>();

    useEffect(() => {
        setTitle('New Books');
    }, [setTitle]);

    return <NewBooksContainer fetcher={requestNewBooks} />;
}