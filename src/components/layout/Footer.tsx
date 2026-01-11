import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container-main py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-2">
                Нужен расчёт комплектации?
              </h3>
              <p className="text-background/70">
                Оставьте заявку — менеджер подготовит подборку под ваш проект
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input 
                placeholder="Ваш телефон" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 w-full sm:w-48"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Получить расчёт
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Catalog */}
          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/catalog/divany" className="hover:text-background transition-colors">Диваны</Link></li>
              <li><Link to="/catalog/kresla" className="hover:text-background transition-colors">Кресла</Link></li>
              <li><Link to="/catalog/stulya" className="hover:text-background transition-colors">Стулья</Link></li>
              <li><Link to="/catalog/stoly" className="hover:text-background transition-colors">Столы</Link></li>
              <li><Link to="/catalog/komplekty" className="hover:text-background transition-colors">Комплекты</Link></li>
              <li><Link to="/catalog/stoleshnitsy" className="hover:text-background transition-colors">Столешницы</Link></li>
              <li><Link to="/catalog/podstolya" className="hover:text-background transition-colors">Подстолья</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/production" className="hover:text-background transition-colors">Производство</Link></li>
              <li><Link to="/showroom" className="hover:text-background transition-colors">Шоурум</Link></li>
              <li><Link to="/projects" className="hover:text-background transition-colors">Проекты</Link></li>
              <li><Link to="/blog" className="hover:text-background transition-colors">Блог</Link></li>
            </ul>
          </div>

          {/* For buyers */}
          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/delivery" className="hover:text-background transition-colors">Доставка и оплата</Link></li>
              <li><Link to="/quiz" className="hover:text-background transition-colors">Подбор мебели</Link></li>
              <li><Link to="/contacts" className="hover:text-background transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+74951234567" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" />
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@tulsy.ru" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" />
                  info@tulsy.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Москва, ул. Выборгская, 16к2<br />Шоурум: пн-сб 10:00-20:00</span>
              </li>
              <li className="flex gap-3 pt-2">
                <a 
                  href="https://wa.me/74951234567" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-background/70 hover:text-background transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://t.me/tulsy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-background">TULSY</span>
            <span>© 2025 Все права защищены</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">Политика конфиденциальности</Link>
            <Link to="/offer" className="hover:text-background transition-colors">Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
