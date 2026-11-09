import React, { useState } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import {
  formatPhoneForTel,
  generateWhatsAppLink,
  validateLeadForm,
} from '../utils/fitnessLogic';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Instagram,
  CheckCircle2,
  ExternalLink,
  Send,
  AlertCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { store, submitLead } = useFitnessCMS();
  const {
    name: gymName,
    phone,
    phoneDisplay,
    whatsappNumber,
    whatsappDefaultMsg,
    email,
    address,
    cityArea,
    googleMapsEmbedUrl,
    googleMapsLink,
    instagramUrl,
    openingHoursWeekdays,
    openingHoursSunday,
  } = store.gymInfo;

  // Contact / Lead Form State
  const [formType, setFormType] = useState<'membership' | 'trial'>('membership');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Standard Membership',
    preferredTime: 'Morning (6:00 AM - 9:00 AM)',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedLead, setSubmittedLead] = useState<{ id: string; name: string } | null>(null);

  const officialTelLink = formatPhoneForTel(phone);
  const officialWaLink = generateWhatsAppLink(whatsappNumber, whatsappDefaultMsg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    // Submit into CMS lead storage
    const newLead = submitLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      interest: formData.interest,
      preferredTime: formData.preferredTime,
      message: formData.message.trim() || undefined,
      type: formType,
    });

    setSubmittedLead({ id: newLead.id, name: newLead.name });
  };

  // Pre-filled WhatsApp link with the submitted lead's info for immediate chat
  const forwardToWaUrl = submittedLead
    ? generateWhatsAppLink(
        whatsappNumber,
        `Hello Fitness Point! I just submitted an inquiry on your website.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${formData.interest}\nPreferred Time: ${formData.preferredTime}\nMessage: ${formData.message || 'None'}`
      )
    : officialWaLink;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-6 h-[2px] bg-rose-600"></span>
            <span>Get in Touch & Visit</span>
            <span className="w-6 h-[2px] bg-rose-600"></span>
          </div>
          <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            Connect With Fitness Point
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Call us directly, chat on WhatsApp, or book your free trial session below. Our team is on the gym floor ready to assist you.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info & Map vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Channels & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Instant Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Click-to-Call Button using tel: */}
              <a
                href={officialTelLink}
                className="py-4 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex flex-col justify-center gap-1 shadow-md hover:border-rose-600/50"
              >
                <div className="flex items-center gap-2 text-rose-500">
                  <Phone className="w-4 h-4" />
                  <span>Call Official Number</span>
                </div>
                <span className="font-mono text-sm text-neutral-100 tabular-nums">
                  {phoneDisplay}
                </span>
              </a>

              {/* WhatsApp Enquiry Button */}
              <a
                href={officialWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-white font-bold text-xs uppercase tracking-wider transition-all flex flex-col justify-center gap-1 shadow-md"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </div>
                <span className="font-mono text-sm text-emerald-300 tabular-nums">
                  +91 {whatsappNumber}
                </span>
              </a>
            </div>

            {/* Information Cards */}
            <div className="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-6 space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 text-rose-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Gym Location</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{address}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{cityArea}</p>
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3 pt-4 border-t border-neutral-800/60">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 text-rose-500 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Opening Hours</h4>
                  <p className="text-xs sm:text-sm font-medium text-white mt-0.5">{openingHoursWeekdays}</p>
                  <p className="text-xs font-medium text-neutral-300 mt-0.5">{openingHoursSunday}</p>
                </div>
              </div>

              {/* Email & Instagram */}
              <div className="flex items-start gap-3 pt-4 border-t border-neutral-800/60">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 text-rose-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Online Channels</h4>
                  <p className="text-xs sm:text-sm text-neutral-200">{email}</p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 font-semibold pt-1"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Container with styled fallback */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 h-64 bg-neutral-900 relative">
              <iframe
                title="Fitness Point Gym Location Map"
                src={googleMapsEmbedUrl}
                className="w-full h-full border-0 filter invert contrast-90 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-neutral-800 text-[11px] font-semibold text-neutral-200">
                📍 {gymName} Location
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (Membership Enquiry / Free Trial) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10 relative">
              {/* Form Type Tabs */}
              <div className="flex items-center gap-2 mb-8 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setFormType('membership');
                    setSubmittedLead(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    formType === 'membership'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Membership Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormType('trial');
                    setSubmittedLead(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    formType === 'trial'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Book Free 1-Day Trial
                </button>
              </div>

              {submittedLead ? (
                /* Success State with immediate WhatsApp forward CTA */
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-athletic text-3xl font-bold uppercase text-white">
                      Enquiry Received, {submittedLead.name}!
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Our front desk team has logged your {formType === 'trial' ? 'free trial booking' : 'membership inquiry'}.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
                    <p className="text-neutral-400">Logged Lead ID: <span className="text-white">{submittedLead.id}</span></p>
                    <p className="text-neutral-400">Mobile: <span className="text-white">{formData.phone}</span></p>
                    <p className="text-neutral-400">Preferred Slot: <span className="text-white">{formData.preferredTime}</span></p>
                  </div>

                  {/* Immediate WhatsApp Forwarding Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={forwardToWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send to WhatsApp Instantly</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedLead(null);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          interest: 'Standard Membership',
                          preferredTime: 'Morning (6:00 AM - 9:00 AM)',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border ${
                          formErrors.name ? 'border-rose-500' : 'border-neutral-800 focus:border-rose-600'
                        } text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors`}
                      />
                      {formErrors.name && (
                        <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        Mobile Number * (10 Digits)
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border ${
                          formErrors.phone ? 'border-rose-500' : 'border-neutral-800 focus:border-rose-600'
                        } text-white placeholder-neutral-600 text-sm font-mono focus:outline-none transition-colors`}
                      />
                      {formErrors.phone && (
                        <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email (Optional) */}
                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border ${
                          formErrors.email ? 'border-rose-500' : 'border-neutral-800 focus:border-rose-600'
                        } text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Primary Interest */}
                    <div>
                      <label htmlFor="lead-interest" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        {formType === 'trial' ? 'Goal for Free Trial' : 'Preferred Plan / Program'}
                      </label>
                      <select
                        id="lead-interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-rose-600 text-white text-sm focus:outline-none transition-colors"
                      >
                        <option value="Basic Membership">Basic Membership</option>
                        <option value="Standard Membership">Standard Membership (Most Popular)</option>
                        <option value="Premium Membership">Premium VIP Membership</option>
                        <option value="Personal Training">Personal Training (1-on-1)</option>
                        <option value="Fat Loss & HIIT">Fat Loss & HIIT Conditioning</option>
                        <option value="General Strength">General Strength & Iron</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label htmlFor="lead-timeslot" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred Training / Visiting Time Slot
                    </label>
                    <select
                      id="lead-timeslot"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-rose-600 text-white text-sm focus:outline-none transition-colors"
                    >
                      <option value="Early Morning (6:00 AM - 8:00 AM)">Early Morning (6:00 AM - 8:00 AM)</option>
                      <option value="Morning (8:00 AM - 10:30 AM)">Morning (8:00 AM - 10:30 AM)</option>
                      <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      <option value="Night (8:00 PM - 10:00 PM)">Night (8:00 PM - 10:00 PM)</option>
                    </select>
                  </div>

                  {/* Message / Questions */}
                  <div>
                    <label htmlFor="lead-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Additional Message or Specific Health Goals (Optional)
                    </label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. I want to lose weight and need form guidance on squats..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-rose-600 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2 group"
                  >
                    <span>{formType === 'trial' ? 'Confirm Free Trial Reservation' : 'Submit Membership Enquiry'}</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-[11px] text-neutral-500">
                    🔒 Your contact details are kept strictly confidential for gym enquiry verification only.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
