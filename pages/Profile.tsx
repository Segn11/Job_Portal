
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FileText, Upload, X, CheckCircle } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '', 
    bio: user?.bio || '', 
    companyName: user?.companyName || '',
    cvName: user?.cvName || ''
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser(formData);
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError(null);

    if (!file) return;

    if (file.type !== 'application/pdf') {
      setCvError('Please upload only PDF files.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCvError('File size must be less than 5MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Mock upload process
    setCvUploading(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, cvName: file.name }));
      updateUser({ ...formData, cvName: file.name });
      setCvUploading(false);
    }, 1500);
  };

  const removeCv = () => {
    setFormData(prev => ({ ...prev, cvName: '' }));
    updateUser({ ...formData, cvName: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-black text-indigo-600">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Profile Picture</h4>
            <p className="text-sm text-slate-500 mb-3">JPG, GIF or PNG. Max size 2MB.</p>
            <Button size="sm" variant="outline">Upload New</Button>
          </div>
        </div>

        {/* CV Upload Section (Seekers Only) */}
        {user?.role === 'seeker' && (
          <div className="pb-8 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Resume / CV</h4>
            <p className="text-sm text-slate-500 mb-4">Upload your latest resume in PDF format for employers to review.</p>
            
            {formData.cvName ? (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{formData.cvName}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle size={12} /> Uploaded successfully
                    </p>
                  </div>
                </div>
                <button 
                  onClick={removeCv}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove CV"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
                  ${cvError ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf" 
                  className="hidden" 
                />
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  {cvUploading ? (
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Upload size={24} />
                  )}
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {cvUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-slate-500 mt-1">PDF files only (Max. 5MB)</p>
              </div>
            )}
            {cvError && <p className="mt-2 text-xs text-red-500 font-medium">{cvError}</p>}
          </div>
        )}

        {/* General Info Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <Input 
            label="Full Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required
          />
          <Input 
            label="Email Address" 
            type="email" 
            value={formData.email} 
            disabled 
            helperText="Email cannot be changed."
          />
          
          {user?.role === 'employer' && (
            <Input 
              label="Company Name" 
              value={formData.companyName} 
              onChange={(e) => setFormData({...formData, companyName: e.target.value})} 
            />
          )}

          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Professional Bio</label>
            <textarea 
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" isLoading={loading}>Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
