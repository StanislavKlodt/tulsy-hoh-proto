import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface FabricConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FabricConsultationDialog = ({ open, onOpenChange }: FabricConsultationDialogProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState('');
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
    toast.success('Заявка на консультацию отправлена! Мы свяжемся с вами.');
    onOpenChange(false);
    setName('');
    setPhone('');
    setContactMethod('');
    setConsent(false);
    setMarketing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Консультация по ткани</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Персональные видеоконсультации со специалистом Tulsy позволят выбрать мебель, не выходя из дома.
            </p>
            <p>
              Мы поможем с подбором, подробно расскажем об интересующих вас моделях, покажем изделие и образцы материалов вживую, а также поможем подобрать нужные модели для Вашего объекта.
            </p>
            <p className="text-primary">
              Оставьте свой номер телефона, и мы свяжемся с вами в течение 30 минут в рабочее время сервиса (с 10:00 до 18:00 по МСК) наиболее удобным способом.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ФИО</Label>
              <Input
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg border-2 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label>Телефон</Label>
              <Input
                type="tel"
                placeholder="+7 (___) __-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-lg border-2 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Способ связи</Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger className="h-11 rounded-lg border-2 focus:border-primary">
                <SelectValue placeholder="Способ связи" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="viber">Viber</SelectItem>
                <SelectItem value="phone">Телефонный звонок</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="consultation-consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="consultation-consent" className="text-sm font-normal cursor-pointer">
              Даю <a href="#" className="text-primary underline">согласие</a> на обработку персональных данных
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consultation-marketing"
              checked={marketing}
              onCheckedChange={(checked) => setMarketing(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="consultation-marketing" className="text-sm font-normal cursor-pointer">
              Я даю согласие на рекламную рассылку
            </Label>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-11 rounded-lg text-base font-medium"
          >
            Отправить заявку
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
