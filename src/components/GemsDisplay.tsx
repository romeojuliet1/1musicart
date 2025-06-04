
import React from 'react';
import { Sparkles, Plus, Minus } from 'lucide-react';
import { useGems } from '@/contexts/GemsContext';

const GemsDisplay = () => {
  const { gems, transactions } = useGems();

  return (
    <div className="glassmorphism p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles size={24} className="text-purple-400 ml-2" />
          <span className="text-white font-semibold">نت‌های شما</span>
        </div>
        <div className="text-2xl font-bold text-purple-400">{gems}</div>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {transactions.slice(0, 3).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              {transaction.type === 'earned' ? (
                <Plus size={16} className="text-green-400 ml-1" />
              ) : (
                <Minus size={16} className="text-red-400 ml-1" />
              )}
              <span className="text-gray-300">{transaction.reason}</span>
            </div>
            <span className={transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'}>
              {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GemsDisplay;
