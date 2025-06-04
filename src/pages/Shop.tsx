
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Gift, Star, Play, Sparkles } from 'lucide-react';
import { useGems } from '@/contexts/GemsContext';
import { useAffiliate } from '@/contexts/AffiliateContext';
import GiftWrapSystem from '@/components/GiftWrapSystem';

interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  digitalPrice: number;
  gemsPrice: number;
  image: string;
  rating: number;
  genre: string;
  isNew?: boolean;
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showGiftWrap, setShowGiftWrap] = useState(false);
  const { gems, addGems, spendGems } = useGems();
  const { trackReferral } = useAffiliate();

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      localStorage.setItem('referralCode', refCode);
      addGems(20, 'ورود از طریق لینک دعوت');
    }
  }, [addGems]);

  const albums: Album[] = [
    {
      id: 1,
      title: "سفر به درون",
      artist: "احمد رضایی",
      price: 250000,
      digitalPrice: 150000,
      gemsPrice: 300,
      image: "/lovable-uploads/e2325889-b6ea-4035-a7bc-942c718cf47b.png",
      rating: 4.8,
      genre: "سنتی",
      isNew: true
    },
    {
      id: 2,
      title: "شب‌های تهران",
      artist: "سارا محمدی",
      price: 200000,
      digitalPrice: 120000,
      gemsPrice: 240,
      image: "/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png",
      rating: 4.6,
      genre: "پاپ"
    },
    {
      id: 3,
      title: "نوای کوه",
      artist: "علی اکبری",
      price: 300000,
      digitalPrice: 180000,
      gemsPrice: 360,
      image: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      rating: 4.9,
      genre: "فولک"
    }
  ];

  const categories = [
    { id: 'all', name: 'همه آلبوم‌ها' },
    { id: 'traditional', name: 'سنتی' },
    { id: 'pop', name: 'پاپ' },
    { id: 'rock', name: 'راک' },
    { id: 'folk', name: 'فولک' }
  ];

  const addToCart = (albumId: number, paymentMethod: 'cash' | 'gems' = 'cash') => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    if (paymentMethod === 'gems') {
      if (spendGems(album.gemsPrice, `خرید آلبوم ${album.title}`)) {
        setCartItems([...cartItems, albumId]);
        addGems(Math.floor(album.gemsPrice * 0.1), 'پاداش خرید با نت');
        
        // Track referral if exists
        const refCode = localStorage.getItem('referralCode');
        if (refCode) {
          trackReferral(refCode, album.digitalPrice);
        }
      }
    } else {
      setCartItems([...cartItems, albumId]);
      addGems(Math.floor(album.digitalPrice / 1000), `خرید آلبوم ${album.title}`);
      
      // Track referral if exists
      const refCode = localStorage.getItem('referralCode');
      if (refCode) {
        trackReferral(refCode, album.digitalPrice);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            فروشگاه موسیقی
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            آلبوم‌های دیجیتال و فیزیکی هنرمندان مستقل ایرانی را کشف و خریداری کنید
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="glassmorphism border-green-500/20 hover:border-green-500/40"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {albums.map((album) => (
            <Card key={album.id} className="glassmorphism card-hover group">
              <CardHeader className="relative p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img 
                    src={album.image} 
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {album.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      جدید
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="icon" className="btn-glow rounded-full">
                      <Play size={20} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-white text-lg">{album.title}</CardTitle>
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm mr-1">{album.rating}</span>
                  </div>
                </div>
                
                <p className="text-green-400 mb-2">{album.artist}</p>
                <p className="text-gray-400 text-sm mb-4">{album.genre}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">نسخه دیجیتال:</span>
                    <span className="text-green-400 font-medium">{formatPrice(album.digitalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">نسخه فیزیکی:</span>
                    <span className="text-green-400 font-medium">{formatPrice(album.price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">با نت:</span>
                    <span className="text-purple-400 font-medium flex items-center">
                      <Sparkles size={14} className="ml-1" />
                      {album.gemsPrice}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mt-6">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => addToCart(album.id, 'cash')}
                      className="flex-1 btn-glow"
                      disabled={cartItems.includes(album.id)}
                    >
                      <ShoppingCart size={16} className="ml-2" />
                      {cartItems.includes(album.id) ? 'اضافه شد' : 'خرید نقدی'}
                    </Button>
                    <Button size="icon" variant="outline" className="glassmorphism border-green-500/20">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => addToCart(album.id, 'gems')}
                    className="w-full glassmorphism border-purple-500/20 hover:border-purple-500/40"
                    variant="outline"
                    disabled={cartItems.includes(album.id) || gems < album.gemsPrice}
                  >
                    <Sparkles size={16} className="ml-2" />
                    خرید با نت
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gift Wrapping Toggle */}
        <div className="text-center mb-12">
          <Button 
            onClick={() => setShowGiftWrap(!showGiftWrap)}
            className="btn-glow px-8 py-4 text-lg"
          >
            <Gift size={20} className="ml-2" />
            {showGiftWrap ? 'پنهان کردن کادوپیچ' : 'سیستم کادوپیچ پیشرفته'}
          </Button>
        </div>

        {/* Gift Wrapping Section */}
        {showGiftWrap && (
          <div className="mb-12">
            <GiftWrapSystem />
          </div>
        )}

        {/* Gems Info Section */}
        <div className="glassmorphism rounded-2xl p-8 text-center">
          <Sparkles size={48} className="text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">سیستم نت (جواهر)</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            با هر خرید، ورود از لینک دعوت، و فعالیت در پلتفرم نت کسب کنید. 
            نت‌های خود را برای خرید آلبوم‌ها و خدمات ویژه استفاده کنید.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glassmorphism p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-2">خرید آلبوم</h3>
              <p className="text-gray-400 text-sm">هر ۱۰۰۰ تومان = ۱ نت</p>
            </div>
            <div className="glassmorphism p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-2">دعوت دوستان</h3>
              <p className="text-gray-400 text-sm">هر دعوت = ۲۰ نت</p>
            </div>
            <div className="glassmorphism p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-2">پاداش خرید</h3>
              <p className="text-gray-400 text-sm">۱۰٪ نت برگشتی</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
