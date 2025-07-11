// page/all-new-books.tsx
import { NewBooks } from '../components/new-books';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { OutletContextType } from '../types/types';
import { requestNewBooks } from '../services/books';

export function AllNewBooks() {
    const { setTitle } = useOutletContext<OutletContextType>();

    useEffect(() => {
        setTitle('New Books');
    }, [setTitle]);

    return <NewBooks fetcher={requestNewBooks} />;
}
