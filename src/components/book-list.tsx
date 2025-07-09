import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchBooks } from '../redux/books-slice';
import { CardBookTile } from './card-book-tile';
import { BOOKS_LIMIT } from '../redux/books-slice';
import { Pagination } from './pagination';

export function BookList() {
    const { query = '', page = '1' } = useParams(); // строковые параметры из URL
    const currentPage = Number(page);

    const dispatch = useAppDispatch();
    const { list, error, isLoading, total } = useAppSelector(
        (state) => state.books,
    );

    // загружаем книги при изменении запроса или страницы
    useEffect(() => {
        if (query) dispatch(fetchBooks({ query, page: currentPage }));
    }, [dispatch, query, currentPage]);

    if (isLoading) return <p>Loading…</p>;
    if (error) return <p className="alert alert-danger">{error}</p>;
    if (!list.length) return <p>List is empty</p>;

    return (
        <div>
            <Pagination
                total={total}
                currentPage={currentPage}
                query={query}
                limit={BOOKS_LIMIT}
            />

            {/* GRID */}
            <div className="grid gap-8 
                      sm:grid-cols-2 
                      lg:grid-cols-3
                      xl:gap-x-12 xl:gap-y-14">
                {list.map((book, idx) => (
                    <CardBookTile key={book.isbn13} index={idx} {...book} />
                ))}
            </div>
        </div>
    );
}
