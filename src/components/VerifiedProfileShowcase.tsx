
import React from 'react';
import VerifiedProfileCard from './VerifiedProfileCard';

interface VerifiedProfile {
  id: string;
  name: string;
  userType: 'artist' | 'professional' | 'fan';
  avatar: string;
  bio: string;
  stats: {
    followers: number;
    tracks?: number;
    albums?: number;
    rating?: number;
  };
  genre?: string;
  isTopTier?: boolean;
}

const VerifiedProfileShowcase = () => {
  const verifiedProfiles: VerifiedProfile[] = [
    {
      id: '1',
      name: 'محسن چاوشی',
      userType: 'artist',
      avatar: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
      bio: 'خواننده و آهنگساز مطرح ایرانی با بیش از 20 سال تجربه',
      stats: { followers: 2500000, tracks: 120, albums: 15 },
      genre: 'پاپ سنتی',
      isTopTier: true
    },
    {
      id: '2',
      name: 'سارا نجفی',
      userType: 'professional',
      avatar: '/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png',
      bio: 'منتقد موسیقی و تولیدکننده برجسته با تخصص در موسیقی کلاسیک',
      stats: { followers: 450000, rating: 4.8 },
      isTopTier: false
    },
    {
      id: '3',
      name: 'علی پارسا',
      userType: 'artist',
      avatar: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      bio: 'نوازنده سنتور و آهنگساز موسیقی ایرانی اصیل',
      stats: { followers: 890000, tracks: 85, albums: 8 },
      genre: 'سنتی',
      isTopTier: true
    },
    {
      id: '4',
      name: 'مریم رضایی',
      userType: 'fan',
      avatar: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
      bio: 'جمع‌آور و حامی موسیقی مستقل با بیش از 10000 ساعت گوش دادن',
      stats: { followers: 125000, rating: 4.9 },
      isTopTier: false
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-psyco-black-light to-psyco-black-DEFAULT">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">پروفایل‌های تایید شده</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            آشنایی با برترین اعضای تایید شده سایت که کیفیت و اعتبار آن‌ها مورد تایید ما قرار گرفته است
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedProfiles.map((profile, index) => (
            <VerifiedProfileCard
              key={profile.id}
              profile={profile}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedProfileShowcase;
