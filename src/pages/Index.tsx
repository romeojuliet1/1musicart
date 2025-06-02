
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import FeaturedTracks from "@/components/FeaturedTracks";
import FeaturedAlbums from "@/components/FeaturedAlbums";
import FeaturedArtists from "@/components/FeaturedArtists";
import { Link } from "react-router-dom";
import { Volume2, Music2, Lightbulb, PartyPopper, MoveRight, CalendarDays, Play, Heart, ShoppingCart } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentTrack, setCurrentTrack] = useState(null);

  const featuredServices = [
    {
      title: "تک‌آهنگ‌ها",
      description: "جدیدترین تک‌آهنگ‌های هنرمندان مستقل ایرانی را کشف کنید و خریداری کنید.",
      icon: <Music2 size={24} />,
      imageSrc: "/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png",
      link: "/services#tracks"
    },
    {
      title: "آلبوم‌ها",
      description: "آلبوم‌های کامل با کیفیت بالا از هنرمندان برتر ایرانی.",
      icon: <Volume2 size={24} />,
      imageSrc: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      link: "/services#albums"
    },
    {
      title: "ویدیوهای موسیقی",
      description: "موزیک ویدیوهای باکیفیت و انحصاری هنرمندان.",
      icon: <Play size={24} />,
      imageSrc: "/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png",
      link: "/services#videos"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Featured Tracks Section */}
      <FeaturedTracks onTrackSelect={setCurrentTrack} />
      
      {/* Featured Albums Section */}
      <FeaturedAlbums />
      
      {/* Featured Artists Section */}
      <FeaturedArtists />
      
      {/* Services Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">خدمات ما</h2>
              <p className="text-gray-400 max-w-2xl">
                پلتفرم کاملی برای کشف و خرید موسیقی ایرانی
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
            >
              مشاهده همه
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="glassmorphism p-6 rounded-xl card-hover animate-fade-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-psyco-green-DEFAULT mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-psyco-green-DEFAULT transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={service.imageSrc} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Link 
                  to={service.link}
                  className="text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors inline-flex items-center"
                >
                  کشف کنید
                  <MoveRight className="mr-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Genre Types Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">ژانرهای موسیقی</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              انواع مختلف سبک‌های موسیقی ایرانی و بین‌المللی
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "پاپ", icon: <Volume2 size={32} /> },
              { name: "راک", icon: <PartyPopper size={32} /> },
              { name: "سنتی", icon: <CalendarDays size={32} /> },
              { name: "الکترونیک", icon: <Music2 size={32} /> }
            ].map((genre, index) => (
              <div 
                key={index}
                className="glassmorphism flex flex-col items-center justify-center py-8 px-4 text-center card-hover animate-fade-in cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4 group-hover:scale-110 transition-transform">
                  {genre.icon}
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-psyco-green-DEFAULT transition-colors">{genre.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/browse"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              مرور همه ژانرها
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">موسیقی مورد علاقه‌تان را پیدا کنید</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              هزاران آهنگ، آلبوم و ویدیو از بهترین هنرمندان مستقل ایرانی در اختیار شما
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                شروع کنید
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/artists"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                هنرمندان
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      {currentTrack && <MusicPlayer track={currentTrack} />}
    </div>
  );
};

export default Index;
