import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { FileText, Phone, Mail, MessageSquare } from 'lucide-react';

interface QuoteRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  productId?: string;
}

export const QuoteRequestDialog = ({ 
  open, 
  onOpenChange, 
  productName,
  productId 
}: QuoteRequestDialogProps) => {
  const [contactMethod, setContactMethod] = useState('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl font-serif">Запросить КП</DialogTitle>
          <DialogDescription>
            {productName 
              ? `Оставьте контакты, и мы подготовим коммерческое предложение на "${productName}"`
              : 'Оставьте контакты, и мы подготовим коммерческое предложение'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input 
              id="name" 
              placeholder="Как к вам обращаться?" 
              required 
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+7 (___) ___-__-__" 
              required 
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@company.ru" 
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Компания / Заведение</Label>
            <Input 
              id="company" 
              placeholder="Название компании или заведения" 
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Примерное количество</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="1"
              placeholder="Сколько единиц вас интересует?" 
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea 
              id="comment" 
              placeholder="Дополнительные пожелания или вопросы" 
              rows={3}
            />
          </div>

          {/* Preferred contact method */}
          <div className="space-y-3">
            <Label>Как удобнее связаться?</Label>
            <RadioGroup 
              value={contactMethod} 
              onValueChange={setContactMethod}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="method-phone" />
                <Label htmlFor="method-phone" className="flex items-center gap-1.5 cursor-pointer font-normal">
                  <Phone className="w-4 h-4" /> Звонок
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="method-whatsapp" />
                <Label htmlFor="method-whatsapp" className="flex items-center gap-1.5 cursor-pointer font-normal">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="method-email" />
                <Label htmlFor="method-email" className="flex items-center gap-1.5 cursor-pointer font-normal">
                  <Mail className="w-4 h-4" /> Email
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
