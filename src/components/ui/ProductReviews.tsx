import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
  image?: string;
}

const productReviews: Review[] = [
  {
    id: 1,
    author: 'Кристина',
    date: '11 октября 2025',
    rating: 5,
    text: 'Купила здесь диван. Диван хороший. Ткань велюр полный восторг. Отдельное спасибо менеджеру Анне помогла с выбором цвета, ткани. Так же спасибо доставщикам, позвонили за час, все подняли. Обязательно ещё вернусь сюда за мебелью.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  },
  {
    id: 2,
    author: 'Елена',
    date: '5 марта 2025',
    rating: 5,
    text: 'Изготовили вовремя. Диван очень красивый, большой и крепкий. Собрали быстро, все за собой убрали.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
  },
  {
    id: 3,
    author: 'Елена',
    date: '8 февраля 2025',
    rating: 5,
    text: 'Диван очень понравился, хотя видела его только на картинке. Вживую он оказался ещё прекраснее!!! Сидеть и лежать на нём одно удовольствие!!! Отлично вписался в интерьер. Доставка вовремя, позвонили за 1 день и обговорили время доставки. Упаковка идеальная — плёнка + картон!',
  },
  {
    id: 4,
    author: 'Игорь',
    date: '7 февраля 2025',
    rating: 5,
    text: 'Заказывал диван. Доставку осуществлял экипаж. Диван доставили в целостности и сохранности. Ребята поднимали на пятый этаж без лифта. Собрали быстро и аккуратно, просто Супер! Ребята всё рассказали и объяснили. Огромное Спасибо!!! Рекомендую!',
  },
  {
    id: 5,
    author: 'Екатерина',
    date: '16 октября 2024',
    rating: 4,
    text: 'В целом диван понравился. Очень хорошо встал в маленькую комнату. Цвет какой и хотелось. Единственный минус для меня — очень большие подушки, которые не влезают в ящик хранения.',
  },
  {
    id: 6,
    author: 'Алексей',
    date: '3 сентября 2024',
    rating: 5,
    text: 'Заказывали мебель для нового ресторана. Очень довольны качеством и сроками. Менеджер помог с выбором и учёл все наши пожелания. Рекомендуем!',
  },
  {
    id: 7,
    author: 'Марина',
    date: '20 августа 2024',
    rating: 5,
    text: 'Прекрасная компания! Сделали диваны для нашего кафе точно по размерам. Качество на высоте, цены адекватные. Спасибо за оперативность!',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400',
  },
  {
    id: 8,
    author: 'Ольга',
    date: '15 июля 2024',
    rating: 5,
    text: 'Отличная компания, отличная мебель. Заказывали для кухни полубарные стулья. Посоветовали какой лучше материал выбрать, цвет. Заказ выполнили быстро. Всем советую!',
  },
];

const REVIEWS_PER_PAGE = 5;
const TOTAL_REVIEWS = 24;

const reviewImages = productReviews.filter(r => r.image).map(r => r.image!);

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

const avatarColors = [
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-cyan-100 text-cyan-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
];

export const ProductReviews = () => {
  const [filter, setFilter] = useState<'all' | 'photo'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = filter === 'photo'
    ? productReviews.filter(r => r.image)
    : productReviews;

  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const photoCount = productReviews.filter(r => r.image).length;

  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Отзывы о товаре{' '}
            <span className="text-muted-foreground font-normal text-xl">{TOTAL_REVIEWS}</span>
          </h2>
        </div>

        {/* Photo strip */}
        {reviewImages.length > 0 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {reviewImages.map((img, i) => (
              <div
                key={i}
                className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-lg overflow-hidden shrink-0 border"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {TOTAL_REVIEWS - reviewImages.length > 0 && (
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-lg bg-foreground text-background flex items-center justify-center shrink-0 text-base font-medium">
                +{TOTAL_REVIEWS - reviewImages.length}
              </div>
            )}
          </div>
        )}

        {/* Filter tabs + Add review button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => { setFilter('all'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === 'all'
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              Все отзывы <span className="opacity-70">{TOTAL_REVIEWS}</span>
            </button>
            <button
              onClick={() => { setFilter('photo'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === 'photo'
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              Только с фото <span className="opacity-70">{photoCount}</span>
            </button>
          </div>
          <Button variant="default">Добавить отзыв</Button>
        </div>

        {/* Reviews list */}
        <div className="divide-y">
          {paged.map((review, idx) => (
            <div key={review.id} className="py-6 first:pt-0 last:pb-0">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${avatarColors[idx % avatarColors.length]}`}>
                  {getInitial(review.author)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-foreground text-sm leading-relaxed">{review.text}</p>

                  {review.image && (
                    <div className="mt-3 w-[200px] h-[140px] rounded-lg overflow-hidden">
                      <img
                        src={review.image}
                        alt="Фото из отзыва"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-foreground text-background'
                    : 'hover:bg-muted'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
