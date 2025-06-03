
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Music, Play, UserPlus } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  genre: string;
  avatar: string;
  followers: number;
  trackCount: number;
  verified: boolean;
}

const FeaturedArtists = () => {
  const artists: Artist[] = [
    {
      id: '1',
      name: 'احسان خواجه امیری',
      genre: 'پاپ',
      avatar: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
      followers: 125000,
      trackCount: 45,
      verified: true
    },
    {
      id: '2',
      name: 'سینا پارسیان',
      genre: 'راک',
      avatar: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
      followers: 89000,
      trackCount: 32,
      verified: true
    },
    {
      id: '3',
      name: 'مریم محمدی',
      genre: 'سنتی',
      avatar: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
      followers: 67000,
      trackCount: 28,
      verified: false
    },
    {
      id: '4',
      name: 'علی یاسینی',
      genre: 'الکترونیک',
      avatar: '/lovable-uploads/8dced82a-6a2c-48ee-a060-463c28764183.png',
      followers: 95000,
      trackCount: 52,
      verified: true
    }
  ];

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <section className="section-padding bg-gradient-to-b from-psyco-black-DEFAULT to-psyco-black-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">هنرمندان برجسته</h2>
          <button className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-all duration-300 link-hover font-medium">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="floating-card glassmorphism p-6 rounded-2xl card-hover animate-fade-in group text-center block relative overflow-hidden"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="relative mb-6">
                <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-psyco-green-DEFAULT/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {artist.verified && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white rounded-full p-1 shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <button className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT hover:from-psyco-green-dark hover:to-psyco-purple-dark text-white rounded-full p-2 transition-all duration-300 btn-glow shadow-lg transform hover:scale-110">
                    <Play size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-glow transition-all duration-300">
                  {artist.name}
                </h3>
                <p className="gradient-text text-sm font-medium">{artist.genre}</p>
                
                <div className="flex justify-center space-x-4 text-xs text-psyco-gray-DEFAULT">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-psyco-green-DEFAULT" />
                    <span className="font-medium">{formatFollowers(artist.followers)}</span>
                  </div>
                  <div className="flex items-center">
                    <Music size={14} className="mr-1 text-psyco-purple-DEFAULT" />
                    <span className="font-medium">{artist.trackCount} ترک</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-full bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-gradient-to-r hover:from-psyco-green-DEFAULT hover:to-psyco-purple-DEFAULT hover:text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center btn-glow transform hover:scale-105"
                  >
                    <UserPlus size={16} className="mr-2" />
                    دنبال کنید
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
