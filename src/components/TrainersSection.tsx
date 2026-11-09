import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink } from '../utils/fitnessLogic';
import { MessageSquare, Award, CheckCircle } from 'lucide-react';

export const TrainersSection: React.FC = () => {
  const { store, setIsTrialModalOpen, setSelectedPlanForTrial } = useFitnessCMS();
  const { trainers, gymInfo } = store;

  return (
    <section id="trainers" className="py-20 lg:py-28 bg-neutral-900/30 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
              <span className="w-6 h-[2px] bg-rose-600"></span>
              <span>Expert Coaching Staff</span>
            </div>
            <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Train With Certified <span className="text-rose-600">Master Coaches</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              Our coaches don't just count reps; they teach biomechanics, dial in nutrition, and keep you accountable every step of the journey.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                setSelectedPlanForTrial('Personal Training Consultation');
                setIsTrialModalOpen(true);
              }}
              className="px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white border border-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Request Coach Assessment
            </button>
          </div>
        </div>

        {/* Trainers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => {
            const coachWaLink = generateWhatsAppLink(
              gymInfo.whatsappNumber,
              trainer.whatsappPrompt || `Hello Fitness Point! I want to enquire about personal training with ${trainer.name}.`
            );

            return (
              <div
                key={trainer.id}
                className="group rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all duration-300"
              >
                <div>
                  {/* Portrait with gradient scrim */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>

                    {/* Experience Tag (Unboxed, clean) */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose-400 bg-neutral-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-neutral-800">
                        {trainer.experience}
                      </span>
                      <span className="text-neutral-300 bg-neutral-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-neutral-800 font-mono text-[11px]">
                        Verified Coach
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-athletic text-2xl font-bold uppercase text-white tracking-wide">
                        {trainer.name}
                      </h3>
                      <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mt-0.5">
                        {trainer.role}
                      </p>
                    </div>

                    <div className="text-xs text-neutral-300">
                      <span className="text-neutral-500 font-medium block mb-1">SPECIALIZATION:</span>
                      <p className="font-medium text-neutral-200">{trainer.specialization}</p>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Certifications */}
                    {trainer.certifications && trainer.certifications.length > 0 && (
                      <div className="pt-3 border-t border-neutral-900 space-y-1.5">
                        {trainer.certifications.map((cert, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                            <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* WhatsApp Enquiry for this trainer */}
                <div className="p-6 pt-0">
                  <a
                    href={coachWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-white bg-neutral-900 hover:bg-emerald-950/80 border border-neutral-800 hover:border-emerald-800 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Enquire with {trainer.name.split(' ')[0]}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
