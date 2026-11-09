import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink, formatPhoneForTel } from '../utils/fitnessLogic';
import { ShieldCheck, Dumbbell, Clock, Users, ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  const { store, setIsTrialModalOpen } = useFitnessCMS();
  const { heroHeadline, heroSubheading, heroImage, whatsappNumber, whatsappDefaultMsg, phone } = store.gymInfo;

  const defaultWaLink = generateWhatsAppLink(whatsappNumber, whatsappDefaultMsg);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background Hero Image with measured dark contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fitness Point Gym Floor and Strength Arena"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback gradient if path fails
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed athletic kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-rose-500">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span>Welcome to Fitness Point · Elite Training Facility</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-athletic text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] [text-wrap:balance]">
            {heroHeadline}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
            {heroSubheading}
          </p>

          {/* Prominent Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {/* Join Now */}
            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="px-8 py-4 text-sm sm:text-base font-bold tracking-wider uppercase text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 transition-all rounded-lg shadow-lg shadow-rose-950/50 flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Explore Memberships */}
            <a
              href="#memberships"
              className="px-7 py-4 text-sm sm:text-base font-bold tracking-wider uppercase text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 transition-all rounded-lg flex items-center gap-2 whitespace-nowrap"
            >
              <span>Explore Memberships</span>
            </a>

            {/* Contact Us */}
            <a
              href="#contact"
              className="px-6 py-4 text-sm sm:text-base font-bold tracking-wider uppercase text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all rounded-lg flex items-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-rose-500" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Quick Instagram/Social Proof & WhatsApp Connect */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <a
              href={defaultWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat instantly with gym floor on WhatsApp</span>
            </a>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="text-neutral-400">Free 1-on-1 Fitness Assessment Included</span>
          </div>
        </div>
      </div>

      {/* Highlights & Facilities Strip (Full-width row below hero split) */}
      <div className="relative z-10 w-full border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-rose-500 shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Heavy Iron Zone</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Dumbbells up to 50kg, Olympic platforms & power cages</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-rose-500 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Certified Coaches</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Personalized form correction & progressive overload</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-rose-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">6 AM – 10 PM Daily</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Early morning and late evening workout flexibility</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-rose-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Hygienic & Air-Cooled</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Clean showers, private lockers, and purified hydration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
