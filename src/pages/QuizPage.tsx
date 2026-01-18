import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const steps = [
  {
    title: 'Тип заведения',
    options: [
      { value: 'cafe', label: 'Кафе' },
      { value: 'restaurant', label: 'Ресторан' },
      { value: 'hotel', label: 'Отель / Гостиница' },
      { value: 'bar', label: 'Бар' },
      { value: 'canteen', label: 'Столовая' },
      { value: 'other', label: 'Другое' },
    ],
  },
  {
    title: 'Площадь и вместимость',
    type: 'input',
  },
  {
    title: 'Стиль интерьера',
    options: [
      { value: 'modern', label: 'Современный' },
      { value: 'loft', label: 'Лофт' },
      { value: 'scandi', label: 'Скандинавский' },
      { value: 'classic', label: 'Классика' },
      { value: 'other', label: 'Другой / не определён' },
    ],
  },
  {
    title: 'Сроки',
    options: [
      { value: 'urgent', label: 'Срочно (1-2 дня)' },
      { value: '7days', label: 'До 7 дней' },
      { value: '10days', label: 'До 10 дней' },
      { value: 'flexible', label: 'Не принципиально' },
    ],
  },
  {
    title: 'Контакты',
    type: 'contacts',
  },
];

export const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [area, setArea] = useState('');
  const [seats, setSeats] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [channel, setChannel] = useState('telegram');
  const [needVisit, setNeedVisit] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleSubmit = () => {
    if (!name || !phone) {
      toast.error('Заполните имя и телефон');
      return;
    }
    if (!privacyConsent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
    setSubmitted(true);
    toast.success('Заявка отправлена!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Спасибо за заявку!</h1>
          <p className="text-muted-foreground mb-8">
            Менеджер подготовит подборку мебели и расчёт стоимости. Ответ придёт в течение 2 часов.
          </p>
          <Button asChild size="lg">
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-foreground text-background py-16">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Подберём мебель под ваш зал
          </h1>
          <p className="text-background/70 max-w-2xl mx-auto">
            Ответьте на несколько вопросов — менеджер подготовит персональную подборку и рассчитает стоимость
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="container-main py-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Шаг {currentStep + 1} из {steps.length}
        </p>
      </div>

      {/* Quiz content */}
      <div className="container-main py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-card min-h-[400px]">
            <h2 className="text-2xl font-serif font-bold mb-6">{step.title}</h2>

            {step.type === 'input' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="area">Площадь (м²)</Label>
                  <Input
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Например: 150"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="seats">Количество посадочных мест</Label>
                  <Input
                    id="seats"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    placeholder="Например: 60"
                    className="mt-1.5"
                  />
                </div>
                <Button 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="mt-4"
                >
                  Далее
                </Button>
              </div>
            ) : step.type === 'contacts' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Город доставки</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Куда отправить подборку?</Label>
                  <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="telegram" id="q-tg" />
                      <Label htmlFor="q-tg" className="cursor-pointer">Telegram</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="email" id="q-email" />
                      <Label htmlFor="q-email" className="cursor-pointer">Email</Label>
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
                    Нужен выезд менеджера с образцами
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="privacy-quiz" 
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                  />
                  <Label htmlFor="privacy-quiz" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на обработку своих персональных данных
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="marketing-quiz" 
                    checked={marketingConsent}
                    onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                  />
                  <Label htmlFor="marketing-quiz" className="text-sm cursor-pointer leading-tight">
                    Я даю согласие на рекламную рассылку
                  </Label>
                </div>
                <Button onClick={handleSubmit} size="lg" className="w-full mt-4">
                  Получить подборку
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {step.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`p-4 text-left rounded-xl border-2 transition-all hover:border-primary ${
                      answers[currentStep] === option.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-muted-foreground hover:text-foreground mt-4 text-sm"
            >
              ← Назад
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
