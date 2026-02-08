import { useState } from 'react';
import { Star, ImagePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface WriteReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

const StarRating = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hover || value)
                  ? 'fill-foreground text-foreground'
                  : 'text-muted-foreground/30'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const WriteReviewDialog = ({
  open,
  onOpenChange,
  productName,
}: WriteReviewDialogProps) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [productRating, setProductRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);

  const handleSubmit = () => {
    // For now just close the dialog
    onOpenChange(false);
    setOrderNumber('');
    setReviewText('');
    setAuthorName('');
    setProductRating(0);
    setServiceRating(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6 gap-0">
        <DialogHeader className="mb-1">
          <DialogTitle className="text-xl font-bold">Мой отзыв</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-5">{productName}</p>

        <div className="space-y-4">
          <Input
            placeholder="Номер заказа"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="h-12"
          />

          <div className="flex gap-4">
            <Textarea
              placeholder="Текст отзыва"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[120px] flex-1 resize-none"
            />
            <div className="w-[140px] shrink-0 border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
              <ImagePlus className="w-8 h-8 text-muted-foreground/50" />
              <span className="text-xs text-primary font-medium text-center leading-tight">
                Не забудьте
                <br />
                добавить фото
              </span>
              <span className="text-[10px] text-muted-foreground text-center">
                .jpg, .jpeg, .png
                <br />
                менее 10 МБ
              </span>
            </div>
          </div>

          <Input
            placeholder="Ваше имя"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-6 mb-6">
          <StarRating
            label="Оцените товар"
            value={productRating}
            onChange={setProductRating}
          />
          <StarRating
            label="Оцените сервис"
            value={serviceRating}
            onChange={setServiceRating}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto sm:min-w-[200px] mx-auto h-12 rounded-full text-base"
        >
          Готово
        </Button>
      </DialogContent>
    </Dialog>
  );
};
