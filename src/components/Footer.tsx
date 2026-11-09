import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { formatPhoneForTel, generateWhatsAppLink } from '../utils/fitnessLogic';
import { Phone, MessageSquare, Instagram, MapPin, Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { store, setIsAdminOpen } = useFitnessCMS();
  const { name, phone, phoneDisplay, whatsappNumber, whatsappDefaultMsg, email, address, cityArea, instagramUrl } = store.gymInfo;

  const telLink = formatPhoneForTel(phone);
  const waLink = generateWhatsAppLink(whatsappNumber, whatsappDefaultMsg);

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="font-athletic text-2xl font-black uppercase text-white tracking-wider flex items-center">
              FITNESS<span className="text-rose-600 ml-1">POINT</span>
            </a>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premium strength, conditioning, and transformation facility. Engineered for serious athletes and dedicated fitness seekers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={telLink}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800"
                aria-label="Call Fitness Point"
              >
                <Phone className="w-4 h-4 text-rose-500" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-emerald-400 transition-colors border border-neutral-800"
                aria-label="WhatsApp Fitness Point"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-pink-400 transition-colors border border-neutral-800"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Fitness Programs</a></li>
              <li><a href="#memberships" className="hover:text-white transition-colors">Membership Pricing</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors">Master Coaches</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gym Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact & Location</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200">
              Programs
            </h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-white transition-colors">Strength Training</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Weight Loss & HIIT</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Muscle Hypertrophy</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">1-on-1 Personal Training</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Cardiovascular Endurance</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">General Fitness & Mobility</a></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-200">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{address}, {cityArea}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <a href={telLink} className="hover:text-white font-mono">{phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-row with Admin Access */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© {new Date().getFullYear()} FITNESS POINT. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px]">Mon-Sat: 6AM - 10PM · Sun: 7AM - 1PM</span>
            {/* Gym Owner Admin CMS trigger button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white py-1 px-2.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-semibold transition-colors"
              title="Gym Owner Content Management Dashboard"
            >
              <Shield className="w-3 h-3 text-rose-500" />
              <span>Owner CMS</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
