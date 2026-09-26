import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-icon.png"
                alt="CampusConnect Logo"
                className="w-7 h-7 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                Campus<span className="text-indigo-400 font-semibold">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise campus recruitment platform connecting top university engineering talent with progressive employers using explainable, auditable candidate ranking.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">For Students</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Explore Open Jobs</Link></li>
              <li><Link to="/student/resume" className="hover:text-indigo-400 transition-colors">AI Resume Analyzer</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-indigo-400 transition-colors">Placement Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">For Recruiters</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/recruiter/dashboard" className="hover:text-indigo-400 transition-colors">Recruiter Portal</Link></li>
              <li><Link to="/recruiter/jobs/create" className="hover:text-indigo-400 transition-colors">Post Openings</Link></li>
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">DSA Ranking Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">System Architecture</h4>
            <p className="text-xs text-slate-400 mb-2">Powered by Spring Boot, React, FastAPI, scikit-learn, and local Ollama Qwen.</p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-mono">
                API: v1.0 ONLINE
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusConnect Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with precision for Next-Gen University Placements</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
