
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Users, Star, ExternalLink } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import ProfileStats from './ProfileStats';

interface VerifiedProfile {
  id: string;
  name: string;
  userType: 'artist' | 'professional' | 'fan';
  avatar: string;
  bio: string;
  stats: {
    followers: number;
    tracks?: number;
    albums?: number;
    rating?: number;
  };
  genre?: string;
  isTopTier?: boolean;
}

interface VerifiedProfileCardProps {
  profile: VerifiedProfile;
  index: number;
}

const VerifiedProfileCard = ({ profile, index }: VerifiedProfileCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist': return <Music className="w-4 h-4" />;
      case 'professional': return <Star className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'artist': return 'هنرمند';
      case 'professional': return 'متخصص';
      default: return 'طرفدار';
    }
  };

  const handlePlayClick = () => {
    // Handle play functionality for artists
    console.log(`Playing track from ${profile.name}`);
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle external link functionality
    console.log(`Opening external profile for ${profile.name}`);
  };

  return (
    <Link
      to={`/profile/${profile.id}`}
      className="group relative glassmorphism rounded-2xl p-6 card-hover animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Top Tier Badge */}
      {profile.isTopTier && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
          ⭐ ویژه
        </div>
      )}

      {/* Avatar Section */}
      <ProfileAvatar
        avatar={profile.avatar}
        name={profile.name}
        userType={profile.userType}
        isTopTier={profile.isTopTier}
        onPlayClick={profile.userType === 'artist' ? handlePlayClick : undefined}
      />

      {/* Profile Info */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-glow transition-all">
            {profile.name}
          </h3>
          <div className="flex items-center gap-1 text-psyco-green-DEFAULT text-sm">
            {getTypeIcon(profile.userType)}
            <span>{getTypeLabel(profile.userType)}</span>
          </div>
        </div>

        {profile.genre && (
          <p className="text-psyco-purple-DEFAULT text-sm font-medium">{profile.genre}</p>
        )}

        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Stats */}
        <ProfileStats stats={profile.stats} userType={profile.userType} />

        {/* External Link */}
        <button
          onClick={handleExternalLinkClick}
          className="mt-4 w-full bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ExternalLink size={14} />
          مشاهده پروفایل
        </button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-psyco-green-DEFAULT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
    </Link>
  );
};

export default VerifiedProfileCard;
