import { cn } from '@/lib/utils';

interface DeliveryBadgeProps {
  availability: 'instock' | '7days' | '10days';
  className?: string;
}

export const DeliveryBadge = ({ availability, className }: DeliveryBadgeProps) => {
  const config = {
    instock: {
      label: 'В наличии (1–2 дня)',
      className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    '7days': {
      label: 'Под заказ (до 7 дней)',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    '10days': {
      label: 'Под заказ (до 10 дней)',
      className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    },
  };

  const { label, className: badgeClass } = config[availability];

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', badgeClass, className)}>
      {label}
    </span>
  );
};

// Получить максимальный срок доставки из корзины
export const getMaxDeliveryTime = (items: { product: { availability: 'instock' | '7days' | '10days' } }[]): string | null => {
  const hasItems10days = items.some(item => item.product.availability === '10days');
  const hasItems7days = items.some(item => item.product.availability === '7days');
  
  if (hasItems10days) return 'до 10 дней';
  if (hasItems7days) return 'до 7 дней';
  return null; // Всё в наличии
};
