import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';

const HomePage = () => {
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
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="container mx-auto px-6 py-24 text-center text-white">
          <h1 className="text-5xl font-extrabold">DISCOVER MINDFUL HAVEN.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Built for wellness enthusiasts and mental health professionals alike, Mindful Haven offers
            personalized programs, guided meditations, and community support. Start your journey
            toward a balanced life with confidence.
          </p>
          <div className="mt-8">
            <button className="bg-green-500 text-white font-bold rounded-md px-6 py-3 hover:bg-green-600">
              Get Started →
            </button>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <div className="flex -space-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="/user1.jpg"
                alt="User 1"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="/user2.jpg"
                alt="User 2"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="/user3.jpg"
                alt="User 3"
              />
            </div>
            <p className="ml-3 text-sm">
              Trusted by <strong>15000+</strong> Mindful Users
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center">Latest Articles</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="mt-2">{post.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
