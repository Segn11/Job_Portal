
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
      const registeredUser = storedUsers.find((u: any) => u.email === formData.email);

      if (registeredUser) {
        login(registeredUser, 'mock-jwt-token-' + Math.random());
        setIsLoading(false);
        navigate(from, { replace: true });
        return;
      }

      const demoEmails = ['seeker@demo.com', 'employer@demo.com', 'admin@demo.com'];
      if (demoEmails.includes(formData.email) || formData.email.includes('@demo.com')) {
        let role = UserRole.SEEKER;
        if (formData.email.includes('employer')) role = UserRole.EMPLOYER;
        if (formData.email.includes('admin')) role = UserRole.ADMIN;

        login({
          id: 'u-demo',
          name: role === UserRole.EMPLOYER ? 'Google Inc' : 'Demo User',
          email: formData.email,
          role: role,
          companyName: role === UserRole.EMPLOYER ? 'Google' : undefined
        }, 'mock-jwt-token-demo');
        
        setIsLoading(false);
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials. Please use a demo account or sign up.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: 'u-social',
        name: `User via ${provider}`,
        email: `social@${provider.toLowerCase()}.com`,
        role: UserRole.SEEKER
      }, 'mock-social-token');
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h18"/><path d="M12 14v7"/><path d="M16 14v7"/><path d="M8 14v7"/><path d="M3 14a9 9 0 0 1 18 0"/><path d="M3 14c0-2.5 2-4.5 4.5-4.5H16.5c2.5 0 4.5 2 4.5 4.5"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">HireHub</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-slate-500">Sign in to access your dashboard.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"/>
              </svg>
              Google
            </button>
            <button 
              onClick={() => handleSocialLogin('LinkedIn')}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700"
            >
              <svg className="w-4 h-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold tracking-wider">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@company.com" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 font-bold hover:text-indigo-700">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full py-3.5 rounded-2xl shadow-lg shadow-indigo-100" isLoading={isLoading}>
              Sign in to HireHub
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-sm text-slate-500">
              New to HireHub?{' '}
              <Link to="/register" className="text-indigo-600 font-black hover:underline underline-offset-4">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
