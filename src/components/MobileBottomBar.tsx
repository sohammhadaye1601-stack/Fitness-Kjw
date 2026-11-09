import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { formatPhoneForTel, generateWhatsAppLink } from '../utils/fitnessLogic';
import { Phone, MessageSquare, Dumbbell } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { store, setIsTrialModalOpen } = useFitnessCMS();
  const { phone, whatsappNumber, whatsappDefaultMsg } = store.gymInfo;

  const telLink = formatPhoneForTel(phone);
  const waLink = generateWhatsAppLink(whatsappNumber, whatsappDefaultMsg);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 px-3 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Click to Call */}
        <a
          href={telLink}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 active:bg-neutral-800 text-center transition-colors"
          aria-label="Call Gym Floor"
        >
          <Phone className="w-4 h-4 text-rose-500 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 active:bg-emerald-900 text-center transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Free Trial Button */}
        <button
          type="button"
          onClick={() => setIsTrialModalOpen(true)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-rose-600 text-white active:bg-rose-700 text-center transition-colors shadow-sm"
          aria-label="Book Free Trial"
        >
          <Dumbbell className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Free Trial</span>
        </button>
      </div>
    </div>
  );
};
