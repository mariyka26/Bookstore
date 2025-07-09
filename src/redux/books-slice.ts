import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
    BooksStateType,
    BookType,
    BooksParamsType,
    BooksResponseType,
} from '../types/books';
import { requestBooks } from '../services/books';
import { loadFavorites, saveFavorites } from '../utils/local-storage';

export const BOOKS_LIMIT = 12;

/* ---------- THUNK ---------- */
export const fetchBooks = createAsyncThunk<
    BooksResponseType,        // возвращаемое значение
    BooksParamsType,          // аргумент
    { rejectValue: string }   // тип reject
>('books/fetchBooks', async (params, { rejectWithValue }) => {
    try {
        return await requestBooks({ limit: BOOKS_LIMIT, ...params });
    } catch {
        return rejectWithValue('Failed to load books');
    }
});

/* ---------- INITIAL STATE ---------- */
const initialState: BooksStateType = {
    list: [],
    total: 0,
    isLoading: false,
    error: null,
    favorites: loadFavorites(),
};

/* ---------- SLICE ---------- */
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

/* ---------- EXPORTS ---------- */
export const booksReducer = booksSlice.reducer;
export const { toggleFavorite } = booksSlice.actions;
