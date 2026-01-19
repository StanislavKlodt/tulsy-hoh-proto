import { Link } from 'react-router-dom';
import { Truck, CreditCard, FileText, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const deliveryMethods = [
  { icon: Truck, title: 'Транспортные компании', desc: 'ПЭК, Деловые Линии, СДЭК и другие' },
  { icon: Truck, title: 'Яндекс Доставка', desc: 'Для заказов по Москве и области' },
  { icon: Truck, title: 'Партнёрские перевозчики', desc: 'Для крупных и хрупких грузов' },
  { icon: Building, title: 'Самовывоз', desc: 'Со склада в Москве' },
];

const paymentMethods = [
  { icon: FileText, title: 'Счёт для юрлиц', desc: 'Безналичная оплата с НДС' },
  { icon: CreditCard, title: 'Банковская карта', desc: 'Visa, MasterCard, МИР' },
  { icon: CreditCard, title: 'QR-код', desc: 'Быстрая оплата через СБП' },
  { icon: CreditCard, title: 'Наличные', desc: 'При самовывозе' },
];

const faqItems = [
  { q: 'Как рассчитывается стоимость доставки?', a: 'Стоимость зависит от региона, объёма и веса заказа. Менеджер рассчитает несколько вариантов и поможет выбрать оптимальный.' },
  { q: 'Можно ли оплатить заказ частями?', a: 'Для юридических лиц возможна поэтапная оплата: 50% предоплата, 50% перед отгрузкой.' },
  { q: 'Какие документы предоставляете?', a: 'Счёт, договор (по запросу), УПД, акт приёма-передачи.' },
  { q: 'Кто осуществляет приёмку товара?', a: 'Приёмка происходит на терминале ТК или при доставке. Рекомендуем проверять товар до подписания документов.' },
  { q: 'Работаете ли с государственными организациями?', a: 'Да, работаем по 44-ФЗ и 223-ФЗ. Предоставляем все необходимые документы.' },
];

export const DeliveryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Доставка и оплата
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Доставляем по всей России. Помогаем подобрать оптимальный способ доставки и рассчитать стоимость.
          </p>
        </div>
      </section>

      {/* Delivery */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-8">Способы доставки</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {deliveryMethods.map((method) => (
              <div key={method.title} className="bg-card p-6 rounded-xl border">
                <method.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary/5 p-6 rounded-xl">
            <p className="text-foreground">
              <strong>Как это работает:</strong> Мы помогаем подобрать транспортную компанию и рассчитываем стоимость доставки. 
              После согласования вы оплачиваете доставку напрямую перевозчику и получаете груз на терминале или с курьером.
            </p>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="py-12 bg-muted/30">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-8">Способы оплаты</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.title} className="bg-card p-6 rounded-xl border">
                <method.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For companies */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4">
                Для юридических лиц
              </h2>
              <p className="text-muted-foreground mb-6">
                Работаем с юрлицами по безналичному расчёту. Предоставляем полный пакет документов.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Счёт на оплату в день заявки</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Договор поставки (по запросу)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>УПД и акт приёма-передачи</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Работа по 44-ФЗ и 223-ФЗ</span>
                </li>
              </ul>
            </div>
            <div className="bg-card p-8 rounded-xl border">
              <h3 className="font-semibold mb-4">Нужен счёт или КП?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Оставьте заявку — менеджер подготовит коммерческое предложение и счёт
              </p>
              <Button asChild className="w-full">
                <Link to="/quiz">Запросить КП</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted/30">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-8">Частые вопросы</h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-lg px-5 border">
                  <AccordionTrigger className="text-left hover:no-underline text-sm">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPage;
