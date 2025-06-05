
import React from 'react';
import AdBanner from './AdBanner';
import { useAds } from '@/contexts/AdContext';

interface AdSectionProps {
  position: 'header' | 'sidebar' | 'footer' | 'content';
  className?: string;
}

const AdSection = ({ position, className = '' }: AdSectionProps) => {
  const { getAdsByPosition, closeAd } = useAds();
  const ads = getAdsByPosition(position);

  if (ads.length === 0) return null;

  return (
    <div className={`ad-section ${className}`}>
      {ads.map((ad) => (
        <AdBanner
          key={ad.id}
          id={ad.id}
          title={ad.title}
          imageUrl={ad.imageUrl}
          linkUrl={ad.linkUrl}
          position={ad.position}
          size={ad.size}
          onClose={() => closeAd(ad.id)}
          closeable={true}
        />
      ))}
    </div>
  );
};

export default AdSection;
