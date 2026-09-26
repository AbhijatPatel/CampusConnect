import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationService } from '../services/api';
import {
  Briefcase,
  Building,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function ApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getStudentApplications();
      if (res.data) setApplications(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const stages = ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED'];

  const getStageIndex = (status) => {
    if (status === 'REJECTED') return -1;
    return stages.indexOf(status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Career Progression</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Application Pipeline Tracker</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time status updates across all company recruitment drives.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No active applications yet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">Start applying to recommended jobs to populate your pipeline</p>
          <Link
            to="/jobs"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md inline-flex items-center gap-1.5"
          >
            Explore Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const currentStageIdx = getStageIndex(app.status);
            const isRejected = app.status === 'REJECTED';

            return (
              <div
                key={app.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {app.companyName}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{app.jobTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{app.location} • Applied on {app.appliedAt ? app.appliedAt.substring(0, 10) : 'Recent'}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Score: {app.overallScore || 88}%
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isRejected
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : app.status === 'SELECTED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Interactive Stepper Timeline */}
                <div>
                  <div className="grid grid-cols-5 gap-2 relative">
                    {stages.map((stage, idx) => {
                      const isCompleted = !isRejected && idx <= currentStageIdx;
                      const isCurrent = !isRejected && idx === currentStageIdx;

                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/30'
                                : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : isRejected && idx === 0
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] font-semibold uppercase mt-2 ${
                              isCurrent
                                ? 'text-indigo-400 font-bold'
                                : isCompleted
                                ? 'text-slate-300'
                                : 'text-slate-500'
                            }`}
                          >
                            {stage.replace('_', ' ')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation Snippet */}
                {app.rankingExplanation && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-mono">
                    <span className="text-indigo-400 font-bold">DSA Evaluation: </span>
                    {app.rankingExplanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
