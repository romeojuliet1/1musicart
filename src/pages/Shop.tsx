
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Gift, Star, Play } from 'lucide-react';

interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  digitalPrice: number;
  image: string;
  rating: number;
  genre: string;
  isNew?: boolean;
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<number[]>([]);

  const albums: Album[] = [
    {
      id: 1,
      title: "سفر به درون",
      artist: "احمد رضایی",
      price: 250000,
      digitalPrice: 150000,
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

  const addToCart = (albumId: number) => {
    if (!cartItems.includes(albumId)) {
      setCartItems([...cartItems, albumId]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    onClick={() => addToCart(album.id)}
                    className="flex-1 btn-glow"
                    disabled={cartItems.includes(album.id)}
                  >
                    <ShoppingCart size={16} className="ml-2" />
                    {cartItems.includes(album.id) ? 'اضافه شد' : 'افزودن'}
                  </Button>
                  <Button size="icon" variant="outline" className="glassmorphism border-green-500/20">
                    <Heart size={16} />
                  </Button>
                  <Button size="icon" variant="outline" className="glassmorphism border-green-500/20">
                    <Gift size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gift Wrapping Section */}
        <div className="mt-20 glassmorphism rounded-2xl p-8 text-center">
          <Gift size={48} className="text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">کادوپیچ موسیقی</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            آلبوم‌های مورد علاقه‌تان را به عنوان هدیه برای عزیزانتان ارسال کنید. 
            ما آن‌ها را به زیبایی بسته‌بندی می‌کنیم و همراه با پیام شما تحویل می‌دهیم.
          </p>
          <Button className="btn-glow px-8 py-3 text-lg">
            شروع کادوپیچ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
