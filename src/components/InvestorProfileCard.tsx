
import React from 'react';
import { User, InvestorUser } from '@/types/user';
import { Badge, Crown, Sparkles, TrendingUp, Users, Award, Calendar } from 'lucide-react';
import VerificationBadge from './VerificationBadge';
import { cn } from '@/lib/utils';

interface InvestorProfileCardProps {
  user: User & Partial<InvestorUser>;
  isOwn?: boolean;
}

const InvestorProfileCard = ({ user, isOwn = false }: InvestorProfileCardProps) => {
  const getInvestorTierInfo = () => {
    const investorUser = user as InvestorUser;
    if (!investorUser.investorTier) return null;

    switch (investorUser.investorTier) {
      case 'diamond':
        return {
          title: 'تهیه‌کننده الماس‌نشان',
          icon: <Crown className="w-5 h-5" />,
          gradient: 'from-cyan-200 to-blue-400',
          borderColor: 'border-cyan-300',
          glowEffect: 'shadow-cyan-300/50'
        };
      case 'gold':
        return {
          title: 'تهیه‌کننده طلایی',
          icon: <Award className="w-5 h-5" />,
          gradient: 'from-yellow-400 to-yellow-600',
          borderColor: 'border-yellow-400',
          glowEffect: 'shadow-yellow-400/50'
        };
      case 'silver':
        return {
          title: 'سرمایه‌گذار نقره‌ای',
          icon: <Badge className="w-5 h-5" />,
          gradient: 'from-gray-300 to-gray-500',
          borderColor: 'border-gray-400',
          glowEffect: 'shadow-gray-400/50'
        };
      default:
        return null;
    }
  };

  const investorInfo = getInvestorTierInfo();
  const investorUser = user as InvestorUser;

  return (
    <div className={cn(
      'glassmorphism p-8 rounded-2xl transition-all duration-300',
      investorInfo && `border-2 ${investorInfo.borderColor} shadow-2xl ${investorInfo.glowEffect}`
    )}>
      {/* Special Header for Investor Tiers */}
      {investorInfo && (
        <div className={cn(
          'absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full',
          `bg-gradient-to-r ${investorInfo.gradient}`,
          'flex items-center gap-2 text-white font-bold text-sm shadow-lg'
        )}>
          {investorInfo.icon}
          <span>{investorInfo.title}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
        <div className="relative">
          <div className={cn(
            'w-32 h-32 rounded-full border-4 overflow-hidden',
            investorInfo ? `${investorInfo.borderColor} shadow-lg ${investorInfo.glowEffect}` : 'border-psyco-green-DEFAULT/20'
          )}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Multiple verification badges */}
          <div className="absolute -bottom-2 -right-2 flex flex-col gap-1">
            {user.isVerified && (
              <VerificationBadge 
                type={user.userType === 'professional' ? 'green' : 'blue'} 
                size="md" 
              />
            )}
            {investorUser.investorTier && (
              <VerificationBadge 
                type={investorUser.investorTier} 
                size="lg" 
              />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center gap-2">
                {user.isVerified && (
                  <VerificationBadge 
                    type={user.userType === 'professional' ? 'green' : 'blue'} 
                    showLabel 
                  />
                )}
                {investorUser.investorTier && (
                  <VerificationBadge 
                    type={investorUser.investorTier} 
                    showLabel 
                  />
                )}
              </div>
            </div>
            {user.bio && (
              <p className="text-gray-300 leading-relaxed">{user.bio}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>عضو از {new Intl.DateTimeFormat('fa-IR').format(user.joinDate)}</span>
            </div>
          </div>

          {/* Investor specific stats */}
          {investorUser.investorTier && (
            <div className="glassmorphism p-4 rounded-lg border border-cyan-300/20">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                آمار سرمایه‌گذاری
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-300">
                    {new Intl.NumberFormat('fa-IR').format(investorUser.totalInvestment || 0)}
                  </div>
                  <div className="text-xs text-gray-400">میلیون تومان</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-300">
                    {investorUser.projectsSupported || 0}
                  </div>
                  <div className="text-xs text-gray-400">پروژه حمایت شده</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-300">
                    {(user.stats.donationsGiven / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs text-gray-400">کل کمک‌ها</div>
                </div>
              </div>
            </div>
          )}

          {/* Special features for investors */}
          {investorUser.specialFeatures && (
            <div className="glassmorphism p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                ویژگی‌های اختصاصی
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {investorUser.specialFeatures.customBranding && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Badge className="w-4 h-4" />
                    <span>برندینگ اختصاصی</span>
                  </div>
                )}
                {investorUser.specialFeatures.directArtistContact && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Users className="w-4 h-4" />
                    <span>تماس مستقیم با هنرمندان</span>
                  </div>
                )}
                {investorUser.specialFeatures.earlyAccess && (
                  <div className="flex items-center gap-2 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>دسترسی زودهنگام</span>
                  </div>
                )}
                {investorUser.specialFeatures.financialReports && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Award className="w-4 h-4" />
                    <span>گزارش‌های مالی</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Regular purchase stats */}
          <div className="glassmorphism p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">خریدهای انجام شده</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-psyco-green-DEFAULT">{user.stats.albumsPurchased}</div>
                <div className="text-xs text-gray-400">آلبوم</div>
              </div>
              <div>
                <div className="text-xl font-bold text-psyco-green-DEFAULT">{user.stats.singlesPurchased}</div>
                <div className="text-xs text-gray-400">تک‌آهنگ</div>
              </div>
              <div>
                <div className="text-xl font-bold text-psyco-green-DEFAULT">{user.stats.videosPurchased}</div>
                <div className="text-xs text-gray-400">ویدیو</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfileCard;
