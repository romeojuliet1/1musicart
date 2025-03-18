
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-psyco-black-light border-t border-psyco-green-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-psyco-green-light to-psyco-green-DEFAULT">
              Psycotik Crew
            </h2>
            <p className="text-gray-300 max-w-md">
              Professional sound and light rental service for events, concerts, and parties. Turning your events into unforgettable experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-psyco-green-light transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-psyco-green-light transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-psyco-green-light transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-psyco-green-muted">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-psyco-green-light transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className="text-gray-300 hover:text-psyco-green-light transition-colors"
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/blog" 
                  className="text-gray-300 hover:text-psyco-green-light transition-colors"
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/references" 
                  className="text-gray-300 hover:text-psyco-green-light transition-colors"
                >
                  References
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/booking" 
                  className="text-gray-300 hover:text-psyco-green-light transition-colors"
                >
                  Booking
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-psyco-green-muted">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-psyco-green-DEFAULT" />
                <span>+44 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-psyco-green-DEFAULT" />
                <span>info@psycotikcrew.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <MapPin size={16} className="text-psyco-green-DEFAULT mt-1" />
                <span>123 Sound Avenue, London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-psyco-green-muted mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Psycotik Crew. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-psyco-green-light text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-psyco-green-light text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
