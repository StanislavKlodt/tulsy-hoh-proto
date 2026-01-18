import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Check, Truck, FileText, UserCheck, Star, Quote, Package, Shield, Clock, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuoteRequestDialog } from '@/components/ui/QuoteRequestDialog';
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
    author: 'Анна Смирнова',
    company: 'Ресторан "Оливье"',
    rating: 5,
    text: 'Заказывали диваны для обновления интерьера ресторана. Качество превосходное, доставка точно в срок. Менеджер помог с подбором обивки под наш интерьер.',
    date: '15 декабря 2024',
  },
  {
    id: 2,
    author: 'Михаил Петров',
    company: 'Отель "Гранд"',
    rating: 5,
    text: 'Уже третий раз заказываем мебель в Tulsy. Отличное соотношение цены и качества. Рекомендую для HoReCa.',
    date: '3 января 2025',
  },
  {
    id: 3,
    author: 'Елена Козлова',
    company: 'Кафе "Уют"',
    rating: 4,
    text: 'Хорошая мебель, удобная. Единственное — доставка заняла чуть дольше, чем ожидали, но результатом довольны.',
    date: '20 ноября 2024',
  },
];

// "Что вы получаете" блоки
const benefits = [
  {
    id: 1,
    title: 'Производство прошедшее',
    subtitle: 'аттестацию',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    position: 'bottom-left' as const,
  },
  {
    id: 2,
    title: 'Поставка за 10 дней',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop',
    position: 'top-right' as const,
  },
  {
    id: 3,
    title: 'Огромный выбор ткани',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
    position: 'center' as const,
  },
  {
    id: 4,
    title: 'Уникальный каркас для HoReCa',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
    position: 'bottom-left' as const,
  },
  {
    id: 5,
    title: 'Любые размеры и цвета на заказ',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=300&fit=crop',
    position: 'bottom-right' as const,
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
                <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                  💰 Скидка на заказы от 200 000 ₽ — оптовая цена на всё!
                </p>
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
                <button className="text-primary text-sm font-medium mt-3 hover:underline">
                  Ещё 300+ вариантов — подобрать с менеджером
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

              {/* Info badges */}
              <div className="grid sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Безнал для юрлиц</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Помощь в комплектации</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Выезд с образцами</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Discount Banner */}
      <div className="bg-primary/5 py-4 overflow-hidden">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span>💰 Заказ от 50 000 ₽ — скидка 5%</span>
            <span>💰 Заказ от 100 000 ₽ — скидка 10%</span>
            <span>💰 Заказ от 200 000 ₽ — скидка 15%</span>
            <span>💰 Заказ от 500 000 ₽ — скидка 20%</span>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">ЧТО ВЫ ПОЛУЧАЕТЕ</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <div 
                key={benefit.id}
                className={`relative rounded-xl overflow-hidden aspect-[4/3] group ${
                  i === 0 ? 'md:row-span-2 md:aspect-auto' : ''
                }`}
              >
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm md:text-base">
                    {benefit.title}
                  </p>
                  {benefit.subtitle && (
                    <p className="text-white/80 text-sm">{benefit.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
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
              <TabsTrigger 
                value="warranty"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Гарантия
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
            <TabsContent value="warranty" className="pt-6">
              <p className="text-foreground mb-4">
                Гарантия на мебель — 12 месяцев с момента покупки.
              </p>
              <p className="text-muted-foreground">
                Рекомендации по уходу: регулярная сухая чистка, избегать прямых солнечных лучей,
                не использовать агрессивные моющие средства.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">ОТЗЫВЫ</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-2" />
                <p className="text-foreground mb-4">{review.text}</p>
                <div className="border-t pt-4">
                  <p className="font-medium">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="section-padding">
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

      {/* Why Choose Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">
            ПОЧЕМУ ВЫБИРАЮТ "TULSY"
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Гарантия 12 месяцев</h4>
              <p className="text-sm text-muted-foreground">На всю продукцию и комплектующие</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Быстрое производство</h4>
              <p className="text-sm text-muted-foreground">От 7 до 14 дней на изготовление</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">300+ вариантов ткани</h4>
              <p className="text-sm text-muted-foreground">Огромный выбор обивки и цветов</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Доставка по всей РФ</h4>
              <p className="text-sm text-muted-foreground">Работаем со всеми ТК страны</p>
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
