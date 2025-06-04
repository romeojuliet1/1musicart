
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, CreditCard, Banknote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DonationCardProps {
  artistName: string;
  artistImage?: string;
  goal?: number;
  current?: number;
}

const DonationCard: React.FC<DonationCardProps> = ({ 
  artistName, 
  artistImage, 
  goal = 5000000, 
  current = 2800000 
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');

  const predefinedAmounts = [50000, 100000, 200000, 500000, 1000000];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const getProgressPercentage = () => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleDonation = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount > 0) {
      console.log(`Donating ${amount} to ${artistName}`, { message });
      // Implement donation logic here
    }
  };

  return (
    <div dir="rtl">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 font-vazir">
            <Heart className="text-red-400" size={20} />
            حمایت از {artistName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-2 font-vazir">
              <span>هدف حمایت مالی</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-400 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-vazir">
              <span>{formatPrice(current)}</span>
              <span>{formatPrice(goal)}</span>
            </div>
          </div>

          {/* Quick Donation */}
          <div className="text-center">
            <p className="text-gray-300 mb-4 font-vazir">
              با حمایت مالی از {artistName}، او را در ادامه مسیر هنری‌اش یاری کنید
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-vazir">
                  <Heart size={16} className="ml-2" />
                  حمایت مالی
                </Button>
              </DialogTrigger>
              
              <DialogContent className="glassmorphism border-green-500/20 max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-white text-center font-vazir">
                    حمایت از {artistName}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 p-2">
                  {/* Artist Info */}
                  {artistImage && (
                    <div className="text-center">
                      <img 
                        src={artistImage} 
                        alt={artistName}
                        className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                      />
                      <p className="text-gray-300 font-vazir">
                        هر مبلغی که اهدا کنید، مستقیماً به {artistName} می‌رسد
                      </p>
                    </div>
                  )}

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-white mb-3 font-vazir">مبلغ حمایت را انتخاب کنید:</label>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className="glassmorphism border-green-500/20 font-vazir"
                        >
                          {formatPrice(amount)}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="مبلغ دلخواه (تومان)"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 font-vazir"
                      />
                      <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white mb-2 font-vazir">پیام برای هنرمند (اختیاری):</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="پیام تشویقی یا نظرتان را بنویسید..."
                      rows={3}
                      className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none font-vazir"
                    />
                  </div>

                  {/* Donation Button */}
                  <Button 
                    onClick={handleDonation}
                    disabled={!selectedAmount && !customAmount}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 font-vazir"
                  >
                    <CreditCard size={16} className="ml-2" />
                    اهدای {formatPrice(selectedAmount || parseInt(customAmount) || 0)}
                  </Button>

                  <p className="text-xs text-gray-400 text-center font-vazir">
                    تمام مبالغ اهدایی مستقیماً و بدون هیچ کسری به هنرمند واریز می‌شود
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationCard;

