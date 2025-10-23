import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Blog</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-lg">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.content.substring(0, 150)}...</p>
            <Link to={`/blog/${post._id}`} className="text-green-500 hover:underline mt-4 inline-block">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
