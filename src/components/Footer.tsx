
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Facebook, Instagram, Youtube, Music, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="h-8 w-8 relative">
                <img 
                  src="/lovable-uploads/8acfad30-aa90-4edd-b779-aafd43058584.png" 
                  alt="لوگو موسیقی ایرانی" 
                  className="h-full w-full object-contain" 
                />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500 font-vazir">
                موسیقی ایرانی
              </h2>
            </div>
            <p className="text-gray-300 max-w-md font-vazir">
              پلتفرم فروش و پخش موسیقی هنرمندان مستقل ایرانی. کشف، گوش دادن و حمایت از هنرمندان محلی.
            </p>
            <div className="flex space-x-reverse space-x-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Browse Music */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10 font-vazir">
              مرور موسیقی
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/shop" 
                  className="text-gray-300 hover:text-green-400 transition-colors font-vazir"
                >
                  همه آهنگ‌ها
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shop" 
                  className="text-gray-300 hover:text-green-400 transition-colors font-vazir"
                >
                  آلبوم‌ها
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/artists" 
                  className="text-gray-300 hover:text-green-400 transition-colors font-vazir"
                >
                  هنرمندان
                </NavLink>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  ویدیوها
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  پلی‌لیست‌ها
                </a>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-green-500/10 font-vazir">
              ژانرهای موسیقی
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  پاپ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  راک
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  سنتی
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  الکترونیک
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors font-vazir">
                  رپ و هیپ‌هاپ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10 font-vazir">
              تماس با ما
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-reverse space-x-3 text-gray-300">
                <Mail size={16} className="text-green-500" />
                <span className="font-vazir">music@persianmusic.com</span>
              </li>
              <li className="flex items-center space-x-reverse space-x-3 text-gray-300">
                <Music size={16} className="text-green-500" />
                <span className="font-vazir">حمایت از هنرمندان مستقل</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm">
            <span className="font-vazir">© {new Date().getFullYear()} موسیقی ایرانی. تمام حقوق محفوظ است.</span>
            <Heart size={16} className="mx-2 text-red-500" />
            <span className="font-vazir">ساخته شده با عشق برای موسیقی ایرانی</span>
          </div>
          <div className="flex space-x-reverse space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors font-vazir">
              حریم خصوصی
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors font-vazir">
              شرایط استفاده
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors font-vazir">
              برای هنرمندان
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

