import React from 'react';

const EnterprisePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-[#4a7c59]">Enterprise</span> Wellness Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower your workforce with comprehensive mental health and wellness programs.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Enterprise?</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              icon: '🏢',
              title: 'Dedicated Account Management',
              description: 'Get personalized support with a dedicated success manager to help your team thrive.'
            },
            {
              icon: '📊',
              title: 'Advanced Analytics',
              description: 'Track engagement, measure ROI, and gain insights into your workforce wellness trends.'
            },
            {
              icon: '🔒',
              title: 'Enterprise Security',
              description: 'Bank-level encryption, HIPAA compliance, and SSO integration for maximum security.'
            },
            {
              icon: '🎨',
              title: 'Custom Branding',
              description: 'White-label solutions with your company branding for a seamless employee experience.'
            },
            {
              icon: '👥',
              title: 'Unlimited Seats',
              description: 'Scale effortlessly with unlimited user accounts and no per-seat pricing.'
            },
            {
              icon: '🎓',
              title: 'Custom Content',
              description: 'Create organization-specific wellness programs tailored to your culture and goals.'
            }
          ].map((benefit, index) => (
            <div key={index} className="flex gap-6">
              <div className="text-5xl flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#4a7c59] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '500+', label: 'Enterprise Clients' },
              { number: '89%', label: 'Employee Satisfaction' },
              { number: '2.5x', label: 'ROI Average' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">💬</div>
          <blockquote className="text-2xl text-gray-700 italic mb-6">
            "Mindful Haven transformed our company culture. Employee burnout decreased by 45% in just six months."
          </blockquote>
          <div className="font-semibold text-gray-900">Sarah Johnson</div>
          <div className="text-gray-600">Chief People Officer, TechCorp</div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Workplace?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a demo to see how Mindful Haven can help your organization thrive.
          </p>
          <button className="bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg">
            Schedule Enterprise Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePage;