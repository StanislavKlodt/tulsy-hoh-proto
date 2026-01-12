import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface ConsultationFormProps {
  variant?: 'full' | 'compact';
  title?: string;
}

export const ConsultationForm = ({ variant = 'full', title }: ConsultationFormProps) => {
  const [channel, setChannel] = useState('whatsapp');
  const [needVisit, setNeedVisit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Менеджер свяжется с вами в ближайшее время.');
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="Ваше имя" required />
          <Input placeholder="Телефон" type="tel" required />
        </div>
        <Input placeholder="Город доставки" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Ответить в:</span>
          <RadioGroup value={channel} onValueChange={setChannel} className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <RadioGroupItem value="whatsapp" id="wa-compact" />
              <Label htmlFor="wa-compact" className="text-sm cursor-pointer">WhatsApp</Label>
            </div>
            <div className="flex items-center gap-1.5">
              <RadioGroupItem value="telegram" id="tg-compact" />
              <Label htmlFor="tg-compact" className="text-sm cursor-pointer">Telegram</Label>
            </div>
            <div className="flex items-center gap-1.5">
              <RadioGroupItem value="email" id="email-compact" />
              <Label htmlFor="email-compact" className="text-sm cursor-pointer">Email</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full">Получить расчёт</Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {title && <h3 className="text-xl font-serif font-semibold">{title}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" placeholder="Ваше имя" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" placeholder="+7 (___) ___-__-__" type="tel" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="city">Город доставки</Label>
          <Input id="city" placeholder="Москва" className="mt-1.5" />
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
      <div>
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea 
          id="comment" 
          placeholder="Опишите ваш проект или задайте вопрос" 
          className="mt-1.5"
          rows={3}
        />
      </div>
      <div>
        <Label className="mb-3 block">Куда отправить подборку?</Label>
        <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="whatsapp" id="whatsapp" />
            <Label htmlFor="whatsapp" className="cursor-pointer">WhatsApp</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="telegram" id="telegram" />
            <Label htmlFor="telegram" className="cursor-pointer">Telegram</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="cursor-pointer">Email</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox 
          id="visit" 
          checked={needVisit}
          onCheckedChange={(checked) => setNeedVisit(checked as boolean)}
        />
        <Label htmlFor="visit" className="text-sm cursor-pointer leading-tight">
          Нужен выезд менеджера с образцами (для крупных объектов)
        </Label>
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">
        Получить консультацию
      </Button>
    </form>
  );
};
