import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jobService } from '../services/api';
import {
  Briefcase,
  ArrowLeft,
  Plus,
  Sparkles,
  Building,
  CheckCircle2,
} from 'lucide-react';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Noida, UP');
  const [salaryRange, setSalaryRange] = useState('₹8–12 LPA');
  const [jobType, setJobType] = useState('Full-Time');
  const [minCgpa, setMinCgpa] = useState('7.0');
  const [experience, setExperience] = useState('0.0');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [requiredSkillsStr, setRequiredSkillsStr] = useState('Java, Spring Boot, MySQL, REST APIs, DSA');
  const [preferredSkillsStr, setPreferredSkillsStr] = useState('Docker, AWS, Microservices');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const requiredSkills = requiredSkillsStr.split(',').map((s) => s.trim()).filter(Boolean);
      const preferredSkills = preferredSkillsStr.split(',').map((s) => s.trim()).filter(Boolean);

      const payload = {
        title,
        description,
        location,
        salaryRange,
        jobType,
        minCgpa: parseFloat(minCgpa),
        requiredExperienceYears: parseFloat(experience),
        deadline,
        requiredSkills,
        preferredSkills,
      };

      await jobService.createJob(payload);
      setMessage('Campus Job created successfully! Candidates can now apply.');
      setTimeout(() => navigate('/recruiter/dashboard'), 1500);
    } catch (err) {
      setMessage(err.message || 'Error creating job opening.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <Link
        to="/recruiter/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recruiter Dashboard
      </Link>

      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Campus Drive Opening</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Publish New Job Post</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Specify technical stack and qualification criteria for automated AI candidate matching.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Job Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Java Backend Developer"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Noida / Remote"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Salary Package
              </label>
              <input
                type="text"
                required
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="e.g. ₹10–14 LPA"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Minimum CGPA
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={minCgpa}
                onChange={(e) => setMinCgpa(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Min Experience (Years)
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Deadline
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Required Skills (Comma separated)
            </label>
            <input
              type="text"
              required
              value={requiredSkillsStr}
              onChange={(e) => setRequiredSkillsStr(e.target.value)}
              placeholder="Java, Spring Boot, MySQL, REST APIs, DSA"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">Weights 40% in candidate ranking calculation.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Preferred Bonus Skills (Comma separated)
            </label>
            <input
              type="text"
              value={preferredSkillsStr}
              onChange={(e) => setPreferredSkillsStr(e.target.value)}
              placeholder="Docker, AWS, Microservices"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Role Description
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe candidate responsibilities, day-to-day work, engineering team culture, and eligibility."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {saving ? 'Publishing...' : 'Publish Job Opening'}
          </button>
        </div>
      </form>
    </div>
  );
}
