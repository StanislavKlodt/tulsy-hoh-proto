import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ManagerVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManagerVisitDialog = ({ open, onOpenChange }: ManagerVisitDialogProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
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
    toast.success('Заявка на выезд менеджера отправлена! Мы свяжемся с вами.');
    onOpenChange(false);
    setName('');
    setPhone('');
    setAddress('');
    setComment('');
    setConsent(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-serif">Выезд менеджера с образцами</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Персональный менеджер приедет к вам на объект с образцами тканей и материалов. Мы поможем с подбором, подробно расскажем об интересующих вас моделях, покажем образцы материалов вживую и ответим на все вопросы.
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ваше имя</Label>
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
            <Label>Адрес объекта</Label>
            <Input
              placeholder="Город, улица, дом"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-11 rounded-lg border-2 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Комментарий (необязательно)</Label>
            <Textarea
              placeholder="Удобное время, тип проекта и т.д."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-lg border-2 focus:border-primary min-h-[80px]"
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="manager-consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="manager-consent" className="text-sm font-normal cursor-pointer">
              Даю <a href="#" className="text-primary underline">согласие</a> на обработку персональных данных
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="manager-marketing"
              checked={marketing}
              onCheckedChange={(checked) => setMarketing(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="manager-marketing" className="text-sm font-normal cursor-pointer">
              Я даю согласие на рекламную рассылку
            </Label>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-11 rounded-lg text-base font-medium"
          >
            Оставить заявку
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
