import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts, getBlogPostById } from '@/data/blog';

export const BlogPage = () => {
  const categories = ['Все', 'Руководства', 'Тренды', 'Материалы'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Блог TULSY
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Руководства, тенденции и советы экспертов для ресторанов, баров и отелей
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${cat === 'Все' ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-16">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>
    </div>
  );
};

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPostById(id || '');

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Статья не найдена</h1>
          <Button asChild>
            <Link to="/blog">Все статьи</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-4">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="text-primary font-medium">{post.category}</span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
                {post.title}
              </h1>
              <p className="text-muted-foreground">
                {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Featured image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-3xl font-serif font-bold mt-8 mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-serif font-bold mt-6 mb-3">{line.slice(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-serif font-bold mt-4 mb-2">{line.slice(4)}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-4">{line.slice(2)}</li>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold">{line.slice(2, -2)}</p>;
                }
                if (line.trim() === '') return null;
                return <p key={i} className="text-foreground mb-4">{line}</p>;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary/5 rounded-xl text-center">
              <h3 className="text-xl font-serif font-bold mb-3">
                Нужна мебель под ваш проект?
              </h3>
              <p className="text-muted-foreground mb-6">
                Получите персональную подборку и расчёт стоимости
              </p>
              <Button asChild size="lg">
                <Link to="/quiz">Получить подборку</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPage;
