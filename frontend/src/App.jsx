import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ApplicationTracker from './pages/ApplicationTracker';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CreateJobPage from './pages/CreateJobPage';
import CandidateRankingPage from './pages/CandidateRankingPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Student Protected Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/resume"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
              <ApplicationTracker />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Protected Routes */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ROLE_RECRUITER', 'ROLE_ADMIN']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/create"
          element={
            <ProtectedRoute allowedRoles={['ROLE_RECRUITER', 'ROLE_ADMIN']}>
              <CreateJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/:id/ranking"
          element={
            <ProtectedRoute allowedRoles={['ROLE_RECRUITER', 'ROLE_ADMIN']}>
              <CandidateRankingPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
