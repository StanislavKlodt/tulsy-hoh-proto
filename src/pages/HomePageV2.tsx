import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { ConsultationForm } from '@/components/ui/ConsultationForm';
import { HeroSlider } from '@/components/ui/HeroSlider';
import { categories, getProductsByCategory } from '@/data/products';

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
      {/* Hero Slider */}
      <HeroSlider />

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
