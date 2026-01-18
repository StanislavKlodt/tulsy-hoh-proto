import { Link } from 'react-router-dom';
import { Phone, Send, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">

      {/* Main Footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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

          {/* Documents */}
          <div>
            <h4 className="font-semibold mb-4">Документы</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/offer-legal" className="hover:text-background transition-colors">Оферта для юридических лиц</Link></li>
              <li><Link to="/offer-individual" className="hover:text-background transition-colors">Оферта для физических лиц</Link></li>
              <li><Link to="/privacy" className="hover:text-background transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/cookies" className="hover:text-background transition-colors">Информация о файлах cookies</Link></li>
              <li><Link to="/gost-declaration" className="hover:text-background transition-colors">Декларация ГОСТ 16371-2014</Link></li>
              <li><Link to="/partners-list" className="hover:text-background transition-colors">Перечень партнеров ПД</Link></li>
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
                  href="https://t.me/tulsy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Send className="w-5 h-5" />
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
          <div className="flex gap-4 text-xs">
            <Link to="/privacy" className="hover:text-background transition-colors">Политика конфиденциальности</Link>
            <Link to="/offer-legal" className="hover:text-background transition-colors">Оферта (юр. лица)</Link>
            <Link to="/offer-individual" className="hover:text-background transition-colors">Оферта (физ. лица)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
