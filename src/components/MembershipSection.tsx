import React, { useState } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { generateWhatsAppLink, calculateSavings } from '../utils/fitnessLogic';
import { Check, X, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const { store, setIsTrialModalOpen, setSelectedPlanForTrial } = useFitnessCMS();
  const { membershipPlans, gymInfo } = store;
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanForTrial(planName);
    setIsTrialModalOpen(true);
  };

  return (
    <section id="memberships" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-6 h-[2px] bg-rose-600"></span>
            <span>Transparent Membership Pricing</span>
            <span className="w-6 h-[2px] bg-rose-600"></span>
          </div>
          <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            Choose Your Level of Commitment
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            No hidden admission fees. Zero cancellation penalties. Pick the plan that matches your training ambitions and start building your dream physique today.
          </p>

          {/* Interactive Segmented Control for Billing Duration */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  billingCycle === 'quarterly'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                3 Months <span className="text-[10px] text-neutral-300 font-normal ml-0.5">(Save ~10%)</span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                12 Months <span className="text-[10px] text-neutral-300 font-normal ml-0.5">(Best Value)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Premium Membership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {membershipPlans.map((plan) => {
            // Price calculation based on selected billing cycle
            let price = plan.priceMonthly;
            let cycleLabel = '/ month';
            if (billingCycle === 'quarterly') {
              price = plan.priceQuarterly;
              cycleLabel = '/ quarter (3 mos)';
            } else if (billingCycle === 'annual') {
              price = plan.priceAnnual;
              cycleLabel = '/ year (12 mos)';
            }

            const savings = calculateSavings(plan.priceMonthly, billingCycle, price);

            // WhatsApp link with customized message mentioning specific plan & cycle
            const waCustomMsg = `Hello Fitness Point! I want to join with the ${plan.name} (${billingCycle} option - ₹${price.toLocaleString('en-IN')}). Please share the payment and enrollment details.`;
            const waPlanLink = generateWhatsAppLink(gymInfo.whatsappNumber, waCustomMsg);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-rose-600 shadow-2xl shadow-rose-950/40 lg:-translate-y-2'
                    : 'bg-neutral-950 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Popular / VIP Badge if present */}
                {plan.highlightBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {plan.highlightBadge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Title & Tagline */}
                  <div className="border-b border-neutral-800/80 pb-6 mb-6">
                    <h3 className="font-athletic text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>

                    {/* Price display with Tabular numerals */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-neutral-400">₹</span>
                      <span className="font-athletic text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                        {price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">{cycleLabel}</span>
                    </div>

                    {/* Savings display */}
                    {savings.percentSaved > 0 && (
                      <div className="mt-2 text-xs font-semibold text-emerald-400">
                        Saves ₹{savings.amountSaved.toLocaleString('en-IN')} ({savings.percentSaved}% off standard monthly rate)
                      </div>
                    )}
                  </div>

                  {/* Included features list */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      What's Included:
                    </p>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <div className="p-0.5 rounded-full bg-rose-950/80 text-rose-500 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}

                    {/* Excluded features if basic */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2 border-t border-neutral-900 mt-4">
                        {plan.notIncluded.map((notInc, nIdx) => (
                          <div key={nIdx} className="flex items-start gap-3 text-xs text-neutral-500">
                            <X className="w-3.5 h-3.5 text-neutral-600 mt-0.5 shrink-0" />
                            <span className="line-through">{notInc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions: WhatsApp Enquiry + Enroll CTA */}
                <div className="pt-6 border-t border-neutral-900 space-y-3">
                  <a
                    href={waPlanLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 transition-all flex items-center justify-center gap-2 group text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Enquiry for {plan.name}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan(`${plan.name} (${billingCycle})`)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee note */}
        <div className="mt-12 text-center text-xs text-neutral-500">
          <p>
            * All membership plans include free orientation, floor locker access during workout sessions, and filtered drinking water. Prices editable anytime in the Admin Dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};
