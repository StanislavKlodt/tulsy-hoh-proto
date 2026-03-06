import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const showroomImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop',
];

export const ShowroomPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
    toast.success('Заявка на посещение отправлена! Менеджер свяжется для подтверждения.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Шоурум TULSY в Москве
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Более 1000 м² выставочного пространства с мебелью для HoReCa
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                <img 
                  src={showroomImages[selectedImage]} 
                  alt="Шоурум TULSY"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {showroomImages.map((img, i) => (
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

            <div>
              <div className="bg-card rounded-xl border p-6">
                <h3 className="font-semibold mb-4">Адрес и режим работы</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-medium">Москва, ул. Выборгская, 16к2</p>
                    <p className="text-sm text-muted-foreground">м. Водный стадион, 10 мин пешком</p>
                  </div>
                  <div>
                    <p className="font-medium">Ежедневно с 10:00 до 18:00</p>
                    <p className="text-sm text-muted-foreground">Без перерывов и выходных</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <a 
                    href="tel:+79269890852" 
                    className="text-primary font-medium hover:underline"
                  >
                    +7 (926) 989-08-52
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why visit */}
      <section className="py-12 bg-muted/30">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">
            Зачем приезжать в шоурум?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👀</span>
              </div>
              <h3 className="font-medium mb-2">Посмотреть вживую</h3>
              <p className="text-sm text-muted-foreground">
                Оцените качество материалов и сборки
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✋</span>
              </div>
              <h3 className="font-medium mb-2">Потрогать ткани</h3>
              <p className="text-sm text-muted-foreground">
                200+ образцов обивочных материалов
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-medium mb-2">Сравнить модели</h3>
              <p className="text-sm text-muted-foreground">
                Посидеть на диванах и стульях
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="py-12">
        <div className="container-main">
          <div className="max-w-xl mx-auto bg-card rounded-2xl border p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">
              Записаться на посещение
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" required className="mt-1.5" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Желаемая дата</Label>
                  <Input id="date" type="date" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="time">Время</Label>
                  <select 
                    id="time"
                    className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option>10:00</option>
                    <option>12:00</option>
                    <option>14:00</option>
                    <option>16:00</option>
                    <option>18:00</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="privacy-showroom" 
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                  />
                  <Label htmlFor="privacy-showroom" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на обработку своих персональных данных
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="marketing-showroom" 
                    checked={marketingConsent}
                    onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                  />
                  <Label htmlFor="marketing-showroom" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на рекламную рассылку
                  </Label>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">Записаться</Button>
                <Button type="button" variant="outline" className="flex-1">
                  Онлайн-обзор
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowroomPage;
