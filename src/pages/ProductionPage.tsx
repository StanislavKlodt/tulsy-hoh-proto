import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  { num: 1, title: 'Проектирование', desc: 'Разработка чертежей и расчёт материалов' },
  { num: 2, title: 'Каркас', desc: 'Изготовление каркаса из массива или металла' },
  { num: 3, title: 'Обивка', desc: 'Работа с наполнителями и обивочными материалами' },
  { num: 4, title: 'Контроль', desc: 'Проверка качества на каждом этапе' },
  { num: 5, title: 'Упаковка', desc: 'Защитная упаковка для безопасной доставки' },
  { num: 6, title: 'Отгрузка', desc: 'Передача в транспортную компанию' },
];

const materials = [
  {
    title: 'Каркас',
    items: ['Массив бука и берёзы', 'Металлические профили', 'ЛДСП повышенной плотности', 'Фанера берёзовая'],
  },
  {
    title: 'Обивка',
    items: ['Велюр (50 000+ циклов)', 'Рогожка (100 000+ циклов)', 'Эко-кожа (150 000+ циклов)', 'Натуральная кожа'],
  },
  {
    title: 'Наполнитель',
    items: ['ППУ разной плотности', 'Пружинные блоки', 'Синтепон и холлофайбер', 'Файберглас'],
  },
];

export const ProductionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://www.pubstuff.co.uk/cdn/shop/files/Pub_Stuff_14th_March__2024_141.jpg?v=1743084369)' }}
        />
        <div className="container-main relative z-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-3xl">
            Собственное производство мебели для HoReCa
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Полный цикл производства: от проектирования до отгрузки. 
            Контроль качества на каждом этапе, сроки изготовления — до 10 рабочих дней.
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Заказать расчёт</Link>
          </Button>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Полный цикл производства
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-card p-6 rounded-xl">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Материалы и износостойкость
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((category) => (
              <div key={category.title} className="bg-card p-6 rounded-xl border">
                <h3 className="font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10</p>
              <p className="text-background/70">дней — максимальный срок изготовления</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">300+</p>
              <p className="text-background/70">вариантов тканей и цветов</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">15</p>
              <p className="text-background/70">лет опыта в производстве</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-background/70">реализованных проектов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Подобрать ткань или цвет?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Менеджер поможет выбрать материалы под ваш проект и требования по износостойкости
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/quiz">Подобрать материалы</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/showroom">Посетить шоурум</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionPage;
