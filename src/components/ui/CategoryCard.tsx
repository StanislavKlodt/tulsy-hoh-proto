import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: string;
}

export const CategoryCard = ({ name, slug, image }: CategoryCardProps) => {
  return (
    <Link 
      to={`/catalog/${slug}`}
      className="group flex flex-col items-center text-center"
    >
      <div className="w-full aspect-square bg-muted/50 rounded-xl mb-3 overflow-hidden flex items-center justify-center p-4 group-hover:bg-muted transition-colors duration-300">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg" />
        )}
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {name}
      </span>
    </Link>
  );
};
