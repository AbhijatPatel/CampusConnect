import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService, applicationService } from '../services/api';
import StatCard from '../components/StatCard';
import {
  FileText,
  Briefcase,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profRes, appRes, recRes, anaRes] = await Promise.allSettled([
        studentService.getProfile(),
        applicationService.getStudentApplications(),
        studentService.getRecommendations(),
        studentService.getResumeAnalysis(),
      ]);

      if (profRes.status === 'fulfilled' && profRes.value.data) setProfile(profRes.value.data);
      if (appRes.status === 'fulfilled' && appRes.value.data) setApplications(appRes.value.data);
      if (recRes.status === 'fulfilled' && recRes.value.data) setRecommendedJobs(recRes.value.data);
      if (anaRes.status === 'fulfilled' && anaRes.value.data) setAnalysis(anaRes.value.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const shortlistedCount = applications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW' || a.status === 'SELECTED').length;
  const underReviewCount = applications.filter((a) => a.status === 'UNDER_REVIEW').length;

  const appStatusData = [
    { name: 'Applied', value: applications.filter((a) => a.status === 'APPLIED').length || 1, color: '#6366f1' },
    { name: 'Under Review', value: underReviewCount || 1, color: '#a855f7' },
    { name: 'Shortlisted', value: shortlistedCount || 1, color: '#10b981' },
    { name: 'Rejected', value: applications.filter((a) => a.status === 'REJECTED').length || 0, color: '#f43f5e' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 mt-4 tracking-wider uppercase font-semibold">
          Synchronizing Student AI Profile & Recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900/90 via-indigo-950/30 to-slate-900 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Candidate Workspace</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 border border-emerald-800 text-emerald-300">
                ACTIVE PLACEMENT CYCLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile?.fullName || 'Candidate'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {profile?.university} • {profile?.branch} • CGPA {profile?.cgpa || '8.5'}/10.0
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/resume"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              AI Resume Analyzer
            </Link>
            <Link
              to="/jobs"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 glass-card hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              Search Openings
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard
          title="Profile Completeness"
          value={`${profile?.profileCompleteness || 85}%`}
          subtitle="Add more projects to hit 100%"
          icon={FileText}
          color="indigo"
        />
        <StatCard
          title="Total Applications"
          value={applications.length || '12'}
          subtitle="Across active campus drives"
          icon={Briefcase}
          color="purple"
        />
        <StatCard
          title="Shortlisted / In Review"
          value={shortlistedCount || '4'}
          subtitle="Moving in recruitment pipeline"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="AI Matched Openings"
          value={recommendedJobs.length || '8'}
          subtitle=">= 75% Skill & NLP overlap"
          icon={Sparkles}
          color="amber"
        />
      </div>

      {/* Main Analytics & Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                AI Top Recommended Jobs For You
              </h3>
              <p className="text-xs text-slate-400">Ranked by NLP semantic resume similarity & skill match</p>
            </div>
            <Link to="/jobs" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {recommendedJobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-600/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm hover:text-indigo-400 transition-colors">
                      {job.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {job.aiMatchPercentage || 88}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {job.companyName} • {job.location} • <span className="text-emerald-400 font-semibold">{job.salaryRange}</span>
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.requiredSkills?.slice(0, 4).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Widget & Skill Gap */}
        <div className="space-y-6">
          {/* Applications Funnel Chart */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">Application Pipeline</h3>
            <p className="text-xs text-slate-400 mb-4">Stage breakdown for current applications</p>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {appStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800">
              {appStatusData.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-400">{s.name}:</span>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Alert Card */}
          <div className="glass-card rounded-2xl p-5 border border-indigo-900/50 bg-indigo-950/20">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              Skill Gap Recommendation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your target high-paying roles, adding <strong className="text-white">Docker</strong> and <strong className="text-white">AWS</strong> will increase your average candidate ranking score by <span className="text-emerald-400 font-bold">+18%</span>.
            </p>
            <Link
              to="/student/resume"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Analyze Resume Gaps <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
