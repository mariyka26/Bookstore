import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { requestBookDetails } from '../services/books'
import type { BookDetailsType, BookDetailsState } from '../types/books'

// Async thunk
export const fetchBookDetails = createAsyncThunk<
    BookDetailsType,
    string,
    { rejectValue: string }
>('bookDetails/fetch', async (isbn13, { rejectWithValue }) => {
    try {
        return await requestBookDetails(isbn13)
    } catch {
        return rejectWithValue('Failed to load book')
    }
})

// Начальное состояние
const initialState: BookDetailsState = {
    data: null,
    isLoading: false,
    error: null,
}

// Slice
const slice = createSlice({
    name: 'bookDetails',
    initialState,
    reducers: {
        clearBookDetails: (state): void => {
            state.data = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookDetails.pending, (state): void => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBookDetails.rejected, (state, action): void => {
                state.isLoading = false
                state.error = action.payload ?? 'Error'
            })
            .addCase(fetchBookDetails.fulfilled, (state, action: PayloadAction<BookDetailsType>): void => {
                state.isLoading = false
                state.data = action.payload
            })
    },
})

// Экспорты
export const { clearBookDetails } = slice.actions
export const bookDetailsReducer = slice.reducer