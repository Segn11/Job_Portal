
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ICONS } from '../constants';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const seekerLinks = [
    { to: '/dashboard', label: 'Overview', icon: ICONS.Dashboard },
    { to: '/dashboard/applications', label: 'My Applications', icon: ICONS.Applications },
    { to: '/dashboard/profile', label: 'Profile Settings', icon: ICONS.Profile },
  ];

  const employerLinks = [
    { to: '/dashboard', label: 'Overview', icon: ICONS.Dashboard },
    { to: '/dashboard/jobs', label: 'Manage Jobs', icon: ICONS.Jobs },
    { to: '/dashboard/post-job', label: 'Post a Job', icon: ICONS.PostJob },
    { to: '/dashboard/applicants', label: 'Applicants', icon: ICONS.Applicants },
    { to: '/dashboard/profile', label: 'Company Profile', icon: ICONS.Profile },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Overview', icon: ICONS.Dashboard },
    { to: '/dashboard/users', label: 'Manage Users', icon: ICONS.Applicants },
    { to: '/dashboard/all-jobs', label: 'Manage Jobs', icon: ICONS.Jobs },
    { to: '/dashboard/settings', label: 'System Settings', icon: ICONS.Settings },
  ];

  const links = user?.role === UserRole.SEEKER ? seekerLinks 
              : user?.role === UserRole.EMPLOYER ? employerLinks 
              : adminLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className="text-current opacity-70">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span className="opacity-70">{ICONS.Logout}</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
