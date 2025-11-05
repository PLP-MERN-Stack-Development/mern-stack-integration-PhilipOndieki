import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

const RelatedPosts = ({ currentPostId, categoryId, categoryName }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentPostId, categoryId]);

  const fetchRelatedPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      const allPosts = response.data.data || [];

      // Filter posts by same category, excluding current post
      let related = allPosts.filter(
        post => post._id !== currentPostId && post.category?._id === categoryId
      );

      // If less than 3 related posts, add some random posts
      if (related.length < 3) {
        const otherPosts = allPosts.filter(
          post => post._id !== currentPostId && post.category?._id !== categoryId
        );
        related = [...related, ...otherPosts].slice(0, 3);
      } else {
        related = related.slice(0, 3);
      }

      setRelatedPosts(related);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        More from {categoryName || 'this category'}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post._id}`}
            className="group"
          >
            <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative aspect-video bg-gradient-to-br from-[#e8f5e9] to-[#8db596]">
                {post.featuredImage ? (
                  <>
                    <div className="absolute inset-0 animate-pulse" />
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="relative w-full h-full object-cover"
                      loading="lazy"
                      onLoad={(e) => {
                        if (e.target.previousSibling) {
                          e.target.previousSibling.style.display = 'none';
                        }
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </>
                ) : null}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category Badge */}
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-[#4a7c59] bg-[#e8f5e9] rounded-full">
                    {post.category?.name || 'Wellness'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#4a7c59] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil(post.content.split(' ').length / 200)} min read
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
