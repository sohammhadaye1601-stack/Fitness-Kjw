import React from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { Star, Quote, CheckCircle, TrendingUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { store } = useFitnessCMS();
  const { testimonials } = store;

  return (
    <section className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-6 h-[2px] bg-rose-600"></span>
            <span>Real Member Progress</span>
            <span className="w-6 h-[2px] bg-rose-600"></span>
          </div>
          <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            Transformation Stories & Reviews
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Consistency in training yields unquestionable outcomes. Read how everyday members transformed their health and confidence with Fitness Point.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-neutral-950 border border-neutral-800 p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors relative"
            >
              <div>
                {/* Header: Star Rating + Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-700" />
                </div>

                {/* Key Achievement Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-950/60 border border-rose-900/40 text-rose-400 text-xs font-semibold mb-4">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.achievement}</span>
                </div>

                {/* Quote Text */}
                <p className="text-neutral-300 text-sm leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                <div>
                  <h4 className="font-athletic text-lg font-bold uppercase text-white tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {t.roleOrGoal} · <span className="font-mono text-neutral-500">{t.duration}</span>
                  </p>
                </div>
                {t.verifiedMember && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold" title="Verified Gym Member">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Member</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note on sample / editable content */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          * Reviews and transformation stories can be managed and updated in real-time through the Gym Owner Admin Panel.
        </p>
      </div>
    </section>
  );
};
