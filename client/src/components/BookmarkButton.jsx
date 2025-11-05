import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { toggleBookmark, checkBookmark } from '../services/api';

const BookmarkButton = ({ postId, showLabel = false }) => {
  const { user, isSignedIn } = useUser();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkStatus();
  }, [postId, user]);

  const fetchBookmarkStatus = async () => {
    if (!isSignedIn) {
      setInitialLoading(false);
      return;
    }

    try {
      setInitialLoading(true);
      const response = await checkBookmark(postId, user?.id);
      setBookmarked(response.data.data.bookmarked);
    } catch (error) {
      console.error('Error fetching bookmark status:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!isSignedIn || loading) return;

    try {
      setLoading(true);

      // Optimistic update
      setBookmarked(!bookmarked);

      const response = await toggleBookmark(postId, user.id);

      // Update with server response
      setBookmarked(response.data.data.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Revert optimistic update on error
      setBookmarked(!bookmarked);
      alert('Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className={`${showLabel ? 'flex items-center gap-2' : ''}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
        {showLabel && <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>}
      </div>
    );
  }

  return (
    <div className={showLabel ? 'flex items-center gap-2' : ''}>
      {isSignedIn ? (
        <button
          onClick={handleToggleBookmark}
          disabled={loading}
          className={`group relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
            bookmarked
              ? 'bg-[#4a7c59] text-white shadow-md'
              : 'bg-gray-100 hover:bg-[#e8f5e9] text-gray-600 hover:text-[#4a7c59]'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
          title={bookmarked ? 'Remove bookmark' : 'Save for later'}
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${
              bookmarked ? 'scale-110' : 'group-hover:scale-110'
            }`}
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={bookmarked ? 0 : 2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            className="group flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-[#e8f5e9] text-gray-600 hover:text-[#4a7c59] transition-all duration-300"
            aria-label="Sign in to bookmark"
            title="Sign in to save for later"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </SignInButton>
      )}

      {showLabel && (
        <span className="text-sm font-medium text-gray-700">
          {bookmarked ? 'Saved' : 'Save'}
        </span>
      )}
    </div>
  );
};

export default BookmarkButton;
