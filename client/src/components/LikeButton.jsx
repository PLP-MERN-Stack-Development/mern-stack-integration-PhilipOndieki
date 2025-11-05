import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { toggleLike, getPostLikes } from '../services/api';

const LikeButton = ({ postId }) => {
  const { user, isSignedIn } = useUser();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchLikes();
  }, [postId, user]);

  const fetchLikes = async () => {
    try {
      setInitialLoading(true);
      const response = await getPostLikes(postId, user?.id);
      setLikeCount(response.data.data.likeCount);
      setLiked(response.data.data.liked);
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleToggleLike = async () => {
    if (!isSignedIn || loading) return;

    try {
      setLoading(true);

      // Optimistic update
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);

      const response = await toggleLike(postId, user.id);

      // Update with server response
      setLiked(response.data.data.liked);
      setLikeCount(response.data.data.likeCount);
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setLiked(!liked);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);
      alert('Failed to update like. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isSignedIn ? (
        <button
          onClick={handleToggleLike}
          disabled={loading}
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            liked
              ? 'bg-red-500 hover:bg-red-600 shadow-lg'
              : 'bg-gray-100 hover:bg-red-50 border-2 border-gray-200 hover:border-red-300'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <svg
            className={`w-6 h-6 transition-all duration-300 ${
              liked ? 'text-white scale-110' : 'text-gray-600 group-hover:text-red-500 group-hover:scale-110'
            }`}
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={liked ? 0 : 2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          {/* Ripple effect on click */}
          {liked && (
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></span>
          )}
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-red-50 border-2 border-gray-200 hover:border-red-300 transition-all duration-300"
            aria-label="Sign in to like"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </SignInButton>
      )}

      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">
          {likeCount.toLocaleString()}
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {likeCount === 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  );
};

export default LikeButton;
