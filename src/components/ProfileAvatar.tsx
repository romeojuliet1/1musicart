
import React from 'react';
import { CheckCircle, Play } from 'lucide-react';

interface ProfileAvatarProps {
  avatar: string;
  name: string;
  userType: 'artist' | 'professional' | 'fan';
  isTopTier?: boolean;
  onPlayClick?: () => void;
}

const ProfileAvatar = ({ avatar, name, userType, isTopTier, onPlayClick }: ProfileAvatarProps) => {
  const getVerificationBadgeColor = (userType: string) => {
    switch (userType) {
      case 'professional':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="relative mb-6">
      <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-psyco-green-DEFAULT/30">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-psyco-green-DEFAULT/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      {/* Verified Badge with different colors */}
      <div className={`absolute -bottom-1 -right-1 ${getVerificationBadgeColor(userType)} rounded-full p-1 shadow-lg border-2 border-psyco-black-DEFAULT`}>
        <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
      </div>

      {/* Hover Play Button */}
      {userType === 'artist' && onPlayClick && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
          <button 
            onClick={onPlayClick}
            className="bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-purple-DEFAULT text-white rounded-full p-2 transform hover:scale-110 transition-transform"
          >
            <Play size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
