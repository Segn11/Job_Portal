
import React from 'react';
import { ICONS } from '../constants';
import Button from '../components/ui/Button';

const MOCK_APPS = [
  { id: 'a1', title: 'Senior Software Engineer', company: 'Google', date: 'June 12, 2024', status: 'Reviewed' },
  { id: 'a2', title: 'Product Designer', company: 'Netflix', date: 'June 10, 2024', status: 'Pending' },
  { id: 'a3', title: 'Fullstack Developer', company: 'Stripe', date: 'May 28, 2024', status: 'Shortlisted' },
  { id: 'a4', title: 'Backend Lead', company: 'Spotify', date: 'May 15, 2024', status: 'Rejected' },
];

const MyApplications: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500">Track the status of your recent job applications.</p>
        </div>
        <Button size="sm">Download Report</Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job / Company</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Applied</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_APPS.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900">{app.title}</div>
                  <div className="text-xs text-slate-500">{app.company}</div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600">{app.date}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Button variant="ghost" size="sm" className="text-indigo-600">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
