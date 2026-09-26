import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterService, jobService } from '../services/api';
import StatCard from '../components/StatCard';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  BarChart3,
  Building,
  Edit2,
  Trash2,
  Save,
  X,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function RecruiterDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [savingJob, setSavingJob] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadRecruiterData();
  }, []);

  const loadRecruiterData = async () => {
    try {
      setLoading(true);
      const [anaRes, jobRes] = await Promise.allSettled([
        recruiterService.getAnalytics(),
        jobService.getRecruiterJobs(),
      ]);

      if (anaRes.status === 'fulfilled' && anaRes.value.data) setAnalytics(anaRes.value.data);
      if (jobRes.status === 'fulfilled' && jobRes.value.data) setJobs(jobRes.value.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This will remove all associated applications.')) return;
    try {
      await jobService.deleteJob(jobId);
      setJobs(jobs.filter((j) => j.id !== jobId));
      setMsg('Job posting deleted successfully.');
      setTimeout(() => setMsg(''), 4000);
    } catch (e) {
      console.error(e);
      alert('Failed to delete job posting.');
    }
  };

  const handleSaveJobEdit = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    try {
      setSavingJob(true);
      const res = await jobService.updateJob(editingJob.id, {
        ...editingJob,
        minCgpa: editingJob.minCgpa ? parseFloat(editingJob.minCgpa) : 0,
      });
      if (res.data) {
        setJobs(jobs.map((j) => (j.id === editingJob.id ? res.data : j)));
      }
      setEditingJob(null);
      setMsg('Job posting updated successfully.');
      setTimeout(() => setMsg(''), 4000);
    } catch (e) {
      console.error(e);
      alert('Failed to update job posting.');
    } finally {
      setSavingJob(false);
    }
  };

  const chartData = [
    { stage: 'Applied', candidates: analytics?.totalApplications || 28 },
    { stage: 'Under Review', candidates: analytics?.underReview || 12 },
    { stage: 'Shortlisted', candidates: analytics?.shortlisted || 8 },
    { stage: 'Interview', candidates: analytics?.interview || 5 },
    { stage: 'Selected', candidates: analytics?.selected || 3 },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Recruitment Suite</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Recruiter Console</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage active campus drives, edit requirements, delete openings, and rank applicants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/recruiter/jobs/create"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Post New Job Opening
          </Link>
        </div>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Drives"
          value={analytics?.activeJobs || jobs.length || 0}
          subtitle="Open campus job listings"
          icon={Briefcase}
          badge="Live"
          badgeColor="emerald"
        />
        <StatCard
          title="Total Applicants"
          value={analytics?.totalApplications || 0}
          subtitle="Processed via NLP Engine"
          icon={Users}
          badge="Evaluated"
          badgeColor="indigo"
        />
        <StatCard
          title="Interviews Set"
          value={analytics?.interview || 0}
          subtitle="Technical panel rounds"
          icon={Calendar}
          badge="Active"
          badgeColor="purple"
        />
        <StatCard
          title="Offers Released"
          value={analytics?.selected || 0}
          subtitle="Direct campus hires"
          icon={CheckCircle2}
          badge="Placed"
          badgeColor="cyan"
        />
      </div>

      {/* Main Grid: Job Listings & Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Management Table (2 cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Your Campus Postings ({jobs.length})</h3>
              <p className="text-xs text-slate-400">Add, edit details, delete postings, or rank candidates</p>
            </div>
            <Link to="/recruiter/jobs/create" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Post Job
            </Link>
          </div>

          <div className="space-y-3.5">
            {jobs.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No postings created yet.</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{job.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {job.jobType || 'Full-Time'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {job.location} • <span className="text-emerald-400 font-semibold">{job.salaryRange}</span> • Min CGPA: {job.minCgpa || 'N/A'}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.requiredSkills?.map((s, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-indigo-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/recruiter/jobs/${job.id}/ranking`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center gap-1 transition-colors"
                      title="View DSA Ranked Candidates"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Rank
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEditingJob(job)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                      title="Edit Job Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs flex items-center gap-1 transition-colors"
                      title="Delete Job"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Funnel Bar Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Recruitment Funnel</h3>
            <p className="text-xs text-slate-400 mb-6">Candidate volume across pipeline stages</p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={11} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="candidates" fill="#6366f1" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Deterministic Max-Heap Active</span>
            <span className="text-emerald-400 font-semibold">100% Audit Ready</span>
          </div>
        </div>
      </div>

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Job Posting</h3>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJobEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editingJob.title || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={editingJob.salaryRange || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryRange: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={editingJob.minCgpa || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, minCgpa: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Job Type</label>
                  <select
                    value={editingJob.jobType || 'Full-Time'}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={editingJob.description || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingJob ? 'Saving...' : 'Save Job Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
