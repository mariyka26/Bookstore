import {
    getBooksByIsbn13Endpoint,
    listNewBooksEndpoint,
    listBooksEndpoint,
    baseUrl,
} from '../config/api'

import { get } from '../config/client'

import type {
    BooksParamsType,
    BooksResponseType,
    RawBooksApiResponse,
    BookType,
    BookDetailsType,
    BookDetailsApiResponse,
} from '../types/books'

const API_PAGE_SIZE = 10

export async function requestBooks(
    { query, page = 1, limit = 12 }: BooksParamsType
): Promise<BooksResponseType> {
    const startIndex: number = (page - 1) * limit
    const endIndex: number = startIndex + limit - 1
    const apiPageStart: number = Math.floor(startIndex / API_PAGE_SIZE) + 1
    const apiPageEnd: number = Math.floor(endIndex / API_PAGE_SIZE) + 1

    const all: BookType[] = []
    let total: number = 0

    for (let p: number = apiPageStart; p <= apiPageEnd; p++) {
        const url: string =
            baseUrl +
            listBooksEndpoint
                .replace('{query}', encodeURIComponent(query))
                .replace('{page}', String(p))

        const { data } = await get<RawBooksApiResponse>(url)

        const numericTotal: number = Number(data.total)
        if (numericTotal > 0) total = numericTotal

        all.push(...data.books)
    }

    const sliceFrom: number = startIndex % API_PAGE_SIZE
    const books: BookType[] = all.slice(sliceFrom, sliceFrom + limit)

    return {
        error: '0',
        total: String(total),
        page: String(page),
        books,
    }
}

export async function requestBookDetails(isbn13: string): Promise<BookDetailsType> {
    const url: string = baseUrl + getBooksByIsbn13Endpoint.replace('{isbn13}', isbn13)
    const { data } = await get<BookDetailsApiResponse>(url)

    return data
}

export async function requestNewBooks(): Promise<BooksResponseType> {
    const url: string = baseUrl + listNewBooksEndpoint
    const { data } = await get<RawBooksApiResponse>(url)

    return {
        error: '0',
        total: String(data.books.length),
        page: '1',
        books: data.books,
    }
}