
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ICONS, JOB_CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
              Find your <span className="text-indigo-600">dream career</span> <br /> 
              faster than ever.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Browse thousands of job opportunities from top-tier companies. 
              Upload your CV and get noticed by world-class recruiters.
            </p>
            
            <form 
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100">
                <span className="text-slate-400">{ICONS.Search}</span>
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="w-full py-3 bg-transparent outline-none text-slate-700"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="text-slate-400">{ICONS.Location}</span>
                <input 
                  type="text" 
                  placeholder="City or state" 
                  className="w-full py-3 bg-transparent outline-none text-slate-700"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto px-10 rounded-xl">Search</Button>
            </form>
          </div>
        </div>

        {/* Floating circles decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse by Category</h2>
              <p className="text-slate-500">Find the right path based on your expertise</p>
            </div>
            <Link to="/jobs" className="text-indigo-600 font-semibold hover:underline">View all jobs &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {JOB_CATEGORIES.map((cat) => (
              <Link key={cat} to={`/jobs?category=${cat}`} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {ICONS.Jobs}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{cat}</h3>
                <p className="text-sm text-slate-500">1.2k+ vacancies</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Leading Companies</h2>
            <p className="text-slate-500">Over 50,000 teams use HireHub to scale their workforce.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['Google', 'Airbnb', 'Microsoft', 'Slack', 'Netflix', 'Spotify'].map(name => (
              <span key={name} className="text-3xl font-black text-slate-800 tracking-tighter cursor-pointer hover:opacity-100 transition-opacity">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Are you looking to hire top talent?</h2>
              <p className="text-indigo-100 text-lg">
                Post your job today and reach millions of qualified candidates globally.
                Our AI-powered matching system finds you the perfect fit.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-slate-50 border-0">Post a Job Now</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-20 -mt-20 opacity-20"></div>
      </section>
    </div>
  );
};

export default Home;
