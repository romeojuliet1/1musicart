
import React from 'react';
import { Play, Heart, ShoppingCart, Music } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  trackCount: number;
  price: number;
  genre: string;
  year: number;
}

const FeaturedAlbums = () => {
  const { formatPrice } = useCurrency();

  const albums: Album[] = [
    {
      id: '1',
      title: 'سفر به خاطرات',
      artist: 'احسان خواجه امیری',
      cover: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
      trackCount: 12,
      price: 15.99,
      genre: 'پاپ',
      year: 2023
    },
    {
      id: '2',
      title: 'صدای دل',
      artist: 'سینا پارسیان',
      cover: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      trackCount: 10,
      price: 12.99,
      genre: 'راک',
      year: 2023
    },
    {
      id: '3',
      title: 'نغمه‌های سنتی',
      artist: 'مریم محمدی',
      cover: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
      trackCount: 8,
      price: 18.99,
      genre: 'سنتی',
      year: 2022
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-psyco-black-DEFAULT to-psyco-black-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">آلبوم‌های برجسته</h2>
          <button className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-all duration-300 link-hover font-medium">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="floating-card glassmorphism p-6 rounded-2xl card-hover animate-fade-in group relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <button className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white rounded-full p-4 transition-all duration-300 transform group-hover:scale-110 btn-glow shadow-lg">
                    <Play size={28} />
                  </button>
                </div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {album.genre}
                </div>
                <div className="absolute top-3 left-3 bg-psyco-black-card backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {album.year}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-glow transition-all duration-300">
                  {album.title}
                </h3>
                <p className="text-psyco-gray-light font-medium">{album.artist}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-psyco-gray-DEFAULT space-x-2">
                    <Music size={16} className="text-psyco-green-DEFAULT" />
                    <span className="font-medium">{album.trackCount} ترک</span>
                  </div>
                  <span className="gradient-text font-bold text-lg">{formatPrice(album.price)}</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button className="text-psyco-gray-DEFAULT hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                    <Heart size={22} />
                  </button>
                  <button className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center btn-glow shadow-lg transform hover:scale-105">
                    <ShoppingCart size={18} className="mr-2" />
                    خرید آلبوم
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlbums;
