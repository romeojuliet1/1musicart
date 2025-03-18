
import React, { useEffect, useRef } from 'react';
import { MoveRight, Sparkles, Speaker, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-psyco-green-DEFAULT/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-psyco-green-light/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-20 hidden lg:block">
        <Speaker className="h-12 w-12 text-psyco-green-DEFAULT/30" />
      </div>
      <div className="absolute bottom-1/4 right-20 hidden lg:block">
        <Music className="h-16 w-16 text-psyco-green-DEFAULT/30" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-psyco-green-DEFAULT/20 text-psyco-green-light rounded-full px-4 py-1 text-sm font-medium inline-flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Premium Sound & Light Services
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-glow mb-6">
              Elevate Your <span className="text-psyco-green-DEFAULT">Event</span> Experience
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Professional sound and lighting solutions that bring your event to life. 
              From concerts to private parties, we deliver exceptional audiovisual experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Book Now
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-md glassmorphism p-1 rounded-2xl border-psyco-green-muted/50">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-psyco-black-DEFAULT/90 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2070"
                alt="Concert with professional lighting"
                className="object-cover h-full w-full"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-psyco-green-light font-medium mb-1">Featured Event</p>
                <h3 className="text-white text-xl font-semibold">Summer Music Festival 2023</h3>
                <p className="text-gray-300 text-sm mt-1">Full sound system and dynamic lighting setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
