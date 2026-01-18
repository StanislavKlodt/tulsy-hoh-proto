import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ConsultationFormProps {
  variant?: 'full' | 'compact';
  title?: string;
}

export const ConsultationForm = ({ variant = 'full', title }: ConsultationFormProps) => {
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
    toast.success('Заявка отправлена! Менеджер свяжется с вами в ближайшее время.');
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="Ваше имя" required />
          <Input placeholder="Телефон" type="tel" required />
        </div>
        <div>
          <select 
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            <option value="">Тип объекта</option>
            <option value="cafe">Кафе</option>
            <option value="restaurant">Ресторан</option>
            <option value="hotel">Отель</option>
            <option value="canteen">Столовая</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Checkbox 
              id="privacy-compact" 
              checked={privacyConsent}
              onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
              required
            />
            <Label htmlFor="privacy-compact" className="text-sm cursor-pointer leading-tight">
              Я даю согласие на обработку своих персональных данных
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox 
              id="marketing-compact" 
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
            />
            <Label htmlFor="marketing-compact" className="text-sm cursor-pointer leading-tight">
              Я даю согласие на рекламную рассылку
            </Label>
          </div>
        </div>
        <Button type="submit" className="w-full">Получить расчёт</Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {title && <h3 className="text-xl font-serif font-semibold">{title}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" placeholder="Ваше имя" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" placeholder="+7 (___) ___-__-__" type="tel" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="type">Тип объекта</Label>
          <select 
            id="type" 
            className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            <option value="">Выберите тип</option>
            <option value="cafe">Кафе</option>
            <option value="restaurant">Ресторан</option>
            <option value="hotel">Отель</option>
            <option value="canteen">Столовая</option>
            <option value="other">Другое</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Checkbox 
            id="privacy" 
            checked={privacyConsent}
            onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
            required
          />
          <Label htmlFor="privacy" className="text-sm cursor-pointer leading-tight">
            Я даю согласие на обработку своих персональных данных
          </Label>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox 
            id="marketing" 
            checked={marketingConsent}
            onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
          />
          <Label htmlFor="marketing" className="text-sm cursor-pointer leading-tight">
            Я даю согласие на рекламную рассылку
          </Label>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">
        Получить консультацию
      </Button>
    </form>
  );
};
