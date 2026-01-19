import { FileText, Clock, Shield, MapPin } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: FileText,
      text: 'Закрывающие документы для юрлиц',
    },
    {
      icon: Clock,
      text: 'Изготовление 7–10 дней',
    },
    {
      icon: Shield,
      text: 'Коммерческая износостойкость',
    },
    {
      icon: MapPin,
      text: 'Шоурум 1000+ м² — посмотрите вживую',
    },
  ];

  return (
    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3">
          <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm text-muted-foreground">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};
