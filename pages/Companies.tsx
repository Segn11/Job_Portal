
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';
import Button from '../components/ui/Button';

const MOCK_COMPANIES = [
  { id: 'c1', name: 'Google', location: 'Mountain View, CA', industry: 'Technology', description: 'World leader in search and cloud computing.', logo: 'G', jobsCount: 142 },
  { id: 'c2', name: 'Netflix', location: 'Los Gatos, CA', industry: 'Entertainment', description: 'The worlds largest subscription streaming service.', logo: 'N', jobsCount: 54 },
  { id: 'c3', name: 'Airbnb', location: 'San Francisco, CA', industry: 'Hospitality', description: 'Platform for vacation rentals and tourism activities.', logo: 'A', jobsCount: 89 },
  { id: 'c4', name: 'Stripe', location: 'San Francisco, CA', industry: 'Fintech', description: 'Financial infrastructure for the internet.', logo: 'S', jobsCount: 112 },
  { id: 'c5', name: 'Slack', location: 'San Francisco, CA', industry: 'Software', description: 'Productivity and communication platform for teams.', logo: 'S', jobsCount: 34 },
  { id: 'c6', name: 'Spotify', location: 'Stockholm, SE', industry: 'Music', description: 'Audio streaming and media services provider.', logo: 'S', jobsCount: 76 },
];

const Companies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Discover Top Companies</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explore organizations that align with your values and career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COMPANIES.map((company) => (
          <div key={company.id} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-indigo-100 transition-all group">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {company.logo}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{company.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">{ICONS.Location} {company.location}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-8 line-clamp-2">{company.description}</p>
            <div className="flex items-center justify-between">
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{company.industry}</span>
              <Link to={`/jobs?company=${company.name}`}>
                <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50">
                  {company.jobsCount} Open Roles &rarr;
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
