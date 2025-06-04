
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with breathing animation */}
      <div className="absolute inset-0 breathe-animation">
        <img 
          src="https://media.giphy.com/media/3o7btNhMBytxAM6YBa/giphy.gif" 
          alt="Man playing guitar and singing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-psyco-green-DEFAULT transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-8 text-white font-medium">
            <Link to="/blog" className="hover:text-psyco-green-DEFAULT transition-colors">بلاگ</Link>
            <Link to="/references" className="hover:text-psyco-green-DEFAULT transition-colors">درباره</Link>
            <Link to="/artists" className="hover:text-psyco-green-DEFAULT transition-colors">هنرمندان</Link>
            <Link to="/booking" className="hover:text-psyco-green-DEFAULT transition-colors">تماس</Link>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="جست‌وجو"
              className="w-48 py-2 pl-10 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>
        </div>
      </nav>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto text-white">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            از هنرمندان<br />
            مستقل<br />
            موسیقی
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            با خرید آلبوم پلی‌لیست و ترجیحات مستقل<br />
            به خشیدن موسیقی در برتویی‌هفت موسیقی<br />
            خواهید
          </p>
          
          <Link
            to="/artists"
            className="inline-block bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            اکتشاف هنرمندان
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
