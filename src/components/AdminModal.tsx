import React, { useState } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import {
  X,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Users,
  CreditCard,
  Image as ImageIcon,
  MessageSquare,
  Building,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { Trainer, GalleryItem, Testimonial } from '../types/fitness';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    store,
    updateGymInfo,
    updateMembershipPlan,
    updateTrainer,
    addTrainer,
    deleteTrainer,
    addGalleryItem,
    deleteGalleryItem,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    updateLeadStatus,
    deleteLead,
    updateAdminPin,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useFitnessCMS();

  // Login PIN state
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'general' | 'pricing' | 'trainers' | 'gallery' | 'testimonials' | 'leads' | 'settings'
  >('general');
  const [saveToast, setSaveToast] = useState(false);

  // General tab local state
  const [generalForm, setGeneralForm] = useState(store.gymInfo);

  // New trainer / gallery / testimonial state
  const [newTrainer, setNewTrainer] = useState<Partial<Trainer>>({
    name: '',
    role: 'Fitness Coach',
    specialization: '',
    experience: '3+ Years',
    image: '/src/assets/images/trainer_male_1794198819931.jpg',
    bio: '',
    certifications: ['Certified Trainer'],
  });

  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'interior',
    image: '/src/assets/images/gym_interior_floor_1794198819156.jpg',
    caption: '',
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    roleOrGoal: 'Fat Loss & Stamina',
    duration: '3 Months Member',
    achievement: '-8kg Weight Loss',
    quote: '',
    rating: 5,
    verifiedMember: true,
  });

  const [newPinCode, setNewPinCode] = useState('');

  if (!isAdminOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (success) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN code. Default is 9300.');
    }
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateGymInfo(generalForm);
    triggerToast();
  };

  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainer.name) return;
    addTrainer({
      id: `trainer-${Date.now()}`,
      name: newTrainer.name,
      role: newTrainer.role || 'Fitness Coach',
      specialization: newTrainer.specialization || 'Strength & Conditioning',
      experience: newTrainer.experience || '3+ Years',
      image: newTrainer.image || '/src/assets/images/trainer_male_1794198819931.jpg',
      bio: newTrainer.bio || 'Dedicated coach at Fitness Point.',
      certifications: newTrainer.certifications || ['Certified Fitness Trainer'],
      whatsappPrompt: `Hello ${newTrainer.name}! I would like to enquire about coaching sessions.`,
    });
    setNewTrainer({
      name: '',
      role: 'Fitness Coach',
      specialization: '',
      experience: '3+ Years',
      image: '/src/assets/images/trainer_male_1794198819931.jpg',
      bio: '',
      certifications: ['Certified Trainer'],
    });
    triggerToast();
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title) return;
    addGalleryItem({
      id: `gal-${Date.now()}`,
      title: newGalleryItem.title,
      category: (newGalleryItem.category as any) || 'interior',
      image: newGalleryItem.image || '/src/assets/images/gym_interior_floor_1794198819156.jpg',
      caption: newGalleryItem.caption || 'Equipment at Fitness Point',
    });
    setNewGalleryItem({
      title: '',
      category: 'interior',
      image: '/src/assets/images/gym_interior_floor_1794198819156.jpg',
      caption: '',
    });
    triggerToast();
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.quote) return;
    addTestimonial({
      id: `test-${Date.now()}`,
      name: newTestimonial.name,
      roleOrGoal: newTestimonial.roleOrGoal || 'Member',
      duration: newTestimonial.duration || '6 Months Member',
      achievement: newTestimonial.achievement || 'Goal Achieved',
      quote: newTestimonial.quote,
      rating: newTestimonial.rating || 5,
      verifiedMember: true,
    });
    setNewTestimonial({
      name: '',
      roleOrGoal: '',
      duration: '3 Months Member',
      achievement: '',
      quote: '',
      rating: 5,
      verifiedMember: true,
    });
    triggerToast();
  };

  const handleExportCSV = () => {
    if (store.leads.length === 0) {
      alert('No leads to export yet.');
      return;
    }
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Type', 'Interest', 'Preferred Time', 'Date', 'Status'];
    const rows = store.leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      l.email || '',
      l.type,
      `"${(l.interest || '').replace(/"/g, '""')}"`,
      `"${(l.preferredTime || '').replace(/"/g, '""')}"`,
      l.submittedAt,
      l.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fitness_point_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportDataJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fitness_point_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gym Owner Content Management Dashboard"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-600 text-white font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-athletic text-xl sm:text-2xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                Fitness Point Owner CMS
              </h2>
              <p className="text-xs text-neutral-400">
                Update prices, phone numbers, trainers, gallery & announcements live without writing code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded border border-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" />
                Saved!
              </span>
            )}
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Lock
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Login Gate or Admin Tabs */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 text-rose-500 flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-athletic text-2xl font-bold uppercase text-white">Owner Access Required</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Enter your 4-digit Gym Owner PIN to edit website contents.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 9300)"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center font-mono text-lg tracking-widest text-white focus:outline-none focus:border-rose-600"
                  autoFocus
                />
                {pinError && <p className="text-rose-400 text-xs mt-2">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs uppercase tracking-wider text-white transition-colors"
              >
                Unlock Dashboard
              </button>

              <p className="text-[11px] text-neutral-500">
                Default PIN is <span className="font-mono text-neutral-300">9300</span> (Matches gym official phone prefix). Can be changed in settings.
              </p>
            </form>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-neutral-900/60 border-b md:border-b-0 md:border-r border-neutral-800 p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'general' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>Contact & General</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'pricing' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Membership Prices</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('trainers')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'trainers' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Trainers & Coaches</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'gallery' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Gym Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'testimonials' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Testimonials</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'leads' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                  <span>Leads & Enquiries</span>
                </div>
                {store.leads.length > 0 && (
                  <span className="font-mono text-[10px] bg-neutral-950 px-1.5 py-0.5 rounded text-neutral-300">
                    {store.leads.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-left transition-colors ${
                  activeTab === 'settings' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>PIN & Backup</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: General & Contact Info */}
              {activeTab === 'general' && (
                <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      General Information & Contact Details
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Changes here update the phone links, WhatsApp links, Google Map, and banners across the whole site.
                    </p>
                  </div>

                  {/* Announcement Bar Toggle & Text */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-white">
                        Announcement / Special Offer Banner
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setGeneralForm({ ...generalForm, announcementActive: !generalForm.announcementActive })
                        }
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          generalForm.announcementActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {generalForm.announcementActive ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={generalForm.announcementText}
                      onChange={(e) => setGeneralForm({ ...generalForm, announcementText: e.target.value })}
                      placeholder="e.g. LIMITED OFFER: 20% off on Annual Membership! Enquire now."
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Gym Official Phone Number
                      </label>
                      <input
                        type="text"
                        value={generalForm.phone}
                        onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        WhatsApp Number (without country code)
                      </label>
                      <input
                        type="text"
                        value={generalForm.whatsappNumber}
                        onChange={(e) => setGeneralForm({ ...generalForm, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        value={generalForm.email}
                        onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Instagram Profile Link
                      </label>
                      <input
                        type="text"
                        value={generalForm.instagramUrl}
                        onChange={(e) => setGeneralForm({ ...generalForm, instagramUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Gym Physical Address (Editable)
                      </label>
                      <input
                        type="text"
                        value={generalForm.address}
                        onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        City / Area (e.g. City Center)
                      </label>
                      <input
                        type="text"
                        value={generalForm.cityArea}
                        onChange={(e) => setGeneralForm({ ...generalForm, cityArea: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Opening Hours (Weekdays)
                      </label>
                      <input
                        type="text"
                        value={generalForm.openingHoursWeekdays}
                        onChange={(e) => setGeneralForm({ ...generalForm, openingHoursWeekdays: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Opening Hours (Sunday)
                      </label>
                      <input
                        type="text"
                        value={generalForm.openingHoursSunday}
                        onChange={(e) => setGeneralForm({ ...generalForm, openingHoursSunday: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={generalForm.heroHeadline}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroHeadline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Hero Subheading
                      </label>
                      <textarea
                        rows={2}
                        value={generalForm.heroSubheading}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroSubheading: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Hero Background Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={generalForm.heroImage}
                        onChange={(e) => setGeneralForm({ ...generalForm, heroImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact & General Details</span>
                  </button>
                </form>
              )}

              {/* TAB 2: Membership Pricing */}
              {activeTab === 'pricing' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      Edit Membership Plans & Pricing
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Update rates in Indian Rupees (₹) for monthly, quarterly, and annual commitments.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {store.membershipPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-athletic text-lg font-bold uppercase text-rose-500">
                            {plan.name}
                          </h4>
                          <span className="text-xs font-mono text-neutral-400">ID: {plan.id}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                              Monthly Price (₹)
                            </label>
                            <input
                              type="number"
                              value={plan.priceMonthly}
                              onChange={(e) => {
                                updateMembershipPlan({
                                  ...plan,
                                  priceMonthly: Number(e.target.value),
                                });
                                triggerToast();
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                              Quarterly (3 Mos) (₹)
                            </label>
                            <input
                              type="number"
                              value={plan.priceQuarterly}
                              onChange={(e) => {
                                updateMembershipPlan({
                                  ...plan,
                                  priceQuarterly: Number(e.target.value),
                                });
                                triggerToast();
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                              Annual (12 Mos) (₹)
                            </label>
                            <input
                              type="number"
                              value={plan.priceAnnual}
                              onChange={(e) => {
                                updateMembershipPlan({
                                  ...plan,
                                  priceAnnual: Number(e.target.value),
                                });
                                triggerToast();
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                            Plan Subtitle / Tagline
                          </label>
                          <input
                            type="text"
                            value={plan.tagline}
                            onChange={(e) => {
                              updateMembershipPlan({
                                ...plan,
                                tagline: e.target.value,
                              });
                              triggerToast();
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Trainers & Coaches */}
              {activeTab === 'trainers' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      Manage Gym Trainers & Coaches
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Edit trainer details or add a new trainer to the website.
                    </p>
                  </div>

                  {/* Add New Trainer Card */}
                  <form onSubmit={handleCreateTrainer} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Trainer</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Trainer Name *"
                        required
                        value={newTrainer.name}
                        onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Role / Title"
                        value={newTrainer.role}
                        onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Specialization (e.g. Bodybuilding, Fat Loss)"
                        value={newTrainer.specialization}
                        onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Experience (e.g. 5+ Years)"
                        value={newTrainer.experience}
                        onChange={(e) => setNewTrainer({ ...newTrainer, experience: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Image URL / Path"
                        value={newTrainer.image}
                        onChange={(e) => setNewTrainer({ ...newTrainer, image: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white sm:col-span-2"
                      />
                      <textarea
                        rows={2}
                        placeholder="Short Coach Bio"
                        value={newTrainer.bio}
                        onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white sm:col-span-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Add Trainer
                    </button>
                  </form>

                  {/* Existing Trainers List */}
                  <div className="space-y-4">
                    {store.trainers.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-12 h-12 rounded-lg object-cover bg-neutral-950 border border-neutral-800"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white">{t.name}</h4>
                            <p className="text-xs text-rose-400">{t.role} · {t.experience}</p>
                            <p className="text-xs text-neutral-400">{t.specialization}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => {
                              deleteTrainer(t.id);
                              triggerToast();
                            }}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 transition-colors"
                            title="Delete Trainer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Gym Gallery */}
              {activeTab === 'gallery' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      Gym Gallery & Photographs
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Showcase gym interior, training machines, and member workouts.
                    </p>
                  </div>

                  {/* Add New Gallery Item Form */}
                  <form onSubmit={handleCreateGallery} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Gallery Photo</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Photo Title *"
                        required
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />

                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      >
                        <option value="interior">Gym Interior</option>
                        <option value="equipment">Equipment & Free Weights</option>
                        <option value="training">Training in Action</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Image URL or Path *"
                        required
                        value={newGalleryItem.image}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, image: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white sm:col-span-2"
                      />

                      <input
                        type="text"
                        placeholder="Caption / Description"
                        value={newGalleryItem.caption}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white sm:col-span-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Add Photo to Gallery
                    </button>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {store.gallery.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={g.image}
                            alt={g.title}
                            className="w-14 h-14 rounded-lg object-cover bg-neutral-950"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div>
                            <span className="text-[10px] font-mono text-rose-400 uppercase">{g.category}</span>
                            <h4 className="font-bold text-xs text-white">{g.title}</h4>
                            <p className="text-[11px] text-neutral-400 line-clamp-1">{g.caption}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            deleteGalleryItem(g.id);
                            triggerToast();
                          }}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Testimonials */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      Member Testimonials & Stories
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Manage member reviews and real transformation milestones.
                    </p>
                  </div>

                  <form onSubmit={handleCreateTestimonial} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Member Review</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Member Name *"
                        required
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Goal / Achievement (e.g. -12kg Fat Loss)"
                        value={newTestimonial.achievement}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, achievement: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 6 Months Member)"
                        value={newTestimonial.duration}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, duration: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Member Review Quote *"
                        required
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white sm:col-span-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Save Review
                    </button>
                  </form>

                  <div className="space-y-3">
                    {store.testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{t.name}</h4>
                            <span className="text-[11px] text-rose-400 font-semibold">{t.achievement}</span>
                          </div>
                          <p className="text-xs text-neutral-300 italic">"{t.quote}"</p>
                          <p className="text-[11px] text-neutral-500">{t.duration}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            deleteTestimonial(t.id);
                            triggerToast();
                          }}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Leads & Enquiries */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-athletic text-lg font-bold uppercase text-white">
                        Captured Enquiries & Free Trial Bookings
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Total {store.leads.length} submissions received from Instagram and website visitors.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Leads (CSV)</span>
                    </button>
                  </div>

                  {store.leads.length === 0 ? (
                    <div className="p-8 text-center bg-neutral-900/50 rounded-xl border border-neutral-800 text-neutral-400 text-xs">
                      No leads received yet. Test by submitting the contact form on the website!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {store.leads.map((lead) => {
                        const directWaMsg = `Hello ${lead.name}! This is Fitness Point front desk regarding your ${lead.type === 'trial' ? 'free trial reservation' : 'membership enquiry'}. Are you free to visit today?`;
                        const waReplyLink = `https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(directWaMsg)}`;

                        return (
                          <div
                            key={lead.id}
                            className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{lead.name}</span>
                                <span
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                                    lead.type === 'trial'
                                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                      : 'bg-neutral-800 text-neutral-300'
                                  }`}
                                >
                                  {lead.type}
                                </span>
                                <span className="text-xs text-emerald-400 font-mono font-semibold">
                                  {lead.phone}
                                </span>
                              </div>

                              <p className="text-xs text-neutral-300">
                                Interest: <span className="text-neutral-100 font-semibold">{lead.interest}</span>
                                {lead.preferredTime && ` · Slot: ${lead.preferredTime}`}
                              </p>

                              {lead.message && (
                                <p className="text-xs text-neutral-400 italic">"{lead.message}"</p>
                              )}

                              <p className="text-[10px] text-neutral-500 font-mono">
                                Submitted: {new Date(lead.submittedAt).toLocaleString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                              {/* Direct WhatsApp Response */}
                              <a
                                href={waReplyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              {/* Status cycle */}
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-200"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="enrolled">Enrolled</option>
                              </select>

                              {/* Delete lead */}
                              <button
                                type="button"
                                onClick={() => deleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-400"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: Security & Backup */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <h3 className="font-athletic text-lg font-bold uppercase text-white">
                      Security & Backup Settings
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Change the gym owner authentication PIN or export/import website data.
                    </p>
                  </div>

                  {/* Change PIN */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Change Owner PIN
                    </h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="New PIN (e.g. 9300)"
                        value={newPinCode}
                        onChange={(e) => setNewPinCode(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-white flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newPinCode.trim()) {
                            updateAdminPin(newPinCode);
                            setNewPinCode('');
                            triggerToast();
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                      >
                        Update PIN
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Current PIN: <span className="font-mono text-neutral-300">{store.adminPin}</span>
                    </p>
                  </div>

                  {/* Data Export / Backup */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Backup & Restore
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Save a complete backup copy of all prices, trainers, and leads to your device.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleExportJSON}
                        className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export All Data (JSON)</span>
                      </button>

                      <label className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import Backup (JSON)</span>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const content = event.target?.result as string;
                                if (content) {
                                  const ok = importDataJson(content);
                                  if (ok) triggerToast();
                                }
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to initial defaults */}
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-red-900/40 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Reset to Defaults
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Reverts all edited prices, text, and photos to original initial defaults.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all content to initial defaults?')) {
                          resetToDefaults();
                          triggerToast();
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 text-rose-300 border border-red-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Everything</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
