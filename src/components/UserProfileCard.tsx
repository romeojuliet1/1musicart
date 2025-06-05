
import React from 'react';
import { User, Artist, ProfessionalUser } from '@/types/user';
import { Music, Users, Heart, ShoppingBag, Calendar, MapPin, Link2, CheckCircle, Award, Star } from 'lucide-react';

interface UserProfileCardProps {
  user: User;
  isOwn?: boolean;
}

const UserProfileCard = ({ user, isOwn = false }: UserProfileCardProps) => {
  const getUserTypeInfo = () => {
    switch (user.userType) {
      case 'artist':
        return {
          icon: <Music className="w-5 h-5" />,
          label: 'هنرمند',
          color: 'text-psyco-green-DEFAULT'
        };
      case 'professional':
        return {
          icon: <Award className="w-5 h-5" />,
          label: 'کاربر حرفه‌ای',
          color: 'text-yellow-500'
        };
      default:
        return {
          icon: <Heart className="w-5 h-5" />,
          label: 'دوست‌دار موسیقی',
          color: 'text-blue-500'
        };
    }
  };

  const getVerificationBadgeColor = () => {
    if (!user.isVerified) return null;
    
    switch (user.userType) {
      case 'professional':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const typeInfo = getUserTypeInfo();
  const verificationBadgeColor = getVerificationBadgeColor();

  return (
    <div className="glassmorphism p-8 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-psyco-green-DEFAULT/20"
          />
          {user.isVerified && verificationBadgeColor && (
            <div className={`absolute -bottom-2 -right-2 ${verificationBadgeColor} rounded-full p-1`}>
              <CheckCircle className="w-6 h-6 text-white" fill="currentColor" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <div className={`flex items-center gap-1 ${typeInfo.color}`}>
                {typeInfo.icon}
                <span className="text-sm font-medium">{typeInfo.label}</span>
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

          {/* Artist specific stats */}
          {user.userType === 'artist' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-psyco-green-DEFAULT">{(user as Artist).albums}</div>
                <div className="text-sm text-gray-400">آلبوم</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-psyco-green-DEFAULT">{(user as Artist).singles}</div>
                <div className="text-sm text-gray-400">تک‌آهنگ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-psyco-green-DEFAULT">{(user as Artist).videos}</div>
                <div className="text-sm text-gray-400">ویدیو</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-psyco-green-DEFAULT">{(user as Artist).followers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">دنبال‌کننده</div>
              </div>
            </div>
          )}

          {/* Professional user stats */}
          {user.userType === 'professional' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{(user as ProfessionalUser).totalLikes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">لایک دریافتی</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{(user as ProfessionalUser).totalComments.toLocaleString()}</div>
                <div className="text-sm text-gray-400">کامنت</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <div className="text-2xl font-bold text-yellow-500">{(user as ProfessionalUser).reputation}</div>
                </div>
                <div className="text-sm text-gray-400">امتیاز</div>
              </div>
            </div>
          )}

          {/* Purchase stats for all users */}
          <div className="glassmorphism p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              خریدهای انجام شده
            </h3>
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
            <div className="mt-3 pt-3 border-t border-gray-700 text-center">
              <div className="text-sm text-gray-400">کل مبلغ خرید: 
                <span className="text-psyco-green-DEFAULT font-semibold mr-1">
                  ${user.stats.totalSpent.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-400">کل کمک‌های مالی: 
                <span className="text-psyco-green-DEFAULT font-semibold mr-1">
                  ${user.stats.donationsGiven.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
