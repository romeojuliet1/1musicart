
import React from 'react';
import { Star } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    followers: number;
    tracks?: number;
    albums?: number;
    rating?: number;
  };
  userType: 'artist' | 'professional' | 'fan';
}

const ProfileStats = ({ stats, userType }: ProfileStatsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-700">
      <div className="text-center">
        <div className="text-lg font-bold text-psyco-green-DEFAULT">
          {formatNumber(stats.followers)}
        </div>
        <div className="text-xs text-gray-400">دنبال‌کننده</div>
      </div>
      
      {userType === 'artist' && stats.tracks && (
        <div className="text-center">
          <div className="text-lg font-bold text-psyco-purple-DEFAULT">
            {stats.tracks}
          </div>
          <div className="text-xs text-gray-400">ترک</div>
        </div>
      )}

      {stats.rating && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-lg font-bold text-yellow-500">
              {stats.rating}
            </span>
          </div>
          <div className="text-xs text-gray-400">امتیاز</div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
