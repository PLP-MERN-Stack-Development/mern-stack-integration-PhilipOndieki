import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getComments, createComment, updateComment, deleteComment } from '../services/api';
import { SignInButton } from '@clerk/clerk-react';

const Comments = ({ postId }) => {
  const { user, isSignedIn } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getComments(postId);
      setComments(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await createComment(postId, {
        content: newComment,
        clerkId: user.id
      });
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      await updateComment(commentId, {
        content: editContent,
        clerkId: user.id
      });
      setEditingId(null);
      setEditContent('');
      await fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId, user.id);
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white font-semibold flex-shrink-0">
              {user.firstName?.[0] || user.username?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none resize-none"
                disabled={submitting}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="px-6 py-2 bg-[#4a7c59] text-white font-medium rounded-full hover:bg-[#3d6b4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Sign in to join the conversation</p>
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-[#4a7c59] text-white font-medium rounded-full hover:bg-[#3d6b4a] transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      {/* Comments List */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white font-semibold flex-shrink-0">
                {comment.author?.username?.[0]?.toUpperCase() || 'A'}
              </div>

              {/* Comment Content */}
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {comment.author?.username || 'Anonymous'}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    {comment.isEdited && (
                      <span className="text-xs text-gray-400 italic">(edited)</span>
                    )}
                  </div>

                  {/* Actions */}
                  {isSignedIn && comment.author?.clerkUserId === user.id && (
                    <div className="flex items-center gap-2">
                      {editingId !== comment._id && (
                        <>
                          <button
                            onClick={() => startEdit(comment)}
                            className="text-sm text-gray-600 hover:text-[#4a7c59] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-sm text-red-600 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                {editingId === comment._id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4a7c59] focus:outline-none resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEdit(comment._id)}
                        disabled={!editContent.trim()}
                        className="px-4 py-1 text-sm bg-[#4a7c59] text-white rounded-full hover:bg-[#3d6b4a] transition-colors disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;