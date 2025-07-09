import { CardBookRowFavorite } from './card-book-row-favorite';
import { useAppSelector, type RootState } from '../redux/store';

export function FavoriteBooksList() {
    const favorites = useAppSelector((s: RootState) => s.books.favorites);

    if (!favorites.length)
        return <p className="text-center text-gray-500">Здесь пока пусто — добавьте книги ♥</p>;

    return (
        <div className="space-y-4">
            {favorites.map((b) => (
                <CardBookRowFavorite key={b.isbn13} {...b} />
            ))}
        </div>
    );
}