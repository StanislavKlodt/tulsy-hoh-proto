import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Truck, FileText, UserCheck, Star, Quote, Package, Shield, Clock, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuoteRequestDialog } from '@/components/ui/QuoteRequestDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { CustomSizeDialog } from '@/components/ui/CustomSizeDialog';

import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const fabricSwatches = [
  { name: 'Велюр серый', color: '#6B7280' },
  { name: 'Велюр зелёный', color: '#065F46' },
  { name: 'Рогожка бежевая', color: '#D4B896' },
  { name: 'Эко-кожа чёрная', color: '#1F2937' },
  { name: 'Эко-кожа коричневая', color: '#78350F' },
];

// Конфигурации размеров товара
interface SizeOption {
  id: string;
  label: string;
  dimensions: string;
  retailPrice: number;
  wholesalePrice: number;
  isCustom?: boolean;
}

const sizeOptions: SizeOption[] = [
  {
    id: 'size-1',
    label: '145×75×80 см',
    dimensions: '145×75×80 см',
    retailPrice: 89900,
    wholesalePrice: 76415,
  },
  {
    id: 'size-2',
    label: '145×75×80 см',
    dimensions: '145×75×80 см',
    retailPrice: 99900,
    wholesalePrice: 84915,
  },
  {
    id: 'size-3',
    label: '155×75×80 см',
    dimensions: '155×75×80 см',
    retailPrice: 109900,
    wholesalePrice: 93415,
  },
  {
    id: 'size-custom',
    label: 'Ваш размер',
    dimensions: 'По вашим размерам',
    retailPrice: 0,
    wholesalePrice: 0,
    isCustom: true,
  },
];

// Отзывы
const reviews = [
  {
    id: 1,
    author: 'Екатерина',
    date: '17 января',
    platform: 'yandex' as const,
    rating: 5,
    text: 'Отличный продавец, особенные слова благодарности, менеджеру Игорю. Все рассказал, снял видео, помог с выбором. Хорошо упаковал и отправил нам. Работа выше всяких похвал!!!',
  },
  {
    id: 2,
    author: 'АМ',
    date: '27.12.2025',
    platform: 'yandex' as const,
    rating: 5,
    text: 'Отличное место, большой выбор живой мебели, потрогать и посидеть можно, большой выбор материалов. Несколько месяцев искали мебель для зоны отдыха, когда приехали Николай мгновенно понял...',
    hasMore: true,
  },
  {
    id: 3,
    author: 'Татьяна Турти',
    date: '27.12.2025',
    platform: 'yandex' as const,
    rating: 5,
    text: 'Всем доброго дня! Мы заказали в Tulsy диванчик для кухни. Сделали быстро и качественно! Диванчик получился супер классный! А менеджер Ленара - потрясающий специалист - вежливая, очень приятная в...',
    hasMore: true,
  },
  {
    id: 4,
    author: 'Ольга Буланова',
    date: '20.12.2025',
    platform: 'yandex' as const,
    rating: 5,
    text: 'Отличная компания, отличная мебель. Заказывали для кухни полубарные стулья. Посоветовали какой лучше материал выбрать, цвет. Заказ выполнили быстро. Всем советую, спасибо Вам большое! 👍',
  },
  {
    id: 5,
    author: 'Алексей Морозов',
    date: '15.12.2025',
    platform: '2gis' as const,
    rating: 5,
    text: 'Заказывали мебель для нового ресторана. Очень довольны качеством и сроками. Менеджер Николай помог с выбором и учел все наши пожелания. Рекомендуем!',
  },
  {
    id: 6,
    author: 'Марина Волкова',
    date: '10.12.2025',
    platform: '2gis' as const,
    rating: 5,
    text: 'Прекрасная компания! Сделали диваны для нашего кафе точно по размерам. Качество на высоте, цены адекватные. Спасибо за оперативность!',
  },
];



// "Что вы получаете" блоки
const benefits = [
  {
    id: 1,
    title: 'Проверено профессионалами',
    description: 'Мебель, созданная с учётом практики и обратной связи от реальных клиентов — то, что работает в зале каждый день',
    image: '/images/benefits/provereno-professionalami.png',
    type: 'image' as const,
  },
  {
    id: 2,
    title: 'Поставка за 10 дней',
    description: 'Доставим стандартные модели из наличия или изготовим индивидуальный вариант всего за 10 дней',
    image: '',
    type: 'text' as const,
  },
  {
    id: 3,
    title: 'Любые размеры и цвета на заказ',
    description: 'Индивидуальное исполнение под ваш проект: подберем размеры, формы, обивку',
    image: '/images/benefits/lyubye-razmery.jpg',
    type: 'image' as const,
  },
  {
    id: 4,
    title: 'Усиленный каркас для HoReCa',
    description: 'Надёжность, рассчитанная на ежедневную интенсивную эксплуатацию',
    image: '',
    type: 'text' as const,
  },
  {
    id: 5,
    title: 'Лёгкая чистка, износостойкие ткани',
    description: 'Специальная обивка для профессионального сегмента - всегда аккуратный вид, даже после сотен уборок',
    image: '/images/benefits/legkaya-chistka.jpg',
    type: 'image' as const,
  },
];

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [customSizeDialogOpen, setCustomSizeDialogOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<'all' | 'yandex' | '2gis'>('all');
  

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Товар не найден</h1>
          <Button asChild>
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  const getAvailabilityText = () => {
    switch (product.availability) {
      case 'instock':
        return { text: 'В наличии (1-2 дня)', className: 'text-emerald-600' };
      case '7days':
        return { text: 'Изготовление до 7 дней', className: 'text-amber-600' };
      case '10days':
        return { text: 'Изготовление до 10 дней', className: 'text-blue-600' };
    }
  };

  const availability = getAvailabilityText();
  const currentSize = sizeOptions[selectedSize];
  const isCustomSize = currentSize.isCustom;

  const displayRetailPrice = isCustomSize ? product.price : currentSize.retailPrice;
  const displayWholesalePrice = isCustomSize ? Math.round(product.price * 0.85) : currentSize.wholesalePrice;

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleSizeSelect = (index: number) => {
    const size = sizeOptions[index];
    if (size.isCustom) {
      setCustomSizeDialogOpen(true);
    } else {
      setSelectedSize(index);
    }
  };

  const handleAddToCart = () => {
    if (isCustomSize) {
      setCustomSizeDialogOpen(true);
      return;
    }
    addItem(product, quantity, { 
      upholstery: fabricSwatches[selectedFabric].name,
      configuration: currentSize.label 
    });
    toast.success('Товар добавлен в корзину');
  };

  // Mock multiple images
  const images = [
    product.image,
    product.image.replace('w=600', 'w=601'),
    product.image.replace('w=600', 'w=602'),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-4">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/catalog" className="hover:text-primary">Каталог</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/catalog/${product.categorySlug}`} className="hover:text-primary">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8 md:py-12">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                {product.name}
              </h1>

              {/* Prices - Retail & Wholesale */}
              <div className="mb-6 p-4 bg-muted/30 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Цена розница</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        {isCustomSize ? 'По запросу' : formatPrice(displayRetailPrice)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Цена оптовая</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {isCustomSize ? 'По запросу' : formatPrice(displayWholesalePrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-sm text-primary hover:underline font-medium">
                        Условия предоставления оптовых скидок
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-sm">
                      <p className="font-medium mb-2">❗ При заказе на сумму от 200 000 ₽ действует оптовая цена на все товары -5%.</p>
                      <p className="font-medium mb-2">Дополнительная скидка на диваны:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>-10% от общей суммы заказа 500 000 ₽</li>
                        <li>-15% от общей суммы заказа 1 000 000 ₽</li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Availability */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary mb-6 ${availability.className}`}>
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">{availability.text}</span>
              </div>

              {/* Size Selection */}
              <div className="mb-6 border rounded-xl">
                <div className="p-4 border-b">
                  <span className="font-medium">Размер</span>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sizeOptions.map((size, i) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeSelect(i)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                        selectedSize === i && !size.isCustom
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-background hover:border-foreground border-border'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Обивка: {fabricSwatches[selectedFabric].name}</h4>
                <div className="flex gap-2 flex-wrap">
                  {fabricSwatches.map((swatch, i) => (
                    <button
                      key={swatch.name}
                      onClick={() => setSelectedFabric(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedFabric === i ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                      }`}
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.name}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary text-sm font-medium mt-3 hover:underline"
                >
                  Ещё 200+ вариантов — подобрать с менеджером
                </button>
              </div>

              {/* Quantity and CTA */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none">
                  {isCustomSize ? 'Запросить расчёт' : 'В корзину'}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setQuoteDialogOpen(true)}>
                  Запросить КП
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Tabs */}
      <section className="pb-16">
        <div className="container-main">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Описание
              </TabsTrigger>
              <TabsTrigger 
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Характеристики
              </TabsTrigger>
              <TabsTrigger 
                value="delivery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Доставка
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p className="text-foreground">{product.description}</p>
                <p className="text-muted-foreground mt-4">
                  Мебель разработана специально для коммерческого использования в заведениях HoReCa.
                  Усиленный каркас, износостойкие материалы, удобная эргономика — всё для комфорта
                  ваших гостей и долгой службы.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="pt-6">
              <dl className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Габариты</dt>
                  <dd className="font-medium">{product.dimensions}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Материал каркаса</dt>
                  <dd className="font-medium">{product.material}</dd>
                </div>
                {product.upholstery && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">Обивка</dt>
                    <dd className="font-medium">{product.upholstery}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground">Категория</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
              </dl>
            </TabsContent>
            <TabsContent value="delivery" className="pt-6">
              <p className="text-foreground mb-4">
                Доставка осуществляется транспортными компаниями, Яндекс Доставкой или партнёрами.
              </p>
              <p className="text-muted-foreground">
                Стоимость доставки рассчитывается индивидуально в зависимости от региона и объёма заказа.
                Менеджер поможет подобрать оптимальный вариант после оформления заявки.
              </p>
              <Link to="/delivery" className="text-primary hover:underline inline-block mt-4">
                Подробнее о доставке →
              </Link>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Что вы получаете</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-2">
            {/* Левая колонка - 2 карточки друг под другом */}
            <div className="flex flex-col gap-4 md:row-span-2">
              {/* Проверено профессионалами */}
              <div className="relative rounded-xl overflow-hidden flex-1 min-h-[200px] group">
                <img 
                  src={benefits[0].image} 
                  alt={benefits[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-medium text-lg mb-2">{benefits[0].title}</p>
                  <p className="text-white/80 text-sm">{benefits[0].description}</p>
                </div>
              </div>
              
              {/* Усиленный каркас для HoReCa */}
              <div className="relative rounded-xl overflow-hidden bg-primary p-6 flex flex-col justify-end flex-1 min-h-[200px]">
                <p className="text-primary-foreground font-medium text-lg mb-2">{benefits[3].title}</p>
                <p className="text-primary-foreground/80 text-sm">{benefits[3].description}</p>
              </div>
            </div>

            {/* Средняя колонка - 2 карточки */}
            <div className="flex flex-col gap-4 md:row-span-2">
              {/* Поставка за 10 дней */}
              <div className="relative rounded-xl overflow-hidden bg-primary p-6 flex flex-col justify-end flex-1 min-h-[200px]">
                <p className="text-primary-foreground font-medium text-lg mb-2">{benefits[1].title}</p>
                <p className="text-primary-foreground/80 text-sm">{benefits[1].description}</p>
              </div>

              {/* Лёгкая чистка, износостойкие ткани */}
              <div className="relative rounded-xl overflow-hidden flex-1 min-h-[200px] group">
                <img 
                  src={benefits[4].image} 
                  alt={benefits[4].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-medium text-lg mb-2">{benefits[4].title}</p>
                  <p className="text-white/80 text-sm">{benefits[4].description}</p>
                </div>
              </div>
            </div>

            {/* Правая колонка - большая карточка на всю высоту */}
            {/* Любые размеры и цвета на заказ */}
            <div className="relative rounded-xl overflow-hidden md:row-span-2 min-h-[400px] md:min-h-0 group">
              <img 
                src={benefits[2].image} 
                alt={benefits[2].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-medium text-lg mb-2">{benefits[2].title}</p>
                <p className="text-white/80 text-sm">{benefits[2].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Почему выбирают "Tulsy"</h2>
          <p className="text-muted-foreground mb-8">Лучше всего о нас расскажут отзывы наших клиентов</p>
          
          {/* Rating and Platform filters */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">5.0</span>
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-muted-foreground">| 204 отзывов</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlatformFilter('yandex')}
                className={`text-sm transition-colors ${platformFilter === 'yandex' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Яндекс 5.0
              </button>
              <button
                onClick={() => setPlatformFilter('2gis')}
                className={`text-sm transition-colors ${platformFilter === '2gis' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                2GIS 5.0
              </button>
              {platformFilter !== 'all' && (
                <button
                  onClick={() => setPlatformFilter('all')}
                  className="text-sm text-primary hover:underline"
                >
                  Показать все
                </button>
              )}
            </div>
          </div>
          
          {/* Reviews Carousel */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {reviews
                .filter(review => platformFilter === 'all' || review.platform === platformFilter)
                .map((review) => (
                <div key={review.id} className="bg-muted/30 rounded-xl p-5 min-w-[280px] md:min-w-[300px] flex-shrink-0 snap-start">
                  <div className="mb-3">
                    <p className="font-medium">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date} на <span className="text-primary">{review.platform === 'yandex' ? 'Яндекс' : '2GIS'}</span>
                    </p>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-2">{review.text}</p>
                  {review.hasMore && (
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Читать дальше
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors hidden md:flex">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors hidden md:flex">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-foreground"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span>
          </div>
          
          {/* Leave review button */}
          <div className="flex justify-end mt-6">
            <Button variant="default">
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation-form" className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                Подскажем лучшее решение
              </h2>
              <p className="text-muted-foreground mb-6">
                Оставьте заявку — мы перезвоним, чтобы уточнить детали, и подготовим подходящее решение.
              </p>
              <ConsultationForm variant="compact" />
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src={product.image}
                  alt="Консультация"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Tags */}
      <section className="py-8">
        <div className="container-main">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-muted-foreground">Идеально для:</span>
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main">
            <h2 className="text-2xl font-serif font-bold mb-6">С этим покупают</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container-main text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Получите подборку под ваш зал
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Ответьте на несколько вопросов — мы подготовим персональную подборку
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Подобрать мебель</Link>
          </Button>
        </div>
      </section>

      {/* Quote Request Dialog */}
      <QuoteRequestDialog 
        open={quoteDialogOpen} 
        onOpenChange={setQuoteDialogOpen}
        productName={product.name}
        productId={product.id}
      />

      {/* Custom Size Dialog */}
      <CustomSizeDialog
        open={customSizeDialogOpen}
        onOpenChange={setCustomSizeDialogOpen}
        productName={product.name}
      />
    </div>
  );
};

export default ProductPage;
