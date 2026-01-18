import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { HeroSlider } from '@/components/ui/HeroSlider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categories, getHitProducts, getNewProducts, getSaleProducts } from '@/data/products';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const reviews = [
  { id: 1, author: 'Алексей К.', date: '15 января 2025', platform: 'yandex' as const, rating: 5, text: 'Отличное качество мебели и оперативная доставка. Полностью укомплектовали зал за 2 недели. Рекомендую всем, кто ищет надёжного поставщика.', hasMore: true },
  { id: 2, author: 'Мария С.', date: '12 января 2025', platform: '2gis' as const, rating: 5, text: 'Работаем с TULSY уже 3 года. Всегда довольны качеством и сервисом. Менеджеры всегда на связи и помогают с выбором.' },
  { id: 3, author: 'Дмитрий В.', date: '8 января 2025', platform: 'yandex' as const, rating: 5, text: 'Заказывали мебель для лобби и ресторана. Всё сделали в срок и без нареканий. Качество материалов на высоте.' },
  { id: 4, author: 'Елена П.', date: '5 января 2025', platform: '2gis' as const, rating: 5, text: 'Понравился индивидуальный подход и возможность кастомизации под наш интерьер. Подобрали идеальные ткани.' },
  { id: 5, author: 'Игорь Н.', date: '28 декабря 2024', platform: 'yandex' as const, rating: 5, text: 'Большой выбор штабелируемых стульев. Очень удобно для хранения. Быстрая доставка по России.' },
  { id: 6, author: 'Анна Р.', date: '20 декабря 2024', platform: '2gis' as const, rating: 5, text: 'Выезд менеджера с образцами очень помог определиться с тканями. Профессиональный подход к клиенту.' },
  { id: 7, author: 'Сергей М.', date: '15 декабря 2024', platform: 'yandex' as const, rating: 5, text: 'Заказали диваны для ресторана. Качество превзошло ожидания, гости постоянно хвалят интерьер.' },
  { id: 8, author: 'Ольга К.', date: '10 декабря 2024', platform: '2gis' as const, rating: 5, text: 'Отличный шоурум в Москве! Можно потрогать все материалы и посидеть на мебели перед заказом.' },
];

const faqItemsLeft = [
  { q: 'Как легко оформить заказ и выбрать нужную комплектацию?', a: 'Оставьте заявку на сайте или позвоните — менеджер поможет подобрать оптимальную комплектацию под ваш бюджет и требования.' },
  { q: 'Можно ли сразу купить мебель без ожидания производства?', a: 'Да, у нас более 1500 единиц мебели в наличии в шоуруме в Москве. Многие позиции доступны к отгрузке в течение 1-2 дней.' },
  { q: 'Когда у нас бывают скидки и как не пропустить акции?', a: 'Подпишитесь на нашу рассылку или следите за обновлениями в Telegram — мы регулярно проводим акции и сезонные распродажи.' },
  { q: 'Какие модели угловых и модульных диванов есть в наличии?', a: 'В наличии более 50 моделей угловых и модульных диванов. Посмотрите каталог или запросите подборку у менеджера.' },
  { q: 'Где можно вживую увидеть мебель и оценить качество?', a: 'Приглашаем в наш шоурум в Москве (более 1000 м²) или закажите онлайн-обзор по видеосвязи.' },
];

const faqItemsRight = [
  { q: 'Сколько времени занимает производство мебели под заказ?', a: 'Стандартный срок изготовления — до 10 рабочих дней. Для срочных заказов возможно сокращение до 5-7 дней.' },
  { q: 'Можно ли изменить конфигурацию или цвет под себя?', a: 'Да, мы предлагаем кастомизацию под ваш проект: изменение габаритов, выбор из 200+ тканей, нестандартные цвета каркаса.' },
  { q: 'Из каких материалов мы изготавливаем нашу мебель?', a: 'Используем массив бука и берёзы, высокоплотный ППУ, коммерческие ткани с высокой износостойкостью.' },
  { q: 'В каком городе и на какой фабрике мы производим мебель?', a: 'Наше производство находится в Москве. Полный цикл от проектирования до сборки — под нашим контролем.' },
  { q: 'Чем наша мебель выгоднее, чем предложения на маркетплейсах?', a: 'Мы — производитель. Это значит гарантия качества, кастомизация под проект, оптовые цены и персональный менеджер.' },
];

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'hits' | 'new' | 'sale'>('hits');
  const [reviewIndex, setReviewIndex] = useState(0);

  const tabProducts = {
    hits: getHitProducts(),
    new: getNewProducts(),
    sale: getSaleProducts(),
  };

  const visibleReviews = reviews.slice(reviewIndex, reviewIndex + 4);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <CategoryCard {...cat} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="px-12 py-6 text-base uppercase tracking-wide">
              <Link to="/catalog">В каталог</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products showcase */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-3xl font-serif font-bold">Лучшие предложения</h2>
            <div className="flex gap-2">
              {(['hits', 'new', 'sale'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`filter-chip ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab === 'hits' ? 'Хиты' : tab === 'new' ? 'Новинки' : 'Скидки'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabProducts[activeTab].slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">Смотреть весь каталог</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Шоурум в Москве
              </h2>
              <p className="text-muted-foreground mb-6">
                Москва, ул. Выборгская, 16к2<br />
                Ежедневно с 10:00 до 18:00 без перерывов и выходных
              </p>
              <p className="text-foreground mb-8">
                Приезжайте посмотреть мебель вживую, оценить качество материалов и подобрать ткани для вашего проекта. Также у нас в наличии большой ассортимент оборудования для ресторанов — как новое, так и б/у.
              </p>
              <Button asChild>
                <Link to="/showroom">Записаться в шоурум</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop" 
                alt="Шоурум TULSY"
                className="rounded-lg object-cover w-full h-48"
              />
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
                alt="Шоурум TULSY"
                className="rounded-lg object-cover w-full h-48"
              />
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop" 
                alt="Шоурум TULSY"
                className="rounded-lg object-cover w-full h-48 col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="section-padding bg-secondary/50 scroll-mt-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-card">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
              Поможем укомплектовать зал
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Получите консультацию и расчёт стоимости для вашего проекта
            </p>
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* Production */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://www.pubstuff.co.uk/cdn/shop/files/Pub_Stuff_14th_March__2024_141.jpg?v=1743084369"
                alt="Производство TULSY"
                className="rounded-2xl w-full object-cover h-[400px]"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Собственное производство — контроль качества на каждом этапе
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Коммерческая износостойкость</h4>
                    <p className="text-sm text-muted-foreground">Мебель для интенсивной эксплуатации</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Контроль материалов</h4>
                    <p className="text-sm text-muted-foreground">Проверка на каждом этапе</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Гибкая кастомизация</h4>
                    <p className="text-sm text-muted-foreground">Размеры и ткани под проект</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Срок до 10 дней</h4>
                    <p className="text-sm text-muted-foreground">Быстрое изготовление под заказ</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link to="/production">Подробнее о производстве</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Почему выбирают "Tulsy"</h2>
          <p className="text-muted-foreground mb-8">Лучше всего о нас расскажут отзывы наших клиентов</p>
          
          {/* Rating and stats */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">5.0</span>
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-muted-foreground">| 204 отзывов</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Яндекс 5.0</span>
              <span className="text-sm text-muted-foreground">2GIS 5.0</span>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleReviews.map((review, i) => (
                <motion.div 
                  key={review.id} 
                  className="bg-muted/30 rounded-xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mb-3">
                    <p className="font-medium">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.date} на <span className="text-primary">{review.platform === 'yandex' ? 'Яндекс' : '2GIS'}</span>
                    </p>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className={`w-4 h-4 ${starIndex < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-2">{review.text}</p>
                  {review.hasMore && (
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Читать дальше
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={() => setReviewIndex(Math.max(0, reviewIndex - 1))}
              disabled={reviewIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors hidden lg:flex disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setReviewIndex(Math.min(reviews.length - 4, reviewIndex + 1))}
              disabled={reviewIndex >= reviews.length - 4}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors hidden lg:flex disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(Math.ceil(reviews.length / 4))].map((_, dotIndex) => (
              <span 
                key={dotIndex} 
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  Math.floor(reviewIndex / 4) === dotIndex ? 'bg-foreground' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setReviewIndex(dotIndex * 4)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <h2 className="text-3xl font-serif font-bold mb-2">
            Как мебель TULSY выглядит в реальных интерьерах
          </h2>
          <p className="text-muted-foreground mb-8">Проекты наших клиентов</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className="group card-product"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.city} • {project.type}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">Посмотреть все проекты</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <h2 className="text-3xl font-serif font-bold mb-2">
            Руководства, тенденции и советы экспертов
          </h2>
          <p className="text-muted-foreground mb-8">Полезные материалы для ресторанов, баров и отелей</p>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.id}`}
                className="group card-product"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <h3 className="font-medium mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Все статьи</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <h2 className="text-3xl font-serif font-bold mb-8">Полезно знать перед заказом</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div>
              <p className="text-primary font-medium mb-4 flex items-center gap-2">
                <span>✦</span> Как выбрать и заказать?
              </p>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItemsLeft.map((item, i) => (
                  <AccordionItem key={i} value={`left-${i}`} className="bg-card rounded-lg px-6 border">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Right column */}
            <div>
              <p className="text-primary font-medium mb-4 flex items-center gap-2">
                <span>✦</span> Производство и преимущества!
              </p>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItemsRight.map((item, i) => (
                  <AccordionItem key={i} value={`right-${i}`} className="bg-card rounded-lg px-6 border">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Нужен расчёт комплектации?
            </h2>
            <p className="text-background/70 mb-8">
              Оставьте заявку — менеджер подготовит подборку под ваш проект
            </p>
            <div className="bg-background/10 rounded-2xl p-6 md:p-8">
              <ConsultationForm variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
