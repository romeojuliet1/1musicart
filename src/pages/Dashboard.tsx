
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Heart, ShoppingBag, Award, Download, Star, Gift } from 'lucide-react';

interface Purchase {
  id: number;
  album: string;
  artist: string;
  type: 'digital' | 'physical';
  price: number;
  date: string;
  status: 'completed' | 'processing' | 'shipped';
}

interface Donation {
  id: number;
  artist: string;
  amount: number;
  date: string;
  message?: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const purchases: Purchase[] = [
    {
      id: 1,
      album: "سفر به درون",
      artist: "احمد رضایی",
      type: "digital",
      price: 150000,
      date: "۱۴۰۳/۰۹/۱۵",
      status: "completed"
    },
    {
      id: 2,
      album: "شب‌های تهران",
      artist: "سارا محمدی",
      type: "physical",
      price: 200000,
      date: "۱۴۰۳/۰۹/۱۰",
      status: "shipped"
    }
  ];

  const donations: Donation[] = [
    {
      id: 1,
      artist: "احمد رضایی",
      amount: 100000,
      date: "۱۴۰۳/۰۹/۱۲",
      message: "عالی بود، ممنون از کارتان"
    },
    {
      id: 2,
      artist: "علی اکبری",
      amount: 50000,
      date: "۱۴۰۳/۰۹/۰۸"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'shipped': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'processing': return 'در حال پردازش';
      case 'shipped': return 'ارسال شده';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            داشبورد شما
          </h1>
          <p className="text-xl text-gray-300">
            خریدها و حمایت‌های شما از هنرمندان مستقل
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glassmorphism">
            <CardContent className="p-6 text-center">
              <ShoppingBag size={32} className="text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{purchases.length}</div>
              <div className="text-gray-300">خرید انجام شده</div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism">
            <CardContent className="p-6 text-center">
              <Heart size={32} className="text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{donations.length}</div>
              <div className="text-gray-300">حمایت مالی</div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism">
            <CardContent className="p-6 text-center">
              <Music size={32} className="text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formatPrice(totalSpent)}</div>
              <div className="text-gray-300">کل خرید</div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism">
            <CardContent className="p-6 text-center">
              <Award size={32} className="text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formatPrice(totalDonated)}</div>
              <div className="text-gray-300">کل حمایت</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'overview', name: 'نمای کلی', icon: Award },
            { id: 'purchases', name: 'خریدها', icon: ShoppingBag },
            { id: 'donations', name: 'حمایت‌ها', icon: Heart },
            { id: 'achievements', name: 'دستاوردها', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="glassmorphism border-green-500/20 hover:border-green-500/40"
              >
                <Icon size={16} className="ml-2" />
                {tab.name}
              </Button>
            );
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">تاریخچه خریدها</h2>
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="glassmorphism">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{purchase.album}</h3>
                      <p className="text-green-400">{purchase.artist}</p>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">{formatPrice(purchase.price)}</div>
                      <div className={`text-sm ${getStatusColor(purchase.status)}`}>
                        {getStatusText(purchase.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span>{purchase.type === 'digital' ? 'دیجیتال' : 'فیزیکی'}</span>
                      <span>{purchase.date}</span>
                    </div>
                    {purchase.type === 'digital' && purchase.status === 'completed' && (
                      <Button size="sm" className="btn-glow">
                        <Download size={16} className="ml-2" />
                        دانلود
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">تاریخچه حمایت‌ها</h2>
            {donations.map((donation) => (
              <Card key={donation.id} className="glassmorphism">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">حمایت از {donation.artist}</h3>
                      {donation.message && (
                        <p className="text-gray-300 mt-2 italic">"{donation.message}"</p>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-green-400 font-medium">{formatPrice(donation.amount)}</div>
                      <div className="text-gray-400 text-sm">{donation.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">دستاوردهای شما</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "حامی اول",
                  description: "اولین حمایت مالی انجام دادید",
                  icon: Heart,
                  achieved: true,
                  color: "text-red-400"
                },
                {
                  title: "خریدار فعال",
                  description: "بیش از ۵ آلبوم خریداری کردید",
                  icon: ShoppingBag,
                  achieved: false,
                  color: "text-blue-400"
                },
                {
                  title: "کلکسیونر",
                  description: "۱۰ آلبوم فیزیکی در مجموعه‌تان",
                  icon: Music,
                  achieved: false,
                  color: "text-purple-400"
                },
                {
                  title: "سفیر موسیقی",
                  description: "۱۰ نفر را به پلتفرم دعوت کردید",
                  icon: Star,
                  achieved: false,
                  color: "text-yellow-400"
                }
              ].map((achievement, index) => (
                <Card key={index} className={`glassmorphism ${achievement.achieved ? 'ring-2 ring-green-500/50' : 'opacity-60'}`}>
                  <CardContent className="p-6 text-center">
                    <achievement.icon size={32} className={`${achievement.color} mx-auto mb-4`} />
                    <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                    {achievement.achieved && (
                      <div className="mt-4">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                          دریافت شده
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Support Message */}
        <div className="mt-20 glassmorphism rounded-2xl p-8 text-center">
          <Gift size={48} className="text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">تشکر از حمایت شما</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            شما با حمایت از هنرمندان مستقل، نقش مهمی در رشد و توسعه موسیقی ایرانی ایفا می‌کنید. 
            از همراهی شما سپاسگزاریم.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
