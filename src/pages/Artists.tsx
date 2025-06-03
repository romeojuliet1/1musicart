
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Music, Users, Play, Headphones } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  genre: string;
  bio: string;
  image: string;
  albums: number;
  followers: number;
  isVerified: boolean;
  donationGoal?: number;
  currentDonation?: number;
}

const Artists = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [followedArtists, setFollowedArtists] = useState<number[]>([]);

  const artists: Artist[] = [
    {
      id: 1,
      name: "احمد رضایی",
      genre: "سنتی",
      bio: "نوازنده سنتور و آهنگساز که با ترکیب موسیقی سنتی و مدرن آثار منحصربه‌فردی خلق می‌کند.",
      image: "/lovable-uploads/e2325889-b6ea-4035-a7bc-942c718cf47b.png",
      albums: 5,
      followers: 1250,
      isVerified: true,
      donationGoal: 10000000,
      currentDonation: 6500000
    },
    {
      id: 2,
      name: "سارا محمدی",
      genre: "پاپ",
      bio: "خواننده جوان و با استعداد که با صدای دلنشین خود طرفداران زیادی پیدا کرده است.",
      image: "/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png",
      albums: 3,
      followers: 2180,
      isVerified: true,
      donationGoal: 8000000,
      currentDonation: 4200000
    },
    {
      id: 3,
      name: "علی اکبری",
      genre: "فولک",
      bio: "ترانه‌سرا و نوازنده گیتار که داستان‌های مردم را در قالب موسیقی فولک بیان می‌کند.",
      image: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      albums: 7,
      followers: 980,
      isVerified: false,
      donationGoal: 5000000,
      currentDonation: 2800000
    }
  ];

  const genres = [
    { id: 'all', name: 'همه هنرمندان' },
    { id: 'traditional', name: 'سنتی' },
    { id: 'pop', name: 'پاپ' },
    { id: 'rock', name: 'راک' },
    { id: 'folk', name: 'فولک' }
  ];

  const followArtist = (artistId: number) => {
    if (followedArtists.includes(artistId)) {
      setFollowedArtists(followedArtists.filter(id => id !== artistId));
    } else {
      setFollowedArtists([...followedArtists, artistId]);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  const getDonationPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            هنرمندان مستقل
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            بیش از ۴۰۰ هنرمند مستقل ایرانی را کشف کنید و از آن‌ها حمایت کنید
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glassmorphism rounded-xl p-6 text-center">
            <Users size={32} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">۴۰۰+</div>
            <div className="text-gray-300">هنرمند فعال</div>
          </div>
          <div className="glassmorphism rounded-xl p-6 text-center">
            <Music size={32} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">۱۲۰۰+</div>
            <div className="text-gray-300">آلبوم منتشر شده</div>
          </div>
          <div className="glassmorphism rounded-xl p-6 text-center">
            <Headphones size={32} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">۵۰۰K+</div>
            <div className="text-gray-300">دقیقه پخش</div>
          </div>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant={selectedGenre === genre.id ? "default" : "outline"}
              onClick={() => setSelectedGenre(genre.id)}
              className="glassmorphism border-green-500/20 hover:border-green-500/40"
            >
              {genre.name}
            </Button>
          ))}
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card key={artist.id} className="glassmorphism card-hover group">
              <CardHeader className="relative p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {artist.isVerified && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      تایید شده
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
                  <CardTitle className="text-white text-xl">{artist.name}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => followArtist(artist.id)}
                    className={followedArtists.includes(artist.id) ? 'text-red-500' : 'text-gray-400'}
                  >
                    <Heart size={20} fill={followedArtists.includes(artist.id) ? 'currentColor' : 'none'} />
                  </Button>
                </div>
                
                <p className="text-green-400 mb-3">{artist.genre}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{artist.bio}</p>
                
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>{formatNumber(artist.albums)} آلبوم</span>
                  <span>{formatNumber(artist.followers)} دنبال‌کننده</span>
                </div>

                {/* Donation Progress */}
                {artist.donationGoal && artist.currentDonation && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>هدف حمایت مالی</span>
                      <span>{Math.round(getDonationPercentage(artist.currentDonation, artist.donationGoal))}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getDonationPercentage(artist.currentDonation, artist.donationGoal)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatNumber(artist.currentDonation)} از {formatNumber(artist.donationGoal)} تومان
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-6">
                  <Link to={`/artist/${artist.id}`} className="flex-1">
                    <Button className="w-full btn-glow">
                      مشاهده پروفایل
                    </Button>
                  </Link>
                  <Button size="icon" variant="outline" className="glassmorphism border-green-500/20">
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 glassmorphism rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">از هنرمندان مستقل حمایت کنید</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            با خرید آلبوم، دونیت و معرفی هنرمندان به دوستانتان، در رشد و توسعه موسیقی ایرانی نقش داشته باشید.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-glow">
              شروع حمایت مالی
            </Button>
            <Button variant="outline" className="glassmorphism border-green-500/20">
              راهنمای حمایت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
