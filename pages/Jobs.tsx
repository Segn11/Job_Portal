
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ICONS, JOB_CATEGORIES, JOB_TYPES } from '../constants';
import Button from '../components/ui/Button';
import { Job } from '../types';

const MOCK_JOBS: Job[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `job-${i}`,
  title: ['Senior Software Engineer', 'Product Designer', 'Marketing Lead', 'Frontend Developer', 'HR Manager', 'Data Scientist', 'Project Manager', 'Sales Executive'][i % 8],
  companyName: ['Acme Corp', 'StartupX', 'InnovateHub', 'TechGiant', 'CloudNine', 'DataFlow', 'BuildIt', 'GrowthCo'][i % 8],
  location: ['San Francisco, CA', 'New York, NY', 'Remote', 'London, UK', 'Austin, TX', 'Berlin, DE', 'Toronto, CA'][i % 7],
  type: ['Full-time', 'Remote', 'Contract', 'Part-time'][i % 4] as any,
  category: JOB_CATEGORIES[i % JOB_CATEGORIES.length],
  salaryRange: ['$120k - $160k', '$90k - $120k', '$150k+', '$80k - $110k', '$100k - $130k'][i % 5],
  description: 'We are looking for an experienced individual to join our growing team...',
  postedAt: `${(i % 5) + 1} days ago`,
  employerId: 'emp-1'
}));

const JOBS_PER_PAGE = 6;

const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    let result = MOCK_JOBS;
    
    // Filter by Search Term
    if (searchTerm) {
      const lowSearch = searchTerm.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(lowSearch) || 
        j.companyName.toLowerCase().includes(lowSearch) ||
        j.location.toLowerCase().includes(lowSearch)
      );
    }
    
    // Filter by Category
    if (categoryFilter) {
      result = result.filter(j => j.category === categoryFilter);
    }
    
    // Filter by Type
    if (typeFilter) {
      result = result.filter(j => j.type === typeFilter);
    }
    
    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, categoryFilter, typeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 3;
    
    // Logic for "1 2 3 ... 12" style
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return (
      <nav className="flex items-center gap-1">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          &larr;
        </button>
        {pages.map((p, i) => (
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-slate-300">...</span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => handlePageChange(p as number)}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                currentPage === p 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              {p}
            </button>
          )
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          &rarr;
        </button>
      </nav>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Find your dream job</h1>
        <p className="text-slate-500">Explore {filteredJobs.length} opportunities matching your criteria</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              {ICONS.Filter} Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Job Category</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Employment Type</label>
                <div className="space-y-2">
                  {JOB_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        className="text-indigo-600 focus:ring-indigo-500" 
                        checked={typeFilter === type}
                        onChange={() => setTypeFilter(type)}
                      />
                      {type}
                    </label>
                  ))}
                  {typeFilter && (
                    <button onClick={() => setTypeFilter('')} className="text-xs text-indigo-600 font-medium hover:underline">Clear selection</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-4">
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.Search}</span>
            <input 
              type="text"
              placeholder="Search job titles, companies or locations..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">
                {startIndex + 1} - {Math.min(startIndex + JOBS_PER_PAGE, filteredJobs.length)}
              </span> of {filteredJobs.length} results
            </p>
          </div>

          {currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <div key={job.id} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                      {ICONS.Jobs}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="text-sm text-slate-600 font-medium">{job.companyName}</span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          {ICONS.Location} {job.location}
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-bold text-slate-900">{job.salaryRange}</p>
                      <p className="text-xs text-slate-400">Posted {job.postedAt}</p>
                    </div>
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" className="rounded-lg group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                {ICONS.Search}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No jobs found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              <Button variant="ghost" className="mt-4" onClick={() => { setSearchTerm(''); setCategoryFilter(''); setTypeFilter(''); }}>Clear all filters</Button>
            </div>
          )}
          
          <div className="flex justify-center pt-8">
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
