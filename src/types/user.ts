

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  userType: 'fan' | 'artist' | 'professional';
  joinDate: Date;
  isVerified: boolean;
  stats: {
    albumsPurchased: number;
    singlesPurchased: number;
    videosPurchased: number;
    totalSpent: number;
    donationsGiven: number;
  };
}

export interface Fan extends BaseUser {
  userType: 'fan';
  favoriteGenres: string[];
  followedArtists: string[];
}

export interface Artist extends BaseUser {
  userType: 'artist';
  artistName?: string;
  genres: string[];
  albums: number;
  singles: number;
  videos: number;
  followers: number;
  totalEarnings: number;
  activeCampaigns: number;
}

export interface ProfessionalUser extends BaseUser {
  userType: 'professional';
  specialization: string;
  totalLikes: number;
  totalComments: number;
  reputation: number;
  expertise: string[];
}

export type User = Fan | Artist | ProfessionalUser;

export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  images?: string[];
  timestamp: Date;
  likes: number;
  comments: Comment[];
  hasLiked: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  hasLiked: boolean;
  replies?: Comment[];
}

export interface VerificationBadge {
  type: 'blue' | 'green' | 'gold' | 'silver' | 'diamond';
  description: string;
  requirements: string;
  icon: string;
  color: string;
  gradient?: string;
}

export const verificationBadges: Record<string, VerificationBadge> = {
  blue: {
    type: 'blue',
    description: 'هنرمندان و پروفایل‌های تایید شده',
    requirements: 'تایید هویت و کیفیت آثار',
    icon: 'check-circle',
    color: 'text-blue-500'
  },
  green: {
    type: 'green',
    description: 'کارشناسان موسیقی',
    requirements: 'تخصص و تجربه در زمینه موسیقی',
    icon: 'check-circle',
    color: 'text-green-500'
  },
  gold: {
    type: 'gold',
    description: 'تهیه‌کننده طلایی',
    requirements: 'سرمایه‌گذاری بالای 250 میلیون تومان سالانه',
    icon: 'badge',
    color: 'text-yellow-500',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  silver: {
    type: 'silver',
    description: 'سرمایه‌گذار نقره‌ای',
    requirements: 'سرمایه‌گذاری بالای 150 میلیون تومان سالانه',
    icon: 'badge',
    color: 'text-gray-400',
    gradient: 'from-gray-300 to-gray-500'
  },
  diamond: {
    type: 'diamond',
    description: 'تهیه‌کننده الماس‌نشان',
    requirements: 'سرمایه‌گذاری بالای 600 میلیون تومان سالانه',
    icon: 'diamond',
    color: 'text-cyan-300',
    gradient: 'from-cyan-200 to-blue-400'
  }
};

// Extended user interface for investor tiers
export interface InvestorUser extends BaseUser {
  investorTier?: 'diamond' | 'gold' | 'silver';
  totalInvestment: number;
  projectsSupported: number;
  specialFeatures?: {
    customBranding?: boolean;
    directArtistContact?: boolean;
    earlyAccess?: boolean;
    financialReports?: boolean;
    customLogo?: string;
  };
}

