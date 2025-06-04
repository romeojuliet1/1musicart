
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GemsContextType {
  gems: number;
  addGems: (amount: number, reason: string) => void;
  spendGems: (amount: number, reason: string) => boolean;
  transactions: GemsTransaction[];
}

interface GemsTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  reason: string;
  date: string;
}

const GemsContext = createContext<GemsContextType | undefined>(undefined);

export const GemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gems, setGems] = useState(0);
  const [transactions, setTransactions] = useState<GemsTransaction[]>([]);

  useEffect(() => {
    const savedGems = localStorage.getItem('userGems');
    const savedTransactions = localStorage.getItem('gemsTransactions');
    
    if (savedGems) {
      setGems(parseInt(savedGems));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const addGems = (amount: number, reason: string) => {
    const newGems = gems + amount;
    const transaction: GemsTransaction = {
      id: Date.now().toString(),
      amount,
      type: 'earned',
      reason,
      date: new Date().toLocaleDateString('fa-IR')
    };

    setGems(newGems);
    setTransactions(prev => [transaction, ...prev]);
    
    localStorage.setItem('userGems', newGems.toString());
    localStorage.setItem('gemsTransactions', JSON.stringify([transaction, ...transactions]));
  };

  const spendGems = (amount: number, reason: string): boolean => {
    if (gems < amount) return false;

    const newGems = gems - amount;
    const transaction: GemsTransaction = {
      id: Date.now().toString(),
      amount,
      type: 'spent',
      reason,
      date: new Date().toLocaleDateString('fa-IR')
    };

    setGems(newGems);
    setTransactions(prev => [transaction, ...prev]);
    
    localStorage.setItem('userGems', newGems.toString());
    localStorage.setItem('gemsTransactions', JSON.stringify([transaction, ...transactions]));
    
    return true;
  };

  return (
    <GemsContext.Provider value={{ gems, addGems, spendGems, transactions }}>
      {children}
    </GemsContext.Provider>
  );
};

export const useGems = () => {
  const context = useContext(GemsContext);
  if (context === undefined) {
    throw new Error('useGems must be used within a GemsProvider');
  }
  return context;
};
