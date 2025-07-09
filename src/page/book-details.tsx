import { useEffect } from 'react';
import { useOutletContext } from 'react-router'
import { BookDetails } from '../components/book-details'
import type { OutletContextType } from '../types/types'
import { useAppSelector } from '../redux/store';

export function BookDetailsPage(): React.ReactElement {
    console.log('BookDetailsPage');
    const { setTitle, setShowSubscribe } = useOutletContext<OutletContextType>()
    const book = useAppSelector((state) => state.bookDetails.data);

    useEffect(() => {
        if (!book) return;
        setTitle(book.title)
        setShowSubscribe(true);
    }, [book, setTitle, setShowSubscribe])

    return (
        <>
            <BookDetails />
        </>
    );
}