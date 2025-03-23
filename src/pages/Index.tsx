
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Link } from "react-router-dom";
import { Volume2, Music2, Lightbulb, PartyPopper, MoveRight, CalendarDays } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredServices = [
    {
      title: "Sound Systems",
      description: "Professional sound systems for any size venue, from small gatherings to large festivals.",
      icon: <Volume2 size={24} />,
      imageSrc: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      link: "/services#sound"
    },
    {
      title: "Lighting Equipment",
      description: "Create the perfect atmosphere with our state-of-the-art lighting equipment and expert setup.",
      icon: <Lightbulb size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1551696785-927d4ac2d35b?auto=format&fit=crop&q=80",
      link: "/services#lighting"
    },
    {
      title: "DJ Services",
      description: "Experienced DJs to keep your event energized with the perfect music selection.",
      icon: <Music2 size={24} />,
      imageSrc: "/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png",
      link: "/services#dj"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Event Coordinator",
      company: "Eventify",
      testimonial: "The Psycotik Crew delivered an exceptional experience for our corporate event. The sound quality was impeccable and the lighting effects created exactly the atmosphere we wanted.",
      rating: 5,
      imageSrc: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Mark Williams",
      position: "Wedding Planner",
      company: "Perfect Day Weddings",
      testimonial: "We've worked with many sound and light providers, but Psycotik Crew stands out for their professionalism and attention to detail. Our clients always rave about their service.",
      rating: 5,
      imageSrc: "https://randomuser.me/api/portraits/men/57.jpg"
    },
    {
      name: "Emily Turner",
      position: "Festival Director",
      company: "Urban Music Festival",
      testimonial: "For three years in a row, Psycotik Crew has been our go-to for festival sound and lighting. Their team handles everything from setup to teardown with amazing efficiency.",
      rating: 4,
      imageSrc: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
              <p className="text-gray-400 max-w-2xl">
                Professional equipment and expert technicians for all your sound and lighting needs
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
            >
              View all services
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Event Types Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Perfect for Any Event</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide custom sound and lighting solutions for a wide range of events
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Concerts", icon: <Volume2 size={32} /> },
              { name: "Weddings", icon: <PartyPopper size={32} /> },
              { name: "Corporate", icon: <CalendarDays size={32} /> },
              { name: "Festivals", icon: <Music2 size={32} /> }
            ].map((event, index) => (
              <div 
                key={index}
                className="glassmorphism flex flex-col items-center justify-center py-8 px-4 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {event.icon}
                </div>
                <h3 className="text-lg font-medium text-white">{event.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/booking"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              Book Your Event
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Client Testimonials</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear what our clients have to say about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/references"
              className="inline-flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
            >
              View all testimonials
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Elevate Your Event?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's work together to create an unforgettable experience for your guests. Book our services today and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
