import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, getProjectById } from '@/data/projects';

export const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');

  const types = ['all', 'Ресторан', 'Кафе', 'Отель', 'Бар', 'Столовая'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Проекты с нашей мебелью
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Посмотрите, как мебель TULSY выглядит в реальных интерьерах кафе, ресторанов и отелей
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`filter-chip ${filter === type ? 'active' : ''}`}
              >
                {type === 'all' ? 'Все проекты' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{project.type}</span>
                  <h3 className="font-medium mt-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-12">
        <div className="container-main text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Хотите так же?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Получите подборку мебели и расчёт стоимости для вашего проекта
          </p>
          <Button asChild size="lg">
            <Link to="/quiz">Подобрать мебель под зал</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Проект не найден</h1>
          <Button asChild>
            <Link to="/projects">Все проекты</Link>
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
            <Link to="/projects" className="hover:text-primary">Проекты</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero image */}
      <section className="py-8">
        <div className="container-main">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden">
            <img 
              src={project.images[0]} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="text-primary font-medium">{project.type}</span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
                {project.title}
              </h1>
              <p className="text-muted-foreground mb-8">{project.city}</p>

              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold mb-3">Задача клиента</h2>
                <p className="text-foreground">{project.task}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold mb-3">Что поставили</h2>
                <ul className="space-y-2">
                  {project.delivered.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="inline-block px-4 py-2 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Срок реализации: </span>
                <span className="font-medium">{project.timeline}</span>
              </div>
            </div>

            <div>
              <div className="bg-card rounded-xl border p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Сделать так же</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Получите подборку мебели и расчёт для вашего проекта
                </p>
                <Button asChild className="w-full">
                  <Link to="/quiz">Получить расчёт</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.images.length > 1 && (
            <div className="mt-12">
              <h2 className="text-xl font-serif font-bold mb-6">Галерея</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
