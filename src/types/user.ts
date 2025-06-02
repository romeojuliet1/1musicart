
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: 'artist' | 'professional' | 'fan';
  isVerified: boolean;
  bio?: string;
  joinDate: Date;
  stats: UserStats;
  socialLinks?: SocialLinks;
}

export interface Artist extends User {
  userType: 'artist';
  genres: string[];
  albums: number;
  singles: number;
  videos: number;
  followers: number;
  totalSales: number;
  activeDaysThisWeek: number;
  lastActiveDate: Date;
}

export interface ProfessionalUser extends User {
  userType: 'professional';
  totalLikes: number;
  totalComments: number;
  expertise: string[];
  reputation: number;
}

export interface Fan extends User {
  userType: 'fan';
  favoriteGenres: string[];
  following: number;
}

export interface UserStats {
  albumsPurchased: number;
  singlesPurchased: number;
  videosPurchased: number;
  totalSpent: number;
  donationsGiven: number;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

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
