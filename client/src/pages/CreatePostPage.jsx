import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { createPost, getCategories, createOrGetUser } from '../services/api';

const CreatePostPage = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    isPublished: true
  });

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/blog');
      return;
    }
    
    // Fetch or create user in database
    const initializeUser = async () => {
      try {
        await createOrGetUser({
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || user.firstName || 'User'
        });
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };
    
  initializeUser();    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoryData = response?.data?.data || response?.data || [];
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please refresh the page.');
        setCategories([]); // Set empty array to prevent map error
      }
    };
    
    fetchCategories();
  }, [isSignedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        clerkUserId: user.id, // Send Clerk ID instead of MongoDB ID
      };

      await createPost(postData);
      navigate('/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Post</h1>
        <p className="text-gray-600">Share your thoughts and insights with the community.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none transition-colors"
            placeholder="Enter your post title"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none transition-colors"
          >
            <option value="">Select a category</option>
            {(categories || []).map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none transition-colors resize-none"
            placeholder="Write your post content here..."
          />
          <p className="mt-2 text-sm text-gray-500">
            {formData.content.split(' ').filter(word => word).length} words
          </p>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none transition-colors"
            placeholder="mindfulness, meditation, wellness (comma-separated)"
          />
          <p className="mt-2 text-sm text-gray-500">Separate tags with commas</p>
        </div>

        {/* Publish Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-5 h-5 text-[#4a7c59] border-gray-300 rounded focus:ring-[#4a7c59]"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-900">
            Publish immediately
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;