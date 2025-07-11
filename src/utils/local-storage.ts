import type { BookType } from '../types/books';

export function loadFavorites(): BookType[] {
    try {
        const json = localStorage.getItem('favorites');
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}

export function saveFavorites(favs: BookType[]): void {
    try {
        localStorage.setItem('favorites', JSON.stringify(favs));
    } catch {
        /* ignore */
    }
}

export function loadCart(): BookType[] {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
}

export function saveCart(cart: BookType[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const loadRatings = (): Record<string, number> => {
    try {
        return JSON.parse(localStorage.getItem('ratings') || '{}');
    } catch {
        return {};
    }
};

export const saveRatings = (ratings: Record<string, number>) => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
};

export function loadRecentlyViewed(): BookType[] {
    try {
        const json = localStorage.getItem('recentlyViewed');
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}

export function saveRecentlyViewed(books: BookType[]): void {
    try {
        localStorage.setItem('recentlyViewed', JSON.stringify(books));
    } catch {
        /* ignore */
    }
}