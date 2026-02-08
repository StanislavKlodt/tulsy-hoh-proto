import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Truck, FileText, UserCheck, Package, Shield, Clock, Palette, Scissors, Heart, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuoteRequestDialog } from '@/components/ui/QuoteRequestDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { CustomSizeDialog } from '@/components/ui/CustomSizeDialog';
import { FabricHelpDialog } from '@/components/ui/FabricHelpDialog';
import { FabricConsultationDialog } from '@/components/ui/FabricConsultationDialog';
import { ProductReviews } from '@/components/ui/ProductReviews';

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



// "Что вы получаете" блоки
const benefits = [
  {
    id: 1,
    title: 'Проверено профессионалами',
    description: 'Мебель, созданная с учётом практики и обратной связи от реальных клиентов — то, что работает в заведении каждый день',
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
  const [fabricHelpOpen, setFabricHelpOpen] = useState(false);
  const [fabricConsultationOpen, setFabricConsultationOpen] = useState(false);
  

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
                <p className="text-primary text-sm mt-3">
                  Ещё 300+ вариантов тканей и материалов доступно для этой модели
                </p>
              </div>

              {/* Service Blocks */}
              <div className="mb-6 space-y-3">
                <button
                  onClick={() => setFabricHelpOpen(true)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Поможем выбрать ткань</p>
                    <p className="text-sm text-muted-foreground">Отправим образцы или привезём на объект</p>
                  </div>
                </button>

                <button
                  onClick={() => setFabricConsultationOpen(true)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Поможем подобрать ткань</p>
                    <p className="text-sm text-muted-foreground">Отправим фото или видео в мессенджер</p>
                  </div>
                </button>

                <button
                  onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Scissors className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Изготовление в ткани заказчика</p>
                    <p className="text-sm text-muted-foreground">Предоставьте свой материал — мы сделаем мебель</p>
                  </div>
                </button>
              </div>

              {/* Quantity and CTA */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2.5 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button size="lg" onClick={handleAddToCart} className="flex-1">
                  {isCustomSize ? 'Запросить расчёт' : 'В корзину'}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setQuoteDialogOpen(true)}>
                  Запросить КП
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <Heart className="w-5 h-5" />
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

      {/* Product Reviews Section */}
      <ProductReviews />

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
            Укомплектуем ваше заведение под ключ
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

      {/* Fabric Help Dialog */}
      <FabricHelpDialog
        open={fabricHelpOpen}
        onOpenChange={setFabricHelpOpen}
      />

      {/* Fabric Consultation Dialog */}
      <FabricConsultationDialog
        open={fabricConsultationOpen}
        onOpenChange={setFabricConsultationOpen}
      />
    </div>
  );
};

export default ProductPage;
