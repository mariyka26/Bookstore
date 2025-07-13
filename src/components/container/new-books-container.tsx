import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { NewBooks } from '../ui/books/new-books'
import type { NewBooksContainerProps } from '../../types/book-ui'
import type { BookType } from '../../types/books'
import type { OutletContextType } from '../../types/books'

export function NewBooksContainer({ fetcher }: NewBooksContainerProps) {
    const { setShowSubscribe } = useOutletContext<OutletContextType>()
    const [books, setBooks] = useState<BookType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setShowSubscribe(false)

        fetcher()
            .then((data) => {
                setBooks(data.books)
                setIsLoading(false)
            })
            .catch(() => {
                setError('Ошибка загрузки книг')
                setIsLoading(false)
            })
    }, [fetcher, setShowSubscribe])

    return (
        <NewBooks books={books} isLoading={isLoading} error={error} />
    )
}