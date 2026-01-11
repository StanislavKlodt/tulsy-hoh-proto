import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'instock':
        return <span className="badge-availability badge-instock">В наличии</span>;
      case '7days':
        return <span className="badge-availability badge-7days">До 7 дней</span>;
      case '10days':
        return <span className="badge-availability badge-10days">До 10 дней</span>;
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card-product">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.isHit && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                Хит
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                Новинка
              </span>
            )}
            {product.isSale && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                Скидка
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            {getAvailabilityBadge()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
