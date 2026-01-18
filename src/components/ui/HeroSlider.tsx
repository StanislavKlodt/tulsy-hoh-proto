import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: 'Мебель для кафе, ресторанов и гостиниц',
    description: 'Комплектуем залы под ключ: в наличии 1500+ позиций и быстрое изготовление под проект.',
    buttonText: 'Перейти в каталог',
    buttonLink: '/catalog',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
  },
  {
    id: 2,
    title: 'Собственное производство',
    description: 'Изготавливаем мебель на своей фабрике с полным контролем качества на каждом этапе.',
    buttonText: 'О производстве',
    buttonLink: '/production',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&h=1080&fit=crop',
  },
  {
    id: 3,
    title: '1500+ позиций в шоуруме',
    description: 'Приезжайте посмотреть мебель вживую и получить консультацию наших специалистов.',
    buttonText: 'Посетить шоурум',
    buttonLink: '/showroom',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut' as const,
    },
  }),
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  },
};

export const HeroSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === selectedIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
          </div>
        ))}
      </div>

      {/* Slides content */}
      <div className="relative h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 h-full flex items-center"
            >
              <div className="container-main w-full">
                <AnimatePresence mode="wait">
                  {index === selectedIndex && (
                    <motion.div
                      key={slide.id}
                      className="max-w-2xl"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight"
                        variants={textVariants}
                        custom={0.2}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
                        variants={textVariants}
                        custom={0.4}
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        variants={textVariants}
                        custom={0.6}
                      >
                        <Button asChild size="lg" className="text-base">
                          <Link to={slide.buttonLink}>
                            {slide.buttonText}
                            <ChevronRight className="ml-2 w-5 h-5" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-primary w-8'
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
