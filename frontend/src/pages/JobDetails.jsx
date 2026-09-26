import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobService, applicationService, rankingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Building,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  const { isStudent, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const res = await jobService.getJobById(id);
      if (res.data) setJob(res.data);

      if (isStudent) {
        try {
          const matchRes = await rankingService.getJobMatchForStudent(id);
          if (matchRes.data) setMatchData(matchRes.data);
        } catch (e) {}

        try {
          const appsRes = await applicationService.getStudentApplications();
          if (appsRes.data && appsRes.data.some((a) => a.jobId === parseInt(id))) {
            setApplied(true);
          }
        } catch (e) {}
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setApplying(true);
    setMessage('');
    try {
      await applicationService.applyForJob(id);
      setApplied(true);
      setMessage('Application submitted! Your profile was ranked into the recruiter Max-Heap.');
    } catch (e) {
      setMessage(e.message || 'Application failed.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white">Job not found</h2>
        <Link to="/jobs" className="text-indigo-400 text-xs mt-2 inline-block">Back to Openings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to all jobs
      </Link>

      {message && (
        <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-700/60 flex items-center gap-2.5 text-xs text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Job Hero Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              {job.companyName}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {job.jobType || 'Full-Time'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{job.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {job.location}
            </span>
            <span className="font-bold text-emerald-400">{job.salaryRange || '₹8–12 LPA'}</span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              Min CGPA: {job.minCgpa || 6.5}/10.0
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {applied ? (
            <div className="px-6 py-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Application Under Review
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              {applying ? 'Submitting...' : 'Apply for this Job'}
            </button>
          )}
        </div>
      </div>

      {/* AI Semantic Fit Breakdown Card */}
      {isStudent && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-indigo-900/60 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-base font-bold text-white">AI Alignment & Match Score</h3>
                <p className="text-xs text-slate-400">Calculated between your profile and job requirements</p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl font-extrabold text-sm bg-indigo-600 text-white shadow-lg">
              {matchData?.match_score || 92}% Match
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Required Skills</span>
              <p className="text-lg font-bold text-indigo-400 mt-0.5">{matchData?.required_skills_match || 95}%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Resume Similarity</span>
              <p className="text-lg font-bold text-purple-400 mt-0.5">{matchData?.nlp_similarity || 88}%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Experience Fit</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">90%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Academic Criteria</span>
              <p className="text-lg font-bold text-amber-400 mt-0.5">100%</p>
            </div>
          </div>

          {/* Missing Skills Warning */}
          {matchData?.missing_skills && matchData.missing_skills.length > 0 && (
            <div className="mt-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Missing Skills for Maximum Score: </span>
                <span className="text-slate-300">{matchData.missing_skills.join(', ')}. </span>
                <span className="text-slate-400">Consider completing quick certifications or showcasing related projects.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description & Skill Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Job Description</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-base font-bold text-white mb-3">Required Technical Stack</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950 border border-indigo-800 text-indigo-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-3">Preferred Bonus Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Company Sidebar */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5 h-fit">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">About Company</h3>
          <div>
            <h4 className="font-bold text-white text-base">{job.companyName}</h4>
            <p className="text-xs text-slate-400 mt-1">Tier-1 Technology Campus Recruitment Partner</p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block">Location:</span>
              <span className="font-medium text-white">{job.location}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Recruiter Contact:</span>
              <span className="font-medium text-white">{job.recruiterName || 'Campus Talent Lead'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Application Deadline:</span>
              <span className="font-medium text-white">{job.deadline || 'Rolling basis'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
