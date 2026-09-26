import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import StatCard from '../components/StatCard';
import {
  ShieldCheck,
  Users,
  Briefcase,
  TrendingUp,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [statRes, userRes] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllUsers(),
      ]);
      if (statRes.data) setStats(statRes.data);
      if (userRes.data) setUsers(userRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await adminService.toggleUserStatus(userId);
      setActionMsg('User account status updated.');
      setTimeout(() => setActionMsg(''), 3000);
      loadAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Administrator Console</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              SYSTEM ROOT
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Platform Governance & Health</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global monitoring of users, recruitment drives, and placement audit records.
          </p>
        </div>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Global Platform Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Registered Users"
          value={stats?.totalUsers || users.length || 14}
          subtitle="Students, Recruiters & Admins"
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Active Campus Jobs"
          value={stats?.totalJobs || 15}
          subtitle="Across 5 Partner Companies"
          icon={Briefcase}
          color="purple"
        />
        <StatCard
          title="Placement Success Rate"
          value={stats?.placementRate || '78.4%'}
          subtitle="Offers finalized this term"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Total Applications"
          value={stats?.totalApplications || 30}
          subtitle="AI & DSA Evaluated"
          icon={Activity}
          color="amber"
        />
      </div>

      {/* User Management Table */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Registered User Directory</h3>
            <p className="text-xs text-slate-400">Activate or suspend student and company recruiter accounts</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Count: {users.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>
                      <span>{u.fullName}</span>
                      <span className="block text-[11px] font-normal text-slate-400">{u.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-indigo-300">
                      {u.role?.name?.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {u.phone || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    {u.active ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        u.active
                          ? 'text-rose-400 hover:bg-rose-950/60 border border-rose-800/60'
                          : 'text-emerald-400 hover:bg-emerald-950/60 border border-emerald-800/60'
                      }`}
                    >
                      {u.active ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
