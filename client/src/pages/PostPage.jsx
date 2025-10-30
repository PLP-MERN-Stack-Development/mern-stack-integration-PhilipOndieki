import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';  
import { useUser } from '@clerk/clerk-react';

const PostPage = () => {
  const { user, isSignedIn } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        setPost(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. It may have been deleted or does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

const handleDelete = async () => {
  if (!window.confirm('Are you sure you want to delete this post?')) return;
  
  try {
    await deletePost(id);
    navigate('/blog');
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete post');
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4a7c59] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Post Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 bg-[#4a7c59] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#3d6b4a] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-[#4a7c59]">Home</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-[#4a7c59]">Blog</Link>
        <span>/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {/* Post Header */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#4a7c59] bg-[#e8f5e9] rounded-full">
            {post.category?.name || 'Wellness'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white font-semibold">
              {post.author?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <span className="font-medium text-gray-900">
              {post.author?.username || 'Anonymous'}
            </span>
          </div>
          <span>•</span>
          <time>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {Math.ceil(post.content.split(' ').length / 200)} min read
          </span>
        </div>
      </header>
      {/* Featured Image with Loading State */}
      <div className="relative aspect-video rounded-2xl mb-12 overflow-hidden">
        {post.featuredImage ? (
          <>
            {/* Loading skeleton - shows while image loads */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5e9] to-[#8db596] animate-pulse" />
            
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="relative w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => {
                // Hide skeleton when image loads
                e.target.previousSibling.style.display = 'none';
              }}
              onError={(e) => {
                // Show placeholder if image fails
                e.target.style.display = 'none';
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e8f5e9] to-[#8db596] flex items-center justify-center">
            <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-700 leading-relaxed prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => {
            // Handle headers
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            // Handle bold text
            const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Empty lines become spacing
            if (paragraph.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />;
          })}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {/* Edit and Delete Buttons - Only show if user is the author */}
      {isSignedIn && user?.id === post.author?.clerkUserId && (
        <div className="flex gap-4 mb-12 pb-12 border-b border-gray-200">
          <button
            onClick={() => navigate(`/blog/edit/${post._id}`)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#4a7c59] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#3d6b4a] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 border-2 border-red-500 text-red-500 font-semibold rounded-full px-6 py-3 hover:bg-red-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-[#4a7c59] hover:text-[#3d6b4a] font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Posts
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#4a7c59] font-medium transition-colors"
        >
          Back to Top
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default PostPage;