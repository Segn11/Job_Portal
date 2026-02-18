
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock data for display
  const job = {
    title: 'Senior Software Engineer',
    companyName: 'Acme Corp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    category: 'Software Engineering',
    salaryRange: '$120k - $160k',
    description: `
      <p className="mb-4">We are seeking a highly skilled and motivated Senior Software Engineer to join our dynamic team. In this role, you will be responsible for designing, developing, and maintaining complex web applications that empower our users across the globe.</p>
      
      <h3 className="text-lg font-bold mb-2">Key Responsibilities:</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Design and implement scalable backend services using Node.js and TypeScript.</li>
        <li>Collaborate with product managers and designers to build intuitive user experiences.</li>
        <li>Write clean, maintainable, and well-tested code.</li>
        <li>Mentor junior engineers and promote engineering excellence.</li>
      </ul>

      <h3 className="text-lg font-bold mb-2">Qualifications:</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>5+ years of professional software development experience.</li>
        <li>Expertise in modern JavaScript frameworks (React, Next.js).</li>
        <li>Solid understanding of distributed systems and microservices architecture.</li>
        <li>Excellent communication and problem-solving skills.</li>
      </ul>
    `
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      alert("Application submitted successfully! Check your dashboard for updates.");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 font-medium">
        &larr; Back to job search
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Header Section */}
        <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-6">
              <div className="w-20 h-20 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 text-3xl">
                {ICONS.Jobs}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="text-lg font-medium text-slate-600">{job.companyName}</span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    {ICONS.Location} {job.location}
                  </span>
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              {hasApplied ? (
                <div className="bg-green-50 text-green-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-green-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  Applied
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full md:w-auto px-10 rounded-xl"
                  isLoading={isApplying}
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Job Description</h2>
              <div className="prose prose-slate max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: job.description }}></div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Posted date</p>
                    <p className="text-sm font-medium text-slate-700">June 12, 2024</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-700">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Salary</p>
                    <p className="text-sm font-bold text-slate-900">{job.salaryRange}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Category</p>
                    <p className="text-sm font-medium text-slate-700">{job.category}</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-indigo-100">
                <h3 className="font-bold mb-2">Share this job</h3>
                <p className="text-indigo-100 text-sm mb-6">Help your network discover this opportunity.</p>
                <div className="flex justify-center gap-3">
                  <button className="bg-indigo-500 hover:bg-indigo-400 p-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </button>
                  <button className="bg-indigo-500 hover:bg-indigo-400 p-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
