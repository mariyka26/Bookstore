import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestBookDetails } from '../services/books';
import type { BookDetailsType } from '../types/books';

export const fetchBookDetails = createAsyncThunk<
    BookDetailsType,
    string,
    { rejectValue: string }
>('bookDetails/fetch', async (isbn13, { rejectWithValue }) => {
    try {
        return await requestBookDetails(isbn13);
    } catch {
        return rejectWithValue('Failed to load book');
    }
});

type BookDetailsState = {
    data: BookDetailsType | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: BookDetailsState = {
    data: null,
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'bookDetails',
    initialState,
    reducers: {
        clearBookDetails: (state) => { state.data = null; state.error = null; },

    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchBookDetails.pending, (s) => { s.isLoading = true; s.error = null; })
            .addCase(fetchBookDetails.rejected, (s, a) => { s.isLoading = false; s.error = a.payload ?? 'Error'; })
            .addCase(fetchBookDetails.fulfilled, (s, a) => { s.isLoading = false; s.data = a.payload; }),
});

export const { clearBookDetails } = slice.actions;
export const bookDetailsReducer = slice.reducer;