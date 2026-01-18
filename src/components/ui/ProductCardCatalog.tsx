import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Ruler, Settings2 } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductCardCatalogProps {
  product: Product;
}

export const ProductCardCatalog = ({ product }: ProductCardCatalogProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  // Default colors if not provided
  const colors = product.colors || ['#8B4513', '#2F4F4F', '#4A5568', '#1A365D', '#744210', '#553C9A'];
  const displayColors = colors.slice(0, 6);
  const extraColorsCount = colors.length > 6 ? colors.length - 6 : 0;

  const stockCount = product.stockCount || Math.floor(Math.random() * 12) + 1;
  
  // Check if product is customizable (sofas/divany)
  const isCustomizable = product.categorySlug === 'divany';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className={`card-product transition-all duration-300 ${isHovered ? 'shadow-xl ring-1 ring-border' : ''}`}>
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {discountPercent && (
                <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                  -{discountPercent}%
                </span>
              )}
              {product.isNew && (
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                  Новинка
                </span>
              )}
              {isCustomizable && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded flex items-center gap-1 cursor-help">
                      <Settings2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Кастом</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-foreground text-background">
                    <p>Можем изготовить под Ваш размер</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Favorite button */}
            <button
              onClick={handleFavorite}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Price row */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Product name */}
            <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm">
              {product.name}
            </h3>

            {/* Stock info */}
            <p className="text-xs text-muted-foreground mb-3">
              {product.availability === 'instock' 
                ? `В наличии: ${stockCount} шт.` 
                : product.availability === '7days' 
                  ? 'Под заказ: до 7 дней'
                  : 'Под заказ: до 10 дней'
              }
            </p>

            {/* Color swatches */}
            <div className="flex items-center gap-1.5">
              {displayColors.map((color, index) => (
                <button
                  key={index}
                  onClick={(e) => e.preventDefault()}
                  className="w-5 h-5 rounded-full border border-border/50 hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all"
                  style={{ backgroundColor: color }}
                  title={`Вариант ${index + 1}`}
                />
              ))}
              {extraColorsCount > 0 && (
                <span className="text-xs text-muted-foreground ml-1">+{extraColorsCount}</span>
              )}
            </div>

            {/* Hover content */}
            <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              {/* Dimensions */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pb-3 border-b border-border">
                <Ruler className="w-4 h-4" />
                <span>Размеры (ДхШхВ):</span>
                <span className="ml-auto font-medium text-foreground">{product.dimensions}</span>
              </div>

              {/* Add to cart button */}
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
              >
                В корзину
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
