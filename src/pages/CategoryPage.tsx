import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProductCard } from '@/components/ui/ProductCard';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categories, getProductsByCategory, products } from '@/data/products';
import { projects } from '@/data/projects';

const categoryDescriptions: Record<string, string> = {
  divany: 'Диваны для кафе, ресторанов и гостиниц — износостойкие решения для ежедневной эксплуатации',
  kresla: 'Кресла для лобби, зон ожидания и лаунж-зон — комфорт и стиль',
  stulya: 'Стулья для ресторанов, кафе и баров — от классики до лофта',
  stoly: 'Столы для заведений любого формата — от уютного кафе до банкетного заведения',
  komplekty: 'Готовые комплекты мебели — экономия времени и денег',
  stoleshnitsy: 'Столешницы из ЛДСП, массива и HPL — на любой бюджет',
  podstolya: 'Подстолья из чугуна и металла — надёжная основа для любой столешницы',
};

const faqItems = [
  { q: 'Какие сроки изготовления?', a: 'Стандартный срок — до 10 рабочих дней. Срочные заказы — 5-7 дней.' },
  { q: 'Можно изменить размеры?', a: 'Да, мы изготавливаем мебель по вашим размерам.' },
  { q: 'Какие ткани доступны?', a: 'Более 200 вариантов тканей: велюр, рогожка, эко-кожа, натуральная кожа.' },
  { q: 'Есть оптовые цены?', a: 'При заказе от 200 000 ₽ предоставляются специальные условия.' },
  { q: 'Как организована доставка?', a: 'Подберём оптимальный вариант: ТК, Яндекс или партнёры. Расчёт делает менеджер.' },
];

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = slug ? getProductsByCategory(slug) : products;

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Availability filter
    if (availability.length > 0) {
      result = result.filter(p => availability.includes(p.availability));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'instock':
        result.sort((a, b) => (a.availability === 'instock' ? -1 : 1));
        break;
    }

    return result;
  }, [categoryProducts, priceRange, availability, sortBy]);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Availability */}
      <div>
        <h4 className="font-medium mb-3">Срок отгрузки</h4>
        <div className="space-y-2">
          {[
            { value: 'instock', label: 'В наличии (1-2 дня)' },
            { value: '7days', label: 'До 7 дней' },
            { value: '10days', label: 'До 10 дней' },
          ].map((item) => (
            <div key={item.value} className="flex items-center gap-2">
              <Checkbox
                id={item.value}
                checked={availability.includes(item.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAvailability([...availability, item.value]);
                  } else {
                    setAvailability(availability.filter(a => a !== item.value));
                  }
                }}
              />
              <Label htmlFor={item.value} className="text-sm cursor-pointer">{item.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-medium mb-3">Цена, ₽</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={200000}
          step={1000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0].toLocaleString()} ₽</span>
          <span>{priceRange[1].toLocaleString()} ₽</span>
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="font-medium mb-3">Материал каркаса</h4>
        <div className="space-y-2">
          {['ЛДСП', 'Металл', 'Массив', 'Комбинированный'].map((mat) => (
            <div key={mat} className="flex items-center gap-2">
              <Checkbox
                id={mat}
                checked={materials.includes(mat)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setMaterials([...materials, mat]);
                  } else {
                    setMaterials(materials.filter(m => m !== mat));
                  }
                }}
              />
              <Label htmlFor={mat} className="text-sm cursor-pointer">{mat}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal for */}
      <div>
        <h4 className="font-medium mb-3">Идеально для</h4>
        <div className="flex flex-wrap gap-2">
          {['Кафе', 'Ресторан', 'Бар', 'Отель', 'Столовая'].map((tag) => (
            <button key={tag} className="filter-chip text-sm">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setAvailability([]);
          setMaterials([]);
          setPriceRange([0, 200000]);
        }}
      >
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-4">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-primary">Каталог</Link>
            <span>/</span>
            <span className="text-foreground">{category?.name || 'Все товары'}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-8">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            {category?.name || 'Все товары'}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {slug && categoryDescriptions[slug] || 'Мебель для HoReCa от производителя'}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-16">
        <div className="container-main">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Фильтры</h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                {/* Mobile filter button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Фильтры
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle>Фильтры</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {filteredProducts.length} товаров
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="popular">Популярные</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="instock">В наличии</option>
                  </select>
                </div>
              </div>

              {/* Active filters */}
              {(availability.length > 0 || materials.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {availability.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {a === 'instock' ? 'В наличии' : a === '7days' ? 'До 7 дней' : 'До 10 дней'}
                      <button onClick={() => setAvailability(availability.filter(x => x !== a))}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Товары не найдены</p>
                  <Button variant="outline" onClick={() => {
                    setAvailability([]);
                    setMaterials([]);
                    setPriceRange([0, 200000]);
                  }}>
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fabric promo */}
      <section className="bg-secondary/50 py-12">
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-serif font-bold mb-2">
              200+ вариантов тканей и цветов
            </h3>
            <p className="text-muted-foreground">
              Подберём под интерьер и требования по износостойкости
            </p>
          </div>
          <Button>Подобрать ткань</Button>
        </div>
      </section>

      {/* Mini projects */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-6">Проекты с этой мебелью</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project) => (
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
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-xs text-muted-foreground">{project.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <div className="container-main">
          <h2 className="text-2xl font-serif font-bold mb-6">Частые вопросы</h2>
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

      {/* CTA Form */}
      <section className="bg-muted/30 py-12">
        <div className="container-main">
          <div className="max-w-xl">
            <h3 className="text-xl font-serif font-bold mb-4">Запросить расчёт</h3>
            <ConsultationForm variant="compact" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
