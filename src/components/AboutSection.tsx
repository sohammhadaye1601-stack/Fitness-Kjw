import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink } from '../utils/fitnessLogic';
import { Check, Shield, Flame, Award, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { store, setIsTrialModalOpen } = useFitnessCMS();
  const { whatsappNumber, cityArea } = store.gymInfo;

  const waUrl = generateWhatsAppLink(
    whatsappNumber,
    'Hello Fitness Point! I would like to learn more about your gym facilities and book a tour.'
  );

  const pillars = [
    {
      title: 'Real Iron & Zero Crowding Fluff',
      desc: 'Engineered for individuals who take their workouts seriously. Multiple power racks, competition grade barbells, and dumbells up to 50kg so you never wait around.',
      icon: Flame,
    },
    {
      title: 'Biomechanically Engineered Lines',
      desc: 'Selected pin-loaded and plate-loaded machines designed to hit target muscle bellies along natural physiological paths, maximizing growth while saving your joints.',
      icon: Shield,
    },
    {
      title: 'Science Over Gimmicks',
      desc: 'Our training philosophy rejects quick-fix social media fads. We train with progressive tension, measurable recovery, and real nutritional consistency.',
      icon: Award,
    },
    {
      title: 'Clean, Focused Environment',
      desc: 'Strict hygiene protocols, sanitized weight benches, clean locker rooms, purified chilled water, and an uplifting, supportive training brotherhood.',
      icon: Check,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
              <span className="w-6 h-[2px] bg-rose-600"></span>
              <span>About Fitness Point</span>
            </div>
            <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              A Serious Gym For <span className="text-rose-600">Serious Results</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              We founded Fitness Point with one clear mission: to provide an unapologetically dedicated training space where everyday people unlock extraordinary physical strength, stamina, and confidence.
            </p>
          </div>
          <div className="text-xs text-neutral-400 border border-neutral-800 p-4 rounded-lg bg-neutral-900/60 max-w-xs shrink-0">
            <span className="text-rose-400 font-bold block mb-1">LOCAL GYM FACILITY</span>
            <span>Located in {cityArea}. Equipped with world-class resistance apparatus and personal coaching.</span>
          </div>
        </div>

        {/* 2-Column Split: Visual Storytelling & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image with Accent Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img
                src="/src/assets/images/gym_interior_floor_1794198819156.jpg"
                alt="Fitness Point Main Training Arena"
                className="w-full h-[420px] object-cover filter brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-rose-500 tracking-wider uppercase">Training Environment</p>
                    <p className="text-sm font-bold text-white mt-0.5">High Performance Strength Floor</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 tabular-nums">100% Sanitized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Why Choose Us */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white font-athletic tracking-wide uppercase">
                Our Fitness Philosophy
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                Fitness Point isn't a passive spa or an overcrowded commercial warehouse. It is a purpose-built fitness hub designed for athletes, beginners, busy professionals, and everyone striving for peak vitality.
              </p>
              <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                Whether your target is dropping 15 kilos of body fat, conquering your first bodyweight pull-up, or breaking your deadlift personal record, our certified floor coaches stand right by your side with zero judgment and 100% encouragement.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-rose-950/60 text-rose-500 border border-rose-900/40">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-neutral-100">{pillar.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Book Free Trial Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
              >
                Ask Questions on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
