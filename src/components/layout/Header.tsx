import { useState, useEffect } from 'react';
import logoTulsy from '@/assets/logo-tulsy.png';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingCart, Phone, Send, MapPin, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCart } from '@/context/CartContext';

const navItems = [
  { name: 'Главная', href: '/' },
  { name: 'Каталог', href: '/catalog' },
  { name: 'Шоурум', href: '/showroom' },
  { name: 'Проекты', href: '/projects' },
  { name: 'Доставка', href: '/delivery' },
  { name: 'Блог', href: '/blog' },
  { name: 'Производство', href: '/production' },
  { name: 'Подбор мебели', href: '/quiz' },
  { name: 'Контакты', href: '/contacts' },
];

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Краснодар',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Ростов-на-Дону',
  'Самара',
  'Другой город',
];

interface HeaderProps {
  containerClass?: string;
}

export const Header = ({ containerClass }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Москва');
  const location = useLocation();
  const { items } = useCart();
  
  // Load city from localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);
  
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setCityOpen(false);
  };
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar with city selector */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className={containerClass || "container-main"}>
          <div className="flex items-center justify-between h-8 text-xs">
            {/* City selector */}
            <Popover open={cityOpen} onOpenChange={setCityOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="start">
                <div className="space-y-1">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedCity === city
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Quick info */}
            <div className="hidden sm:flex items-center gap-4 text-muted-foreground">
              <span>Шоурум: ежедневно 10:00–18:00</span>
              <a href="tel:+74951234567" className="hover:text-foreground transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className={containerClass || "container-main"}>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoTulsy} alt="TULSY — Мебель для кафе" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.slice(0, 7).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Phone - desktop only */}
            <a 
              href="tel:+74951234567" 
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              +7 (495) 123-45-67
            </a>

            {/* Messengers */}
            <div className="hidden md:flex items-center gap-2">
              <a 
                href="https://t.me/tulsy" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>

            {/* Search */}
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-primary">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium py-2 transition-colors hover:text-primary ${
                        location.pathname === item.href 
                          ? 'text-primary' 
                          : 'text-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <a 
                    href="tel:+74951234567" 
                    className="flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <Phone className="w-5 h-5" />
                    +7 (495) 123-45-67
                  </a>
                  <a 
                    href="https://t.me/tulsy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    Telegram
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
