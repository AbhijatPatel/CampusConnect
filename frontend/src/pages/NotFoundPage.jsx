import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-white">404</h1>
      <h2 className="text-xl font-bold text-slate-300 mt-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">
        The campus placement resource or endpoint you requested cannot be located.
      </p>
      <Link
        to="/"
        className="mt-6 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md inline-flex items-center gap-1.5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to CampusConnect
      </Link>
    </div>
  );
}
