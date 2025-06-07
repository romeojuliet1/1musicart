import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InvestorProfileCard from '@/components/InvestorProfileCard';
import PostCard from '@/components/PostCard';
import { User, Artist, ProfessionalUser, Fan, Post, InvestorUser } from '@/types/user';
import { Plus, Image, Calendar } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  
  // Mock data - در واقعیت از API دریافت می‌شود
  const getUser = (userId: string): User & Partial<InvestorUser> => {
    // Sample verified artists and investors
    const users: (User & Partial<InvestorUser>)[] = [
      {
        id: '1',
        name: 'محسن چاوشی',
        email: 'mohsen@example.com',
        avatar: '/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png',
        userType: 'artist',
        isVerified: true,
        bio: 'خواننده و آهنگساز مطرح ایرانی با بیش از 20 سال تجربه',
        joinDate: new Date('2018-01-15'),
        genres: ['پاپ سنتی', 'کلاسیک'],
        albums: 15,
        singles: 120,
        videos: 45,
        followers: 2500000,
        totalEarnings: 850000,
        activeCampaigns: 6,
        stats: {
          albumsPurchased: 0,
          singlesPurchased: 0,
          videosPurchased: 0,
          totalSpent: 0,
          donationsGiven: 0
        }
      } as Artist,
      {
        id: '2',
        name: 'سارا نجفی',
        email: 'sara@example.com',
        avatar: '/lovable-uploads/62df2610-5e4e-4be9-9dc5-c154242e9c89.png',
        userType: 'professional',
        isVerified: true,
        bio: 'منتقد موسیقی و تولیدکننده برجسته با تخصص در موسیقی کلاسیک',
        joinDate: new Date('2019-03-20'),
        specialization: 'نقد موسیقی',
        totalLikes: 125000,
        totalComments: 8500,
        expertise: ['نقد موسیقی', 'تولید موسیقی', 'موسیقی کلاسیک'],
        reputation: 4.8,
        investorTier: 'diamond',
        totalInvestment: 750,
        projectsSupported: 25,
        specialFeatures: {
          customBranding: true,
          directArtistContact: true,
          financialReports: true,
          earlyAccess: true
        },
        stats: {
          albumsPurchased: 35,
          singlesPurchased: 150,
          videosPurchased: 25,
          totalSpent: 1250.00,
          donationsGiven: 300.00
        }
      } as ProfessionalUser & InvestorUser,
      {
        id: '3',
        name: 'علی پارسا',
        email: 'ali@example.com',
        avatar: '/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png',
        userType: 'artist',
        isVerified: true,
        bio: 'نوازنده سنتور و آهنگساز موسیقی ایرانی اصیل',
        joinDate: new Date('2017-06-10'),
        genres: ['سنتی', 'کلاسیک ایرانی'],
        albums: 8,
        singles: 85,
        videos: 30,
        followers: 890000,
        totalEarnings: 420000,
        activeCampaigns: 4,
        stats: {
          albumsPurchased: 0,
          singlesPurchased: 0,
          videosPurchased: 0,
          totalSpent: 0,
          donationsGiven: 0
        }
      } as Artist,
      {
        id: '4',
        name: 'مریم رضایی',
        email: 'maryam@example.com',
        avatar: '/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png',
        userType: 'fan',
        isVerified: false,
        bio: 'جمع‌آور و حامی موسیقی مستقل با بیش از 10000 ساعت گوش دادن',
        joinDate: new Date('2020-11-05'),
        favoriteGenres: ['سنتی', 'پاپ', 'کلاسیک'],
        followedArtists: ['1', '3'],
        investorTier: 'gold',
        totalInvestment: 300,
        projectsSupported: 12,
        specialFeatures: {
          customBranding: true,
          earlyAccess: true
        },
        stats: {
          albumsPurchased: 125,
          singlesPurchased: 450,
          videosPurchased: 80,
          totalSpent: 2340.50,
          donationsGiven: 500.00
        }
      } as Fan & InvestorUser
    ];

    return users.find(u => u.id === userId) || users[0];
  };

  const user = getUser(id || '1');
  const isOwnProfile = true;

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      authorId: user.id,
      author: user,
      content: 'سلام دوستان عزیز! امروز روز فوق‌العاده‌ای بود. کار جدیدم را در حال آماده‌سازی هستم. امیدوارم زودتر بتونم براتون به اشتراک بگذارم.',
      images: ['/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 245,
      hasLiked: false,
      comments: [
        {
          id: '1',
          authorId: '2',
          author: getUser('2'),
          content: 'عالی! منتظر کار جدیدتون هستیم 🎵',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 12,
          hasLiked: true
        }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        authorId: user.id,
        author: user,
        content: newPost.trim(),
        timestamp: new Date(),
        likes: 0,
        hasLiked: false,
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostForm(false);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, hasLiked: !post.hasLiked, likes: post.hasLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      authorId: 'current-user',
      author: {
        id: 'current-user',
        name: 'کاربر فعلی',
        email: 'current@example.com',
        avatar: '/lovable-uploads/8dced82a-6a2c-48ee-a060-463c28764183.png',
        userType: 'fan' as const,
        isVerified: false,
        joinDate: new Date(),
        favoriteGenres: ['پاپ'],
        followedArtists: [],
        stats: {
          albumsPurchased: 5,
          singlesPurchased: 15,
          videosPurchased: 3,
          totalSpent: 89.50,
          donationsGiven: 20.00
        }
      },
      content,
      timestamp: new Date(),
      likes: 0,
      hasLiked: false
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-psyco-black-DEFAULT via-psyco-black-light to-psyco-black-DEFAULT pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <InvestorProfileCard user={user} isOwn={isOwnProfile} />

        {/* Create Post Section - Only show for own profile */}
        {isOwnProfile && (
          <div className="mt-8 glassmorphism p-6 rounded-xl">
            {!showPostForm ? (
              <button
                onClick={() => setShowPostForm(true)}
                className="w-full flex items-center gap-4 p-4 bg-psyco-black-light rounded-lg hover:bg-psyco-black-light/80 transition-colors text-right"
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-400 flex-1">چه چیز جدیدی می‌خواهید با طرفدارانتان به اشتراک بگذارید؟</span>
                <Plus className="w-5 h-5 text-psyco-green-DEFAULT" />
              </button>
            ) : (
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-4">
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="چه چیزی در ذهنتان است؟"
                      className="w-full bg-psyco-black-light border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:border-psyco-green-DEFAULT focus:outline-none"
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-gray-400 hover:text-psyco-green-DEFAULT transition-colors"
                        >
                          <Image className="w-5 h-5" />
                          <span>عکس</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-2 text-gray-400 hover:text-psyco-green-DEFAULT transition-colors"
                        >
                          <Calendar className="w-5 h-5" />
                          <span>رویداد</span>
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowPostForm(false)}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          انصراف
                        </button>
                        <button
                          type="submit"
                          disabled={!newPost.trim()}
                          className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          انتشار
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{newPost.length}/1000</p>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Posts Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">پست‌های اخیر</h2>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLikePost}
              onComment={handleComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
