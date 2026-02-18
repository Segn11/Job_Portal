
import React from 'react';

const Legal: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10">{title}</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p>Welcome to HireHub. These terms govern your use of our platform. By accessing or using HireHub, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when registering.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Privacy and Data</h2>
          <p>We take your privacy seriously. Any personal data provided to HireHub will be processed in accordance with our Privacy Policy. We use industry-standard encryption to protect your sensitive information.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Prohibited Conduct</h2>
          <p>Users are prohibited from uploading malicious software, engaging in fraudulent activities, or harassing other users on the platform. We reserve the right to suspend any account that violates these policies.</p>
        </section>
        <p className="text-sm text-slate-400 pt-10">Last updated: June 15, 2024</p>
      </div>
    </div>
  );
};

export default Legal;
