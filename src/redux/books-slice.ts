import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type {
    BooksStateType,
    BookType,
    BooksParamsType,
    BooksResponseType,
    BookWithQty,
} from '../types/books'
import { requestBooks } from '../services/books'
import {
    loadFavorites,
    saveFavorites,
    loadCart,
    saveCart,
    loadRatings,
    saveRatings,
    loadRecentlyViewed,
    saveRecentlyViewed,
} from '../utils/local-storage'

export const BOOKS_LIMIT = 12

// Async thunk
export const fetchBooks = createAsyncThunk<
    BooksResponseType,
    BooksParamsType,
    { rejectValue: string }
>('books/fetchBooks', async (params, { rejectWithValue }) => {
    try {
        return await requestBooks({ limit: BOOKS_LIMIT, ...params })
    } catch {
        return rejectWithValue('Failed to load books')
    }
})

// Начальное состояние
const initialState: BooksStateType = {
    list: [],
    total: 0,
    isLoading: false,
    error: null,
    favorites: loadFavorites(),
    cart: loadCart(),
    ratings: loadRatings(),
    recentlyViewed: loadRecentlyViewed(),
}

// Slice
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<BookType>) => {
            const book = action.payload
            const isFav = state.favorites.some((b) => b.isbn13 === book.isbn13)
            state.favorites = isFav
                ? state.favorites.filter((b) => b.isbn13 !== book.isbn13)
                : [...state.favorites, book]
            saveFavorites(state.favorites)
        },

        addToCart: (state, action: PayloadAction<BookType>) => {
            const book = action.payload
            const existing = state.cart.find((b) => b.isbn13 === book.isbn13)
            if (existing) {
                existing.qty = (existing.qty ?? 0) + 1
            } else {
                const newBook: BookWithQty = { ...book, qty: 1 }
                state.cart.push(newBook)
            }
            saveCart(state.cart)
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const isbn13 = action.payload
            state.cart = state.cart.filter((b) => b.isbn13 !== isbn13)
            saveCart(state.cart)
        },

        updateQty: (
            state,
            action: PayloadAction<{ isbn13: string; qty: number }>
        ) => {
            const { isbn13, qty } = action.payload
            const book = state.cart.find((b) => b.isbn13 === isbn13)
            if (book) {
                book.qty = qty
                saveCart(state.cart)
            }
        },

        clearCart: (state) => {
            state.cart = []
            saveCart(state.cart)
        },

        setRating: (
            state,
            action: PayloadAction<{ isbn13: string; rating: number }>
        ) => {
            const { isbn13, rating } = action.payload
            state.ratings[isbn13] = rating
            saveRatings(state.ratings)
        },

        addToRecentlyViewed: (state, action: PayloadAction<BookType>) => {
            const book = action.payload

            state.recentlyViewed = state.recentlyViewed.filter((b) => b.isbn13 !== book.isbn13)

            state.recentlyViewed.unshift(book)

            if (state.recentlyViewed.length > 10) {
                state.recentlyViewed.pop()
            }

            saveRecentlyViewed(state.recentlyViewed)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBooks.rejected, (state, { payload, error }) => {
                state.isLoading = false
                state.error = payload ?? error.message ?? 'Unknown error'
            })
            .addCase(fetchBooks.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.list = payload.books
                state.total = Number(payload.total)
            })
    },
})

// Reducer
export const booksReducer = booksSlice.reducer

// Actions
export const {
    toggleFavorite,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    setRating,
    addToRecentlyViewed,
} = booksSlice.actions