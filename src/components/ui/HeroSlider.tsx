import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Factory, Warehouse, Building2, Clock, Percent, Truck } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

interface SlideData {
  id: number;
  title: string;
  description?: string;
  triggers?: { icon: React.ElementType; text: string }[];
  buttonText: string;
  buttonLink: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'Мебель для кафе, ресторанов и гостиниц',
    triggers: [
      { icon: Factory, text: 'Собственное производство и шоу-рум' },
      { icon: Warehouse, text: 'Складской запас — более 1500 единиц' },
      { icon: Building2, text: 'Для коммерческого использования' },
      { icon: Clock, text: 'Индивидуальные заказы — до 10 дней' },
    ],
    buttonText: 'Перейти в каталог',
    buttonLink: '/catalog',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
  },
  {
    id: 2,
    title: 'Готовые комплекты с выгодой до 20%',
    triggers: [
      { icon: Percent, text: 'Экономим бюджет без потери качества' },
      { icon: Truck, text: 'Отгружаем в день заказа (при наличии на складе)' },
    ],
    buttonText: 'Выбрать комплект',
    buttonLink: '/catalog',
    image: 'https://static.tildacdn.com/tild3763-6464-4133-b664-356636316631/file_00000000e044624.png',
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
                      {slide.triggers ? (
                        <motion.div
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
                          variants={textVariants}
                          custom={0.4}
                        >
                          {slide.triggers.map((trigger, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-card/80 backdrop-blur-sm rounded-lg">
                              <trigger.icon className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-sm font-medium text-foreground">{trigger.text}</span>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.p
                          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
                          variants={textVariants}
                          custom={0.4}
                        >
                          {slide.description}
                        </motion.p>
                      )}
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

      {/* Navigation arrows - bottom right */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        <button
          onClick={scrollPrev}
          className="w-12 h-12 bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/40 transition-colors border border-white/20"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="w-12 h-12 bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/40 transition-colors border border-white/20"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter - bottom left */}
      <div className="absolute bottom-8 left-8 text-white/60 text-sm font-medium">
        <span className="text-white">{selectedIndex + 1}</span> / {slides.length}
      </div>
    </section>
  );
};
