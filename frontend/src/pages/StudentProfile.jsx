import React, { useState, useEffect } from 'react';
import { studentService } from '../services/api';
import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Plus,
  Save,
  CheckCircle2,
  Trash2,
  Edit2,
  ExternalLink,
  Github,
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  AlertCircle,
} from 'lucide-react';

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Personal/Academic form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [passoutYear, setPassoutYear] = useState(2026);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  // Skill Add / Edit state
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editSkillName, setEditSkillName] = useState('');
  const [editSkillLevel, setEditSkillLevel] = useState('Intermediate');

  // Project Add / Edit state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [projectGit, setProjectGit] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectTitle, setEditProjectTitle] = useState('');
  const [editProjectDesc, setEditProjectDesc] = useState('');
  const [editProjectTech, setEditProjectTech] = useState('');
  const [editProjectGit, setEditProjectGit] = useState('');

  // Experience Add / Edit state
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expDuration, setExpDuration] = useState(3);
  const [editingExpId, setEditingExpId] = useState(null);
  const [editExpCompany, setEditExpCompany] = useState('');
  const [editExpRole, setEditExpRole] = useState('');
  const [editExpStartDate, setEditExpStartDate] = useState('');
  const [editExpEndDate, setEditExpEndDate] = useState('');
  const [editExpDesc, setEditExpDesc] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await studentService.getProfile();
      if (res.data) {
        populateForm(res.data);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data) => {
    setProfile(data);
    setFullName(data.fullName || '');
    setPhone(data.phone || '');
    setCgpa(data.cgpa !== null && data.cgpa !== undefined ? data.cgpa : '');
    setUniversity(data.university || '');
    setBranch(data.branch || '');
    setPassoutYear(data.passoutYear || 2026);
    setLocation(data.location || '');
    setBio(data.bio || '');
  };

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // 1. UPDATE BASIC DETAILS
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const payload = {
        ...profile,
        fullName: fullName.trim(),
        phone: phone.trim(),
        cgpa: cgpa ? parseFloat(cgpa) : null,
        university: university.trim(),
        branch: branch.trim(),
        passoutYear: passoutYear ? parseInt(passoutYear) : null,
        location: location.trim(),
        bio: bio.trim(),
      };
      const res = await studentService.updateProfile(payload);
      if (res.data) {
        populateForm(res.data);
      }
      showNotification('Profile and academic details updated successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error updating profile details', true);
    } finally {
      setSaving(false);
    }
  };

  // 2. SKILL CRUD: ADD
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    try {
      const res = await studentService.addSkill({
        skillName: newSkill.trim(),
        proficiencyLevel: newSkillLevel,
        yearsOfExperience: 1.0,
      });
      if (res.data) populateForm(res.data);
      setNewSkill('');
      showNotification('Skill added successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error adding skill', true);
    }
  };

  // 2. SKILL CRUD: UPDATE
  const handleUpdateSkill = async (skillId) => {
    if (!editSkillName.trim()) return;
    try {
      const res = await studentService.updateSkill(skillId, {
        skillName: editSkillName.trim(),
        proficiencyLevel: editSkillLevel,
        yearsOfExperience: 1.0,
      });
      if (res.data) populateForm(res.data);
      setEditingSkillId(null);
      showNotification('Skill updated successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error updating skill', true);
    }
  };

  // 2. SKILL CRUD: DELETE
  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm('Are you sure you want to remove this skill?')) return;
    try {
      const res = await studentService.deleteSkill(skillId);
      if (res.data) populateForm(res.data);
      showNotification('Skill deleted successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error deleting skill', true);
    }
  };

  // 3. PROJECT CRUD: ADD
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;
    try {
      let formattedGit = projectGit.trim();
      if (formattedGit && !formattedGit.startsWith('http://') && !formattedGit.startsWith('https://')) {
        formattedGit = 'https://' + formattedGit;
      }
      const res = await studentService.addProject({
        title: projectTitle.trim(),
        description: projectDesc.trim(),
        techStack: projectTech.trim(),
        githubUrl: formattedGit,
      });
      if (res.data) populateForm(res.data);
      setProjectTitle('');
      setProjectDesc('');
      setProjectTech('');
      setProjectGit('');
      showNotification('Project added successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error adding project', true);
    }
  };

  // 3. PROJECT CRUD: UPDATE
  const handleUpdateProject = async (projectId) => {
    if (!editProjectTitle.trim()) return;
    try {
      let formattedGit = editProjectGit.trim();
      if (formattedGit && !formattedGit.startsWith('http://') && !formattedGit.startsWith('https://')) {
        formattedGit = 'https://' + formattedGit;
      }
      const res = await studentService.updateProject(projectId, {
        title: editProjectTitle.trim(),
        description: editProjectDesc.trim(),
        techStack: editProjectTech.trim(),
        githubUrl: formattedGit,
      });
      if (res.data) populateForm(res.data);
      setEditingProjectId(null);
      showNotification('Project updated successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error updating project', true);
    }
  };

  // 3. PROJECT CRUD: DELETE
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await studentService.deleteProject(projectId);
      if (res.data) populateForm(res.data);
      showNotification('Project deleted successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error deleting project', true);
    }
  };

  // 4. EXPERIENCE CRUD: ADD
  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!expCompany.trim() || !expRole.trim()) return;
    try {
      const res = await studentService.addExperience({
        companyName: expCompany.trim(),
        roleTitle: expRole.trim(),
        startDate: expStartDate.trim(),
        endDate: expEndDate.trim() || 'Present',
        description: expDesc.trim(),
        durationMonths: parseFloat(expDuration) || 3.0,
        isInternship: true,
      });
      if (res.data) populateForm(res.data);
      setExpCompany('');
      setExpRole('');
      setExpStartDate('');
      setExpEndDate('');
      setExpDesc('');
      showNotification('Work experience / internship added successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error adding experience', true);
    }
  };

  // 4. EXPERIENCE CRUD: UPDATE
  const handleUpdateExperience = async (expId) => {
    if (!editExpCompany.trim() || !editExpRole.trim()) return;
    try {
      const res = await studentService.updateExperience(expId, {
        companyName: editExpCompany.trim(),
        roleTitle: editExpRole.trim(),
        startDate: editExpStartDate.trim(),
        endDate: editExpEndDate.trim() || 'Present',
        description: editExpDesc.trim(),
        isInternship: true,
      });
      if (res.data) populateForm(res.data);
      setEditingExpId(null);
      showNotification('Experience updated successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error updating experience', true);
    }
  };

  // 4. EXPERIENCE CRUD: DELETE
  const handleDeleteExperience = async (expId) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      const res = await studentService.deleteExperience(expId);
      if (res.data) populateForm(res.data);
      showNotification('Experience deleted successfully!');
    } catch (e) {
      console.error(e);
      showNotification(e.message || 'Error deleting experience', true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 mt-4">Loading candidate portfolio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Candidate Portfolio</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Profile & Placement Credentials</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add, edit, or remove your academic credentials, technical skills, projects, and work experience.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Profile Completeness: </span>
            <span className="font-bold text-emerald-400">{profile?.profileCompleteness || 85}%</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. BASIC & ACADEMIC DETAILS FORM (EDIT & UPDATE) */}
      <form onSubmit={handleProfileUpdate} className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            Basic & Academic Information
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Click Save below after editing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Abhijat Patel"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address (Login ID)
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              title="Email address is linked to your login and cannot be altered directly."
              className="w-full px-3.5 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              CGPA / 10.0 *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              required
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g. 8.85"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              University / College *
            </label>
            <input
              type="text"
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. Indian Institute of Technology"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Branch / Department *
            </label>
            <input
              type="text"
              required
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="e.g. B.Tech Computer Science"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Passout Year *
            </label>
            <input
              type="number"
              min="2020"
              max="2030"
              value={passoutYear}
              onChange={(e) => setPassoutYear(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Location / City
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Noida, Delhi NCR"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Professional Bio & Placement Objective
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Summarize your engineering background, key technical strengths, and placement aspirations..."
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Changes...' : 'Save Academic Details'}
          </button>
        </div>
      </form>

      {/* 2. TECHNICAL SKILLS (ADD, EDIT, DELETE) */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              Technical Skills & Proficiencies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add new skills, update proficiency levels, or delete outdated skills.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {profile?.skills?.length || 0} Skills Added
          </span>
        </div>

        {/* Existing Skills Badges with Edit & Delete Actions */}
        <div className="flex flex-wrap gap-2.5">
          {(!profile?.skills || profile.skills.length === 0) ? (
            <p className="text-xs text-slate-500 py-2">No technical skills added yet. Add your first skill below.</p>
          ) : (
            profile.skills.map((sk) => {
              const isEditing = editingSkillId === sk.id;
              if (isEditing) {
                return (
                  <div
                    key={sk.id}
                    className="p-2.5 rounded-xl bg-slate-900 border border-indigo-500 flex flex-wrap items-center gap-2"
                  >
                    <input
                      type="text"
                      value={editSkillName}
                      onChange={(e) => setEditSkillName(e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                    />
                    <select
                      value={editSkillLevel}
                      onChange={(e) => setEditSkillLevel(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleUpdateSkill(sk.id)}
                      className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 px-2"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSkillId(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={sk.id}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-700/80 text-indigo-300 flex items-center gap-2 group hover:border-indigo-500/50 transition-colors"
                >
                  <span className="font-semibold text-white">{sk.skillName}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {sk.proficiencyLevel}
                  </span>
                  <div className="flex items-center gap-1 ml-1 border-l border-slate-800 pl-1.5">
                    <button
                      type="button"
                      title="Edit Skill"
                      onClick={() => {
                        setEditingSkillId(sk.id);
                        setEditSkillName(sk.skillName);
                        setEditSkillLevel(sk.proficiencyLevel || 'Intermediate');
                      }}
                      className="text-slate-400 hover:text-indigo-400 transition-colors p-0.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Delete Skill"
                      onClick={() => handleDeleteSkill(sk.id)}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Add new skill (e.g. Docker, Spring Boot, React, Kafka)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </form>
      </div>

      {/* 3. ENGINEERING PROJECTS (ADD, EDIT, DELETE) */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Technical Projects & Portfolios
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlight your GitHub repositories, full-stack apps, and live project demos.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {profile?.projects?.length || 0} Projects Listed
          </span>
        </div>

        {/* Existing Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(!profile?.projects || profile.projects.length === 0) ? (
            <p className="text-xs text-slate-500 py-3 col-span-2">No projects added yet. Showcase your work below.</p>
          ) : (
            profile.projects.map((proj) => {
              const isEditing = editingProjectId === proj.id;
              if (isEditing) {
                return (
                  <div key={proj.id} className="p-5 rounded-xl bg-slate-900 border border-indigo-500 space-y-3 col-span-1 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Edit Project</span>
                      <button onClick={() => setEditingProjectId(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editProjectTitle}
                        onChange={(e) => setEditProjectTitle(e.target.value)}
                        placeholder="Project Title"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={editProjectTech}
                        onChange={(e) => setEditProjectTech(e.target.value)}
                        placeholder="Tech Stack (comma separated)"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editProjectDesc}
                      onChange={(e) => setEditProjectDesc(e.target.value)}
                      placeholder="Project Description"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <input
                        type="text"
                        value={editProjectGit}
                        onChange={(e) => setEditProjectGit(e.target.value)}
                        placeholder="GitHub URL (e.g. https://github.com/...)"
                        className="w-full sm:w-1/2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateProject(proj.id)}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(null)}
                          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={proj.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          title="Edit Project"
                          onClick={() => {
                            setEditingProjectId(proj.id);
                            setEditProjectTitle(proj.title || '');
                            setEditProjectDesc(proj.description || '');
                            setEditProjectTech(proj.techStack || '');
                            setEditProjectGit(proj.githubUrl || '');
                          }}
                          className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Delete Project"
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.techStack?.split(',').map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-300">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.githubUrl && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:underline"
                      >
                        <Github className="w-3.5 h-3.5" /> View Repository
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Add Project Form */}
        <form onSubmit={handleAddProject} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3.5">
          <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-indigo-400" /> Add New Project
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Project Title (e.g. Distributed Task Queue)"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g. Java, Redis, Docker, Spring Boot)"
              value={projectTech}
              onChange={(e) => setProjectTech(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Project Description & Features"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <input
              type="text"
              placeholder="GitHub URL (e.g. https://github.com/...)"
              value={projectGit}
              onChange={(e) => setProjectGit(e.target.value)}
              className="w-full sm:w-1/2 px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Save Project
            </button>
          </div>
        </form>
      </div>

      {/* 4. WORK EXPERIENCES / INTERNSHIPS (ADD, EDIT, DELETE) */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Work Experiences & Internships
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              List past internships, fellowships, and freelance roles to boost your experience score.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {profile?.experiences?.length || 0} Experiences Listed
          </span>
        </div>

        {/* Existing Experiences List */}
        <div className="space-y-3.5">
          {(!profile?.experiences || profile.experiences.length === 0) ? (
            <p className="text-xs text-slate-500 py-3">No work experience or internships listed yet.</p>
          ) : (
            profile.experiences.map((exp) => {
              const isEditing = editingExpId === exp.id;
              if (isEditing) {
                return (
                  <div key={exp.id} className="p-5 rounded-xl bg-slate-900 border border-indigo-500 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Edit Experience</span>
                      <button onClick={() => setEditingExpId(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editExpCompany}
                        onChange={(e) => setEditExpCompany(e.target.value)}
                        placeholder="Company Name"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={editExpRole}
                        onChange={(e) => setEditExpRole(e.target.value)}
                        placeholder="Role / Title"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editExpStartDate}
                        onChange={(e) => setEditExpStartDate(e.target.value)}
                        placeholder="Start Date (e.g. May 2024)"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={editExpEndDate}
                        onChange={(e) => setEditExpEndDate(e.target.value)}
                        placeholder="End Date (e.g. July 2024 / Present)"
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editExpDesc}
                      onChange={(e) => setEditExpDesc(e.target.value)}
                      placeholder="Responsibilities and accomplishments"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateExperience(exp.id)}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingExpId(null)}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{exp.roleTitle}</h4>
                      <span className="text-xs text-indigo-400 font-semibold">@ {exp.companyName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {exp.isInternship ? 'Internship' : 'Full-Time'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {exp.startDate} – {exp.endDate} ({exp.durationMonths || 3} months)
                    </p>
                    {exp.description && (
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      title="Edit Experience"
                      onClick={() => {
                        setEditingExpId(exp.id);
                        setEditExpCompany(exp.companyName || '');
                        setEditExpRole(exp.roleTitle || '');
                        setEditExpStartDate(exp.startDate || '');
                        setEditExpEndDate(exp.endDate || '');
                        setEditExpDesc(exp.description || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      title="Delete Experience"
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Experience Form */}
        <form onSubmit={handleAddExperience} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3.5">
          <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-indigo-400" /> Add Work Experience or Internship
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Company Name (e.g. TechNova Solutions)"
              value={expCompany}
              onChange={(e) => setExpCompany(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              placeholder="Role Title (e.g. Software Engineering Intern)"
              value={expRole}
              onChange={(e) => setExpRole(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Start Date (e.g. June 2024)"
              value={expStartDate}
              onChange={(e) => setExpStartDate(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="End Date (e.g. August 2024 / Present)"
              value={expEndDate}
              onChange={(e) => setExpEndDate(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              min="1"
              max="60"
              placeholder="Duration in Months (e.g. 3)"
              value={expDuration}
              onChange={(e) => setExpDuration(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Key responsibilities, tools used, and achievements"
            value={expDesc}
            onChange={(e) => setExpDesc(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
