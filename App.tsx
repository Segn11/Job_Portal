
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Companies from './pages/Companies';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import MyApplications from './pages/MyApplications';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';

// Shared Components
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Legal title="Privacy Policy" />} />
            <Route path="/terms" element={<Legal title="Terms of Service" />} />
            <Route path="/cookies" element={<Legal title="Cookie Policy" />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<div className="p-4">Manage your posted jobs</div>} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="applicants" element={<div className="p-4">Track your candidates</div>} />
            <Route path="users" element={<div className="p-4">Manage platform users</div>} />
            <Route path="all-jobs" element={<div className="p-4">Review platform jobs</div>} />
            <Route path="settings" element={<div className="p-4">Platform Settings</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Persistent AI Chatbot */}
        <AIChatbot />
      </Router>
    </AuthProvider>
  );
};

export default App;
