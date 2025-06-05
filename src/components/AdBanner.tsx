
import React from 'react';
import { X } from 'lucide-react';

interface AdBannerProps {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: 'header' | 'sidebar' | 'footer' | 'content';
  size: 'small' | 'medium' | 'large';
  onClose?: () => void;
  closeable?: boolean;
}

const AdBanner = ({ 
  id, 
  title, 
  imageUrl, 
  linkUrl, 
  position, 
  size, 
  onClose, 
  closeable = false 
}: AdBannerProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-full h-24 md:w-72 md:h-20';
      case 'medium':
        return 'w-full h-32 md:w-96 md:h-28';
      case 'large':
        return 'w-full h-48 md:w-full md:h-40';
      default:
        return 'w-full h-32';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'header':
        return 'mb-4';
      case 'sidebar':
        return 'mb-6';
      case 'footer':
        return 'mt-4';
      case 'content':
        return 'my-6';
      default:
        return '';
    }
  };

  return (
    <div className={`relative glassmorphism rounded-xl overflow-hidden ${getSizeClasses()} ${getPositionClasses()}`}>
      {closeable && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 left-2 z-10 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
        >
          <X size={16} className="text-white" />
        </button>
      )}
      
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
            <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
              تبلیغ
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default AdBanner;
