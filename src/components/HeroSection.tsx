
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, TrendingUp, Music } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-psyco-black-DEFAULT via-psyco-black-light to-psyco-black-DEFAULT"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-psyco-green-DEFAULT/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-psyco-green-DEFAULT/20 rounded-full blur-2xl animate-pulse-glow"></div>
      </div>
      
      {/* Hero image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/lovable-uploads/5964f950-36a7-430c-a887-4eea91ad4973.png" 
          alt="Music Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            موسیقی 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-light text-glow">
              {" "}ایرانی{" "}
            </span>
            مستقل
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            کشف، گوش دادن و خرید بهترین آهنگ‌ها، آلبوم‌ها و ویدیوهای موسیقی از هنرمندان مستقل ایرانی
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animation-delay-300">
            <Link
              to="/browse"
              className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 btn-glow flex items-center shadow-lg"
            >
              <Play className="mr-2" size={20} />
              شروع گوش دادن
            </Link>
            
            <Link
              to="/artists"
              className="bg-transparent border-2 border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <Music className="mr-2" size={20} />
              کشف هنرمندان
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in animation-delay-400">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="جستجو برای آهنگ، هنرمند یا آلبوم..."
                className="w-full py-4 pl-12 pr-6 bg-psyco-black-card/80 border border-psyco-green-DEFAULT/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-psyco-green-DEFAULT transition-all glassmorphism"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in animation-delay-500">
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-psyco-green-DEFAULT mb-2">10,000+</div>
              <div className="text-gray-300">آهنگ</div>
            </div>
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-psyco-green-DEFAULT mb-2">1,500+</div>
              <div className="text-gray-300">هنرمند</div>
            </div>
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-psyco-green-DEFAULT mb-2">500+</div>
              <div className="text-gray-300">آلبوم</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-psyco-green-DEFAULT rounded-full flex justify-center">
          <div className="w-1 h-3 bg-psyco-green-DEFAULT rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
