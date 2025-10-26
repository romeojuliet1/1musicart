import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
      title: "حمایت از هنرمندان مستقل",
      subtitle: "موسیقی ایرانی",
      description: "با خرید آلبوم و آهنگ‌های هنرمندان مستقل به غنای موسیقی ایرانی کمک کنید"
    },
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80",
      title: "کشف استعدادهای نو",
      subtitle: "هنرمندان برتر",
      description: "با هنرمندان محلی و استعدادهای نوظهور آشنا شوید"
    },
    {
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80",
      title: "تجربه موسیقی زنده",
      subtitle: "کنسرت و اجرا",
      description: "از اجراهای زنده و کنسرت‌های هنرمندان مورد علاقه‌تان لذت ببرید"
    },
    {
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80",
      title: "پشتیبانی مستقیم",
      subtitle: "ارتباط با هنرمند",
      description: "مستقیماً از هنرمندان مورد علاقه‌تان حمایت کنید و با آن‌ها در ارتباط باشید"
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    // Auto-play carousel
    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel with Ken Burns Effect */}
      <div className="absolute inset-0">
        <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-screen">
                  <img 
                    src={slide.image}
                    alt={`${slide.title} - ${slide.subtitle}`}
                    className="w-full h-full object-cover transition-all duration-[2000ms] ease-out scale-100 hover:scale-110"
                    style={{
                      animation: current === index ? 'kenBurns 6s ease-out forwards' : 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index 
                    ? 'w-12 h-3 bg-white' 
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
      
      {/* Hero Content with Animation */}
      <div className="relative z-10 text-center px-6 md:px-12 w-full mx-auto text-white">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ${
              current === index 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="space-y-6">
              <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="text-sm md:text-base font-vazir">{slide.subtitle}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight font-vazir drop-shadow-2xl">
                {slide.title}
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto font-light font-vazir drop-shadow-lg">
                {slide.description}
              </p>
              
              <div className="pt-4">
                <Link
                  to="/artists"
                  className="inline-block bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-dark hover:from-psyco-green-dark hover:to-psyco-green-DEFAULT text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl font-vazir text-lg"
                >
                  کشف هنرمندان
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
