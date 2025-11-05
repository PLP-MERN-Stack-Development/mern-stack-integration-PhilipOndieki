import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    memberSince: ''
  });

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get all posts to find user info and their posts
      const postsResponse = await getPosts();
      const allPosts = postsResponse.data.data || [];
      
      // Find posts by this author
      const userPosts = allPosts.filter(
        post => post.author?.username?.toLowerCase() === username.toLowerCase()
      );
      
      if (userPosts.length === 0) {
        setError('User not found');
        setLoading(false);
        return;
      }

      // Get user info from first post
      const userInfo = userPosts[0].author;
      setUser(userInfo);
      setPosts(userPosts);
      
      // Calculate stats
      setStats({
        totalPosts: userPosts.length,
        totalViews: userPosts.length * 127, // Placeholder - would be real data in production
        memberSince: new Date(userInfo.createdAt || Date.now()).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        })
      });
      
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4a7c59] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#4a7c59] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#3d6b4a] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#e8f5e9] to-white rounded-2xl p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {user?.username || 'Unknown User'}
            </h1>
            <p className="text-gray-600 mb-4">
              {user?.email || 'No email available'}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div>
                <div className="text-2xl font-bold text-[#4a7c59]">{stats.totalPosts}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#4a7c59]">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Member Since</div>
                <div className="text-lg font-semibold text-gray-900">{stats.memberSince}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Articles by {user?.username} ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600">No posts yet</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Post Image */}
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

                {/* Post Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#4a7c59] bg-[#e8f5e9] rounded-full">
                      {post.category?.name || 'Wellness'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#4a7c59] transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {post.content.substring(0, 150)}...
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-flex items-center text-[#4a7c59] font-medium hover:gap-2 transition-all group/link mt-4"
                  >
                    Read Article
                    <svg
                      className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#4a7c59] font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Posts
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;