import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch unauthorized responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const studentService = {
  getProfile: () => api.get('/student/me'),
  updateProfile: (data) => api.put('/student/me', data),
  addSkill: (skill) => api.post('/student/skills', skill),
  updateSkill: (id, skill) => api.put(`/student/skills/${id}`, skill),
  deleteSkill: (id) => api.delete(`/student/skills/${id}`),
  addProject: (project) => api.post('/student/projects', project),
  updateProject: (id, project) => api.put(`/student/projects/${id}`, project),
  deleteProject: (id) => api.delete(`/student/projects/${id}`),
  addExperience: (exp) => api.post('/student/experiences', exp),
  updateExperience: (id, exp) => api.put(`/student/experiences/${id}`, exp),
  deleteExperience: (id) => api.delete(`/student/experiences/${id}`),
  uploadResume: (formData) => api.post('/student/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getRecommendations: () => api.get('/student/recommendations'),
  getResumeAnalysis: () => api.get('/student/resume-analysis'),
};

export const jobService = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/recruiter/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/recruiter/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/recruiter/jobs/${id}`),
  getRecruiterJobs: () => api.get('/recruiter/jobs'),
};

export const applicationService = {
  applyForJob: (jobId) => api.post(`/jobs/${jobId}/apply`),
  getStudentApplications: () => api.get('/student/applications'),
  getJobApplications: (jobId) => api.get(`/recruiter/jobs/${jobId}/applications`),
  updateStatus: (appId, status) => api.put(`/recruiter/applications/${appId}/status`, { status }),
};

export const rankingService = {
  getRankedCandidates: (jobId, weights = {}) => api.get(`/recruiter/jobs/${jobId}/ranked-candidates`, { params: weights }),
  analyzeMatch: (payload) => api.post('/matching/analyze', payload),
  getJobMatchForStudent: (jobId) => api.get(`/matching/jobs/${jobId}`),
};

export const recruiterService = {
  getProfile: () => api.get('/recruiter/profile'),
  getAnalytics: () => api.get('/recruiter/analytics'),
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: () => api.get('/admin/users'),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/status`),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`),
};

export const notificationService = {
  getNotifications: () => api.get('/notifications'),
  getUnreadNotifications: () => api.get('/notifications/unread'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

export default api;
