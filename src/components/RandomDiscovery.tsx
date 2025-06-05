
import React, { useState, useEffect } from 'react';
import { Shuffle, Play, Heart, ExternalLink, RefreshCw, Music, User, Headphones } from 'lucide-react';

interface RandomTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  genre: string;
  plays: number;
}

interface RandomArtist {
  id: string;
  name: string;
  avatar: string;
  genre: string;
  followers: number;
  bio: string;
  isVerified: boolean;
}

const RandomDiscovery = () => {
  const [currentTrack, setCurrentTrack] = useState<RandomTrack | null>(null);
  const [currentArtist, setCurrentArtist] = useState<RandomArtist | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const sampleTracks: RandomTrack[] = [
    {
      id: '1',
      title: 'غروب پاییزی',
      artist: 'سینا پارسیان',
      cover: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      duration: '4:32',
      genre: 'اسموک جاز',
      plays: 24500
    },
    {
      id: '2',
      title: 'رقص در باران',
      artist: 'مریم محمدی',
      cover: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
      duration: '3:45',
      genre: 'پاپ مدرن',
      plays: 18900
    },
    {
      id: '3',
      title: 'صدای شب',
      artist: 'علی یاسینی',
      cover: '/lovable-uploads/8dced82a-6a2c-48ee-a060-463c28764183.png',
      duration: '5:20',
      genre: 'الکترونیک',
      plays: 31200
    }
  ];

  const sampleArtists: RandomArtist[] = [
    {
      id: '1',
      name: 'احسان خواجه امیری',
      avatar: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
      genre: 'پاپ سنتی',
      followers: 125000,
      bio: 'خواننده و آهنگساز جوان با سبک منحصربه‌فرد',
      isVerified: true
    },
    {
      id: '2',
      name: 'زهرا احمدی',
      avatar: '/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png',
      genre: 'فولک مدرن',
      followers: 78000,
      bio: 'نوازنده گیتار و ترانه‌سرای مستقل',
      isVerified: false
    },
    {
      id: '3',
      name: 'رضا موسوی',
      avatar: '/lovable-uploads/8acfad30-aa90-4edd-b779-aafd43058584.png',
      genre: 'راک آلترناتیو',
      followers: 95000,
      bio: 'گیتاریست و تولیدکننده با بیش از 10 سال تجربه',
      isVerified: true
    }
  ];

  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * sampleTracks.length);
    return sampleTracks[randomIndex];
  };

  const getRandomArtist = () => {
    const randomIndex = Math.floor(Math.random() * sampleArtists.length);
    return sampleArtists[randomIndex];
  };

  const shuffleDiscovery = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setCurrentTrack(getRandomTrack());
      setCurrentArtist(getRandomArtist());
      setIsShuffling(false);
    }, 800);
  };

  useEffect(() => {
    setCurrentTrack(getRandomTrack());
    setCurrentArtist(getRandomArtist());
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-psyco-black-DEFAULT via-psyco-black-light to-psyco-black-DEFAULT relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-psyco-green-DEFAULT rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-psyco-purple-DEFAULT rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shuffle className="w-8 h-8 text-psyco-green-DEFAULT" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">کشف تصادفی</h2>
            <Shuffle className="w-8 h-8 text-psyco-purple-DEFAULT" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            هر لحظه یک تجربه جدید! موزیک و هنرمند تصادفی کشف کنید و شگفتی‌های موسیقی ایرانی را تجربه نمایید
          </p>
          
          <button
            onClick={shuffleDiscovery}
            disabled={isShuffling}
            className="mt-8 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'در حال کشف...' : 'کشف جدید'}
          </button>
        </div>

        {/* Discovery Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Random Music Card */}
          <div className={`glassmorphism rounded-3xl p-8 card-hover transition-all duration-500 ${isShuffling ? 'animate-pulse opacity-50' : 'animate-fade-in'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-dark rounded-full p-3">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">موزیک تصادفی</h3>
            </div>

            {currentTrack && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">{currentTrack.title}</h4>
                    <p className="text-psyco-green-DEFAULT font-medium">{currentTrack.artist}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <span>{currentTrack.duration}</span>
                      <span>•</span>
                      <span>{currentTrack.genre}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Headphones className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(currentTrack.plays)} پخش</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="bg-psyco-green-DEFAULT/20 hover:bg-psyco-green-DEFAULT/30 text-psyco-green-DEFAULT p-2 rounded-full transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                      <Play className="w-4 h-4" />
                      پخش
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Random Artist Card */}
          <div className={`glassmorphism rounded-3xl p-8 card-hover transition-all duration-500 ${isShuffling ? 'animate-pulse opacity-50' : 'animate-fade-in'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-psyco-purple-DEFAULT to-psyco-purple-dark rounded-full p-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">هنرمند تصادفی</h3>
            </div>

            {currentArtist && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={currentArtist.avatar}
                      alt={currentArtist.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-psyco-purple-DEFAULT/30"
                    />
                    {currentArtist.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">{currentArtist.name}</h4>
                    <p className="text-psyco-purple-DEFAULT font-medium">{currentArtist.genre}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                      <span>{formatNumber(currentArtist.followers)} دنبال‌کننده</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{currentArtist.bio}</p>

                <div className="flex gap-2">
                  <button className="flex-1 bg-transparent border border-psyco-purple-DEFAULT text-psyco-purple-DEFAULT hover:bg-psyco-purple-DEFAULT hover:text-white py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    دنبال کنید
                  </button>
                  <button className="bg-psyco-purple-DEFAULT hover:bg-psyco-purple-dark text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    پروفایل
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">علاقه‌مند به کشف بیشتر؟</h3>
            <p className="text-gray-300 mb-6">
              با ثبت‌نام در سایت، روزانه موزیک و هنرمندان جدید کشف کنید و از پیشنهادات شخصی‌سازی شده بهره‌مند شوید
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
                ثبت‌نام رایگان
              </button>
              <button className="border border-gray-500 text-gray-300 hover:border-white hover:text-white px-6 py-3 rounded-full font-medium transition-colors">
                بیشتر بدانید
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomDiscovery;
