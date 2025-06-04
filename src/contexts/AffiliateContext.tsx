
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AffiliateContextType {
  affiliateCode: string;
  totalEarnings: number;
  referrals: Referral[];
  generateAffiliateCode: () => void;
  trackReferral: (code: string, purchaseAmount: number) => void;
}

interface Referral {
  id: string;
  date: string;
  purchaseAmount: number;
  commission: number;
  status: 'pending' | 'approved' | 'paid';
}

const AffiliateContext = createContext<AffiliateContextType | undefined>(undefined);

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [affiliateCode, setAffiliateCode] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const savedCode = localStorage.getItem('affiliateCode');
    const savedEarnings = localStorage.getItem('totalEarnings');
    const savedReferrals = localStorage.getItem('referrals');
    
    if (savedCode) setAffiliateCode(savedCode);
    if (savedEarnings) setTotalEarnings(parseInt(savedEarnings));
    if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
  }, []);

  const generateAffiliateCode = () => {
    const code = 'REF' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setAffiliateCode(code);
    localStorage.setItem('affiliateCode', code);
  };

  const trackReferral = (code: string, purchaseAmount: number) => {
    const commission = purchaseAmount * 0.1; // 10% commission
    const referral: Referral = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fa-IR'),
      purchaseAmount,
      commission,
      status: 'pending'
    };

    const newReferrals = [referral, ...referrals];
    const newEarnings = totalEarnings + commission;

    setReferrals(newReferrals);
    setTotalEarnings(newEarnings);
    
    localStorage.setItem('referrals', JSON.stringify(newReferrals));
    localStorage.setItem('totalEarnings', newEarnings.toString());
  };

  return (
    <AffiliateContext.Provider value={{
      affiliateCode,
      totalEarnings,
      referrals,
      generateAffiliateCode,
      trackReferral
    }}>
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (context === undefined) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};
