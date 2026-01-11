import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export const CartPage = () => {
  const { items, updateQuantity, removeItem, total } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">
            Добавьте товары из каталога
          </p>
          <Button asChild>
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-main py-8 md:py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Корзина</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-4 bg-card rounded-xl border"
              >
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/product/${item.product.id}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedUpholstery && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Обивка: {item.selectedUpholstery}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Итого</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({items.length})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-sm">Расчёт менеджером</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>К оплате</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Промокод"
                  className="w-full h-10 px-4 rounded-lg border border-input bg-background text-sm"
                />
                <Button asChild className="w-full" size="lg">
                  <Link to="/checkout">
                    Перейти к оформлению
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Доставка рассчитывается менеджером после оформления заказа
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
