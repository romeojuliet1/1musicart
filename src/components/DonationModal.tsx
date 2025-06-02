
import React, { useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { Artist } from '@/types/user';

interface DonationModalProps {
  artist: Artist;
  basePrice: number;
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, message?: string) => void;
}

const DonationModal = ({ artist, basePrice, isOpen, onClose, onDonate }: DonationModalProps) => {
  const [donationAmount, setDonationAmount] = useState(5);
  const [message, setMessage] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const presetAmounts = [1, 5, 10, 25, 50];

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : donationAmount;
    if (amount > 0) {
      onDonate(amount, message || undefined);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      
      <div className="relative glassmorphism p-8 rounded-2xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-psyco-green-DEFAULT/20"
            />
            <Heart className="absolute -bottom-1 -right-1 w-8 h-8 text-red-500 fill-current bg-psyco-black-DEFAULT rounded-full p-1" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">حمایت از {artist.name}</h2>
          <p className="text-gray-400">
            با حمایت مالی از این هنرمند، به تولید موسیقی بیشتر کمک کنید
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">مبلغ خرید: ${basePrice}</h3>
            <div className="bg-psyco-black-light p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm">
                مبلغ اصلی خرید به صورت خودکار به هنرمند پرداخت می‌شود.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              مبلغ حمایت اضافی
            </h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setDonationAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-lg border transition-colors ${
                    donationAmount === amount && !customAmount
                      ? 'border-psyco-green-DEFAULT bg-psyco-green-DEFAULT/20 text-psyco-green-DEFAULT'
                      : 'border-gray-700 text-gray-300 hover:border-psyco-green-DEFAULT/50'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                یا مبلغ دلخواه:
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setDonationAmount(0);
                }}
                placeholder="مبلغ به دلار"
                className="w-full bg-psyco-black-light border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:border-psyco-green-DEFAULT focus:outline-none"
                min="0.50"
                step="0.50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              پیام حمایت (اختیاری):
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام تشویقی برای هنرمند..."
              className="w-full bg-psyco-black-light border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:border-psyco-green-DEFAULT focus:outline-none"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-gray-400 mt-1">{message.length}/200</p>
          </div>

          <div className="bg-psyco-green-DEFAULT/10 border border-psyco-green-DEFAULT/30 rounded-lg p-4">
            <div className="flex justify-between items-center text-white">
              <span>مجموع پرداختی:</span>
              <span className="text-xl font-bold">
                ${(basePrice + (customAmount ? parseFloat(customAmount) || 0 : donationAmount)).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              خرید: ${basePrice} + حمایت: ${customAmount ? (parseFloat(customAmount) || 0).toFixed(2) : donationAmount.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={handleDonate}
              className="flex-1 bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              خرید و حمایت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
