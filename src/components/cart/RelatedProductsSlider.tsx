import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, products } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface RelatedProductsSliderProps {
  cartItems: { product: Product; quantity: number }[];
}

// Логика рекомендаций на основе содержимого корзины
const getRelatedProducts = (cartItems: { product: Product }[]): Product[] => {
  const cartCategorySlugs = cartItems.map(item => item.product.categorySlug);
  const cartProductIds = cartItems.map(item => item.product.id);
  
  const relatedSlugs: string[] = [];
  
  // Столешницы → Подстолья и наоборот
  if (cartCategorySlugs.includes('stoleshnitsy')) {
    relatedSlugs.push('podstolya');
  }
  if (cartCategorySlugs.includes('podstolya')) {
    relatedSlugs.push('stoleshnitsy');
  }
  
  // Столы → Подстолья, Столешницы, Стулья
  if (cartCategorySlugs.includes('stoly')) {
    relatedSlugs.push('podstolya', 'stoleshnitsy', 'stulya');
  }
  
  // Стулья → Столы, Комплекты
  if (cartCategorySlugs.includes('stulya')) {
    relatedSlugs.push('stoly', 'komplekty');
  }
  
  // Диваны/Кресла → Комплекты, друг друга
  if (cartCategorySlugs.includes('divany') || cartCategorySlugs.includes('kresla')) {
    relatedSlugs.push('komplekty', 'kresla', 'divany');
  }
  
  // Комплекты → Диваны, Кресла, Столы
  if (cartCategorySlugs.includes('komplekty')) {
    relatedSlugs.push('divany', 'kresla', 'stoly');
  }
  
  // Если нет специфических связок — показываем популярное
  if (relatedSlugs.length === 0) {
    relatedSlugs.push('komplekty', 'stulya', 'stoly');
  }
  
  // Фильтруем товары
  const uniqueSlugs = [...new Set(relatedSlugs)];
  const related = products
    .filter(p => uniqueSlugs.includes(p.categorySlug) && !cartProductIds.includes(p.id))
    .slice(0, 10);
  
  // Если мало — добавляем хиты
  if (related.length < 6) {
    const hits = products.filter(p => p.isHit && !cartProductIds.includes(p.id) && !related.includes(p));
    related.push(...hits.slice(0, 6 - related.length));
  }
  
  return related;
};

export const RelatedProductsSlider = ({ cartItems }: RelatedProductsSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  
  const relatedProducts = getRelatedProducts(cartItems);
  
  if (relatedProducts.length === 0) return null;
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">С этим покупают</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Чаще всего берут вместе, чтобы укомплектовать зал
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[200px] bg-card rounded-xl border overflow-hidden group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isHit && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    Хит
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 min-h-[40px]">
                  {product.name}
                </p>
                <p className="text-sm font-semibold mt-2">{formatPrice(product.price)}</p>
              </div>
            </Link>
            <div className="px-3 pb-3">
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-1"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <Plus className="w-4 h-4" />
                Добавить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
