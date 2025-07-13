import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BookType, BookPreviewStateType } from '../types/books'

// Начальное состояние
const initialState: BookPreviewStateType = {
    data: null,
    isShownModal: false,
}

// Slice
export const bookCoverPreview = createSlice({
    name: 'bookCoverPreview',
    initialState,
    reducers: {
        setCoverPreview: (state, action: PayloadAction<BookType>): void => {
            state.data = action.payload
        },
        hideCoverPreview: (state): void => {
            state.isShownModal = false
        },
        clearCoverPreview: (state): void => {
            state.data = null
        },
        showCoverPreview: (state): void => {
            state.isShownModal = true
        },
    },
})

// Reducer
export const bookCoverPreviewReducer = bookCoverPreview.reducer

// Actions
export const {
    setCoverPreview,
    hideCoverPreview,
    clearCoverPreview,
    showCoverPreview,
} = bookCoverPreview.actions