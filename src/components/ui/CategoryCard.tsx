import { Link } from 'react-router-dom';
import { Sofa, Armchair, ChefHat, Table, Package, Square, Columns } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
  count?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sofa: Sofa,
  armchair: Armchair,
  chair: ChefHat,
  table: Table,
  package: Package,
  square: Square,
  pillar: Columns,
};

export const CategoryCard = ({ name, slug, icon, count }: CategoryCardProps) => {
  const IconComponent = iconMap[icon] || Package;

  return (
    <Link 
      to={`/catalog/${slug}`}
      className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
        <IconComponent className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-center">
        {name}
      </h3>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground mt-1">{count} товаров</span>
      )}
    </Link>
  );
};
