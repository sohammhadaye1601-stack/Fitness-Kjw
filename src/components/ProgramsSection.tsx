import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink } from '../utils/fitnessLogic';
import { Dumbbell, Flame, Zap, Target, Activity, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const { store, setIsTrialModalOpen, setSelectedPlanForTrial } = useFitnessCMS();
  const { programs, gymInfo } = store;

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return Dumbbell;
      case 'Flame':
        return Flame;
      case 'Zap':
        return Zap;
      case 'Target':
        return Target;
      case 'Activity':
        return Activity;
      case 'Heart':
      default:
        return Heart;
    }
  };

  const handleBookProgram = (programTitle: string) => {
    setSelectedPlanForTrial(`Program: ${programTitle}`);
    setIsTrialModalOpen(true);
  };

  return (
    <section id="programs" className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-6 h-[2px] bg-rose-600"></span>
            <span>Tailored Fitness Programs</span>
            <span className="w-6 h-[2px] bg-rose-600"></span>
          </div>
          <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            Specialized Training For Every Goal
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Whether you want to build lean athletic mass, drop body fat, improve stamina, or learn proper lifting form with a master trainer, we have a scientifically structured program for you.
          </p>
        </div>

        {/* 6 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program) => {
            const Icon = getIcon(program.icon);
            const programWaLink = generateWhatsAppLink(
              gymInfo.whatsappNumber,
              `Hello Fitness Point! I want to enquire about the "${program.title}" program. Please share workout schedules and trainer availability.`
            );

            return (
              <div
                key={program.id}
                className="group relative rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-600/50 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60"
              >
                <div>
                  {/* Top bar on card: Icon + Unboxed Metadata */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Unboxed metadata with typographic separator */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                      <span>{program.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-rose-400 font-semibold">{program.intensity}</span>
                    </div>
                  </div>

                  {/* Title and Tagline */}
                  <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-wide group-hover:text-rose-400 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-400 mt-1 mb-4">
                    {program.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                    {program.description}
                  </p>

                  {/* Program Benefits */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-neutral-900">
                    {program.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleBookProgram(program.title)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Book Trial</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={programWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-2.5 rounded bg-neutral-900 hover:bg-neutral-850 border border-neutral-800"
                  >
                    Enquire on WhatsApp
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
