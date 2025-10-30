import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import EnterprisePage from './pages/EnterprisePage';
import PricingPage from './pages/PricingPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="enterprise" element={<EnterprisePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/create" element={<CreatePostPage />} />
          <Route path="blog/:id" element={<PostPage />} />
          <Route path="/blog/edit/:id" element={<EditPostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;