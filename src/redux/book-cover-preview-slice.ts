import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BookType } from '../types/books'
import type { BookPreviewStateType } from '../types/types'

const initialState: BookPreviewStateType = {
    data: null,
    isShownModal: false,
}

export const bookCoverPreview = createSlice({
    name: 'bookCoverPreview',
    initialState,
    reducers: {
        setCoverPreview: (state, action: PayloadAction<BookType>) => {
            state.data = action.payload
        },
        hideCoverPreview: state => {
            state.isShownModal = false
        },
        clearCoverPreview: state => {
            state.data = null
        },
        showCoverPreview: state => {
            state.isShownModal = true
        },
    },
})

export const { setCoverPreview, hideCoverPreview, clearCoverPreview, showCoverPreview } =
    bookCoverPreview.actions
export const bookCoverPreviewReducer = bookCoverPreview.reducer