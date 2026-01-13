import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Factory, Warehouse, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { categories, getProductsByCategory } from '@/data/products';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Секция с превью категории
const CategorySection = ({ 
  name, 
  slug, 
  productsCount = 4 
}: { 
  name: string; 
  slug: string; 
  productsCount?: number;
}) => {
  const products = getProductsByCategory(slug).slice(0, productsCount);
  
  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-background even:bg-muted/30">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">{name}</h2>
          <Link 
            to={`/catalog/${slug}`}
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            Смотреть все
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomePageV2 = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center gradient-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop)' }}
        />
        <div className="container-main relative z-10 py-16">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Мебель для кафе, ресторанов и гостиниц
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Комплектуем залы под ключ: в наличии 1500+ позиций и быстрое изготовление под проект.
            </p>
            
            {/* Benefits chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm">
                <Factory className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Собственное производство</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm">
                <Warehouse className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">1500+ в наличии</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">До 10 дней</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/catalog">
                  Перейти в каталог
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <a href="#consultation-form-v2">
                  Подобрать мебель под зал
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Sections - каждая категория как отдельный блок */}
      {categories.map((category) => (
        <CategorySection 
          key={category.slug}
          name={category.name}
          slug={category.slug}
        />
      ))}

      {/* Consultation Form */}
      <section id="consultation-form-v2" className="section-padding bg-secondary/50 scroll-mt-20">
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
    </div>
  );
};
