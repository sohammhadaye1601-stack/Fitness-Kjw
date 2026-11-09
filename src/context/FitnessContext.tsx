import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FitnessPointStore,
  GymInfo,
  Program,
  MembershipPlan,
  Trainer,
  GalleryItem,
  Testimonial,
  LeadSubmission,
} from '../types/fitness';
import { INITIAL_FITNESS_DATA } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'fitness_point_store_v1';
const ADMIN_AUTH_KEY = 'fitness_point_admin_auth';

interface FitnessContextValue {
  store: FitnessPointStore;
  updateGymInfo: (info: Partial<GymInfo>) => void;
  updateProgram: (program: Program) => void;
  updateMembershipPlan: (plan: MembershipPlan) => void;
  updateTrainer: (trainer: Trainer) => void;
  addTrainer: (trainer: Trainer) => void;
  deleteTrainer: (id: string) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  updateTestimonial: (item: Testimonial) => void;
  addTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  submitLead: (lead: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>) => LeadSubmission;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  deleteLead: (id: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPin: (newPin: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  // Trial modal state for quick booking from any CTA
  isTrialModalOpen: boolean;
  setIsTrialModalOpen: (open: boolean) => void;
  selectedPlanForTrial: string | null;
  setSelectedPlanForTrial: (plan: string | null) => void;
}

const FitnessContext = createContext<FitnessContextValue | null>(null);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<FitnessPointStore>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure contains newly added fields if any
        return {
          ...INITIAL_FITNESS_DATA,
          ...parsed,
          gymInfo: { ...INITIAL_FITNESS_DATA.gymInfo, ...parsed.gymInfo },
        };
      }
    } catch (e) {
      console.error('Failed to parse stored fitness data:', e);
    }
    return INITIAL_FITNESS_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [store]);

  const updateGymInfo = (info: Partial<GymInfo>) => {
    setStore((prev) => ({
      ...prev,
      gymInfo: { ...prev.gymInfo, ...info },
    }));
  };

  const updateProgram = (program: Program) => {
    setStore((prev) => ({
      ...prev,
      programs: prev.programs.map((p) => (p.id === program.id ? program : p)),
    }));
  };

  const updateMembershipPlan = (plan: MembershipPlan) => {
    setStore((prev) => ({
      ...prev,
      membershipPlans: prev.membershipPlans.map((m) => (m.id === plan.id ? plan : m)),
    }));
  };

  const updateTrainer = (trainer: Trainer) => {
    setStore((prev) => ({
      ...prev,
      trainers: prev.trainers.map((t) => (t.id === trainer.id ? trainer : t)),
    }));
  };

  const addTrainer = (trainer: Trainer) => {
    setStore((prev) => ({
      ...prev,
      trainers: [trainer, ...prev.trainers],
    }));
  };

  const deleteTrainer = (id: string) => {
    setStore((prev) => ({
      ...prev,
      trainers: prev.trainers.filter((t) => t.id !== id),
    }));
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setStore((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === item.id ? item : g)),
    }));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setStore((prev) => ({
      ...prev,
      gallery: [item, ...prev.gallery],
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setStore((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const updateTestimonial = (item: Testimonial) => {
    setStore((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === item.id ? item : t)),
    }));
  };

  const addTestimonial = (item: Testimonial) => {
    setStore((prev) => ({
      ...prev,
      testimonials: [item, ...prev.testimonials],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setStore((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const submitLead = (leadInput: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newLead: LeadSubmission = {
      ...leadInput,
      id: `lead-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    setStore((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setStore((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    }));
  };

  const deleteLead = (id: string) => {
    setStore((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
    }));
  };

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === store.adminPin.trim()) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const updateAdminPin = (newPin: string) => {
    setStore((prev) => ({ ...prev, adminPin: newPin.trim() }));
  };

  const resetToDefaults = () => {
    setStore(INITIAL_FITNESS_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportDataJson = (): string => {
    return JSON.stringify(store, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.gymInfo && parsed.membershipPlans) {
        setStore(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported:', e);
    }
    return false;
  };

  return (
    <FitnessContext.Provider
      value={{
        store,
        updateGymInfo,
        updateProgram,
        updateMembershipPlan,
        updateTrainer,
        addTrainer,
        deleteTrainer,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        submitLead,
        updateLeadStatus,
        deleteLead,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateAdminPin,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        isTrialModalOpen,
        setIsTrialModalOpen,
        selectedPlanForTrial,
        setSelectedPlanForTrial,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitnessCMS = () => {
  const ctx = useContext(FitnessContext);
  if (!ctx) {
    throw new Error('useFitnessCMS must be used within a FitnessProvider');
  }
  return ctx;
};
