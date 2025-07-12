// components/book/BookSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import type { BookType } from '../../../types/books';
import { BookCardContainer } from '../../container/book-card-container';

type Props = {
    books: BookType[];
    title: string;
};

export function BookSlider({ books, title }: Props) {

    return (
        <section className="relative my-8">
            <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex gap-2">
                    <button className="swiper-button-prev-custom p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="swiper-button-next-custom p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {books.map((book) => (
                    <SwiperSlide key={book.isbn13}>
                        <BookCardContainer book={book} view="tile" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
