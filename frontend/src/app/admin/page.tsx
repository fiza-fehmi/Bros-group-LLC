'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  JobItem, 
  GalleryItemData, 
  ApplicationItem, 
  ConsultancyItem, 
  PitchDeckItem, 
  TeamMemberItem,
  AdminStats 
} from '@/types';
import { 
  adminLoginApi, 
  fetchAdminStats, 
  fetchJobs, 
  createAdminJob, 
  updateAdminJob, 
  deleteAdminJob, 
  fetchAdminApplications, 
  updateAdminApplicationStatus, 
  deleteAdminApplication,
  fetchGallery, 
  addAdminGalleryItem, 
  updateAdminGalleryItem,
  deleteAdminGalleryItem, 
  fetchTeamMembers,
  addAdminTeamMember,
  updateAdminTeamMember,
  deleteAdminTeamMember,
  fetchAdminConsultancies, 
  deleteAdminConsultancy,
  fetchAdminPitchDecks,
  deleteAdminPitchDeck 
} from '@/lib/api';
import { 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Image as ImageIcon, 
  Briefcase, 
  Users, 
  UserPlus,
  Download, 
  Eye, 
  EyeOff,
  Search, 
  Filter, 
  Loader2, 
  X, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Layers,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const getBackendBase = () => {
  return (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000')).replace(/\/api\/?$/, '');
};

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales'];
const LOCATION_TYPES = ['On-Site', 'Hybrid', 'Remote'];
const GALLERY_CATEGORIES = ['MoU Signings', 'Tech Expos & Summits', 'Corporate Events', 'Team & Culture'];
const TEAM_DEPARTMENTS = [
  'Executive Leadership',
  'Software & AI Engineering',
  'Graphic Designing & Creative',
  'Digital Marketing & Growth',
  'Operations & Management'
];
const TEAM_TIERS = [
  'Tier 1: Executive Leadership',
  'Tier 2: Department Leads',
  'Tier 3: Engineering & Creative Staff'
];

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs' | 'gallery' | 'team' | 'consultancies' | 'pitchDecks'>('applications');

  // Stats Data
  const [stats, setStats] = useState<AdminStats>({
    totalJobs: 0,
    totalApplications: 0,
    totalGallery: 0,
    totalConsultancies: 0,
    totalTeamMembers: 0
  });

  // Section Data
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItemData[]>([]);
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [consultancies, setConsultancies] = useState<ConsultancyItem[]>([]);
  const [pitchDecks, setPitchDecks] = useState<PitchDeckItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');

  // PDF Viewer Modal State
  const [pdfModalUrl, setPdfModalUrl] = useState<string | null>(null);
  const [pdfModalTitle, setPdfModalTitle] = useState<string>('');

  // Job Form Modal (Create / Edit)
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Engineering',
    locationType: 'Hybrid',
    type: 'Full-time',
    skills: '',
    description: '',
    requirements: ''
  });
  const [jobSubmitting, setJobSubmitting] = useState(false);

  // Gallery Form Modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItemData | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'MoU Signings',
    date: '',
    location: '',
    description: '',
    customImageUrl: ''
  });
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [gallerySubmitting, setGallerySubmitting] = useState(false);

  // Team Form Modal (Create / Edit)
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamMemberItem | null>(null);
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    department: 'Executive Leadership',
    tier: 'Tier 1: Executive Leadership',
    photoUrl: '',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    order: 1
  });
  const [teamPhotoFile, setTeamPhotoFile] = useState<File | null>(null);
  const [teamSubmitting, setTeamSubmitting] = useState(false);

  // Open Edit Team Modal
  const openEditTeamModal = (item: TeamMemberItem) => {
    setEditingTeam(item);
    setTeamForm({
      name: item.name,
      role: item.role,
      department: item.department || 'Executive Leadership',
      tier: item.tier || 'Tier 1: Executive Leadership',
      photoUrl: item.photoUrl || '',
      bio: item.bio || '',
      linkedinUrl: item.linkedinUrl || '',
      githubUrl: item.githubUrl || '',
      order: item.order || 1
    });
    setTeamPhotoFile(null);
    setShowTeamModal(true);
  };

  // Handle Team Submit (Create or Update)
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', teamForm.name);
      formData.append('role', teamForm.role);
      formData.append('department', teamForm.department);
      formData.append('tier', teamForm.tier);
      formData.append('photoUrl', teamForm.photoUrl);
      formData.append('bio', teamForm.bio);
      formData.append('linkedinUrl', teamForm.linkedinUrl);
      formData.append('githubUrl', teamForm.githubUrl);
      formData.append('order', String(teamForm.order));
      if (teamPhotoFile) {
        formData.append('photo', teamPhotoFile);
      }

      if (editingTeam) {
        await updateAdminTeamMember(editingTeam._id, formData);
      } else {
        await addAdminTeamMember(formData);
      }

      setShowTeamModal(false);
      setEditingTeam(null);
      setTeamForm({
        name: '',
        role: '',
        department: 'Executive Leadership',
        tier: 'Tier 1: Executive Leadership',
        photoUrl: '',
        bio: '',
        linkedinUrl: '',
        githubUrl: '',
        order: 1
      });
      setTeamPhotoFile(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Error saving team member.');
    } finally {
      setTeamSubmitting(false);
    }
  };

  // Open Edit Gallery Modal
  const openEditGalleryModal = (item: GalleryItemData) => {
    setEditingGallery(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location,
      description: item.description,
      customImageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : ''
    });
    setGalleryImageFile(null);
    setShowGalleryModal(true);
  };

  // Handle Gallery Submit (Create or Update)
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGallerySubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', galleryForm.title);
      formData.append('category', galleryForm.category);
      formData.append('date', galleryForm.date);
      formData.append('location', galleryForm.location);
      formData.append('description', galleryForm.description);
      formData.append('customImageUrl', galleryForm.customImageUrl);
      if (galleryImageFile) {
        formData.append('galleryImage', galleryImageFile);
      }

      if (editingGallery) {
        await updateAdminGalleryItem(editingGallery._id, formData);
      } else {
        await addAdminGalleryItem(formData);
      }

      setShowGalleryModal(false);
      setEditingGallery(null);
      setGalleryForm({
        title: '',
        category: 'MoU Signings',
        date: '',
        location: '',
        description: '',
        customImageUrl: ''
      });
      setGalleryImageFile(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Error saving gallery photo.');
    } finally {
      setGallerySubmitting(false);
    }
  };

  // Check login token on mount
  useEffect(() => {
    const token = localStorage.getItem('bros_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  // Fetch all admin data when authenticated
  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      const results = await Promise.allSettled([
        fetchAdminStats(),
        fetchAdminApplications(),
        fetchJobs(),
        fetchGallery(),
        fetchTeamMembers(),
        fetchAdminConsultancies(),
        fetchAdminPitchDecks()
      ]);

      if (results[0].status === 'fulfilled' && results[0].value) setStats(results[0].value);
      if (results[1].status === 'fulfilled' && results[1].value) setApplications(results[1].value);
      if (results[2].status === 'fulfilled' && results[2].value) setJobs(results[2].value);
      if (results[3].status === 'fulfilled' && results[3].value) setGallery(results[3].value);
      if (results[4].status === 'fulfilled' && results[4].value) setTeam(results[4].value);
      if (results[5].status === 'fulfilled' && results[5].value) setConsultancies(results[5].value);
      if (results[6].status === 'fulfilled' && results[6].value) setPitchDecks(results[6].value);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Delete Team Member State & Handler
  const [deletingTeam, setDeletingTeam] = useState<TeamMemberItem | null>(null);
  const [deleteTeamLoading, setDeleteTeamLoading] = useState(false);

  const handleDeleteTeamConfirm = async () => {
    if (!deletingTeam) return;
    setDeleteTeamLoading(true);
    try {
      await deleteAdminTeamMember(deletingTeam._id);
      setTeam(prev => prev.filter(tm => tm._id !== deletingTeam._id));
      setDeletingTeam(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete team member.');
    } finally {
      setDeleteTeamLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllAdminData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await adminLoginApi(loginForm.username, loginForm.password);
      if (res.success) {
        localStorage.setItem('bros_admin_token', res.token);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Invalid username or password.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('bros_admin_token');
    setIsAuthenticated(false);
  };

  // Applications Status Update
  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      await updateAdminApplicationStatus(appId, newStatus);
      setApplications(prev =>
        prev.map(app => app._id === appId ? { ...app, status: newStatus as any } : app)
      );
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Handle Job Submit (Create or Update)
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobSubmitting(true);
    try {
      const payload = {
        title: jobForm.title,
        department: jobForm.department,
        locationType: jobForm.locationType,
        type: jobForm.type,
        skills: jobForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        description: jobForm.description,
        requirements: jobForm.requirements.split('\n').filter(Boolean)
      };

      if (editingJob) {
        await updateAdminJob(editingJob._id, payload);
      } else {
        await createAdminJob(payload);
      }

      setShowJobModal(false);
      setEditingJob(null);
      setJobForm({
        title: '',
        department: 'Engineering',
        locationType: 'Hybrid',
        type: 'Full-time',
        skills: '',
        description: '',
        requirements: ''
      });
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Error saving job post.');
    } finally {
      setJobSubmitting(false);
    }
  };

  // Delete Job Post
  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await deleteAdminJob(jobId);
      loadAllAdminData();
    } catch (err) {
      alert('Failed to delete job posting.');
    }
  };

  // Edit Job Setup
  const openEditJobModal = (job: JobItem) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      locationType: job.locationType,
      type: job.type,
      skills: job.skills.join(', '),
      description: job.description,
      requirements: (job.requirements || []).join('\n')
    });
    setShowJobModal(true);
  };

  // Delete Gallery Item State & Handler
  const [deletingGallery, setDeletingGallery] = useState<GalleryItemData | null>(null);
  const [deleteGalleryLoading, setDeleteGalleryLoading] = useState(false);

  const handleDeleteGalleryConfirm = async () => {
    if (!deletingGallery) return;
    setDeleteGalleryLoading(true);
    try {
      await deleteAdminGalleryItem(deletingGallery._id);
      setGallery(prev => prev.filter(g => g._id !== deletingGallery._id));
      setDeletingGallery(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete gallery item.');
    } finally {
      setDeleteGalleryLoading(false);
    }
  };

  // Application Deletion State & Handler
  const [deletingApp, setDeletingApp] = useState<ApplicationItem | null>(null);
  const [deleteAppLoading, setDeleteAppLoading] = useState(false);

  const handleDeleteAppConfirm = async () => {
    if (!deletingApp) return;
    setDeleteAppLoading(true);
    try {
      await deleteAdminApplication(deletingApp._id);
      setApplications(prev => prev.filter(a => a._id !== deletingApp._id));
      setStats(prev => prev ? { ...prev, totalApplications: Math.max(0, prev.totalApplications - 1) } : prev);
      setDeletingApp(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete job application.');
    } finally {
      setDeleteAppLoading(false);
    }
  };

  // Consultancy Deletion State & Handler
  const [deletingConsultancy, setDeletingConsultancy] = useState<ConsultancyItem | null>(null);
  const [deleteConsultancyLoading, setDeleteConsultancyLoading] = useState(false);

  const handleDeleteConsultancyConfirm = async () => {
    if (!deletingConsultancy) return;
    setDeleteConsultancyLoading(true);
    try {
      await deleteAdminConsultancy(deletingConsultancy._id);
      setConsultancies(prev => prev.filter(c => c._id !== deletingConsultancy._id));
      setDeletingConsultancy(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete consultancy request.');
    } finally {
      setDeleteConsultancyLoading(false);
    }
  };

  // Pitch Deck Deletion State & Handler
  const [deletingPitchDeck, setDeletingPitchDeck] = useState<PitchDeckItem | null>(null);
  const [deletePitchDeckLoading, setDeletePitchDeckLoading] = useState(false);

  const handleDeletePitchDeckConfirm = async () => {
    if (!deletingPitchDeck) return;
    setDeletePitchDeckLoading(true);
    try {
      await deleteAdminPitchDeck(deletingPitchDeck._id);
      setPitchDecks(prev => prev.filter(p => p._id !== deletingPitchDeck._id));
      setDeletingPitchDeck(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete pitch deck record.');
    } finally {
      setDeletePitchDeckLoading(false);
    }
  };

  // Open PDF CV in viewer modal
  const openPdfViewer = (app: ApplicationItem) => {
    if (!app.resumePath) {
      alert('CV document is not available for this applicant.');
      return;
    }
    let fullUrl = app.resumePath;
    if (!app.resumePath.startsWith('http') && !app.resumePath.startsWith('https')) {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000/api')).replace(/\/api\/?$/, '');
      fullUrl = `${apiBase}/api/applications/${app._id}/resume`;
    }
    setPdfModalUrl(fullUrl);
    setPdfModalTitle(`${app.fullName} - ${app.jobTitle}`);
  };

  // Helper to format external URLs with https:// if missing
  const formatExternalUrl = (url?: string) => {
    if (!url || !url.trim()) return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  // Filter Applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#D97706]" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#D97706] bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Admin Authentication</span>
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span>Go to Website</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-2">
              <img src="/images/bros-logo-transparent.png" alt="Bros Group LLC Logo" className="w-full h-full object-contain filter drop-shadow-xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              BROS GROUP <span className="text-[#D97706]">LLC</span>
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Admin Authentication Portal</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center">
              <XCircle className="w-4 h-4 mr-2 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Username</label>
              <input
                type="text"
                required
                placeholder="Username (e.g., admin)"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-4 pr-11 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
            >
              Authenticate & Access Admin Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500">
              Authorized personnel access only. Bros Group LLC Internal Portal.
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* MINIMAL TOP ADMIN NAVBAR */}
      <header className="bg-[#0F172A] border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left side: Logo & Branding */}
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
                <img src="/images/bros-logo-transparent.png" alt="Bros Group LLC Logo" className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-sans leading-none">
                    BROS GROUP <span className="text-[#D97706]">LLC</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#D97706] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Admin
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                  Internal Portal
                </span>
              </div>
            </Link>

            {/* Right side: ONLY "Go to Website" and "Logout" */}
            <div className="flex items-center space-x-2.5 sm:space-x-4">
              
              {/* Go to Website Button */}
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-900/30 hover:shadow-amber-900/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
              >
                <span>Go to Website</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-all duration-200 cursor-pointer border border-slate-700/60 hover:border-rose-500/30 group"
                title="Logout from Admin Panel"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ADMIN TITLE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Admin Control Center</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Manage Job Postings, Review Applicant PDF CV Data, Upload Event Photographs, and Monitor Submissions.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadAllAdminData}
              disabled={loadingData}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center cursor-pointer border border-slate-200"
            >
              <Loader2 className={`w-3.5 h-3.5 mr-1.5 ${loadingData ? 'animate-spin text-[#D97706]' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </section>



      {/* DASHBOARD CONTENT CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* INTERNAL TAB NAVIGATION */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 pt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Applied Applicants ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Manage Job Openings ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Manage Gallery ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Manage Team & Leadership ({team.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('consultancies')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'consultancies'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Consultancy Bookings ({consultancies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pitchDecks')}
              className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'pitchDecks'
                  ? 'bg-white text-[#D97706] border-t-2 border-[#D97706] shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Startup Pitch Decks ({pitchDecks.length})</span>
            </button>
          </div>
          {activeTab === 'applications' && (
            <div className="p-6 space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Job Applications & Resumes</h2>
                  <p className="text-slate-500 text-xs">Review candidates who applied via Careers page and view/download their uploaded PDF CVs.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search applicant name, job or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#D97706] w-64"
                    />
                  </div>

                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#D97706]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Received">Received</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {filteredApplications.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-300 rounded-2xl">
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium text-sm">No applications found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-200 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Applied Position</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Links / Portfolio</th>
                        <th className="p-4">PDF CV Resume</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-medium text-[#0F172A]">
                      {filteredApplications.map((app) => (
                        <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-sm text-[#0F172A]">{app.fullName}</div>
                            {app.coverNote && (
                              <p className="text-slate-500 text-[11px] line-clamp-1 max-w-xs mt-0.5" title={app.coverNote}>
                                Note: {app.coverNote}
                              </p>
                            )}
                          </td>
                          <td className="p-4 font-semibold text-[#D97706]">{app.jobTitle}</td>
                          <td className="p-4 space-y-0.5">
                            <div>{app.email}</div>
                            <div className="text-slate-500">{app.phone}</div>
                          </td>
                          <td className="p-4 space-x-2">
                            {app.linkedinUrl ? (
                              <a href={formatExternalUrl(app.linkedinUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">LinkedIn</a>
                            ) : null}
                            {app.githubUrl ? (
                              <a href={formatExternalUrl(app.githubUrl)} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline font-semibold">GitHub</a>
                            ) : null}
                            {app.portfolioLink ? (
                              <a href={formatExternalUrl(app.portfolioLink)} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline font-semibold">Portfolio</a>
                            ) : null}
                            {!app.linkedinUrl && !app.githubUrl && !app.portfolioLink && (
                              <span className="text-slate-400 text-[11px] font-medium">Not provided</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openPdfViewer(app)}
                                className="px-3 py-1.5 bg-[#0F172A] text-white hover:bg-[#D97706] rounded-lg font-bold text-[11px] transition-colors flex items-center space-x-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View PDF CV</span>
                              </button>
                              <a
                                href={app.resumePath.startsWith('http') ? app.resumePath : `${getBackendBase()}/api/applications/${app._id}/resume`}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                                title="Direct Download PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <select
                                value={app.status}
                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                                  app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                                  app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                                  app.status === 'Reviewing' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                                  'bg-slate-100 text-slate-700 border-slate-300'
                                }`}
                              >
                                <option value="Received">Received</option>
                                <option value="Reviewing">Reviewing</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                              <button
                                onClick={() => setDeletingApp(app)}
                                className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-all flex items-center space-x-1 cursor-pointer border border-rose-100 group/del shadow-sm"
                                title="Delete Job Application"
                              >
                                <Trash2 className="w-4 h-4 group-hover/del:scale-110 transition-transform text-rose-600 group-hover/del:text-white" />
                                <span className="text-xs font-bold">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MANAGE JOB POSTINGS */}
          {activeTab === 'jobs' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Careers Job Openings</h2>
                  <p className="text-slate-500 text-xs">Post new job openings or modify existing career opportunities.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingJob(null);
                    setJobForm({
                      title: '',
                      department: 'Engineering',
                      locationType: 'Hybrid',
                      type: 'Full-time',
                      skills: '',
                      description: '',
                      requirements: ''
                    });
                    setShowJobModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {jobs.map((job) => (
                  <div key={job._id} className="bg-white border border-slate-200/80 hover:border-amber-500/40 rounded-2xl p-5 space-y-3.5 shadow-sm hover:shadow-md transition-all duration-200 relative group transform hover:-translate-y-0.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg inline-block">
                          {job.department} • {job.locationType}
                        </span>
                        <h3 className="text-lg font-extrabold text-[#0F172A] mt-2 tracking-tight group-hover:text-[#D97706] transition-colors">{job.title}</h3>
                      </div>

                      <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <button
                          onClick={() => openEditJobModal(job)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                          title="Edit Job"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE GALLERY */}
          {activeTab === 'gallery' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Event Photographs Gallery</h2>
                  <p className="text-slate-500 text-xs">Add new event photos or MoU ceremony pictures to the live website gallery.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingGallery(null);
                    setGalleryForm({
                      title: '',
                      category: 'MoU Signings',
                      date: '',
                      location: '',
                      description: '',
                      customImageUrl: ''
                    });
                    setGalleryImageFile(null);
                    setShowGalleryModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo to Gallery</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={
                          item.imageUrl.startsWith('/uploads') 
                            ? `${getBackendBase()}${item.imageUrl}` 
                            : item.imageUrl
                        }
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-[#0F172A]/90 text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-sm text-[#0F172A] leading-snug">{item.title}</h4>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                      <p className="text-slate-600 text-xs line-clamp-2">{item.description}</p>
                    </div>

                    <div className="p-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => openEditGalleryModal(item)}
                        className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-[#0F172A] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingGallery(item)}
                        className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-sm hover:shadow group/del"
                        title="Delete Gallery Photo"
                      >
                        <Trash2 className="w-4 h-4 group-hover/del:scale-110 transition-transform text-rose-600 group-hover/del:text-white" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & LEADERSHIP MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Team & Executive Leadership Management</h2>
                  <p className="text-slate-500 text-xs">Add, update, or remove executive leadership, department leads, and team staff profiles.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingTeam(null);
                    setTeamForm({
                      name: '',
                      role: '',
                      department: 'Executive Leadership',
                      tier: 'Tier 1: Executive Leadership',
                      photoUrl: '',
                      bio: '',
                      linkedinUrl: '',
                      githubUrl: '',
                      order: team.length + 1
                    });
                    setTeamPhotoFile(null);
                    setShowTeamModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>

              {team.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-300 rounded-2xl">
                  <UserPlus className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium text-sm">No team members added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((mem) => {
                    let fallbackImage = '/images/about-hero.jpg';
                    if (mem.name?.includes('Muhammad Ali') || mem.name?.includes('Zaheer')) {
                      fallbackImage = '/images/muhammad-ali.jpg';
                    } else if (mem.name?.includes('Anus') || mem.name?.includes('Ahmad')) {
                      fallbackImage = '/images/anus-ahmed-khan.jpg';
                    }

                    const isApiUpload = mem.photoUrl?.startsWith('/uploads/');
                    const displayImage = isApiUpload ? `${getBackendBase()}${mem.photoUrl}` : mem.photoUrl || fallbackImage;

                    return (
                      <div key={mem._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                        <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                          <img
                            src={displayImage}
                            alt={mem.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                          />
                        </div>

                        <div className="p-4 space-y-2 flex-grow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-base text-[#0F172A] leading-snug">{mem.name}</h4>
                              <p className="text-xs font-semibold text-[#D97706]">{mem.role}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{mem.department}</p>
                            </div>
                          </div>

                          {mem.bio && <p className="text-slate-600 text-xs line-clamp-2 pt-1 border-t border-slate-100">{mem.bio}</p>}
                        </div>

                        <div className="p-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => openEditTeamModal(mem)}
                            className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-[#0F172A] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setDeletingTeam(mem)}
                            className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-sm hover:shadow group/del"
                            title="Delete Team Member"
                          >
                            <Trash2 className="w-4 h-4 group-hover/del:scale-110 transition-transform text-rose-600 group-hover/del:text-white" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONSULTANCY REQUESTS */}
          {activeTab === 'consultancies' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Consultancy Bookings</h2>
                <p className="text-slate-500 text-xs">Review executive consultancy and advisory requests submitted by clients.</p>
              </div>

              {consultancies.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-300 rounded-2xl">
                  <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium text-sm">No consultancy bookings registered yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-200 text-xs uppercase font-semibold">
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Email / Phone</th>
                        <th className="p-4">Requested Consultant</th>
                        <th className="p-4">Purpose / Preferred Date</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-medium text-[#0F172A]">
                      {consultancies.map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-sm">{c.fullName}</td>
                          <td className="p-4 space-y-0.5">
                            <div>{c.email}</div>
                            <div className="text-slate-500">{c.phone}</div>
                          </td>
                          <td className="p-4 text-[#D97706] font-semibold">{c.consultant}</td>
                          <td className="p-4">
                            <p>{c.purpose}</p>
                            {c.preferredDate && <p className="text-slate-500 text-[11px]">Date: {c.preferredDate}</p>}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setDeletingConsultancy(c)}
                              className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-all inline-flex items-center space-x-1 cursor-pointer border border-rose-100 group/del shadow-sm"
                              title="Delete Consultancy Request"
                            >
                              <Trash2 className="w-4 h-4 group-hover/del:scale-115 transition-transform" />
                              <span className="text-xs font-bold">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: STARTUP PITCH DECKS */}
          {activeTab === 'pitchDecks' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Startup Pitch Decks</h2>
                <p className="text-slate-500 text-xs">Review founder submissions for Bros Group acceleration and investment evaluation.</p>
              </div>

              {pitchDecks.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-300 rounded-2xl">
                  <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium text-sm">No pitch decks submitted yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-200 text-xs uppercase font-semibold">
                        <th className="p-4">Founder & Startup</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Brief Idea</th>
                        <th className="p-4">Deck File</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs font-medium text-[#0F172A]">
                      {pitchDecks.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-sm text-[#0F172A]">{p.startupName}</div>
                            <div className="text-slate-500 text-[11px]">Founder: {p.founderName}</div>
                          </td>
                          <td className="p-4 space-y-0.5">
                            <div>{p.email}</div>
                            <div className="text-slate-500">{p.phone}</div>
                          </td>
                          <td className="p-4 font-semibold text-[#D97706]">{p.category}</td>
                          <td className="p-4 max-w-xs line-clamp-2">{p.briefIdea}</td>
                          <td className="p-4">
                            <a
                              href={p.filePath.startsWith('http') ? p.filePath : `${getBackendBase()}/api/pitch-decks/${p._id}/file`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-[#0F172A] text-white hover:bg-[#D97706] rounded-lg font-bold text-[11px] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Deck File</span>
                            </a>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setDeletingPitchDeck(p)}
                              className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-all inline-flex items-center space-x-1 cursor-pointer border border-rose-100 group/del shadow-sm"
                              title="Delete Pitch Deck"
                            >
                              <Trash2 className="w-4 h-4 group-hover/del:scale-115 transition-transform" />
                              <span className="text-xs font-bold">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* DELETE GALLERY ITEM CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !deleteGalleryLoading && setDeletingGallery(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#0F172A]">Delete Gallery Photo?</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Are you sure you want to delete this event photograph from the gallery?
                </p>
                <div className="text-xs text-slate-500 font-semibold bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
                  Item: <strong className="text-[#0F172A]">{deletingGallery.title}</strong> ({deletingGallery.category})
                </div>
                <p className="text-rose-600 text-[11px] font-medium bg-rose-50 p-2 rounded-lg border border-rose-100">
                  This will permanently delete the gallery item record from MongoDB.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  disabled={deleteGalleryLoading}
                  onClick={() => setDeletingGallery(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteGalleryLoading}
                  onClick={handleDeleteGalleryConfirm}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deleteGalleryLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONSULTANCY CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingConsultancy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !deleteConsultancyLoading && setDeletingConsultancy(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#0F172A]">Delete Consultancy Request?</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Are you sure you want to delete this consultancy booking request?
                </p>
                <div className="text-xs text-slate-500 font-semibold bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
                  Client: <strong className="text-[#0F172A]">{deletingConsultancy.fullName}</strong> ({deletingConsultancy.consultant})
                </div>
                <p className="text-rose-600 text-[11px] font-medium bg-rose-50 p-2 rounded-lg border border-rose-100">
                  This will permanently delete the booking request from MongoDB.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  disabled={deleteConsultancyLoading}
                  onClick={() => setDeletingConsultancy(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteConsultancyLoading}
                  onClick={handleDeleteConsultancyConfirm}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deleteConsultancyLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE PITCH DECK CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingPitchDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !deletePitchDeckLoading && setDeletingPitchDeck(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#0F172A]">Delete Startup Pitch Deck?</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Are you sure you want to delete this pitch deck submission?
                </p>
                <div className="text-xs text-slate-500 font-semibold bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
                  Startup: <strong className="text-[#0F172A]">{deletingPitchDeck.startupName}</strong> ({deletingPitchDeck.founderName})
                </div>
                <p className="text-rose-600 text-[11px] font-medium bg-rose-50 p-2 rounded-lg border border-rose-100">
                  This will permanently delete the record and pitch deck file from server storage & MongoDB.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  disabled={deletePitchDeckLoading}
                  onClick={() => setDeletingPitchDeck(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deletePitchDeckLoading}
                  onClick={handleDeletePitchDeckConfirm}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deletePitchDeckLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE APPLICATION CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !deleteAppLoading && setDeletingApp(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#0F172A]">Delete Job Application?</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Are you sure you want to delete this job application?
                </p>
                <div className="text-xs text-slate-500 font-semibold bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
                  Applicant: <strong className="text-[#0F172A]">{deletingApp.fullName}</strong> ({deletingApp.jobTitle})
                </div>
                <p className="text-rose-600 text-[11px] font-medium bg-rose-50 p-2 rounded-lg border border-rose-100">
                  This will permanently remove the application record and associated CV file from MongoDB.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  disabled={deleteAppLoading}
                  onClick={() => setDeletingApp(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteAppLoading}
                  onClick={handleDeleteAppConfirm}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deleteAppLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF CV VIEWER MODAL */}
      <AnimatePresence>
        {pdfModalUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPdfModalUrl(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-700"
            >
              <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#D97706]" />
                  <span className="font-bold text-sm truncate">{pdfModalTitle}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <a
                    href={pdfModalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open Tab</span>
                  </a>
                  <a
                    href={pdfModalUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-[#D97706] text-white rounded text-xs font-bold hover:bg-amber-600 transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => setPdfModalUrl(null)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-grow bg-slate-100 relative">
                <iframe
                  src={pdfModalUrl}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE / EDIT JOB MODAL */}
      <AnimatePresence>
        {showJobModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJobModal(false)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8"
            >
              <button
                onClick={() => setShowJobModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-extrabold text-[#0F172A] mb-4">
                {editingJob ? 'Edit Job Posting' : 'Create New Job Post'}
              </h3>

              <form onSubmit={handleJobSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full-Stack Engineer"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Department *</label>
                    <select
                      value={jobForm.department}
                      onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Location Type *</label>
                    <select
                      value={jobForm.locationType}
                      onChange={(e) => setJobForm({ ...jobForm, locationType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    >
                      {LOCATION_TYPES.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Python, MongoDB"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Job Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Overview of duties and role..."
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Requirements (one per line)</label>
                  <textarea
                    rows={3}
                    placeholder="5+ years experience...&#10;Proficiency with cloud..."
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={jobSubmitting}
                    className="w-full py-3 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {jobSubmitting ? 'Saving Job Post...' : editingJob ? 'Update Job Post' : 'Publish Job Opening'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE GALLERY ITEM MODAL */}
      <AnimatePresence>
        {showGalleryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGalleryModal(false)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8"
            >
              <button
                onClick={() => setShowGalleryModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-extrabold text-[#0F172A] mb-4">
                {editingGallery ? 'Edit Gallery Item' : 'Add Gallery Photograph'}
              </h3>

              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Strategic MoU Signing Ceremony"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Category *</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  >
                    {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Date</label>
                    <input
                      type="text"
                      placeholder="e.g. October 14, 2026"
                      value={galleryForm.date}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Expo Center"
                      value={galleryForm.location}
                      onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Upload Image File OR Image URL</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setGalleryImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-500 mb-2 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F172A] file:text-white hover:file:bg-[#D97706] cursor-pointer"
                  />
                  <input
                    type="url"
                    placeholder="Or paste external Unsplash image URL..."
                    value={galleryForm.customImageUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, customImageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details about the event..."
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={gallerySubmitting}
                    className="w-full py-3 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {gallerySubmitting ? 'Saving Photograph...' : editingGallery ? 'Update Gallery Item' : 'Add Photograph to Gallery'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE / EDIT TEAM MEMBER MODAL */}
      <AnimatePresence>
        {showTeamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTeamModal(false)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8"
            >
              <button
                onClick={() => setShowTeamModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A]"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-extrabold text-[#0F172A] mb-4">
                {editingTeam ? 'Edit Team Member Profile' : 'Add New Team Member'}
              </h3>

              <form onSubmit={handleTeamSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Role / Job Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder & Chief Executive Officer (CEO)"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Department *</label>
                    <select
                      value={teamForm.department}
                      onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    >
                      {TEAM_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Tier Level *</label>
                    <select
                      value={teamForm.tier}
                      onChange={(e) => setTeamForm({ ...teamForm, tier: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    >
                      {TEAM_TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Profile Photo Upload OR Photo URL</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setTeamPhotoFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-500 mb-2 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F172A] file:text-white hover:file:bg-[#D97706] cursor-pointer"
                  />
                  <input
                    type="url"
                    placeholder="Or paste external image URL (Unsplash or CDN)..."
                    value={teamForm.photoUrl}
                    onChange={(e) => setTeamForm({ ...teamForm, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Short Professional Bio / Focus</label>
                  <textarea
                    rows={2}
                    placeholder="Tech Strategy, AI Integration & Business Vision..."
                    value={teamForm.bio}
                    onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={teamForm.linkedinUrl}
                      onChange={(e) => setTeamForm({ ...teamForm, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={teamForm.githubUrl}
                      onChange={(e) => setTeamForm({ ...teamForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={teamSubmitting}
                    className="w-full py-3 bg-[#D97706] hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {teamSubmitting ? 'Saving Profile...' : editingTeam ? 'Update Team Profile' : 'Add Team Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE TEAM MEMBER CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeletingTeam(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
            >
              <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">Delete Team Member?</h3>
              <p className="text-slate-600 text-xs mb-6 leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-[#0F172A]">{deletingTeam.name}</span> ({deletingTeam.role}) from the official team roster? This action cannot be undone.
              </p>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDeletingTeam(null)}
                  disabled={deleteTeamLoading}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteTeamConfirm}
                  disabled={deleteTeamLoading}
                  className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  {deleteTeamLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <span>Delete Member</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
