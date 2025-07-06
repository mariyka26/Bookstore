import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {
    BooksStateType,
    BookType,
    BooksParamsType,
    BooksResponseType,
} from '../types/books';
import { requestBooks } from '../services/books';

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
    favorites: [],
    total: 0,
    isLoading: false,
    error: null,
};

/* ---------- SLICE ---------- */
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addFavorite: (state, { payload }: PayloadAction<BookType>) => {
            state.favorites.push(payload);
        },
        removeFavorite: (state, { payload }: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((b) => b.isbn13 !== payload);
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
export const { addFavorite, removeFavorite } = booksSlice.actions;