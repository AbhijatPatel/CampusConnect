import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService, applicationService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function JobSearch() {
  const { isStudent, isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [maxCgpa, setMaxCgpa] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applyingId, setApplyingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJobs();
    if (isStudent) {
      loadExistingApplications();
    }
  }, []);

  const loadExistingApplications = async () => {
    try {
      const res = await applicationService.getStudentApplications();
      if (res.data) {
        setAppliedJobs(new Set(res.data.map((a) => a.jobId)));
      }
    } catch (e) {}
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();
      if (location.trim()) params.location = location.trim();
      if (jobType) params.jobType = jobType;
      if (maxCgpa) params.maxCgpa = parseFloat(maxCgpa);

      const res = await jobService.getAllJobs(params);
      if (res.data && res.data.content) {
        setJobs(res.data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApply = async (jobId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setApplyingId(jobId);
    setMessage('');
    try {
      await applicationService.applyForJob(jobId);
      setAppliedJobs(new Set([...appliedJobs, jobId]));
      setMessage('Application submitted! AI & DSA ranking engine updated your priority.');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage(err.message || 'Application submission failed.');
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Campus Opportunities</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Explore Open Placements & Drives</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time campus opportunities ranked with AI semantic alignment.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-700/60 flex items-center gap-2.5 text-xs text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter Bar */}
      <form onSubmit={handleFilterSubmit} className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Location (e.g. Noida, Bengaluru)..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Results
            </button>
          </div>
        </div>
      </form>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 mt-3">Loading active campus openings...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No jobs found matching criteria</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting search filters or keywords</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const hasApplied = appliedJobs.has(job.id);
            return (
              <div
                key={job.id}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {job.companyName}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-950/80 border border-indigo-800 text-indigo-300 shrink-0">
                      {job.aiMatchPercentage || 85}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Package:</span>
                      <span className="font-bold text-emerald-400">{job.salaryRange || '₹8–12 LPA'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-slate-200">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Min CGPA:</span>
                      <span className="text-slate-200">{job.minCgpa || 6.5}/10.0</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {job.requiredSkills?.slice(0, 4).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    View Details
                  </Link>

                  {hasApplied ? (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={applyingId === job.id}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
                    >
                      {applyingId === job.id ? 'Applying...' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
