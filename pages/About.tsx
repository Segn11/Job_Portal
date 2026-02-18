
import React from 'react';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Connecting talent with <br /><span className="text-indigo-600">extraordinary opportunity.</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At HireHub, we believe that the right job can transform a life, and the right talent can transform a business. We built this platform to bridge the gap with technology and empathy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Founded in 2024, our mission is to simplify the hiring process for both sides. No more endless scrolling through irrelevant listings or black-hole applications.
            </p>
            <div className="space-y-4">
              {['AI-Powered matching algorithm', 'Verified employers only', 'One-click applications', 'Comprehensive dashboard analytics'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" size={20} />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-indigo-600 aspect-video rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center text-white text-4xl font-black">
            Our Vision 2030
          </div>
        </div>

        <div className="bg-slate-50 rounded-[40px] p-12 md:p-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Team Behind HireHub</h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto">We are a distributed team of engineers, designers, and HR experts passionate about the future of work.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border border-slate-200"></div>
                <h4 className="font-bold text-slate-900">Expert {i}</h4>
                <p className="text-sm text-slate-500">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
