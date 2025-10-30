import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { getPost, updatePost, getCategories } from '../services/api';

const EditPostPage = () => {
  const { user, isSignedIn } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    featuredImage: '',
    tags: '',
    isPublished: true
  });

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/blog');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [postResponse, categoriesResponse] = await Promise.all([
          getPost(id),
          getCategories()
        ]);

        const post = postResponse.data.data;
        
        // Check if user is the author
        if (post.author.clerkUserId !== user.id) {
          alert('You can only edit your own posts');
          navigate('/blog');
          return;
        }

        setFormData({
          title: post.title,
          content: post.content,
          category: post.category._id,
          featuredImage: post.featuredImage || '',
          tags: post.tags?.join(', ') || '',
          isPublished: post.isPublished
        });

        setCategories(categoriesResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isSignedIn, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      await updatePost(id, postData);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.response?.data?.error || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  if (!isSignedIn) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit Post</h1>
        <p className="text-gray-600">Make changes to your post.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          />
        </div>

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
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-900 mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            id="featuredImage"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none transition-colors"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>

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
          />
          <p className="mt-2 text-sm text-gray-500">
            {formData.content.split(' ').filter(word => word).length} words
          </p>
        </div>

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
            placeholder="mindfulness, meditation, wellness"
          />
        </div>

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
            Published
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/blog/${id}`)}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;