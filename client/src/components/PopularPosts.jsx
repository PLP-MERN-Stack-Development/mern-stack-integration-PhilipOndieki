import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

const PopularPosts = ({ limit = 5 }) => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  const fetchPopularPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      const allPosts = response.data.data || [];

      // Sort by created date (most recent first) as a proxy for popularity
      // In a real app, you'd sort by views, likes, or engagement metrics
      const sorted = allPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

      setPopularPosts(sorted);
    } catch (error) {
      console.error('Error fetching popular posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-[#4a7c59]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Popular Articles
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (popularPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#4a7c59]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Popular Articles
      </h3>

      <div className="space-y-4">
        {popularPosts.map((post, index) => (
          <Link
            key={post._id}
            to={`/blog/${post._id}`}
            className="group block"
          >
            <div className="flex gap-3 items-start">
              {/* Rank Number */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#4a7c59] transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil(post.content.split(' ').length / 200)} min
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.category?.name || 'Wellness'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/blog"
        className="mt-6 block text-center text-sm font-medium text-[#4a7c59] hover:text-[#3d6b4a] transition-colors"
      >
        View All Articles →
      </Link>
    </div>
  );
};

export default PopularPosts;
