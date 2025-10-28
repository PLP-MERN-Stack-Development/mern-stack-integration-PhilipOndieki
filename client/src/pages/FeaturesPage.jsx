import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const features = [
    {
      icon: '🧘‍♀️',
      title: 'Guided Meditations',
      description: 'Access hundreds of guided meditation sessions for stress relief, better sleep, focus, and emotional healing.',
      benefits: ['Beginner-friendly sessions', '5-60 minute durations', 'Various meditation styles', 'Downloadable audio']
    },
    {
      icon: '📚',
      title: 'Expert Content Library',
      description: 'Dive into our extensive library of articles, videos, and courses created by mental health professionals.',
      benefits: ['Evidence-based techniques', 'Weekly new content', 'Expert contributors', 'Easy-to-follow guides']
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your wellness journey with intuitive tracking tools and personalized insights.',
      benefits: ['Mood tracking', 'Meditation streaks', 'Personal milestones', 'Progress analytics']
    },
    {
      icon: '👥',
      title: 'Community Support',
      description: 'Connect with like-minded individuals on their wellness journey through our supportive community.',
      benefits: ['Discussion forums', 'Group challenges', 'Peer support', 'Success stories']
    },
    {
      icon: '🎯',
      title: 'Personalized Plans',
      description: 'Get customized wellness plans tailored to your goals, experience level, and schedule.',
      benefits: ['AI-powered recommendations', 'Flexible scheduling', 'Goal setting', 'Adaptive content']
    },
    {
      icon: '💤',
      title: 'Sleep & Relaxation',
      description: 'Improve your sleep quality with bedtime stories, sleep sounds, and relaxation techniques.',
      benefits: ['Sleep meditations', 'Calming soundscapes', 'Bedtime routines', 'Wind-down exercises']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Your <span className="text-[#4a7c59]">Wellness Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build a sustainable mindfulness practice and achieve lasting peace of mind.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-[#4a7c59] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
              { step: '2', title: 'Set Goals', description: 'Tell us what you want to achieve' },
              { step: '3', title: 'Start Practicing', description: 'Follow your personalized plan' },
              { step: '4', title: 'Track Progress', description: 'Watch your growth over time' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4a7c59] text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">Join thousands of users who have transformed their lives.</p>
        <Link
          to="/blog"
          className="inline-block bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg"
        >
          Start Your Journey
        </Link>
      </div>
    </div>
  );
};

export default FeaturesPage;