import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WholesaleProgressProps {
  cartTotal: number;
}

// Пороги для оптовых цен
const WHOLESALE_THRESHOLD = 150000; // 150 000 ₽
const DISCOUNT_PERCENT = 10;

export const WholesaleProgress = ({ cartTotal }: WholesaleProgressProps) => {
  const remaining = Math.max(0, WHOLESALE_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / WHOLESALE_THRESHOLD) * 100);
  const isQualified = remaining === 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-amber-600" />
        <span className="font-medium text-amber-900 dark:text-amber-100">
          {isQualified ? `Оптовая скидка ${DISCOUNT_PERCENT}% применена!` : 'Оптовая цена'}
        </span>
      </div>

      <div className="relative h-2 bg-amber-200/50 dark:bg-amber-800/50 rounded-full overflow-hidden mb-3">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-amber-700 dark:text-amber-300">
          {isQualified ? (
            <span className="text-green-600 font-medium">✓ Оптовая цена достигнута</span>
          ) : (
            <>До оптовой цены осталось: <strong>{formatPrice(remaining)}</strong></>
          )}
        </span>
        <span className="text-muted-foreground">
          {formatPrice(cartTotal)} / {formatPrice(WHOLESALE_THRESHOLD)}
        </span>
      </div>

      {!isQualified && (
        <Button asChild variant="outline" size="sm" className="w-full border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/50">
          <Link to="/catalog" className="gap-2">
            Показать товары, которые помогут добрать
            <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
