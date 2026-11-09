export interface GymInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDefaultMsg: string;
  email: string;
  address: string;
  cityArea: string;
  googleMapsEmbedUrl: string;
  googleMapsLink: string;
  instagramUrl: string;
  openingHoursWeekdays: string;
  openingHoursSunday: string;
  announcementText: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubheading: string;
  heroImage: string;
}

export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  duration: string;
  intensity: 'Medium' | 'High' | 'Extreme' | 'All Levels';
  icon: string;
  popularFor: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceQuarterly: number;
  priceAnnual: number;
  popular: boolean;
  highlightBadge?: string;
  features: string[];
  notIncluded?: string[];
  whatsappMessage: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  certifications: string[];
  whatsappPrompt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'equipment' | 'training';
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrGoal: string;
  duration: string;
  achievement: string;
  quote: string;
  rating: number;
  verifiedMember: boolean;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  preferredTime?: string;
  message?: string;
  type: 'trial' | 'membership' | 'general';
  submittedAt: string;
  status: 'new' | 'contacted' | 'enrolled';
}

export interface FitnessPointStore {
  gymInfo: GymInfo;
  programs: Program[];
  membershipPlans: MembershipPlan[];
  trainers: Trainer[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  leads: LeadSubmission[];
  adminPin: string;
}
