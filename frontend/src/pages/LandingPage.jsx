import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileText,
  Users,
  Award,
  ChevronRight,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  Layers,
  Code2,
  Cloud,
  Cpu,
  Brain,
  Sparkles,
} from 'lucide-react';
import { jobService } from '../services/api';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadFeaturedJobs();
  }, []);

  const loadFeaturedJobs = async () => {
    try {
      const res = await jobService.getAllJobs({ page: 0, size: 6 });
      if (res.data && res.data.content) {
        setFeaturedJobs(res.data.content.slice(0, 6));
      }
    } catch (e) {
      // Fallback sample data if API is loading
      setFeaturedJobs([
        {
          id: 15,
          title: 'Software Development Engineer 1 (DSA)',
          companyName: 'QuantumEdge Infotech',
          location: 'Pune',
          jobType: 'Full-Time',
          salaryRange: '₹13 - 17 LPA',
          requiredSkills: ['DSA', 'Java', 'System Design', 'MySQL'],
          minCgpa: 8.0,
        },
        {
          id: 14,
          title: 'API Platform Engineer (FastAPI/Python)',
          companyName: 'DataSphere Analytics',
          location: 'Bengaluru',
          jobType: 'Full-Time',
          salaryRange: '₹9 - 13 LPA',
          requiredSkills: ['Python', 'FastAPI', 'Docker', 'REST APIs'],
          minCgpa: 7.0,
        },
        {
          id: 13,
          title: 'Database Administrator (MySQL)',
          companyName: 'TechNova Solutions',
          location: 'Noida',
          jobType: 'Full-Time',
          salaryRange: '₹8 - 11 LPA',
          requiredSkills: ['MySQL', 'SQL', 'Database Design', 'Linux'],
          minCgpa: 7.0,
        },
        {
          id: 12,
          title: 'Security Operations Center Analyst',
          companyName: 'CyberPulse Networks',
          location: 'Gurugram',
          jobType: 'Full-Time',
          salaryRange: '₹8 - 11 LPA',
          requiredSkills: ['Networking', 'Linux', 'Cybersecurity', 'Python'],
          minCgpa: 6.5,
        },
      ]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/jobs');
    }
  };

  const placementCategories = [
    {
      id: 'software',
      title: 'Software Development',
      desc: 'Full-stack, backend, frontend, and mobile engineering roles at top tech enterprises.',
      icon: Code2,
      count: '42+ Drives',
      color: 'indigo',
    },
    {
      id: 'ai-data',
      title: 'Data Science & AI',
      desc: 'Machine learning, predictive data analytics, and AI research associate positions.',
      icon: Brain,
      count: '28+ Drives',
      color: 'purple',
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      desc: 'Cloud architecture, Kubernetes deployment, and site reliability infrastructure.',
      icon: Cloud,
      count: '20+ Drives',
      color: 'cyan',
    },
    {
      id: 'core',
      title: 'Core Engineering',
      desc: 'Embedded systems, electronics, automation, and electrical engineering positions.',
      icon: Cpu,
      count: '35+ Drives',
      color: 'emerald',
    },
    {
      id: 'product',
      title: 'Product & Analytics',
      desc: 'Product management, business intelligence, and technical consulting positions.',
      icon: Layers,
      count: '18+ Drives',
      color: 'amber',
    },
    {
      id: 'internships',
      title: 'Pre-Placement Internships',
      desc: 'Summer internships with Pre-Placement Offers (PPOs) for 2026/2027 graduating batches.',
      icon: Calendar,
      count: '50+ Openings',
      color: 'rose',
    },
  ];

  const studentTestimonials = [
    {
      name: 'Prateek Verma',
      branch: 'B.Tech CSE',
      batch: 'Batch 2022-2026',
      company: 'Amazon',
      role: 'Software Development Engineer',
      package: '₹47 LPA',
      quote: 'The placement cell drives and simulated technical rounds made the interview process smooth. CampusConnect helped me prepare my resume and track every milestone seamlessly.',
      isSpotlight: true,
    },
    {
      name: 'Ruhani Singh',
      branch: 'B.Tech AI & ML',
      batch: 'Batch 2022-2026',
      company: 'UKG',
      role: 'Associate Software Engineer',
      package: '₹14.5 LPA',
      quote: 'From resume screening to final round interviews, the portal gave me immediate clarity on where my application stood. The AI skill-gap analyzer was particularly helpful!',
    },
    {
      name: 'Arjun Singh',
      branch: 'B.Tech CS & Data Science',
      batch: 'Batch 2022-2026',
      company: 'Samsung R&D',
      role: 'Research Engineer',
      package: '₹18 LPA',
      quote: 'Special thanks to our TPO coordinators and the online assessment schedule system. Having all our college campus drives in one unified portal is a game changer.',
    },
    {
      name: 'Sanchi Goyal',
      branch: 'B.Tech ECE',
      batch: 'Batch 2022-2026',
      company: 'Oracle',
      role: 'Cloud Operations Engineer',
      package: '₹17.2 LPA',
      quote: 'The batch eligibility filter and direct application process eliminated confusion between core and IT company visiting dates. Got my offer letter right on schedule!',
    },
    {
      name: 'Abhijat Patel',
      branch: 'B.Tech CSE',
      batch: 'Batch 2022-2026',
      company: 'TechNova Solutions',
      role: 'Full Stack Engineer',
      package: '₹16 LPA',
      quote: 'Applied directly with my verified GitHub projects and CGPA. Cleared 3 technical rounds and received my digital offer letter through CampusConnect!',
    },
    {
      name: 'Aditi Upadhyaya',
      branch: 'B.Tech Electrical',
      batch: 'Batch 2022-2026',
      company: 'Torrent Power',
      role: 'Graduate Engineer Trainee',
      package: '₹11 LPA',
      quote: 'CampusConnect made sure core engineering students had equal access to visiting energy and infrastructure companies. Highly recommended for all university placements.',
    },
  ];

  const faqs = [
    {
      q: 'How do students register for on-campus recruitment drives?',
      a: 'Students register with their university email, complete their academic profile (CGPA, department, graduation year, verified skills, and GitHub projects), and upload their resume. Once approved, you can apply to any active campus drive with 1-click.',
    },
    {
      q: 'How does the Training & Placement Cell enforce eligibility cutoffs?',
      a: 'The placement cell configures criteria for each drive (e.g. minimum 7.5 CGPA, eligible branches such as CSE/IT/ECE, and maximum allowable active backlogs). Ineligible profiles are automatically filtered out at submission.',
    },
    {
      q: 'What is the highest package achieved during recent placement drives?',
      a: 'The record highest package is ₹47 LPA secured by Prateek Verma at Amazon. Our average technical package across 250+ recruiting companies stands at ₹12.4 LPA.',
    },
    {
      q: 'Can recruiters directly schedule multi-round interviews on CampusConnect?',
      a: 'Yes. Recruiters can triage candidate pools using our deterministic Max-Heap PriorityQueue, shortlist applicants, schedule interview slots, and update candidate stages in real-time.',
    },
    {
      q: 'Who can I contact if I need help with my campus placement drive registration?',
      a: 'You can email the Training & Placement Cell directly at tpo@campusconnect.edu or visit the TPO Office during college hours.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      {/* Top Banner Notice */}
      <div className="bg-indigo-950/60 border-b border-indigo-900/50 py-2 px-4 text-center text-xs text-indigo-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Campus Placement Season 2026–27 is Live!</span>
        <span>•</span>
        <span>Over 250+ Technology Recruiters Visiting On-Campus</span>
        <Link to="/jobs" className="text-white underline hover:text-indigo-200 ml-1 font-medium">
          View Openings &rarr;
        </Link>
      </div>

      {/* Hero Section (Modeled after JSS Noida Placements) */}
      <section className="relative pt-12 pb-16 md:pt-18 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-300 mb-6">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Training & Placement Cell • Campus Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Bridging Academia & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
                Industry Excellence.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Empowering university engineering students with career opportunities at Fortune 500 companies and high-growth technology startups through transparent, end-to-end placement drives.
            </p>

            {/* Real Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campus drives, companies (e.g. Amazon, SDE, React)..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none py-1.5"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                >
                  Explore Drives
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/jobs"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/25"
              >
                Explore Opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-colors flex items-center gap-2"
              >
                For Recruiters & TPO
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Right Visual Placement Showcase Card (JSS Style Hero Card) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    TPO
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Central Placement Cell</h4>
                    <p className="text-[11px] text-slate-400">JSS Academy & Partner Institutions</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Active Season
                </span>
              </div>

              {/* Record Placement Spotlight Box */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-800/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                  RECORD PLACEMENT MILESTONE
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-base font-bold text-white">Prateek Verma</h5>
                    <p className="text-xs text-slate-300">Software Development Engineer (SDE)</p>
                    <p className="text-xs font-semibold text-indigo-300 mt-0.5">Amazon Web Services</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400">₹47 LPA</span>
                    <p className="text-[10px] text-slate-400 uppercase">Record Package</p>
                  </div>
                </div>
              </div>

              {/* Key Placement Stats 2x2 Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-2xl font-extrabold text-white">250+</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Partner Companies</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-2xl font-extrabold text-indigo-400">10,000+</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Students Placed</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-2xl font-extrabold text-emerald-400">85%</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Placement Success</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-2xl font-extrabold text-amber-400">₹47 LPA</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Highest Package</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Verified Placement Audit 2026</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  100% On-Campus Compliance <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Recruiting Companies Marquee / Strip */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by global technology leaders & Fortune 500 recruiters
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-sm font-bold text-slate-300">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-indigo-400" /> GOOGLE
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-sky-400" /> CISCO
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-rose-400" /> ORACLE
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-blue-400" /> SAMSUNG R&D
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-purple-400" /> UKG
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-emerald-400" /> TECHNOVA
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-cyan-400" /> TCS DIGITAL
            </span>
          </div>
        </div>
      </section>

      {/* Gateway to Career Success: 4 Core Pillars (From JSS Placements) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Gateway to Career Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
            Empowering Your Professional Journey
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            The Central Training & Placement Cell provides comprehensive career infrastructure, industry linkages, and tailored placement pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-5">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Industry Bridge</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Bridging academia and the corporate sector through regular campus drives, guest lectures, and industry conclaves.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-5">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Tailored Opportunities</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Matching students' verified skill sets with tailored roles across software, AI, core engineering, and analytics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Industry-Ready</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Continuous mock technical interviews, DSA coding bootcamps, and soft skills training to build confident professionals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 mb-5">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">4. Year-Round Focus</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Dedicated placement support active throughout the 7th and 8th semesters with pre-placement internship (PPO) tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Placement Categories Grid (From JSS Placements) */}
      <section className="py-20 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Career Pathways
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Explore Placement Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Discover opportunities across diverse engineering and technology domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <Link
                      to="/jobs"
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      View Category Drives <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Live Campus Drives Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Live On-Campus Openings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Active Placement Drives
            </h2>
          </div>
          <Link
            to="/jobs"
            className="mt-4 sm:mt-0 text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Explore all campus drives <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {job.companyName}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      <Link to={`/jobs/${job.id}`} className="hover:text-indigo-300 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shrink-0">
                    {job.salaryRange || 'Competitive'}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    {job.jobType || 'Full-Time'}
                  </span>
                  {job.minCgpa && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        Min CGPA: {job.minCgpa}
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(job.requiredSkills || []).slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">On-Campus Registration Active</span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  View Details & Apply
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Campus Placements / Infrastructure (JSS Noida Style) */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Campus Placement Ecosystem
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              State-of-the-Art Placement Infrastructure
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Dedicated facilities to host concurrent campus drives, coding assessments, and executive interviews.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl font-extrabold text-white">28 Acres</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Campus Area</p>
              <p className="text-[11px] text-slate-500 mt-1">Sector-62 Institutional Area</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl font-extrabold text-indigo-400">250+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Annual Visiting Cos</p>
              <p className="text-[11px] text-slate-500 mt-1">MNCs, Startups & Core Firms</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl font-extrabold text-emerald-400">10,000+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Alumni Placed</p>
              <p className="text-[11px] text-slate-500 mt-1">Across 30+ Global Locations</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-3xl font-extrabold text-purple-400">100+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">GATE & Higher Studies</p>
              <p className="text-[11px] text-slate-500 mt-1">Admitted to Top Global Universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials ("Our Students, Our Pride" from JSS Placements) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Our Students, Our Pride
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">
            Student Placement Success Stories
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Real experiences from students across computer science, electronics, and core departments placed at top organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentTestimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl flex flex-col justify-between ${
                t.isSpotlight
                  ? 'bg-gradient-to-br from-indigo-950/60 to-slate-900 border-2 border-indigo-500/50 shadow-xl'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-slate-800 text-indigo-300">
                    {t.company}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">{t.package}</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.branch} • {t.batch}</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-300">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-950/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need More Help Support Box (JSS Style) */}
          <div className="mt-10 p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-900/80 border border-indigo-700/60 flex items-center justify-center text-indigo-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Need Additional Placement Assistance?</h4>
                <p className="text-xs text-slate-400">Email: tpo@campusconnect.edu | Contact TPO Coordinators</p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Sign In to TPO Desk
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/50 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
              JOIN CAMPUS RECRUITMENT 2026-27
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              Ready to take the next step in your career?
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Connect with 250+ recruiting organizations. Apply for campus interviews, verify your eligibility, and secure your dream offer.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all text-sm"
              >
                Create Student Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-sm"
              >
                Sign In to Portal
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>Quick demo accounts on login page</span>
              <span>•</span>
              <span>100% Free for all students</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
