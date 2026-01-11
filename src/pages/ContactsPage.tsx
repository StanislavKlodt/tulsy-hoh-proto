import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConsultationForm } from '@/components/ui/ConsultationForm';

export const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Контакты
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Свяжитесь с нами удобным способом или посетите шоурум
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Как связаться</h2>
              
              <div className="space-y-6">
                <a 
                  href="tel:+74951234567"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Телефон</h3>
                    <p className="text-lg">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Пн-Сб 10:00-20:00</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/74951234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp / Telegram</h3>
                    <p className="text-muted-foreground">Быстрые ответы на вопросы</p>
                  </div>
                </a>

                <a 
                  href="mailto:info@tulsy.ru"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-lg">info@tulsy.ru</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Шоурум</h3>
                    <p>Москва, ул. Выборгская, 16к2</p>
                    <p className="text-sm text-muted-foreground">м. Водный стадион</p>
                    <p className="text-sm text-muted-foreground">Пн-Сб 10:00-20:00</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[16/9] bg-muted rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Карта</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-card rounded-2xl border p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">
                  Оставить заявку
                </h2>
                <p className="text-muted-foreground mb-6">
                  Опишите ваш проект — менеджер свяжется для консультации
                </p>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="py-12 bg-muted/30">
        <div className="container-main">
          <h2 className="text-xl font-serif font-bold mb-4">Реквизиты</h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>ООО «ТУЛСИ»</p>
            <p>ИНН: 7712345678</p>
            <p>ОГРН: 1177746123456</p>
            <p>Юридический адрес: 127018, г. Москва, ул. Выборгская, д. 16, корп. 2</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
