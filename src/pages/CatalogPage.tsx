import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCardCatalog } from '@/components/ui/ProductCardCatalog';
import { categories, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, X, Armchair, Table, Package, Square, Columns } from 'lucide-react';

// Map category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  'stulya': <Armchair className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'kresla': <Armchair className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'divany': <Armchair className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'stoly': <Table className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'komplekty': <Package className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'stoleshnitsy': <Square className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
  'podstolya': <Columns className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
};

// Materials available
const materials = ['Дерево', 'Металл', 'Ткань', 'Кожа', 'Пластик', 'Ротанг'];

// Colors available
const colorOptions = [
  { name: 'Чёрный', value: '#000000' },
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Серый', value: '#808080' },
  { name: 'Коричневый', value: '#8B4513' },
  { name: 'Бежевый', value: '#F5F5DC' },
  { name: 'Синий', value: '#1E3A8A' },
  { name: 'Зелёный', value: '#166534' },
  { name: 'Красный', value: '#DC2626' },
];

// Filter Dropdown Component
interface FilterDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  isActive?: boolean;
  onClear?: () => void;
  children: React.ReactNode;
}

const FilterDropdown = ({ label, isOpen, onToggle, isActive, onClear, children }: FilterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
          isActive 
            ? 'text-primary border-primary' 
            : isOpen 
              ? 'text-foreground border-foreground' 
              : 'text-muted-foreground border-transparent hover:text-foreground'
        }`}
      >
        {label}
        {isActive && onClear ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="ml-1 p-0.5 hover:bg-muted rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        ) : isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 min-w-[220px] p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular');
  
  // Filter states
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    // Filter by price range
    if (priceRange.min) {
      result = result.filter(p => p.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= parseInt(priceRange.max));
    }

    // Filter by in stock
    if (inStockOnly) {
      result = result.filter(p => (p.stockCount || 0) > 0);
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
  }, [selectedCategory, sortBy, priceRange, inStockOnly]);

  const activeFiltersCount = 
    (selectedMaterials.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (priceRange.min || priceRange.max ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
  };

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.slug === selectedCategory)?.name 
    : 'Все товары';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-6 md:py-8">
        <div className="container-main">
          <div className="flex items-baseline gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-serif font-bold">
              {selectedCategoryName}
            </h1>
            <span className="text-muted-foreground text-sm">
              Найдено {filteredProducts.length}
            </span>
          </div>

          {/* Category Cards Grid */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => {
              const productCount = products.filter(p => p.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                  className={`flex-shrink-0 flex flex-col items-center text-center group transition-all ${
                    selectedCategory === cat.slug ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center mb-2 transition-all ${
                    selectedCategory === cat.slug 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted/50 text-muted-foreground group-hover:bg-muted'
                  }`}>
                    {categoryIcons[cat.slug] || <Package className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />}
                  </div>
                  <span className={`text-xs md:text-sm font-medium leading-tight max-w-[80px] md:max-w-[96px] ${
                    selectedCategory === cat.slug ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {cat.name}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                    {productCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters & Sort Bar */}
      <section className="border-y border-border bg-background sticky top-0 z-30">
        <div className="container-main">
          <div className="flex items-center justify-between">
            {/* Left: Filters */}
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {/* Material Filter */}
              <FilterDropdown
                label="Материал"
                isOpen={openFilter === 'material'}
                onToggle={() => setOpenFilter(openFilter === 'material' ? null : 'material')}
                isActive={selectedMaterials.length > 0}
                onClear={() => setSelectedMaterials([])}
              >
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMaterials([...selectedMaterials, material]);
                          } else {
                            setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                          }
                        }}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* Color Filter */}
              <FilterDropdown
                label="Цвет"
                isOpen={openFilter === 'color'}
                onToggle={() => setOpenFilter(openFilter === 'color' ? null : 'color')}
                isActive={selectedColors.length > 0}
                onClear={() => setSelectedColors([])}
              >
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        if (selectedColors.includes(color.value)) {
                          setSelectedColors(selectedColors.filter(c => c !== color.value));
                        } else {
                          setSelectedColors([...selectedColors, color.value]);
                        }
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.value) 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </FilterDropdown>

              {/* Price Filter */}
              <FilterDropdown
                label="Цена"
                isOpen={openFilter === 'price'}
                onToggle={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                isActive={!!(priceRange.min || priceRange.max)}
                onClear={() => setPriceRange({ min: '', max: '' })}
              >
                <div className="space-y-3">
                  <p className="text-sm font-medium">Цена (₽):</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="от"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="w-24 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      placeholder="до"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="w-24 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => setOpenFilter(null)}
                  >
                    Применить
                  </Button>
                </div>
              </FilterDropdown>

              {/* In Stock Filter */}
              <FilterDropdown
                label="Другие фильтры"
                isOpen={openFilter === 'other'}
                onToggle={() => setOpenFilter(openFilter === 'other' ? null : 'other')}
                isActive={inStockOnly}
                onClear={() => setInStockOnly(false)}
              >
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">Только в наличии</span>
                  </label>
                </div>
              </FilterDropdown>

              {/* Clear all filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  Сбросить ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Right: Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm text-muted-foreground hidden md:block">Сортировка:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-background border-0 px-3 py-3 pr-8 text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="new">Сначала новинки</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
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
