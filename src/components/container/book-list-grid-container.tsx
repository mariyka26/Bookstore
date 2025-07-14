import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchBooks, BOOKS_LIMIT } from '../../redux/books-slice'
import { BookListGrid } from '../ui/books/book-list-grid'
import type { ReactElement } from 'react'

export function BookListContainer(): ReactElement | null {
    const { query = '', page = '1' } = useParams<{ query?: string, page?: string }>()
    const currentPage = Number(page)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list, total, error, isLoading } = useAppSelector((s) => s.books)

    useEffect(() => {
        if (query) {
            dispatch(fetchBooks({ query, page: currentPage }))
        }
    }, [dispatch, query, currentPage])

    const handlePageChange = (newPage: number): void => {
        navigate(`/books/${query}/${newPage}`)
    }

    if (isLoading) return <p>Loading…</p>
    if (error) return <p className="text-red-500 text-center">{error}</p>

    return (
        <BookListGrid
            books={list}
            currentPage={currentPage}
            total={total}
            limit={BOOKS_LIMIT}
            onPageChange={handlePageChange}
        />
    )
}
