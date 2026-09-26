import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rankingService, jobService, applicationService } from '../services/api';
import CandidateRankingModal from '../components/CandidateRankingModal';
import {
  Sparkles,
  ArrowLeft,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Eye,
  Check,
  X,
  FileText,
  Filter,
} from 'lucide-react';

export default function CandidateRankingPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Customizable algorithm weights
  const [showWeightControls, setShowWeightControls] = useState(false);
  const [skillWeight, setSkillWeight] = useState(0.40);
  const [nlpWeight, setNlpWeight] = useState(0.20);
  const [expWeight, setExpWeight] = useState(0.15);
  const [cgpaWeight, setCgpaWeight] = useState(0.10);
  const [projWeight, setProjWeight] = useState(0.10);

  useEffect(() => {
    loadJobAndRankings();
  }, [id, skillWeight, nlpWeight, expWeight, cgpaWeight, projWeight]);

  const loadJobAndRankings = async () => {
    try {
      setLoading(true);
      const [jobRes, rankRes] = await Promise.all([
        jobService.getJobById(id),
        rankingService.getRankedCandidates(id, {
          skillMatchWeight: skillWeight,
          nlpSimilarityWeight: nlpWeight,
          experienceWeight: expWeight,
          cgpaWeight: cgpaWeight,
          projectsWeight: projWeight,
          eligibilityWeight: 0.05,
        }),
      ]);

      if (jobRes.data) setJob(jobRes.data);
      if (rankRes.data) setCandidates(rankRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    if (!appId) return;
    try {
      await applicationService.updateStatus(appId, newStatus);
      setMessage(`Candidate moved to stage: ${newStatus}`);
      setTimeout(() => setMessage(''), 4000);
      loadJobAndRankings();
      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <Link
        to="/recruiter/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recruiter Console
      </Link>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              DSA Max-Heap PriorityQueue
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
              O(N log K) RANKING ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {job?.title || 'Job Opening'} — Candidate Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {candidates.length} candidates evaluated and ordered strictly by multi-factor weighted priority.
          </p>
        </div>

        <button
          onClick={() => setShowWeightControls(!showWeightControls)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white glass-card hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Sliders className="w-4 h-4 text-indigo-400" />
          {showWeightControls ? 'Hide Weight Controls' : 'Configure Ranking Weights'}
        </button>
      </div>

      {/* Interactive Weight Tuning Controls */}
      {showWeightControls && (
        <div className="glass-card rounded-2xl p-6 border border-indigo-800/50 bg-indigo-950/20 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Custom Algorithm Weight Adjustments</h3>
              <p className="text-xs text-slate-400">Rebalance evaluation weights in real-time</p>
            </div>
            <button
              onClick={() => {
                setSkillWeight(0.40);
                setNlpWeight(0.20);
                setExpWeight(0.15);
                setCgpaWeight(0.10);
                setProjWeight(0.10);
              }}
              className="text-xs text-indigo-400 hover:underline"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div>
              <span className="text-slate-300 block mb-1">Skill Match: {(skillWeight * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={skillWeight}
                onChange={(e) => setSkillWeight(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div>
              <span className="text-slate-300 block mb-1">NLP Similarity: {(nlpWeight * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={nlpWeight}
                onChange={(e) => setNlpWeight(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <span className="text-slate-300 block mb-1">Experience: {(expWeight * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={expWeight}
                onChange={(e) => setExpWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            <div>
              <span className="text-slate-300 block mb-1">CGPA: {(cgpaWeight * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={cgpaWeight}
                onChange={(e) => setCgpaWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <span className="text-slate-300 block mb-1">Projects: {(projWeight * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={projWeight}
                onChange={(e) => setProjWeight(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No applicants registered for this opening</h3>
            <p className="text-xs text-slate-400 mt-1">Applications received will automatically rank here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 text-center">Rank</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Composite Score</th>
                  <th className="py-3.5 px-4">Skill Match</th>
                  <th className="py-3.5 px-4">NLP Match</th>
                  <th className="py-3.5 px-4">CGPA</th>
                  <th className="py-3.5 px-4">Experience</th>
                  <th className="py-3.5 px-4">Projects</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {candidates.map((cand) => (
                  <tr
                    key={cand.studentId}
                    className="hover:bg-slate-900/40 transition-colors group"
                  >
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs ${
                          cand.rank === 1
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/30'
                            : cand.rank === 2
                            ? 'bg-slate-200 text-slate-950'
                            : cand.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        #{cand.rank}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-white">
                      <div>
                        <span>{cand.candidateName}</span>
                        <span className="block text-[11px] font-normal text-slate-400">
                          {cand.branch} • {cand.email}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full font-bold text-xs bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {cand.overallScore}%
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-emerald-400">
                      {cand.skillMatchScore}%
                    </td>

                    <td className="py-4 px-4 font-semibold text-purple-400">
                      {cand.nlpMatchScore}%
                    </td>

                    <td className="py-4 px-4 text-slate-200">
                      {cand.cgpa}/10.0
                    </td>

                    <td className="py-4 px-4 text-slate-200">
                      {cand.experienceYears} yrs
                    </td>

                    <td className="py-4 px-4 text-slate-200">
                      {cand.projectCount}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                        {cand.applicationStatus || 'APPLIED'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedCandidate(cand);
                            setModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-300 hover:text-white hover:bg-indigo-600/30 border border-indigo-800/40 flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Explain
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(cand.applicationId, 'SHORTLISTED')}
                          title="Quick Shortlist"
                          className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-950 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Flagship Candidate Explanation Modal */}
      <CandidateRankingModal
        candidate={selectedCandidate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
