
import React from 'react';
import { Globe } from 'lucide-react';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { value: Currency; label: string; flag: string }[] = [
    { value: 'USD', label: 'دلار آمریکا', flag: '🇺🇸' },
    { value: 'EUR', label: 'یورو', flag: '🇪🇺' },
    { value: 'IRR', label: 'ریال ایران', flag: '🇮🇷' }
  ];

  return (
    <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
      <SelectTrigger className="w-40 glassmorphism border-psyco-green-DEFAULT/20 text-white hover:border-psyco-green-DEFAULT/40 transition-colors">
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-psyco-green-DEFAULT" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="glassmorphism border-psyco-green-DEFAULT/20">
        {currencies.map((curr) => (
          <SelectItem
            key={curr.value}
            value={curr.value}
            className="text-white hover:bg-psyco-green-DEFAULT/20 focus:bg-psyco-green-DEFAULT/20"
          >
            <div className="flex items-center space-x-2">
              <span>{curr.flag}</span>
              <span>{curr.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
