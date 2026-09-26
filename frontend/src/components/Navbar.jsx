import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationService } from '../services/api';
import {
  Sparkles,
  Briefcase,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  FileText,
  Sliders,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isStudent, isRecruiter, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    }
  }, [isAuthenticated]);

  const loadNotifications = async () => {
    try {
      const res = await notificationService.getNotifications();
      if (res.data) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n) => !n.read).length);
      }
    } catch (e) {
      // ignore silently
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications();
    } catch (e) {}
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center">
              <img
                src="/logo-icon.png"
                alt="CampusConnect Logo"
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Campus<span className="text-indigo-400 font-semibold">Connect</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 rounded">
                CAMPUS PORTAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/jobs"
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4 text-slate-400" />
              Explore Jobs
            </Link>

            {isStudent && (
              <>
                <Link
                  to="/student/dashboard"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/student/resume"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  AI Resume Analyzer
                </Link>
                <Link
                  to="/student/applications"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  My Applications
                </Link>
                <Link
                  to="/student/profile"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Profile
                </Link>
              </>
            )}

            {isRecruiter && (
              <>
                <Link
                  to="/recruiter/dashboard"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Recruiter Console
                </Link>
                <Link
                  to="/recruiter/jobs/create"
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  + Post Job
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Admin Portal
              </Link>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse ring-2 ring-slate-950" />
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-2xl border border-slate-800 p-3 z-50 animate-slide-up">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Notifications ({unreadCount})
                        </span>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-4">No notifications yet</p>
                        ) : (
                          notifications.slice(0, 5).map((n) => (
                            <div
                              key={n.id}
                              onClick={() => handleMarkRead(n.id)}
                              className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                                n.read ? 'bg-slate-900/40 text-slate-400' : 'bg-indigo-950/40 border border-indigo-800/40 text-slate-200'
                              }`}
                            >
                              <p className="font-semibold text-white">{n.title}</p>
                              <p className="text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Pill */}
                <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-white">{user?.fullName}</span>
                    <span className="text-[10px] text-indigo-400 font-medium tracking-wide uppercase">
                      {user?.role?.replace('ROLE_', '')}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
          >
            Explore Jobs
          </Link>
          {isStudent && (
            <>
              <Link
                to="/student/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                to="/student/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                AI Resume Analyzer
              </Link>
              <Link
                to="/student/applications"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                Applications
              </Link>
              <Link
                to="/student/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                Profile
              </Link>
            </>
          )}
          {isRecruiter && (
            <>
              <Link
                to="/recruiter/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                Recruiter Dashboard
              </Link>
              <Link
                to="/recruiter/jobs/create"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
              >
                Post Job
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-md"
            >
              Admin Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-rose-400 hover:bg-slate-800 rounded-md"
            >
              Sign Out ({user?.fullName})
            </button>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 text-slate-300 bg-slate-900 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 text-white bg-indigo-600 rounded-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
