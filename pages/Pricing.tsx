
import React from 'react';
import { Check } from 'lucide-react';
import Button from '../components/ui/Button';

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Starter', price: '$0', desc: 'Perfect for small startups hiring their first team members.', features: ['1 active job posting', 'Basic candidate search', 'Community support'] },
    { name: 'Professional', price: '$49', desc: 'Best for growing companies with regular hiring needs.', features: ['10 active job postings', 'Premium candidate search', 'Priority email support', 'Employer branding tools'], popular: true },
    { name: 'Enterprise', price: 'Custom', desc: 'Advanced solutions for large organizations and agencies.', features: ['Unlimited job postings', 'Dedicated account manager', 'API access', 'Advanced analytics'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-600">Choose the plan that works best for your recruitment strategy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white rounded-3xl p-10 border transition-all ${plan.popular ? 'border-indigo-600 shadow-2xl scale-105 relative' : 'border-slate-200 shadow-sm'}`}>
            {plan.popular && <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>}
            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-slate-400">/mo</span>}
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full py-3 rounded-xl">Get Started</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
