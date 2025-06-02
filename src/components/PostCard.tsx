
import React, { useState } from 'react';
import { Post } from '@/types/user';
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText('');
    }
  };

  const getUserTypeInfo = () => {
    switch (post.author.userType) {
      case 'artist':
        return { color: 'text-psyco-green-DEFAULT', label: 'هنرمند' };
      case 'professional':
        return { color: 'text-yellow-500', label: 'کاربر حرفه‌ای' };
      default:
        return { color: 'text-blue-500', label: 'دوست‌دار موسیقی' };
    }
  };

  const typeInfo = getUserTypeInfo();

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {post.author.isVerified && (
            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 fill-current bg-psyco-black-DEFAULT rounded-full" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">{post.author.name}</h3>
                <span className={`text-xs ${typeInfo.color}`}>{typeInfo.label}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {new Intl.DateTimeFormat('fa-IR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'short'
                }).format(post.timestamp)}
              </p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>

          {post.images && post.images.length > 0 && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg overflow-hidden">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full h-48 object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 mb-4">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-2 transition-colors ${
                post.hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes.toLocaleString()}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-400 hover:text-psyco-green-DEFAULT transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length.toLocaleString()}</span>
            </button>

            <button className="flex items-center gap-2 text-gray-400 hover:text-psyco-green-DEFAULT transition-colors">
              <Share2 className="w-5 h-5" />
              <span>اشتراک‌گذاری</span>
            </button>
          </div>

          {showComments && (
            <div className="border-t border-gray-700 pt-4">
              <form onSubmit={handleSubmitComment} className="mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-psyco-green-DEFAULT rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    U
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="نظر خود را بنویسید..."
                      className="w-full bg-psyco-black-light border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:border-psyco-green-DEFAULT focus:outline-none"
                      rows={2}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        ارسال
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {comment.author.isVerified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-500 fill-current bg-psyco-black-DEFAULT rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-psyco-black-light rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">{comment.author.name}</span>
                          <span className="text-gray-400 text-xs">
                            {new Intl.DateTimeFormat('fa-IR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-200 text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs">
                        <button className={`flex items-center gap-1 ${comment.hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}>
                          <Heart className={`w-3 h-3 ${comment.hasLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-psyco-green-DEFAULT transition-colors">
                          پاسخ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
