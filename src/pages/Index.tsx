
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
    <div>
      <HeroSection />
      
      {/* Grid Sections */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* کنسرت‌ها */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-xl mb-6 mx-auto">
                <Ticket size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">کنسرت‌ها</h3>
              <p className="text-gray-600 text-center">شما‌آهنگ‌های ذخیره‌دهی دیجیت‌ها و خرید بلیط</p>
            </div>

            {/* آلبوم‌ها */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-xl mb-6 mx-auto">
                <Music size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">آلبوم‌ها</h3>
              <p className="text-gray-600 text-center">پیش به تقدیره‌ای آلبوم میذ</p>
            </div>

            {/* درباره ما */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">درباره ما</h3>
              <p className="text-gray-600 text-center mb-6">درپیتیمایی به پیشنهایان متشان مستقل و هنرجی محوری محدقی آن را به آن ما موسیقی می‌پذیرید.</p>
            </div>

            {/* تماس با ما */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">تماس با ما</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="نام"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="ایمیل"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  ارسال
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
