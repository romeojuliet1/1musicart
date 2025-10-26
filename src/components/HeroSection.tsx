
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  const images = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80",
  ];

  useEffect(() => {
    if (!api) return;

    // Auto-play carousel
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel with breathing animation */}
      <div className="absolute inset-0">
        <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-screen">
                  <img 
                    src={img}
                    alt={`موسیقی ایرانی ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-1000 breathe-animation"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-12 w-full mx-auto text-white">
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
