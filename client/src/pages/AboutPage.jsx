import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-[#4a7c59]">Mindful Haven</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your sanctuary for mental wellness, mindfulness practices, and holistic living.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Mindful Haven, we believe that mental wellness should be accessible to everyone. 
              Our mission is to provide a peaceful digital space where individuals can discover, 
              learn, and practice mindfulness techniques that enhance their daily lives.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We curate evidence-based content, guided meditations, and practical resources 
              to help you navigate stress, anxiety, and the challenges of modern life with 
              greater ease and clarity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#e8f5e9] to-[#8db596] rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🧘‍♀️</div>
              <p className="text-gray-700 font-semibold">Serving 15,000+ mindful members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💚',
                title: 'Compassion',
                description: 'We approach wellness with kindness, understanding that every journey is unique.'
              },
              {
                icon: '🌱',
                title: 'Growth',
                description: 'We believe in continuous learning and the power of small, consistent steps.'
              },
              {
                icon: '🤝',
                title: 'Community',
                description: 'We foster a supportive environment where everyone feels welcome and valued.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Sarah Chen', role: 'Clinical Psychologist', initial: 'S' },
            { name: 'Michael Rodriguez', role: 'Meditation Guide', initial: 'M' },
            { name: 'Emma Thompson', role: 'Wellness Coach', initial: 'E' },
            { name: 'James Wilson', role: 'Content Director', initial: 'J' }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] flex items-center justify-center text-white text-4xl font-bold">
                {member.initial}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start your mindfulness journey today with guided meditations, expert resources, and a supportive community.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-white text-[#4a7c59] font-semibold rounded-full px-8 py-4 hover:bg-gray-100 transition-all shadow-lg"
          >
            Explore Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;