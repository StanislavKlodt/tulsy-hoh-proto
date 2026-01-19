import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductCardCatalog } from '@/components/ui/ProductCardCatalog';
import { categories, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Armchair, Table, Package, Square, Columns, LayoutGrid } from 'lucide-react';

// Map category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  'all': <LayoutGrid className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />,
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
  const { slug, subcategory } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular');
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  
  // Get selected category from URL
  const selectedCategory = slug || null;
  const selectedSubcategory = subcategory || null;
  
  // Filter states
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [lengthRange, setLengthRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [widthRange, setWidthRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [heightRange, setHeightRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesScrollRef.current) {
      const scrollAmount = 300;
      categoriesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Get current category with subcategories
  const currentCategory = categories.find(c => c.slug === selectedCategory);
  
  // Helper to parse dimensions from string like "180×80×90 см" or "Ø80×75 см"
  const parseDimensions = (dimensions: string): { length: number; width: number; height: number } | null => {
    // Handle round tables: "Ø80×75 см"
    const roundMatch = dimensions.match(/Ø(\d+)×(\d+)/);
    if (roundMatch) {
      const diameter = parseInt(roundMatch[1]);
      return { length: diameter, width: diameter, height: parseInt(roundMatch[2]) };
    }
    
    // Handle regular: "180×80×90 см" or "45×52×88 см"
    const match = dimensions.match(/(\d+)×(\d+)×(\d+)/);
    if (match) {
      return { length: parseInt(match[1]), width: parseInt(match[2]), height: parseInt(match[3]) };
    }
    
    // Handle two dimensions: "80×80 см"
    const twoMatch = dimensions.match(/(\d+)×(\d+)/);
    if (twoMatch) {
      return { length: parseInt(twoMatch[1]), width: parseInt(twoMatch[2]), height: 0 };
    }
    
    return null;
  };

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
    
    // Filter by dimensions
    if (lengthRange.min || lengthRange.max) {
      result = result.filter(p => {
        const dims = parseDimensions(p.dimensions);
        if (!dims) return true;
        if (lengthRange.min && dims.length < parseInt(lengthRange.min)) return false;
        if (lengthRange.max && dims.length > parseInt(lengthRange.max)) return false;
        return true;
      });
    }
    
    if (widthRange.min || widthRange.max) {
      result = result.filter(p => {
        const dims = parseDimensions(p.dimensions);
        if (!dims) return true;
        if (widthRange.min && dims.width < parseInt(widthRange.min)) return false;
        if (widthRange.max && dims.width > parseInt(widthRange.max)) return false;
        return true;
      });
    }
    
    if (heightRange.min || heightRange.max) {
      result = result.filter(p => {
        const dims = parseDimensions(p.dimensions);
        if (!dims) return true;
        if (heightRange.min && dims.height < parseInt(heightRange.min)) return false;
        if (heightRange.max && dims.height > parseInt(heightRange.max)) return false;
        return true;
      });
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
  }, [selectedCategory, sortBy, priceRange, lengthRange, widthRange, heightRange, inStockOnly]);

  const activeFiltersCount = 
    (selectedMaterials.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (priceRange.min || priceRange.max ? 1 : 0) +
    (lengthRange.min || lengthRange.max ? 1 : 0) +
    (widthRange.min || widthRange.max ? 1 : 0) +
    (heightRange.min || heightRange.max ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceRange({ min: '', max: '' });
    setLengthRange({ min: '', max: '' });
    setWidthRange({ min: '', max: '' });
    setHeightRange({ min: '', max: '' });
    setInStockOnly(false);
  };

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.slug === selectedCategory)?.name 
    : 'Все товары';

  // Category descriptions
  const customizationText = ' Любую модель из нашего каталога изготовим в выбранной ткани и оттенке. Предложим сотни вариантов обивки — от износостойких материалов до премиального велюра и натуральной кожи, чтобы изделие идеально вписалось в ваш интерьер.';
  
  const categoryDescriptions: Record<string, string> = {
    divany: 'Коллекция диванов для ресторанов, отелей и лобби. Классические и современные модели с возможностью выбора обивки и размеров.' + customizationText,
    kresla: 'Комфортные кресла для зон отдыха, лобби отелей и кафе. Широкий выбор стилей от классики до модерна.' + customizationText,
    stulya: 'Стулья для ресторанов, кафе и баров. Штабелируемые, мягкие и деревянные модели под любой интерьер.' + customizationText,
    stoly: 'Обеденные и барные столы различных форм и размеров. Круглые, прямоугольные, высокие и стандартные.' + customizationText,
    komplekty: 'Готовые комплекты мебели для кафе и ресторанов. Экономия до 15% при покупке набором.' + customizationText,
    stoleshnitsy: 'Столешницы из ЛДСП и массива дерева. Различные декоры и размеры под заказ.' + customizationText,
    podstolya: 'Чугунные и металлические подстолья для столов. Устойчивые основания под любой размер столешницы.' + customizationText,
  };

  // SEO links by category
  const seoLinks: Record<string, { label: string; href: string }[]> = {
    divany: [
      { label: 'Все диваны', href: '/catalog/divany' },
      { label: 'Диваны для ресторанов', href: '/catalog/divany' },
      { label: 'Кожаные диваны', href: '/catalog/divany' },
      { label: 'Модульные диваны', href: '/catalog/divany' },
      { label: 'Диваны в стиле лофт', href: '/catalog/divany' },
      { label: 'Диваны для кафе', href: '/catalog/divany' },
      { label: 'Диваны для отелей', href: '/catalog/divany' },
      { label: 'Диваны с велюровой обивкой', href: '/catalog/divany' },
    ],
    kresla: [
      { label: 'Все кресла', href: '/catalog/kresla' },
      { label: 'Кресла для лобби', href: '/catalog/kresla' },
      { label: 'Поворотные кресла', href: '/catalog/kresla' },
      { label: 'Лаунж-кресла', href: '/catalog/kresla' },
      { label: 'Кресла для кафе', href: '/catalog/kresla' },
      { label: 'Кресла в стиле модерн', href: '/catalog/kresla' },
      { label: 'Кресла с велюровой обивкой', href: '/catalog/kresla' },
    ],
    stulya: [
      { label: 'Все стулья', href: '/catalog/stulya' },
      { label: 'Венские стулья', href: '/catalog/stulya' },
      { label: 'Барные стулья', href: '/catalog/stulya' },
      { label: 'Полубарные стулья', href: '/catalog/stulya' },
      { label: 'Штабелируемые стулья', href: '/catalog/stulya' },
      { label: 'Металлические стулья', href: '/catalog/stulya' },
      { label: 'Деревянные стулья', href: '/catalog/stulya' },
      { label: 'Мягкие стулья для ресторанов', href: '/catalog/stulya' },
      { label: 'Стулья в стиле лофт', href: '/catalog/stulya' },
    ],
    stoly: [
      { label: 'Все столы', href: '/catalog/stoly' },
      { label: 'Круглые столы', href: '/catalog/stoly' },
      { label: 'Прямоугольные столы', href: '/catalog/stoly' },
      { label: 'Барные столы', href: '/catalog/stoly' },
      { label: 'Столы для кафе', href: '/catalog/stoly' },
      { label: 'Столы из массива дуба', href: '/catalog/stoly' },
      { label: 'Столы на металлическом подстолье', href: '/catalog/stoly' },
    ],
    komplekty: [
      { label: 'Все комплекты', href: '/catalog/komplekty' },
      { label: 'Комплекты для кафе', href: '/catalog/komplekty' },
      { label: 'Комплекты в стиле лофт', href: '/catalog/komplekty' },
      { label: 'Классические комплекты', href: '/catalog/komplekty' },
      { label: 'Комплект стол + стулья', href: '/catalog/komplekty' },
    ],
    stoleshnitsy: [
      { label: 'Все столешницы', href: '/catalog/stoleshnitsy' },
      { label: 'Столешницы ЛДСП', href: '/catalog/stoleshnitsy' },
      { label: 'Столешницы из массива', href: '/catalog/stoleshnitsy' },
      { label: 'Столешницы под дуб', href: '/catalog/stoleshnitsy' },
      { label: 'Круглые столешницы', href: '/catalog/stoleshnitsy' },
      { label: 'Квадратные столешницы', href: '/catalog/stoleshnitsy' },
    ],
    podstolya: [
      { label: 'Все подстолья', href: '/catalog/podstolya' },
      { label: 'Чугунные подстолья', href: '/catalog/podstolya' },
      { label: 'Металлические подстолья', href: '/catalog/podstolya' },
      { label: 'Подстолья для круглых столов', href: '/catalog/podstolya' },
      { label: 'Подстолья Х-образные', href: '/catalog/podstolya' },
      { label: 'Подстолья для барных столов', href: '/catalog/podstolya' },
    ],
  };
  
  const defaultSeoLinks = [
    { label: 'Диваны для ресторанов', href: '/catalog/divany' },
    { label: 'Стулья для кафе', href: '/catalog/stulya' },
    { label: 'Барные стулья', href: '/catalog/stulya' },
    { label: 'Кресла для лобби', href: '/catalog/kresla' },
    { label: 'Столы для ресторанов', href: '/catalog/stoly' },
    { label: 'Комплекты мебели', href: '/catalog/komplekty' },
    { label: 'Столешницы ЛДСП', href: '/catalog/stoleshnitsy' },
    { label: 'Чугунные подстолья', href: '/catalog/podstolya' },
    { label: 'Мебель в стиле лофт', href: '/catalog' },
    { label: 'Мебель для HoReCa', href: '/catalog' },
  ];
  
  const currentSeoLinks = selectedCategory ? seoLinks[selectedCategory] || defaultSeoLinks : defaultSeoLinks;
  
  const pageTitle = selectedCategory
    ? categories.find(c => c.slug === selectedCategory)?.name || 'Каталог'
    : 'Мебель';
    
  const pageDescription = selectedCategory 
    ? categoryDescriptions[selectedCategory] || 'Выбирайте качественные изделия с оригинальным дизайном и возможностью кастомизации под ваш проект.' + customizationText
    : 'Откройте для себя нашу коллекцию мебели для HoReCa: стулья и кресла, столы и диваны. Выбирайте качественные изделия с оригинальным дизайном и возможностью кастомизации под ваш проект.' + customizationText;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="pt-4 pb-2">
        <div className="container-main">
          <nav className="text-xs text-muted-foreground uppercase tracking-wide">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            {selectedCategory ? (
              <>
                <Link to="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{pageTitle}</span>
              </>
            ) : (
              <span className="text-foreground">Каталог</span>
            )}
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="pb-6 md:pb-8">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-3">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Category Cards Grid - Artemest style */}
      <section className="pb-6">
        <div className="container-main">
          {/* Header with arrows */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={() => scrollCategories('left')}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Прокрутить влево"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCategories('right')}
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Прокрутить вправо"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div 
            ref={categoriesScrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-2 scrollbar-hide"
          >
            {/* "Вся мебель" - all products */}
            <Link
              to="/catalog"
              className={`flex-shrink-0 flex flex-col items-center text-center group transition-all`}
            >
              <div className={`w-28 h-28 md:w-36 md:h-36 border overflow-hidden mb-3 transition-all flex items-center justify-center bg-muted/30 ${
                !selectedCategory 
                  ? 'border-foreground' 
                  : 'border-border group-hover:border-muted-foreground'
              }`}>
                <LayoutGrid className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
              </div>
              <span className={`text-xs md:text-sm uppercase tracking-wide font-medium transition-colors ${
                !selectedCategory 
                  ? 'text-foreground' 
                  : 'text-muted-foreground group-hover:text-foreground'
              }`}>
                Вся мебель
              </span>
            </Link>
            
            {categories.map((cat) => {
              // Get first product image for this category
              const categoryProduct = products.find(p => p.categorySlug === cat.slug);
              const categoryImage = cat.image || categoryProduct?.image;
              
              return (
                <Link
                  key={cat.slug}
                  to={`/catalog/${cat.slug}`}
                  className={`flex-shrink-0 flex flex-col items-center text-center group transition-all`}
                >
                  <div className={`w-28 h-28 md:w-36 md:h-36 border overflow-hidden mb-3 transition-all ${
                    selectedCategory === cat.slug 
                      ? 'border-foreground' 
                      : 'border-border group-hover:border-muted-foreground'
                  }`}>
                    {categoryImage ? (
                      <img 
                        src={categoryImage} 
                        alt={cat.name}
                        className="w-full h-full object-contain p-3"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/30">
                        <Package className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs md:text-sm uppercase tracking-wide font-medium transition-colors ${
                    selectedCategory === cat.slug 
                      ? 'text-foreground' 
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
          
          {/* Subcategories for chairs */}
          {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              <Link
                to={`/catalog/${selectedCategory}`}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  !selectedSubcategory
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-foreground'
                }`}
              >
                Все {currentCategory.name.toLowerCase()}
              </Link>
              {currentCategory.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/catalog/${selectedCategory}/${sub.slug}`}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    selectedSubcategory === sub.slug
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
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

              {/* Length Filter */}
              <FilterDropdown
                label="Длина"
                isOpen={openFilter === 'length'}
                onToggle={() => setOpenFilter(openFilter === 'length' ? null : 'length')}
                isActive={!!(lengthRange.min || lengthRange.max)}
                onClear={() => setLengthRange({ min: '', max: '' })}
              >
                <div className="space-y-3">
                  <p className="text-sm font-medium">Длина (см):</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="от"
                      value={lengthRange.min}
                      onChange={(e) => setLengthRange({ ...lengthRange, min: e.target.value })}
                      className="w-24 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      placeholder="до"
                      value={lengthRange.max}
                      onChange={(e) => setLengthRange({ ...lengthRange, max: e.target.value })}
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

              {/* Width Filter */}
              <FilterDropdown
                label="Ширина"
                isOpen={openFilter === 'width'}
                onToggle={() => setOpenFilter(openFilter === 'width' ? null : 'width')}
                isActive={!!(widthRange.min || widthRange.max)}
                onClear={() => setWidthRange({ min: '', max: '' })}
              >
                <div className="space-y-3">
                  <p className="text-sm font-medium">Ширина (см):</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="от"
                      value={widthRange.min}
                      onChange={(e) => setWidthRange({ ...widthRange, min: e.target.value })}
                      className="w-24 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      placeholder="до"
                      value={widthRange.max}
                      onChange={(e) => setWidthRange({ ...widthRange, max: e.target.value })}
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

              {/* Height Filter */}
              <FilterDropdown
                label="Высота"
                isOpen={openFilter === 'height'}
                onToggle={() => setOpenFilter(openFilter === 'height' ? null : 'height')}
                isActive={!!(heightRange.min || heightRange.max)}
                onClear={() => setHeightRange({ min: '', max: '' })}
              >
                <div className="space-y-3">
                  <p className="text-sm font-medium">Высота (см):</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="от"
                      value={heightRange.min}
                      onChange={(e) => setHeightRange({ ...heightRange, min: e.target.value })}
                      className="w-24 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      placeholder="до"
                      value={heightRange.max}
                      onChange={(e) => setHeightRange({ ...heightRange, max: e.target.value })}
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
              <Button asChild>
                <Link to="/catalog">Показать все товары</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SEO Links Section */}
      <section className="py-8 border-t">
        <div className="container-main">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
            Покупатели часто ищут
          </p>
          <div className="flex flex-wrap gap-2">
            {currentSeoLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="px-4 py-2 text-sm border border-border rounded-full hover:border-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
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
