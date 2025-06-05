
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import FeaturedTracks from "@/components/FeaturedTracks";
import FeaturedAlbums from "@/components/FeaturedAlbums";
import FeaturedArtists from "@/components/FeaturedArtists";
import VerifiedProfileShowcase from "@/components/VerifiedProfileShowcase";
import RandomDiscovery from "@/components/RandomDiscovery";
import AdSection from "@/components/AdSection";
import { Link } from "react-router-dom";
import { Music, Ticket, Users, Mail } from "lucide-react";
import { sanitizeInput, validateEmail, isRateLimited } from "@/utils/security";
import { debounce } from "@/utils/performance";
import { toast } from "sonner";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: ''
  });

  const debouncedFormSubmit = debounce(async (formData: { name: string; email: string }) => {
    // Rate limiting check
    if (isRateLimited('contact-form', 3)) {
      toast.error('لطفاً کمی صبر کنید قبل از ارسال مجدد');
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('لطفاً ایمیل معتبر وارد کنید');
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email)
    };

    console.log('Form submitted:', sanitizedData);
    toast.success('پیام شما با موفقیت ارسال شد');
    setContactForm({ name: '', email: '' });
  }, 1000);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedFormSubmit(contactForm);
  };

  return (
    <div dir="rtl">
      <HeroSection />
      
      {/* Header Ad Section */}
      <AdSection position="header" className="px-6 md:px-12" />
      
      {/* Verified Profiles Showcase */}
      <VerifiedProfileShowcase />
      
      {/* Random Discovery Section */}
      <RandomDiscovery />
      
      {/* Grid Sections */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-vazir">
            خدمات ما
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - 3 columns */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Sidebar Ads */}
              <AdSection position="sidebar" />
              
              {/* تماس با ما */}
              <div className="glassmorphism p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl mb-6 mx-auto">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center font-vazir">تماس با ما</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <input
                    type="text"
                    placeholder="نام شما"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-psyco-green-DEFAULT transition-colors font-vazir"
                  />
                  <input
                    type="email"
                    placeholder="آدرس ایمیل"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
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
        </div>
      </section>
      
      {/* Content Ad Section */}
      <AdSection position="content" className="px-6 md:px-12" />
      
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
