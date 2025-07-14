import { useState, type FormEvent, type ReactElement, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../redux/store'
import { Header } from '../ui/header'
import type { HeaderContainerProps } from '../../types/books'

export function HeaderContainer({ container: Container }: HeaderContainerProps): ReactElement {
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()
    const favoritesCount = useAppSelector((s) => s.books.favorites.length)
    const cartCount = useAppSelector((s) =>
        s.books.cart.reduce((total, book) => total + (book.qty || 1), 0)
    )

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()
        if (!query.trim()) return
        navigate(`/books/${encodeURIComponent(query)}/1`)
        setQuery('')
    }

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value)
    }

    return (
        <Header
            container={Container}
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={handleSubmit}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
        />
    )
}
