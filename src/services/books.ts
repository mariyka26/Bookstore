import { getBooksByIsbn13Endpoint, listNewBooksEndpoint, listBooksEndpoint } from "../config/api";
import { baseUrl } from "../config/api";
import type {
    BooksParamsType,
    BooksResponseType,
    RawBooksApiResponse,
    BookType,
} from '../types/books';
import { get, post } from "../config/client";

// API всегда отдаёт 10 книг
const API_PAGE_SIZE = 10;

export async function requestBooks(
    { query, page = 1, limit = 12 }: BooksParamsType,
): Promise<BooksResponseType> {
    /* вычисляем диапазон нужных API‑страниц */
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    const apiPageStart = Math.floor(startIndex / API_PAGE_SIZE) + 1;
    const apiPageEnd = Math.floor(endIndex / API_PAGE_SIZE) + 1;

    const all: BookType[] = [];
    let total = 0;

    for (let p = apiPageStart; p <= apiPageEnd; p++) {
        const url = baseUrl +
            listNewBooksEndpoint
                .replace('{query}', encodeURIComponent(query))
                .replace('{page}', String(p));

        const { data } = await get<RawBooksApiResponse>(url);

        const numericTotal = Number(data.total);
        if (numericTotal > 0) total = numericTotal;

        all.push(...data.books);
    }

    /* берём ровно limit элементов */
    const sliceFrom = startIndex % API_PAGE_SIZE;
    const books = all.slice(sliceFrom, sliceFrom + limit);

    /* приводим всё к BooksResponseType */
    return {
        error: '0',
        total: String(total),
        page: String(page),
        books,
    };
}