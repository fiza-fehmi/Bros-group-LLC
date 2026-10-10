export interface ConsultancyPayload {
  fullName: string;
  email: string;
  phone: string;
  consultant: string;
  purpose: string;
  preferredDate?: string;
}

export interface PitchDeckPayload {
  founderName: string;
  email: string;
  phone: string;
  background: string;
  startupName: string;
  category: string;
  briefIdea: string;
  pitchDeck: File;
}

export interface JobItem {
  _id: string;
  title: string;
  department: string;
  locationType: string;
  type: string;
  skills: string[];
  description: string;
  requirements: string[];
}

export interface JobApplicationPayload {
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioLink?: string;
  resume: File;
  coverNote?: string;
}

export interface GalleryItemData {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  location: string;
  description: string;
}

export interface ApplicationItem {
  _id: string;
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioLink?: string;
  resumePath: string;
  coverNote?: string;
  status: 'Received' | 'Reviewing' | 'Shortlisted' | 'Rejected';
  createdAt?: string;
}

export interface ConsultancyItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  consultant: string;
  purpose: string;
  preferredDate?: string;
  status: string;
  createdAt?: string;
}

export interface PitchDeckItem {
  _id: string;
  founderName: string;
  email: string;
  phone: string;
  background: string;
  startupName: string;
  category: string;
  briefIdea: string;
  filePath: string;
  status: string;
  createdAt?: string;
}

export interface TeamMemberItem {
  _id: string;
  name: string;
  role: string;
  department: string;
  tier: string;
  photoUrl: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  order?: number;
  createdAt?: string;
}

export interface AdminStats {
  totalJobs: number;
  totalApplications: number;
  totalGallery: number;
  totalConsultancies: number;
  totalTeamMembers?: number;
}
