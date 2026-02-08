import { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/ui/WriteReviewDialog';

interface Review {
  id: number;
  author: string;
  location?: string;
  date: string;
  rating: number;
  text: string;
  image?: string;
  verified?: boolean;
}

const productReviews: Review[] = [
  {
    id: 1,
    author: 'Кристина',
    location: 'Москва',
    date: '11.10.2025',
    rating: 5,
    text: 'Купила здесь диван. Диван хороший. Ткань велюр полный восторг. Отдельное спасибо менеджеру Анне помогла с выбором цвета, ткани. Так же спасибо доставщикам, позвонили за час, все подняли. Обязательно ещё вернусь сюда за мебелью.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    verified: true,
  },
  {
    id: 2,
    author: 'Елена',
    location: 'Санкт-Петербург',
    date: '05.03.2025',
    rating: 5,
    text: 'Изготовили вовремя. Диван очень красивый, большой и крепкий. Собрали быстро, все за собой убрали.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
    verified: true,
  },
  {
    id: 3,
    author: 'Елена',
    location: 'Краснодар',
    date: '08.02.2025',
    rating: 5,
    text: 'Диван очень понравился, хотя видела его только на картинке. Вживую он оказался ещё прекраснее!!! Сидеть и лежать на нём одно удовольствие!!! Отлично вписался в интерьер.',
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400',
    verified: true,
  },
  {
    id: 4,
    author: 'Игорь',
    location: 'Екатеринбург',
    date: '07.02.2025',
    rating: 5,
    text: 'Заказывал диван. Доставку осуществлял экипаж. Диван доставили в целостности и сохранности. Ребята поднимали на пятый этаж без лифта. Собрали быстро и аккуратно, просто Супер!',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400',
    verified: true,
  },
  {
    id: 5,
    author: 'Екатерина',
    location: 'Казань',
    date: '16.10.2024',
    rating: 4,
    text: 'В целом диван понравился. Очень хорошо встал в маленькую комнату. Цвет какой и хотелось. Единственный минус для меня — очень большие подушки, которые не влезают в ящик хранения.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400',
    verified: true,
  },
  {
    id: 6,
    author: 'Алексей',
    location: 'Новосибирск',
    date: '03.09.2024',
    rating: 5,
    text: 'Заказывали мебель для нового ресторана. Очень довольны качеством и сроками. Менеджер помог с выбором и учёл все наши пожелания. Рекомендуем!',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400',
    verified: true,
  },
  {
    id: 7,
    author: 'Марина',
    date: '20.08.2024',
    rating: 5,
    text: 'Прекрасная компания! Сделали диваны для нашего кафе точно по размерам. Качество на высоте, цены адекватные.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    verified: true,
  },
  {
    id: 8,
    author: 'Ольга',
    location: 'Ростов-на-Дону',
    date: '15.07.2024',
    rating: 5,
    text: 'Отличная компания, отличная мебель. Заказывали для кухни полубарные стулья. Посоветовали какой лучше материал выбрать, цвет.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
    verified: true,
  },
  {
    id: 9,
    author: 'Дмитрий',
    date: '02.06.2024',
    rating: 5,
    text: 'Покупали угловой диван для гостиной. Качество обивки превосходное, каркас крепкий. Доставили точно в срок.',
    image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=400',
    verified: true,
  },
  {
    id: 10,
    author: 'Анна',
    location: 'Самара',
    date: '18.05.2024',
    rating: 5,
    text: 'Заказывала кресло и пуф в комплекте. Цвета идеально совпали, ткань приятная на ощупь. Менеджер Николай помог с подбором — спасибо!',
    verified: true,
  },
  {
    id: 11,
    author: 'Сергей',
    date: '05.04.2024',
    rating: 4,
    text: 'Брали мебель для бара — 8 диванов и 12 стульев. Всё сделали за 2 недели. Качество отменное.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=401',
    verified: true,
  },
  {
    id: 12,
    author: 'Наталья',
    location: 'Нижний Новгород',
    date: '22.03.2024',
    rating: 4,
    text: 'Диван красивый и удобный. Немного задержали доставку на пару дней, но менеджер предупредил заранее.',
  },
];

const REVIEWS_PER_PAGE = 5;
const TOTAL_REVIEWS = 24;

// Rating distribution
const ratingDistribution = [
  { stars: 5, count: 16 },
  { stars: 4, count: 5 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const topicTags = [
  { label: 'Качество', count: 18 },
  { label: 'Доставка', count: 12 },
  { label: 'Обивка', count: 9 },
  { label: 'Комфорт', count: 7 },
  { label: 'Цена', count: 5 },
];

const averageRating = 4.7;

const reviewImages = productReviews.filter(r => r.image).map(r => r.image!);

export const ProductReviewsV2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (direction: 'left' | 'right') => {
    if (!stripRef.current) return;
    const scrollAmount = 300;
    stripRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const displayed = showAll ? productReviews : productReviews.slice(0, REVIEWS_PER_PAGE);
  const maxCount = Math.max(...ratingDistribution.map(r => r.count));

  return (
    <section className="section-padding">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Отзывы покупателей</h2>

        {/* Top section: Rating summary + Photo strip */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 mb-8">
          {/* Rating summary */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-bold">{averageRating}</span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{TOTAL_REVIEWS} отзывов</p>
              </div>
            </div>

            {/* Bar chart */}
            <div className="space-y-1.5">
              {ratingDistribution.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-8 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-muted-foreground">{stars}</span>
                  </div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo strip */}
          {reviewImages.length > 0 && (
            <div className="relative group/strip self-center">
              <button
                onClick={() => scrollStrip('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors opacity-0 group-hover/strip:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div
                ref={stripRef}
                className="flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reviewImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-lg overflow-hidden shrink-0"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollStrip('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors opacity-0 group-hover/strip:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Customers say */}
        <div className="mb-8 p-6 bg-muted/30 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Покупатели отмечают</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Покупатели хвалят качество обивки и прочность каркаса. Многие отмечают быструю и аккуратную доставку. 
            Некоторые покупатели обращают внимание на удобство и комфорт, а также на помощь менеджеров при выборе ткани и цвета.
          </p>
          {/* Topic tags */}
          <div className="flex flex-wrap gap-2">
            {topicTags.map(tag => (
              <span
                key={tag.label}
                className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                {tag.label} ({tag.count})
              </span>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
          <p className="text-sm text-muted-foreground">
            Показано {Math.min(displayed.length, productReviews.length)} из {TOTAL_REVIEWS} отзывов
          </p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по отзывам"
                className="pl-9 pr-4 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 w-[200px]"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReviewDialogOpen(true)}
            >
              Оставить отзыв
            </Button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="divide-y">
          {displayed.map((review) => (
            <div key={review.id} className="py-6 first:pt-0">
              <div className="flex gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-foreground text-foreground'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm">{review.author}</span>
                    {review.location && (
                      <span className="text-sm text-muted-foreground">{review.location}</span>
                    )}
                    {review.verified && (
                      <span className="text-xs text-primary font-medium underline">Проверенный покупатель</span>
                    )}
                    <span className="text-sm text-muted-foreground ml-auto">{review.date}</span>
                  </div>

                  <p className="text-foreground text-sm leading-relaxed mt-2">{review.text}</p>
                </div>

                {/* Photo on the right */}
                {review.image && (
                  <div className="shrink-0 w-[80px] h-[80px] rounded-lg overflow-hidden">
                    <img
                      src={review.image}
                      alt="Фото из отзыва"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show more */}
        {!showAll && productReviews.length > REVIEWS_PER_PAGE && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
            >
              Показать ещё отзывы
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        )}
        <WriteReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          productName="Диван прямой Клаймар Velvet Beige"
        />
      </div>
    </section>
  );
};
