import { useState } from 'react'
import { RatingStars } from '../ui/rating-stars'
import { useAppDispatch } from '../../redux/store'
import { setRating } from '../../redux/books-slice'
import type { RatingStarsContainerProps } from '../../types/books'

export function RatingStarsContainer({ value, onRate, isbn13 }: RatingStarsContainerProps) {
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<number | null>(null)

    const handleRate = (val: number) => {
        if (onRate) {
            onRate(val)
        } else if (isbn13) {
            dispatch(setRating({ isbn13, rating: val }))
        }
    }

    return (
        <RatingStars
            value={value}
            hovered={hovered}
            onRate={handleRate}
            onHover={setHovered}
        />
    )
}