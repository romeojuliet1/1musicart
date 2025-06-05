
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: 'header' | 'sidebar' | 'footer' | 'content';
  size: 'small' | 'medium' | 'large';
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface AdContextType {
  ads: Ad[];
  getAdsByPosition: (position: string) => Ad[];
  closeAd: (adId: string) => void;
  closedAds: string[];
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads] = useState<Ad[]>([
    {
      id: '1',
      title: 'تبلیغ نمونه ۱',
      imageUrl: '/lovable-uploads/b842764a-da80-4bba-a5ef-9411f04f3de6.png',
      linkUrl: 'https://example.com',
      position: 'header',
      size: 'medium',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'تبلیغ نمونه ۲',
      imageUrl: '/lovable-uploads/752a1366-6aea-49ad-be21-341fe7476d14.png',
      linkUrl: 'https://example.com',
      position: 'sidebar',
      size: 'small',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  ]);
  
  const [closedAds, setClosedAds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('closedAds');
    if (saved) {
      setClosedAds(JSON.parse(saved));
    }
  }, []);

  const getAdsByPosition = (position: string) => {
    const now = new Date();
    return ads.filter(ad => 
      ad.position === position && 
      ad.isActive && 
      !closedAds.includes(ad.id) &&
      new Date(ad.startDate) <= now && 
      new Date(ad.endDate) >= now
    );
  };

  const closeAd = (adId: string) => {
    const newClosedAds = [...closedAds, adId];
    setClosedAds(newClosedAds);
    localStorage.setItem('closedAds', JSON.stringify(newClosedAds));
  };

  return (
    <AdContext.Provider value={{
      ads,
      getAdsByPosition,
      closeAd,
      closedAds
    }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};
