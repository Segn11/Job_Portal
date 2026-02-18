
import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { JOB_CATEGORIES, JOB_TYPES } from '../constants';

const PostJob: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
        <p className="text-slate-500">Reach thousands of qualified candidates by detailing your role.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
        {success && (
          <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center justify-between">
            <span className="font-bold">Job posted successfully! It will be live after a short review.</span>
            <button onClick={() => setSuccess(false)} className="text-green-900 hover:scale-110">&times;</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Job Title" placeholder="e.g. Senior Frontend Engineer" required />
            <Input label="Location" placeholder="e.g. New York, NY or Remote" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500">
                {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
              <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500">
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Input label="Salary Range" placeholder="e.g. $120k - $150k" />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
            <textarea 
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              rows={8}
              placeholder="Describe the role, responsibilities, and requirements..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 border-t border-slate-100 pt-8">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
            <Button type="submit" isLoading={loading}>Publish Job Listing</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
