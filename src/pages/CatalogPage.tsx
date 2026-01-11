import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { categories, getHitProducts, getNewProducts, getSaleProducts } from '@/data/products';

export const CatalogPage = () => {
  const hitProducts = getHitProducts();
  const newProducts = getNewProducts();
  const saleProducts = getSaleProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Каталог мебели для HoReCa
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            В наличии в шоуруме 1500+ позиций. Индивидуальные заказы — до 10 дней.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="pb-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">Популярное</h2>
            <Link to="/catalog/all?sort=popular" className="text-primary hover:underline text-sm font-medium">
              Смотреть все
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {hitProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New */}
      <section className="pb-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">Новинки</h2>
            <Link to="/catalog/all?sort=new" className="text-primary hover:underline text-sm font-medium">
              Смотреть все
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {newProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale */}
      <section className="pb-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">Акции</h2>
            <Link to="/catalog/all?sort=sale" className="text-primary hover:underline text-sm font-medium">
              Смотреть все
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {saleProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
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
