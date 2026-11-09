import React, { useState, useEffect } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { validateLeadForm, generateWhatsAppLink } from '../utils/fitnessLogic';
import { X, CheckCircle2, Send, MessageSquare, AlertCircle } from 'lucide-react';

export const TrialModal: React.FC = () => {
  const {
    isTrialModalOpen,
    setIsTrialModalOpen,
    selectedPlanForTrial,
    setSelectedPlanForTrial,
    store,
    submitLead,
  } = useFitnessCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: 'Evening (6:00 PM - 8:00 PM)',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isTrialModalOpen) {
      setSubmitted(false);
      setFormErrors({});
    }
  }, [isTrialModalOpen]);

  if (!isTrialModalOpen) return null;

  const handleClose = () => {
    setIsTrialModalOpen(false);
    setSelectedPlanForTrial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm({
      name: formData.name,
      phone: formData.phone,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    submitLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      interest: selectedPlanForTrial || '1-Day Free Trial Session',
      preferredTime: formData.preferredTime,
      message: formData.notes.trim() || undefined,
      type: 'trial',
    });

    setSubmitted(true);
  };

  const waLeadMsg = `Hello Fitness Point! I would like to confirm my Free Trial Session.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${selectedPlanForTrial || '1-Day Free Trial'}\nSlot: ${formData.preferredTime}`;
  const directWaUrl = generateWhatsAppLink(store.gymInfo.whatsappNumber, waLeadMsg);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book Free Trial Session"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-neutral-100"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          aria-label="Close Trial Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-athletic text-2xl font-bold uppercase text-white">
                Free Trial Pass Reserved!
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Bring comfortable workout clothes and sports shoes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs font-mono space-y-1">
              <p className="text-neutral-400">Gym: <span className="text-rose-400 font-bold">Fitness Point</span></p>
              <p className="text-neutral-400">Selected Interest: <span className="text-white">{selectedPlanForTrial || 'Free Trial'}</span></p>
              <p className="text-neutral-400">Time Slot: <span className="text-white">{formData.preferredTime}</span></p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                <span className="w-4 h-[2px] bg-rose-600"></span>
                <span>Experience Fitness Point</span>
              </div>
              <h3 className="font-athletic text-2xl sm:text-3xl font-bold uppercase text-white">
                Book 1-Day Free Trial Pass
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {selectedPlanForTrial
                  ? `Inquiring for: ${selectedPlanForTrial}`
                  : 'Get full access to the gym floor, equipment orientation, and trainer tips.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="trial-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="trial-name"
                  type="text"
                  required
                  placeholder="e.g. Sameer Kulkarni"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${
                    formErrors.name ? 'border-rose-500' : 'border-neutral-800 focus:border-rose-600'
                  } text-white text-sm focus:outline-none`}
                />
                {formErrors.name && (
                  <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="trial-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Mobile Number * (10 Digits)
                </label>
                <input
                  id="trial-phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${
                    formErrors.phone ? 'border-rose-500' : 'border-neutral-800 focus:border-rose-600'
                  } text-white font-mono text-sm focus:outline-none`}
                />
                {formErrors.phone && (
                  <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-rose-600 text-white text-sm focus:outline-none"
                >
                  <option value="Morning (6:00 AM - 9:00 AM)">Morning (6:00 AM - 9:00 AM)</option>
                  <option value="Mid-day (10:00 AM - 2:00 PM)">Mid-day (10:00 AM - 2:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  <option value="Night (8:00 PM - 10:00 PM)">Night (8:00 PM - 10:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Any specific fitness goal or injury notes? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Want to start strength training"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-rose-600 text-white text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
              >
                <span>Reserve Free Trial Pass</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
