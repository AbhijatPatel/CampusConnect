import React from 'react';
import { X, Award, CheckCircle, AlertTriangle, BookOpen, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export default function CandidateRankingModal({ candidate, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl border border-slate-700/80 max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              #{candidate.rank}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {candidate.candidateName}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {candidate.overallScore}% Overall Score
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{candidate.email} • {candidate.branch}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainability Banner */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            DSA Ranking Engine: Why Ranked Highly
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {candidate.rankingExplanation || 'Strong weighted evaluation across core skill sets, academic threshold, and hands-on repository projects.'}
          </p>
        </div>

        {/* Score Decomposition Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Skill Match (40%)</span>
            <p className="text-lg font-bold text-indigo-400 mt-0.5">{candidate.skillMatchScore}%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">NLP Similarity (20%)</span>
            <p className="text-lg font-bold text-purple-400 mt-0.5">{candidate.nlpMatchScore}%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Experience (15%)</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">{candidate.experienceYears} Yrs</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">CGPA (10%)</span>
            <p className="text-lg font-bold text-amber-400 mt-0.5">{candidate.cgpa} / 10.0</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Projects (10%)</span>
            <p className="text-lg font-bold text-cyan-400 mt-0.5">{candidate.projectCount} Projects</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Current Stage</span>
            <p className="text-xs font-bold text-white mt-1 px-2 py-0.5 rounded bg-slate-800 inline-block">
              {candidate.applicationStatus || 'APPLIED'}
            </p>
          </div>
        </div>

        {/* Skills Matched vs Missing */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              Matching Skills ({candidate.matchingSkills?.length || 0})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {candidate.matchingSkills?.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 text-xs rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              Missing Requirements ({candidate.missingSkills?.length || 0})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {candidate.missingSkills?.length > 0 ? (
                candidate.missingSkills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs rounded bg-amber-950/60 border border-amber-800/40 text-amber-300">
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">None! All required skills matched.</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">Change Hiring Stage:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateStatus(candidate.applicationId, 'SHORTLISTED')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              Shortlist
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.applicationId, 'INTERVIEW')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
            >
              Interview
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.applicationId, 'SELECTED')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              Select
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.applicationId, 'REJECTED')}
              className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-950/60 border border-rose-800/60 rounded-lg transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
