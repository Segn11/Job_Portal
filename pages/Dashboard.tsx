
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ICONS } from '../constants';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const data = [
    { name: 'Mon', apps: 4 },
    { name: 'Tue', apps: 7 },
    { name: 'Wed', apps: 5 },
    { name: 'Thu', apps: 12 },
    { name: 'Fri', apps: 8 },
    { name: 'Sat', apps: 3 },
    { name: 'Sun', apps: 2 },
  ];

  const StatCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend?: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
        <p className="text-slate-500">Here's what's happening with your {user?.role === UserRole.SEEKER ? 'applications' : 'job postings'} today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === UserRole.SEEKER ? (
          <>
            <StatCard title="Total Applications" value="24" icon={ICONS.Applications} trend="+3" />
            <StatCard title="Interview Calls" value="5" icon={ICONS.Jobs} trend="+1" />
            <StatCard title="Jobs Saved" value="12" icon={ICONS.PostJob} />
            {/* Fix: Property 'Users' does not exist on ICONS, using 'Applicants' instead as it contains the Users icon */}
            <StatCard title="Profile Views" value="142" icon={ICONS.Applicants} trend="+18%" />
          </>
        ) : user?.role === UserRole.EMPLOYER ? (
          <>
            <StatCard title="Active Jobs" value="8" icon={ICONS.Jobs} />
            <StatCard title="Total Applicants" value="1,248" icon={ICONS.Applicants} trend="+124" />
            {/* Fix: Property 'Users' does not exist on ICONS, using 'Applicants' instead as it contains the Users icon */}
            <StatCard title="Shortlisted" value="42" icon={ICONS.Applicants} trend="+5" />
            <StatCard title="New Messages" value="12" icon={ICONS.Dashboard} />
          </>
        ) : (
          <>
            {/* Fix: Property 'Users' does not exist on ICONS, using 'Applicants' instead as it contains the Users icon */}
            <StatCard title="Total Users" value="12,504" icon={ICONS.Applicants} trend="+842" />
            <StatCard title="Total Jobs" value="4,210" icon={ICONS.Jobs} trend="+210" />
            <StatCard title="Pending Verifications" value="24" icon={ICONS.Settings} />
            <StatCard title="Reported Jobs" value="3" icon={ICONS.PostJob} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Activity Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {user?.role === UserRole.SEEKER 
                      ? `Applied for Frontend Developer position at Google`
                      : `New applicant for Senior Designer role`
                    }
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
