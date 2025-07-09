export function loadFavorites() {
    try {
        const json = localStorage.getItem('favorites');
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}

export function saveFavorites(favs: unknown) {
    try {
        localStorage.setItem('favorites', JSON.stringify(favs));
    } catch {
        /* ignore */
    }
}