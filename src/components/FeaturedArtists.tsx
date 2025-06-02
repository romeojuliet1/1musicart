
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
    <section className="py-16 px-6 md:px-12 bg-psyco-black-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">هنرمندان برجسته</h2>
          <button className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="glassmorphism p-6 rounded-xl card-hover animate-fade-in group text-center block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-psyco-green-DEFAULT/20 group-hover:border-psyco-green-DEFAULT transition-colors"
                />
                {artist.verified && (
                  <div className="absolute -top-1 -right-1 bg-psyco-green-DEFAULT text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white rounded-full p-2 transition-all">
                    <Play size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-psyco-green-DEFAULT transition-colors">
                  {artist.name}
                </h3>
                <p className="text-psyco-green-DEFAULT text-sm font-medium">{artist.genre}</p>
                
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{formatFollowers(artist.followers)}</span>
                  </div>
                  <div className="flex items-center">
                    <Music size={14} className="mr-1" />
                    <span>{artist.trackCount} ترک</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-full bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT hover:text-white py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center"
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
