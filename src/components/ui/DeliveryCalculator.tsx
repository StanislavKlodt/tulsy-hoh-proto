import { useState, useMemo } from 'react';
import { MapPin, Truck, Package, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Список популярных городов с базовой стоимостью
const cities = [
  { name: 'Москва', basePrice: 0, days: '1-2 дня' },
  { name: 'Санкт-Петербург', basePrice: 2500, days: '2-3 дня' },
  { name: 'Казань', basePrice: 4000, days: '3-4 дня' },
  { name: 'Нижний Новгород', basePrice: 3000, days: '2-3 дня' },
  { name: 'Екатеринбург', basePrice: 6000, days: '4-5 дней' },
  { name: 'Новосибирск', basePrice: 8000, days: '5-7 дней' },
  { name: 'Краснодар', basePrice: 5000, days: '3-4 дня' },
  { name: 'Сочи', basePrice: 5500, days: '4-5 дней' },
  { name: 'Ростов-на-Дону', basePrice: 4500, days: '3-4 дня' },
  { name: 'Воронеж', basePrice: 2500, days: '2-3 дня' },
];

const deliveryMethods = [
  { 
    id: 'standard', 
    name: 'Стандартная доставка', 
    description: 'Транспортная компания',
    multiplier: 1,
    icon: Truck
  },
  { 
    id: 'express', 
    name: 'Экспресс доставка', 
    description: 'Ускоренная доставка',
    multiplier: 1.5,
    icon: Package
  },
];

interface DeliveryCalculatorProps {
  cartTotal: number;
  itemsCount: number;
  onDeliveryCalculated?: (cost: number | null, city: string, address: string) => void;
}

export const DeliveryCalculator = ({ 
  cartTotal, 
  itemsCount,
  onDeliveryCalculated 
}: DeliveryCalculatorProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = useMemo(() => {
    if (!citySearch) return cities;
    return cities.filter(c => 
      c.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch]);

  const selectedCityData = cities.find(c => c.name === selectedCity);
  
  const deliveryCost = useMemo(() => {
    if (!selectedCityData) return null;
    
    const method = deliveryMethods.find(m => m.id === deliveryMethod);
    const baseDelivery = selectedCityData.basePrice;
    
    // Добавляем стоимость в зависимости от суммы заказа (объёма)
    const volumeExtra = Math.max(0, Math.floor((cartTotal - 50000) / 50000) * 500);
    
    const total = Math.round((baseDelivery + volumeExtra) * (method?.multiplier || 1));
    
    return total;
  }, [selectedCityData, deliveryMethod, cartTotal]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCitySearch(city);
    setShowCityDropdown(false);
    
    if (onDeliveryCalculated) {
      const cityData = cities.find(c => c.name === city);
      const method = deliveryMethods.find(m => m.id === deliveryMethod);
      if (cityData) {
        const volumeExtra = Math.max(0, Math.floor((cartTotal - 50000) / 50000) * 500);
        const cost = Math.round((cityData.basePrice + volumeExtra) * (method?.multiplier || 1));
        onDeliveryCalculated(cost, city, address);
      }
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
    <div className="bg-muted/30 rounded-xl border overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium">Расчёт доставки</p>
            {selectedCity && deliveryCost !== null ? (
              <p className="text-sm text-muted-foreground">
                {selectedCity} — {deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Укажите город для расчёта</p>
            )}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          {/* City selection */}
          <div className="space-y-2">
            <Label>Город</Label>
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Начните вводить город..."
                  value={citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setShowCityDropdown(true);
                    if (!e.target.value) setSelectedCity('');
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  className="pl-10"
                />
              </div>
              
              {showCityDropdown && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleCitySelect(city.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted transition-colors text-left ${
                        selectedCity === city.name ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedCity === city.name && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                        <span>{city.name}</span>
                      </div>
                      <div className="text-right text-sm">
                        <span className={city.basePrice === 0 ? 'text-emerald-600 font-medium' : 'text-muted-foreground'}>
                          {city.basePrice === 0 ? 'Бесплатно' : `от ${formatPrice(city.basePrice)}`}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">{city.days}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Адрес (необязательно)</Label>
            <Input
              placeholder="Улица, дом, офис"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Delivery method */}
          {selectedCity && (
            <div className="space-y-3">
              <Label>Способ доставки</Label>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                {deliveryMethods.map((method) => {
                  const Icon = method.icon;
                  const cost = selectedCityData 
                    ? Math.round((selectedCityData.basePrice + Math.max(0, Math.floor((cartTotal - 50000) / 50000) * 500)) * method.multiplier)
                    : 0;
                  
                  return (
                    <div
                      key={method.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        deliveryMethod === method.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => setDeliveryMethod(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${cost === 0 ? 'text-emerald-600' : ''}`}>
                          {cost === 0 ? 'Бесплатно' : formatPrice(cost)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {method.id === 'express' 
                            ? `${parseInt(selectedCityData?.days || '1') - 1}-${parseInt(selectedCityData?.days?.split('-')[1] || '2')} дня`
                            : selectedCityData?.days
                          }
                        </p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          )}

          {/* Result */}
          {selectedCity && deliveryCost !== null && (
            <div className="bg-background rounded-lg p-4 border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Стоимость доставки</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedCityData?.days} • {deliveryMethods.find(m => m.id === deliveryMethod)?.name}
                  </p>
                </div>
                <p className={`text-xl font-bold ${deliveryCost === 0 ? 'text-emerald-600' : ''}`}>
                  {deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)}
                </p>
              </div>
            </div>
          )}

          {/* Note */}
          <p className="text-xs text-muted-foreground">
            * Предварительный расчёт. Точная стоимость будет уточнена менеджером с учётом габаритов заказа.
          </p>
        </div>
      )}
    </div>
  );
};
