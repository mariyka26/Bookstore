import { useState } from 'react';
import { RatingStars } from '../ui/rating-stars';
import { useAppDispatch } from '../../redux/store';
import { setRating } from '../../redux/books-slice';

type Props = {
    value: number;
    onRate?: (value: number) => void;
    isbn13?: string; // Добавляем опциональный параметр isbn13
};

export function RatingStarsContainer({ value, onRate, isbn13 }: Props) {
    const dispatch = useAppDispatch();
    const [hovered, setHovered] = useState<number | null>(null);

    const handleRate = (val: number) => {
        if (onRate) {
            // Если передан обработчик, используем его
            onRate(val);
        } else if (isbn13) {
            // Если передан isbn13, но нет обработчика, используем dispatch напрямую
            dispatch(setRating({ isbn13, rating: val }));
        }
    };

    return (
        <RatingStars
            value={value}
            hovered={hovered}
            onRate={handleRate}
            onHover={setHovered}
        />
    );
}
