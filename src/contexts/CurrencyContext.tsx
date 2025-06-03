
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'IRR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (usdPrice: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (in a real app, these would come from an API)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.85,
  IRR: 42000
};

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  IRR: '﷼'
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('preferred-currency');
    return (saved as Currency) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('preferred-currency', currency);
  }, [currency]);

  const convertPrice = (usdPrice: number): number => {
    return usdPrice * EXCHANGE_RATES[currency];
  };

  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    const symbol = CURRENCY_SYMBOLS[currency];
    
    if (currency === 'IRR') {
      return `${Math.round(convertedPrice).toLocaleString('fa-IR')} ${symbol}`;
    }
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatPrice,
      convertPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
