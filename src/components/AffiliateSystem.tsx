
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Users, DollarSign } from 'lucide-react';
import { useAffiliate } from '@/contexts/AffiliateContext';
import { useGems } from '@/contexts/GemsContext';

const AffiliateSystem = () => {
  const { affiliateCode, totalEarnings, referrals, generateAffiliateCode } = useAffiliate();
  const { addGems } = useGems();
  const [copied, setCopied] = useState(false);

  const affiliateLink = `${window.location.origin}/?ref=${affiliateCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCode = () => {
    generateAffiliateCode();
    addGems(10, 'تولید کد همکاری جدید');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Share2 size={24} className="text-green-400 ml-2" />
            سیستم بازاریابی همکاری
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Generate Code */}
          {!affiliateCode ? (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                با ایجاد کد همکاری، از هر خرید ۱۰٪ کمیسیون دریافت کنید
              </p>
              <Button onClick={handleGenerateCode} className="btn-glow">
                ایجاد کد همکاری
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Affiliate Link */}
              <div>
                <label className="block text-white mb-2">لینک همکاری شما</label>
                <div className="flex gap-2">
                  <Input
                    value={affiliateLink}
                    readOnly
                    className="glassmorphism border-green-500/20"
                  />
                  <Button onClick={copyLink} variant="outline" className="glassmorphism">
                    <Copy size={16} />
                    {copied ? 'کپی شد!' : 'کپی'}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glassmorphism p-4 rounded-lg text-center">
                  <DollarSign size={24} className="text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{formatPrice(totalEarnings)}</div>
                  <div className="text-gray-300 text-sm">کل درآمد</div>
                </div>
                <div className="glassmorphism p-4 rounded-lg text-center">
                  <Users size={24} className="text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{referrals.length}</div>
                  <div className="text-gray-300 text-sm">تعداد ارجاعات</div>
                </div>
                <div className="glassmorphism p-4 rounded-lg text-center">
                  <Share2 size={24} className="text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{affiliateCode}</div>
                  <div className="text-gray-300 text-sm">کد همکاری</div>
                </div>
              </div>

              {/* Recent Referrals */}
              <div>
                <h3 className="text-white font-semibold mb-4">آخرین ارجاعات</h3>
                <div className="space-y-2">
                  {referrals.slice(0, 5).map((referral) => (
                    <div key={referral.id} className="glassmorphism p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">{referral.date}</div>
                        <div className="text-gray-400 text-xs">خرید: {formatPrice(referral.purchaseAmount)}</div>
                      </div>
                      <div className="text-left">
                        <div className="text-green-400 font-medium">{formatPrice(referral.commission)}</div>
                        <div className={`text-xs ${
                          referral.status === 'approved' ? 'text-green-400' :
                          referral.status === 'pending' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {referral.status === 'approved' ? 'تایید شده' :
                           referral.status === 'pending' ? 'در انتظار' : 'پرداخت شده'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateSystem;
