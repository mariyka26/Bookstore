import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import { booksReducer } from './books-slice'
import { bookCoverPreviewReducer } from './book-cover-preview-slice'

export const store = configureStore({
    reducer: {
        books: booksReducer,
        bookCoverPreview: bookCoverPreviewReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()