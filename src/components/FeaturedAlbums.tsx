
import React from 'react';
import { Play, Heart, ShoppingCart, Music } from 'lucide-react';

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
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">آلبوم‌های برجسته</h2>
          <button className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="glassmorphism p-6 rounded-xl card-hover animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white rounded-full p-4 transition-all transform group-hover:scale-110">
                    <Play size={28} />
                  </button>
                </div>
                <div className="absolute top-3 right-3 bg-psyco-green-DEFAULT text-white px-3 py-1 rounded-full text-sm">
                  {album.genre}
                </div>
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  {album.year}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-psyco-green-DEFAULT transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-400">{album.artist}</p>
                
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <Music size={16} className="mr-1" />
                    <span>{album.trackCount} ترک</span>
                  </div>
                  <span className="text-psyco-green-DEFAULT font-bold text-lg">${album.price}</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center">
                    <ShoppingCart size={16} className="mr-2" />
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
