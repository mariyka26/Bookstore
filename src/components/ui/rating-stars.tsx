import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

type Props = {
    value: number;
    hovered: number | null;
    onRate: (value: number) => void;
    onHover: (value: number | null) => void;
};

export function RatingStars({ value, hovered, onRate, onHover }: Props) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;
                const isFilled = hovered !== null ? index <= hovered : index <= value;

                return (
                    <button
                        key={index}
                        onClick={() => onRate(index)}
                        onMouseEnter={() => onHover(index)}
                        onMouseLeave={() => onHover(null)}
                        className="transition"
                    >
                        {isFilled ? (
                            <StarSolid className="text-yellow-400" style={{ width: 20, height: 20 }} />
                        ) : (
                            <StarOutline
                                className={hovered ? 'text-yellow-200' : 'text-gray-300'}
                                style={{ width: 20, height: 20 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
