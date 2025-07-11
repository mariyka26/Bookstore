/** Параметры, которые принимает requestBooks */
export type BooksParamsType = {
    query: string;
    page?: number;   // номер нашей «пользовательской» страницы (по умолчанию 1)
    limit?: number;  // сколько книг на страницу, по умолчанию 12
};

/** Одна книга */
export type BookType = {
    id: number;
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
    qty?: number
    pdf?: Record<string, string>;
};

/** То, что возвращает API  ITBookStore за один запрос */
export type RawBooksApiResponse = {
    error: string;      // "0"
    total: string;      // общее кол‑во результатов
    page: string;       // номер запрошенной API‑страницы
    books: BookType[];  // всегда ≤ 10 книг
};

/** Объединённый, «агрегированный» ответ вашего сервиса */
export type BooksResponseType = {
    error: '0';
    total: string;      // то же, но строкой
    page: string;       // номер «пользовательской» страницы
    books: BookType[];  // ровно limit книг (обычно 12, но может быть меньше на последней)
};

/** Состояние среза books в Redux‑store */
export type BooksStateType = {
    list: BookType[];       // текущая страница
    total: number;          // общее кол‑во результатов
    isLoading: boolean;
    error: string | null;
    favorites: BookType[];  // «избранное»
    cart: BookType[];       // «корзина»
    ratings: Record<string, number>;  // рейтинги
    recentlyViewed: BookType[];
};

export type BooksActionType = {
    type: string;
    payload?: any;
};

export type BookDetailsType = {
    id: number;
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
    desc: string;
    rating: string;
    year: string;
    pages: string;
    lang: string;
    publisher: string;
    authors: string[];
    format?: string;
    language?: string;
    pdf?: Record<string, string>;
};

export type BookDetailsApiResponse = BookDetailsType;

export type BookWithQty = BookType & { qty?: number };