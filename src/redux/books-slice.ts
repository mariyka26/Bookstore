import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
    BooksStateType,
    BookType,
    BooksParamsType,
    BooksResponseType,
    BookWithQty
} from '../types/books';
import { requestBooks } from '../services/books';
import {
    loadFavorites,
    saveFavorites,
    loadCart,
    saveCart,
    loadRatings,
    saveRatings,
    loadRecentlyViewed,
    saveRecentlyViewed
} from '../utils/local-storage';

export const BOOKS_LIMIT = 12;

export const fetchBooks = createAsyncThunk<
    BooksResponseType,
    BooksParamsType,
    { rejectValue: string }
>('books/fetchBooks', async (params, { rejectWithValue }) => {
    try {
        return await requestBooks({ limit: BOOKS_LIMIT, ...params });
    } catch {
        return rejectWithValue('Failed to load books');
    }
});

const initialState: BooksStateType = {
    list: [],
    total: 0,
    isLoading: false,
    error: null,
    favorites: loadFavorites(),
    cart: loadCart(),
    ratings: loadRatings(),
    recentlyViewed: loadRecentlyViewed(),
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        toggleFavorite: (state, { payload }: PayloadAction<BookType>) => {
            const isFav = state.favorites.some((b) => b.isbn13 === payload.isbn13);
            if (isFav) {
                state.favorites = state.favorites.filter((b) => b.isbn13 !== payload.isbn13);
            } else {
                state.favorites.push(payload);
            }
            saveFavorites(state.favorites);
        },

        addToCart: (state, { payload }: PayloadAction<BookType>) => {
            const existing = state.cart.find((b) => b.isbn13 === payload.isbn13);
            if (existing) {
                existing.qty = (existing.qty ?? 0) + 1;
            } else {
                state.cart.push({ ...payload, qty: 1 } as BookWithQty);
            }
            saveCart(state.cart);
        },

        removeFromCart: (state, { payload }: PayloadAction<string>) => {
            state.cart = state.cart.filter((b) => b.isbn13 !== payload);
            saveCart(state.cart);
        },

        updateQty: (
            state,
            { payload }: PayloadAction<{ isbn13: string; qty: number }>
        ) => {
            const book = state.cart.find((b) => b.isbn13 === payload.isbn13);
            if (book) {
                book.qty = payload.qty;
                saveCart(state.cart);
            }
        },

        clearCart: (state) => {
            state.cart = [];
            saveCart(state.cart);
        },

        setRating: (
            state,
            { payload }: PayloadAction<{ isbn13: string; rating: number }>
        ) => {
            console.log("Setting rating:", payload);
            state.ratings[payload.isbn13] = payload.rating;
            saveRatings(state.ratings);
        },

        addToRecentlyViewed: (state, { payload }: PayloadAction<BookType>) => {
            // Удаляем книгу из списка, если она уже там есть
            state.recentlyViewed = state.recentlyViewed.filter(b => b.isbn13 !== payload.isbn13);

            // Добавляем книгу в начало списка
            state.recentlyViewed.unshift(payload);

            // Ограничиваем список до 10 книг
            if (state.recentlyViewed.length > 10) {
                state.recentlyViewed.pop();
            }

            // Сохраняем обновленный список
            saveRecentlyViewed(state.recentlyViewed);
        },
    },

    extraReducers: (builder) =>
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBooks.rejected, (state, { payload, error }) => {
                state.isLoading = false;
                state.error = payload ?? error.message ?? 'Unknown error';
            })
            .addCase(fetchBooks.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.list = payload.books;
                state.total = Number(payload.total);
            }),
});

export const booksReducer = booksSlice.reducer;
export const {
    toggleFavorite,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    setRating,
    addToRecentlyViewed,
} = booksSlice.actions;
