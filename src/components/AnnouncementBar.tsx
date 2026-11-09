import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink } from '../utils/fitnessLogic';
import { Zap, ChevronRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { store } = useFitnessCMS();
  const { announcementActive, announcementText, whatsappNumber } = store.gymInfo;

  if (!announcementActive || !announcementText) return null;

  const waUrl = generateWhatsAppLink(
    whatsappNumber,
    `Hello Fitness Point! I am enquiring about the announcement offer: "${announcementText}"`
  );

  return (
    <div className="bg-rose-950/70 border-b border-rose-600/30 text-rose-100 text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex items-center gap-1 bg-rose-600 text-white font-semibold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm shrink-0">
            <Zap className="w-3 h-3 fill-current" />
            Special Offer
          </span>
          <p className="truncate font-medium text-neutral-200">
            {announcementText}
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300 transition-colors text-xs whitespace-nowrap"
        >
          Claim on WhatsApp
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
