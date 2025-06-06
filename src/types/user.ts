
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

export interface VerificationBadge {
  type: 'blue' | 'green' | 'gold' | 'silver';
  description: string;
  requirements: string;
}

export const verificationBadges: Record<string, VerificationBadge> = {
  blue: {
    type: 'blue',
    description: 'هنرمندان و پروفایل‌های تایید شده',
    requirements: 'تایید هویت و کیفیت آثار'
  },
  green: {
    type: 'green',
    description: 'کارشناسان موسیقی',
    requirements: 'تخصص و تجربه در زمینه موسیقی'
  },
  gold: {
    type: 'gold',
    description: 'سرمایه‌گذاران طلایی',
    requirements: 'سرمایه‌گذاری بالای 250 میلیون تومان سالانه'
  },
  silver: {
    type: 'silver',
    description: 'سرمایه‌گذاران نقره‌ای',
    requirements: 'سرمایه‌گذاری بالای 150 میلیون تومان سالانه'
  }
};
