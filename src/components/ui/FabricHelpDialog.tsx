import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface FabricHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FabricHelpDialog = ({ open, onOpenChange }: FabricHelpDialogProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messenger, setMessenger] = useState('');
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone) {
      toast.error('Заполните имя и телефон');
      return;
    }
    if (!consent) {
      toast.error('Необходимо дать согласие на обработку персональных данных');
      return;
    }
    toast.success('Заявка на консультацию по ткани отправлена! Мы свяжемся с вами в течение 30 минут.');
    onOpenChange(false);
    setName('');
    setPhone('');
    setMessenger('');
    setConsent(false);
    setMarketing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        {/* Hero image */}
        <div className="w-full h-[200px] bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
            alt="Консультация по ткани"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 pb-6 pt-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-serif">Консультация по ткани</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm text-foreground mb-6">
            <p>
              Персональные видеоконсультации со специалистом магазина позволят выбрать мебель, не выходя из дома.
            </p>
            <p>
              Мы поможем с подбором, подробно расскажем об интересующих вас моделях, покажем изделие и образцы материалов вживую, наглядно продемонстрируем работу мебельных механизмов и качество сборки.
            </p>
            <p className="text-muted-foreground">
              Оставьте свой номер телефона, и мы свяжемся с вами в течение 30 минут в рабочее время (с 10:00 до 18:00 по МСК) наиболее удобным способом.
            </p>
          </div>

          <div className="space-y-4">
            {/* Name + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="ФИО"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-lg border-2 focus:border-primary"
              />
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-lg border-2 focus:border-primary"
              />
            </div>

            {/* Messenger select */}
            <Select value={messenger} onValueChange={setMessenger}>
              <SelectTrigger className="h-12 rounded-lg border-2 focus:border-primary bg-background">
                <SelectValue placeholder="Способ связи" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="viber">Viber</SelectItem>
                <SelectItem value="any">Любой</SelectItem>
              </SelectContent>
            </Select>

            {/* Consent checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="fabric-consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="fabric-consent" className="text-xs font-normal cursor-pointer leading-relaxed">
                  Даю <a href="#" className="text-primary underline">согласие</a> на обработку персональных данных на условиях{' '}
                  <a href="#" className="text-primary underline">Политики конфиденциальности</a>
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="fabric-marketing"
                  checked={marketing}
                  onCheckedChange={(checked) => setMarketing(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="fabric-marketing" className="text-xs font-normal cursor-pointer leading-relaxed">
                  Я даю согласие на рекламную рассылку
                </Label>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 rounded-lg text-base font-medium"
            >
              Отправить заявку
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
