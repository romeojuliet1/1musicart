
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import FeaturedTracks from "@/components/FeaturedTracks";
import FeaturedAlbums from "@/components/FeaturedAlbums";
import FeaturedArtists from "@/components/FeaturedArtists";
import { Link } from "react-router-dom";
import { Music, Ticket, Users, Mail } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div dir="rtl">
      <HeroSection />
      
      {/* Grid Sections */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-vazir">
            خدمات ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* کنسرت‌ها */}
            <div className="glassmorphism p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-dark rounded-xl mb-6 mx-auto">
                <Ticket size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-vazir">کنسرت‌ها</h3>
              <p className="text-gray-300 text-center font-vazir">
                اطلاعات کنسرت‌ها و خرید بلیط رویدادهای موسیقی
              </p>
              <Link 
                to="/booking" 
                className="block mt-4 text-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors font-vazir"
              >
                مشاهده کنسرت‌ها →
              </Link>
            </div>

            {/* آلبوم‌ها */}
            <div className="glassmorphism p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-psyco-purple-DEFAULT to-psyco-purple-dark rounded-xl mb-6 mx-auto">
                <Music size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-vazir">آلبوم‌ها</h3>
              <p className="text-gray-300 text-center font-vazir">
                مجموعه کاملی از آلبوم‌های هنرمندان مستقل ایرانی
              </p>
              <Link 
                to="/shop" 
                className="block mt-4 text-center text-psyco-purple-DEFAULT hover:text-psyco-purple-light transition-colors font-vazir"
              >
                مشاهده آلبوم‌ها →
              </Link>
            </div>

            {/* هنرمندان */}
            <div className="glassmorphism p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 mx-auto">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-vazir">هنرمندان</h3>
              <p className="text-gray-300 text-center font-vazir">
                آشنایی با هنرمندان مستقل و پشتیبانی از آثارشان
              </p>
              <Link 
                to="/artists" 
                className="block mt-4 text-center text-orange-400 hover:text-orange-300 transition-colors font-vazir"
              >
                مشاهده هنرمندان →
              </Link>
            </div>

            {/* تماس با ما */}
            <div className="glassmorphism p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl mb-6 mx-auto">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-vazir">تماس با ما</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="نام شما"
                  required
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-psyco-green-DEFAULT transition-colors font-vazir"
                />
                <input
                  type="email"
                  placeholder="آدرس ایمیل"
                  required
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-psyco-green-DEFAULT transition-colors"
                  style={{ direction: 'ltr' }}
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 font-vazir"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tracks Section */}
      <FeaturedTracks onTrackSelect={setCurrentTrack} />
      
      {/* Featured Albums Section */}
      <FeaturedAlbums />
      
      {/* Featured Artists Section */}
      <FeaturedArtists />

      {/* Music Player */}
      {currentTrack && <MusicPlayer track={currentTrack} />}
    </div>
  );
};

export default Index;

