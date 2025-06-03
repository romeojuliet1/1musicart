
import React, { useState } from 'react';
import { Play, Heart, ShoppingCart, MoreHorizontal } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import DonationModal from './DonationModal';

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  price: number;
  genre: string;
}

interface FeaturedTracksProps {
  onTrackSelect: (track: Track) => void;
}

const FeaturedTracks = ({ onTrackSelect }: FeaturedTracksProps) => {
  const { formatPrice } = useCurrency();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const tracks: Track[] = [
    {
      id: '1',
      title: 'گل یاس',
      artist: 'احسان خواجه امیری',
      cover: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
      duration: '3:45',
      price: 1.99,
      genre: 'پاپ'
    },
    {
      id: '2',
      title: 'عاشقانه',
      artist: 'سینا پارسیان',
      cover: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      duration: '4:12',
      price: 2.49,
      genre: 'پاپ'
    },
    {
      id: '3',
      title: 'شب بخیر',
      artist: 'علی یاسینی',
      cover: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
      duration: '3:28',
      price: 1.79,
      genre: 'راک'
    },
    {
      id: '4',
      title: 'خاطرات',
      artist: 'مریم محمدی',
      cover: '/lovable-uploads/8dced82a-6a2c-48ee-a060-463c28764183.png',
      duration: '5:01',
      price: 2.99,
      genre: 'سنتی'
    }
  ];

  // Mock artist data for donation
  const mockArtist = {
    id: '1',
    name: 'احسان خواجه امیری',
    email: 'ehsan@example.com',
    avatar: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
    userType: 'artist' as const,
    isVerified: true,
    bio: 'خواننده و آهنگساز پاپ ایرانی',
    joinDate: new Date('2020-01-15'),
    genres: ['پاپ', 'راک'],
    albums: 5,
    singles: 23,
    videos: 12,
    followers: 125000,
    totalSales: 50000,
    activeDaysThisWeek: 5,
    lastActiveDate: new Date(),
    stats: {
      albumsPurchased: 0,
      singlesPurchased: 0,
      videosPurchased: 0,
      totalSpent: 0,
      donationsGiven: 0
    }
  };

  const handlePurchaseWithDonation = (track: Track) => {
    setSelectedTrack(track);
    setShowDonationModal(true);
  };

  const handleDonate = (amount: number, message?: string) => {
    console.log(`Donated $${amount} for track ${selectedTrack?.title}`, { message });
    // اینجا منطق پردازش پرداخت و donation قرار می‌گیرد
  };

  return (
    <section className="section-padding bg-gradient-to-b from-psyco-black-light to-psyco-black-DEFAULT">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">ترک‌های برجسته</h2>
          <button className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-all duration-300 link-hover font-medium">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="floating-card glassmorphism p-4 rounded-2xl card-hover animate-fade-in group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <button
                    onClick={() => onTrackSelect(track)}
                    className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white rounded-full p-3 transition-all duration-300 transform group-hover:scale-110 btn-glow shadow-lg"
                  >
                    <Play size={24} />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {track.genre}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-medium truncate group-hover:text-glow transition-all duration-300">
                  {track.title}
                </h3>
                <p className="text-psyco-gray-light text-sm truncate font-medium">{track.artist}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-psyco-gray-DEFAULT font-medium">{track.duration}</span>
                  <span className="gradient-text font-bold">{formatPrice(track.price)}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <button className="text-psyco-gray-DEFAULT hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                      <Heart size={18} />
                    </button>
                    <button className="text-psyco-gray-DEFAULT hover:text-white transition-all duration-300 transform hover:scale-110">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => handlePurchaseWithDonation(track)}
                    className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center btn-glow shadow-lg transform hover:scale-105"
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    خرید
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTrack && (
        <DonationModal
          artist={mockArtist}
          basePrice={selectedTrack.price}
          isOpen={showDonationModal}
          onClose={() => setShowDonationModal(false)}
          onDonate={handleDonate}
        />
      )}
    </section>
  );
};

export default FeaturedTracks;
