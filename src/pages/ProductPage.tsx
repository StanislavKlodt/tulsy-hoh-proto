import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Check, Truck, FileText, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuoteRequestDialog } from '@/components/ui/QuoteRequestDialog';
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

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

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

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, { upholstery: fabricSwatches[selectedFabric].name });
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

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Оптовая цена при заказе от 200 000 ₽
                </p>
              </div>

              {/* Availability */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary mb-6 ${availability.className}`}>
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">{availability.text}</span>
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
                  В корзину
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

      {/* Tags */}
      <section className="pb-8">
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
    </div>
  );
};

export default ProductPage;
