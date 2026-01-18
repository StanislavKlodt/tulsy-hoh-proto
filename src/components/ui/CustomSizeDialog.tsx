import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface CustomSizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export const CustomSizeDialog = ({ open, onOpenChange, productName }: CustomSizeDialogProps) => {
  const [phone, setPhone] = useState('');
  const [length, setLength] = useState(100);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(45);
  const [modification, setModification] = useState('straight');
  const [quantity, setQuantity] = useState('1-5');
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const adjustValue = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, delta: number) => {
    setter(Math.max(10, value + delta));
  };

  const handleSubmit = () => {
    if (!phone) {
      toast.error('Введите номер телефона');
      return;
    }
    if (!offerAccepted || !dataProcessingAccepted) {
      toast.error('Необходимо принять условия оферты и согласие на обработку данных');
      return;
    }

    toast.success('Заявка отправлена! Мы свяжемся с вами для расчёта стоимости.');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Рассчитать стоимость</DialogTitle>
          <p className="text-sm text-muted-foreground">{productName}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Phone */}
          <div className="space-y-2">
            <Label>Ваш телефон</Label>
            <Input
              type="tel"
              placeholder="+7 (000) 000-00-00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 rounded-full border-2"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Длина', value: length, setter: setLength },
              { label: 'Ширина', value: width, setter: setWidth },
              { label: 'Высота', value: height, setter: setHeight },
            ].map(({ label, value, setter }) => (
              <div key={label} className="space-y-2">
                <Label className="text-sm">{label}</Label>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full shrink-0"
                    onClick={() => adjustValue(setter, value, -10)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => setter(Math.max(10, parseInt(e.target.value) || 10))}
                    className="h-10 text-center rounded-full border-2 px-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full shrink-0"
                    onClick={() => adjustValue(setter, value, 10)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Modification & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Модификация</Label>
              <Select value={modification} onValueChange={setModification}>
                <SelectTrigger className="h-12 rounded-full border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="straight">Прямой</SelectItem>
                  <SelectItem value="corner-left">Угловой левый</SelectItem>
                  <SelectItem value="corner-right">Угловой правый</SelectItem>
                  <SelectItem value="modular">Модульный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Количество</Label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger className="h-12 rounded-full border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="6-10">6-10</SelectItem>
                  <SelectItem value="11-20">11-20</SelectItem>
                  <SelectItem value="20+">20+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="offer"
                checked={offerAccepted}
                onCheckedChange={(checked) => setOfferAccepted(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="offer" className="text-sm font-normal cursor-pointer">
                Я принимаю <a href="#" className="text-primary underline">условия оферты</a>: для юридических и/или физических лиц
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="data"
                checked={dataProcessingAccepted}
                onCheckedChange={(checked) => setDataProcessingAccepted(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="data" className="text-sm font-normal cursor-pointer">
                Я даю <a href="#" className="text-primary underline">согласие</a> на обработку своих персональных данных
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing"
                checked={marketingAccepted}
                onCheckedChange={(checked) => setMarketingAccepted(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="marketing" className="text-sm font-normal cursor-pointer">
                Я даю согласие на рекламную рассылку
              </Label>
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 rounded-full text-base font-medium"
          >
            Рассчитать стоимость
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
