
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with breathing animation */}
      <div className="absolute inset-0 breathe-animation">
        <img 
          src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" 
          alt="نوازنده ایرانی در حال نواختن ساز سنتی" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto text-white">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-vazir">
            حمایت از<br />
            هنرمندان مستقل<br />
            موسیقی ایرانی
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light font-vazir">
            با خرید آلبوم و آهنگ‌های هنرمندان مستقل<br />
            به غنای موسیقی ایرانی کمک کنید<br />
            و از استعدادهای محلی حمایت نمایید
          </p>
          
          <Link
            to="/artists"
            className="inline-block bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-dark hover:from-psyco-green-dark hover:to-psyco-green-DEFAULT text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-vazir"
          >
            کشف هنرمندان
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

