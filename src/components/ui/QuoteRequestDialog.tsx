import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FileText } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
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

          {/* Consent checkboxes */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox 
                id="privacy-quote" 
                checked={privacyConsent}
                onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
              />
              <Label htmlFor="privacy-quote" className="text-sm cursor-pointer leading-tight">
                Я даю согласие на обработку своих персональных данных
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox 
                id="marketing-quote" 
                checked={marketingConsent}
                onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
              />
              <Label htmlFor="marketing-quote" className="text-sm cursor-pointer leading-tight">
                Я даю согласие на рекламную рассылку
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
