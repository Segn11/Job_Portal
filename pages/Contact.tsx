
import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in touch</h1>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            Have questions or need assistance? Our team is here to help you navigate the future of your career or company.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Email us</h4>
                <p className="text-slate-500">support@hirehub.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Call us</h4>
                <p className="text-slate-500">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Our HQ</h4>
                <p className="text-slate-500">123 Talent Way, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
          {submitted ? (
            <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-500">Well get back to you within 24 hours.</p>
              <Button variant="ghost" className="mt-8" onClick={() => setSubmitted(false)}>Send another message</Button>
            </div>
          ) : null}
          
          <form onSubmit={handleContact} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" required />
              <Input label="Last Name" placeholder="Doe" required />
            </div>
            <Input label="Email" type="email" placeholder="john@example.com" required />
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                rows={4}
                placeholder="How can we help?"
                required
              ></textarea>
            </div>
            <Button type="submit" className="w-full py-4 rounded-xl">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
