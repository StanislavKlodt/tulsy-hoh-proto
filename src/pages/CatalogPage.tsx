import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductCardCatalog } from '@/components/ui/ProductCardCatalog';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { categories, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';

export const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.slug === selectedCategory)?.name 
    : 'Все товары';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-8 md:py-12">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Каталог мебели
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} товаров в наличии и под заказ
          </p>
        </div>
      </section>

      {/* Categories horizontal scroll */}
      <section className="border-b border-border sticky top-0 bg-background z-20">
        <div className="container-main py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              Все товары
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="border-b border-border bg-background">
        <div className="container-main py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Фильтры
              </Button>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-transparent border border-border rounded-md px-3 py-2 pr-8 text-sm cursor-pointer hover:border-primary transition-colors"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="new">Сначала новинки</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 text-muted-foreground">
              <span className="text-sm mr-2">Вид:</span>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-muted rounded-md">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick filters (show when filters button clicked) */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
              <Button variant="outline" size="sm">В наличии</Button>
              <Button variant="outline" size="sm">Со скидкой</Button>
              <Button variant="outline" size="sm">Новинки</Button>
              <Button variant="outline" size="sm">Хиты продаж</Button>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCardCatalog key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                В этой категории пока нет товаров
              </p>
              <Button onClick={() => setSelectedCategory(null)}>
                Показать все товары
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-12">
        <div className="container-main text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Нужна помощь с подбором?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Ответьте на несколько вопросов — мы подготовим персональную подборку мебели для вашего заведения
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Подобрать мебель под зал</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
