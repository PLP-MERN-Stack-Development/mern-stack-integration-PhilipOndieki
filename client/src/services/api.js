import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Post services
export const getPosts = (params = {}) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const createOrGetUser = (userData) => api.post('/users', userData);

// Comment services
export const getComments = (postId, params = {}) => api.get(`/posts/${postId}/comments`, { params });
export const createComment = (postId, commentData) => api.post(`/posts/${postId}/comments`, commentData);
export const updateComment = (commentId, commentData) => api.put(`/comments/${commentId}`, commentData);
export const deleteComment = (commentId, clerkId) => api.delete(`/comments/${commentId}`, { data: { clerkId } });

// Response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);


// Category services
export const getCategories = () => api.get('/categories');
export const createCategory = (category) => api.post('/categories', category);

export default api;
