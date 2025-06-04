
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';
import { useGems } from '@/contexts/GemsContext';

interface GiftWrapOption {
  id: string;
  name: string;
  price: number;
  gemsPrice: number;
  image: string;
  description: string;
}

const GiftWrapSystem = () => {
  const [selectedWrap, setSelectedWrap] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'gems'>('cash');
  const { gems, spendGems } = useGems();

  const wrapOptions: GiftWrapOption[] = [
    {
      id: 'classic',
      name: 'کلاسیک طلایی',
      price: 25000,
      gemsPrice: 50,
      image: '/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png',
      description: 'بسته‌بندی کلاسیک با روبان طلایی'
    },
    {
      id: 'premium',
      name: 'پریمیوم نقره‌ای',
      price: 35000,
      gemsPrice: 70,
      image: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      description: 'بسته‌بندی لوکس با تزئینات نقره‌ای'
    },
    {
      id: 'deluxe',
      name: 'دلوکس کریستالی',
      price: 50000,
      gemsPrice: 100,
      image: '/lovable-uploads/e2325889-b6ea-4035-a7bc-942c718cf47b.png',
      description: 'بسته‌بندی فوق‌العاده با کریستال‌های درخشان'
    }
  ];

  const handlePurchase = () => {
    if (!selectedWrap || !recipientEmail) return;

    const option = wrapOptions.find(w => w.id === selectedWrap);
    if (!option) return;

    if (paymentMethod === 'gems') {
      if (spendGems(option.gemsPrice, `خرید کادوپیچ ${option.name}`)) {
        console.log('Gift wrap purchased with gems');
        // Process gift wrap
      } else {
        console.log('Not enough gems');
      }
    } else {
      console.log('Processing cash payment for gift wrap');
      // Process cash payment
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="glassmorphism rounded-2xl p-8 space-y-8">
      <div className="text-center">
        <Gift size={48} className="text-green-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">سیستم کادوپیچ پیشرفته</h2>
        <p className="text-gray-300">آلبوم‌های خود را با بهترین کیفیت کادوپیچ کنید</p>
      </div>

      {/* Gift Wrap Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wrapOptions.map((option) => (
          <Card 
            key={option.id}
            className={`glassmorphism cursor-pointer transition-all duration-300 ${
              selectedWrap === option.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedWrap(option.id)}
          >
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={option.image} 
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-2">{option.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{option.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">نقدی:</span>
                  <span className="text-green-400">{formatPrice(option.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">با نت:</span>
                  <span className="text-purple-400 flex items-center">
                    <Sparkles size={16} className="ml-1" />
                    {option.gemsPrice}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gift Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">ایمیل گیرنده</label>
            <Input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="example@email.com"
              className="glassmorphism border-green-500/20"
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">پیام کادو</label>
            <Textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="پیام خود را برای گیرنده بنویسید..."
              className="glassmorphism border-green-500/20 h-32"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">روش پرداخت</label>
            <div className="space-y-2">
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('cash')}
                className="w-full glassmorphism"
              >
                پرداخت نقدی
              </Button>
              <Button
                variant={paymentMethod === 'gems' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('gems')}
                className="w-full glassmorphism"
                disabled={gems < (wrapOptions.find(w => w.id === selectedWrap)?.gemsPrice || 0)}
              >
                <Sparkles size={16} className="ml-2" />
                پرداخت با نت (موجودی: {gems})
              </Button>
            </div>
          </div>

          <Button 
            onClick={handlePurchase}
            disabled={!selectedWrap || !recipientEmail}
            className="w-full btn-glow"
          >
            <Gift size={16} className="ml-2" />
            تکمیل کادوپیچ
          </Button>
        </div>
      </div>

      {/* Preview */}
      {selectedWrap && (
        <div className="glassmorphism p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Star size={20} className="text-yellow-400 ml-2" />
            پیش‌نمای کادو
          </h3>
          <div className="text-gray-300 space-y-2">
            <p>نوع بسته‌بندی: {wrapOptions.find(w => w.id === selectedWrap)?.name}</p>
            <p>گیرنده: {recipientEmail || 'تعیین نشده'}</p>
            <p>پیام: {giftMessage || 'بدون پیام'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftWrapSystem;
