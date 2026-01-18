import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const [customerType, setCustomerType] = useState('individual');
  const [channel, setChannel] = useState('telegram');
  const [needVisit, setNeedVisit] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
    setSubmitted(true);
    clearCart();
    toast.success('Заявка успешно отправлена!');
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold mb-4">Заявка отправлена!</h1>
          <p className="text-muted-foreground mb-6">
            Менеджер свяжется с вами в ближайшее время для уточнения деталей и расчёта доставки.
          </p>
          <Button asChild>
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Корзина пуста</h1>
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
        <h1 className="text-3xl font-serif font-bold mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact info */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Контактные данные</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input id="name" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" type="tel" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="city">Город доставки *</Label>
                    <Input id="city" required className="mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Contact channel */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Способ связи</h2>
                <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="telegram" id="ch-tg" />
                    <Label htmlFor="ch-tg" className="cursor-pointer">Telegram</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="email" id="ch-email" />
                    <Label htmlFor="ch-email" className="cursor-pointer">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="phone" id="ch-phone" />
                    <Label htmlFor="ch-phone" className="cursor-pointer">Звонок</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Customer type */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Тип покупателя</h2>
                <RadioGroup value={customerType} onValueChange={setCustomerType} className="flex gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="individual" id="type-ind" />
                    <Label htmlFor="type-ind" className="cursor-pointer">Физическое лицо</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="company" id="type-comp" />
                    <Label htmlFor="type-comp" className="cursor-pointer">Юридическое лицо</Label>
                  </div>
                </RadioGroup>

                {customerType === 'company' && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="company">Название компании</Label>
                      <Input id="company" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="inn">ИНН (необязательно)</Label>
                      <Input id="inn" className="mt-1.5" />
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Выставим счёт и подготовим закрывающие документы
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Comment */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Комментарий к заказу</h2>
                <Textarea 
                  placeholder="Укажите особые пожелания, вопросы или уточнения"
                  rows={4}
                />
                <div className="flex items-start gap-2 mt-4">
                  <Checkbox 
                    id="visit" 
                    checked={needVisit}
                    onCheckedChange={(checked) => setNeedVisit(checked as boolean)}
                  />
                  <Label htmlFor="visit" className="text-sm cursor-pointer leading-tight">
                    Нужен выезд менеджера с образцами тканей (для крупных проектов)
                  </Label>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Checkbox 
                    id="privacy-checkout" 
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                  />
                  <Label htmlFor="privacy-checkout" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на обработку своих персональных данных
                  </Label>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Checkbox 
                    id="marketing-checkout" 
                    checked={marketingConsent}
                    onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                  />
                  <Label htmlFor="marketing-checkout" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на рекламную рассылку
                  </Label>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-card rounded-xl border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>
                
                <div className="space-y-3 mb-6 max-h-[300px] overflow-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} шт. × {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Товары</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className="text-sm">Расчёт менеджером</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Оформить заявку
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
