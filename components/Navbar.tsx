
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h18"/><path d="M12 14v7"/><path d="M16 14v7"/><path d="M8 14v7"/><path d="M3 14a9 9 0 0 1 18 0"/><path d="M3 14c0-2.5 2-4.5 4.5-4.5H16.5c2.5 0 4.5 2 4.5 4.5"/></svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">HireHub</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Find Jobs</Link>
              <Link to="/companies" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Companies</Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600">About</Link>
              <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-700 px-3 py-2 rounded-md hover:bg-slate-100">
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-700 px-3 py-2 rounded-md hover:bg-slate-100">
                  Sign in
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
