import React from 'react';

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with mindfulness',
      features: [
        '10 guided meditations',
        'Basic progress tracking',
        'Community access',
        'Weekly newsletter',
        'Mobile app access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      price: '$12',
      period: 'per month',
      description: 'Everything you need for a complete practice',
      features: [
        'Unlimited guided meditations',
        'Advanced progress tracking',
        'Personalized recommendations',
        'Downloadable sessions',
        'Priority support',
        'Ad-free experience',
        'Sleep stories & sounds',
        'Expert Q&A access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Lifetime',
      price: '$299',
      period: 'one-time',
      description: 'Pay once, access forever',
      features: [
        'All Premium features',
        'Lifetime access',
        'Future updates included',
        'Exclusive content',
        'Early feature access',
        'VIP community',
        '1-on-1 wellness consultation',
        'Gift 3 premium accounts'
      ],
      cta: 'Buy Lifetime Access',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, <span className="text-[#4a7c59]">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your wellness journey. All plans include a 14-day free trial.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-[#4a7c59] text-white shadow-2xl scale-105'
                  : 'bg-white border-2 border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#8db596] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-white' : 'text-[#4a7c59]'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-[#4a7c59] hover:bg-gray-100'
                    : 'bg-[#4a7c59] text-white hover:bg-[#3d6b4a]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'Is there really a free trial?',
                a: 'Absolutely! Try Premium free for 14 days. No credit card required. Cancel anytime.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and Apple Pay for your convenience.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund you fully.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;