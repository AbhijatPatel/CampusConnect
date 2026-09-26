import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo', trend }) {
  const colorMap = {
    indigo: 'from-indigo-600/20 to-indigo-900/10 text-indigo-400 border-indigo-500/20',
    purple: 'from-purple-600/20 to-purple-900/10 text-purple-400 border-purple-500/20',
    emerald: 'from-emerald-600/20 to-emerald-900/10 text-emerald-400 border-emerald-500/20',
    amber: 'from-amber-600/20 to-amber-900/10 text-amber-400 border-amber-500/20',
    rose: 'from-rose-600/20 to-rose-900/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 relative overflow-hidden group hover:border-slate-700/80 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1.5 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center text-xs">
          <span className="text-emerald-400 font-semibold">{trend}</span>
          <span className="text-slate-500 ml-1.5">vs last placement cycle</span>
        </div>
      )}
    </div>
  );
}
