
import React from 'react';
import { CheckCircle, Music, Users, Play, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist': return <Music className="w-4 h-4" />;
      case 'professional': return <Star className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'artist': return 'هنرمند';
      case 'professional': return 'متخصص';
      default: return 'طرفدار';
    }
  };

  const getVerificationBadgeColor = (userType: string) => {
    switch (userType) {
      case 'professional':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

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
            <Link
              key={profile.id}
              to={`/profile/${profile.id}`}
              className="group relative glassmorphism rounded-2xl p-6 card-hover animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top Tier Badge */}
              {profile.isTopTier && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                  ⭐ ویژه
                </div>
              )}

              {/* Avatar Section */}
              <div className="relative mb-6">
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-psyco-green-DEFAULT/30">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-psyco-green-DEFAULT/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Verified Badge with different colors */}
                <div className={`absolute -bottom-1 -right-1 ${getVerificationBadgeColor(profile.userType)} rounded-full p-1 shadow-lg border-2 border-psyco-black-DEFAULT`}>
                  <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
                </div>

                {/* Hover Play Button */}
                {profile.userType === 'artist' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                    <button className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white rounded-full p-2 transform hover:scale-110 transition-transform">
                      <Play size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-glow transition-all">
                    {profile.name}
                  </h3>
                  <div className="flex items-center gap-1 text-psyco-green-DEFAULT text-sm">
                    {getTypeIcon(profile.userType)}
                    <span>{getTypeLabel(profile.userType)}</span>
                  </div>
                </div>

                {profile.genre && (
                  <p className="text-psyco-purple-DEFAULT text-sm font-medium">{profile.genre}</p>
                )}

                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-psyco-green-DEFAULT">
                      {formatNumber(profile.stats.followers)}
                    </div>
                    <div className="text-xs text-gray-400">دنبال‌کننده</div>
                  </div>
                  
                  {profile.userType === 'artist' && profile.stats.tracks && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-psyco-purple-DEFAULT">
                        {profile.stats.tracks}
                      </div>
                      <div className="text-xs text-gray-400">ترک</div>
                    </div>
                  )}

                  {profile.stats.rating && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-bold text-yellow-500">
                          {profile.stats.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">امتیاز</div>
                    </div>
                  )}
                </div>

                {/* External Link */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="mt-4 w-full bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={14} />
                  مشاهده پروفایل
                </button>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-psyco-green-DEFAULT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedProfileShowcase;
