import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { PLANS } from '../../data/mockData';
import { Check, Star, ArrowRight, ShieldCheck, ShoppingBag, Calendar, Clock } from 'lucide-react';

export const PlansView: React.FC = () => {
  const { currentUser, setPaymentModalPlanId } = useWosh();
  const [isQuarterly, setIsQuarterly] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(currentUser.planId);

  const activeSelectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-24 animate-in fade-in duration-200">
      {/* Title & Service Info */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#EBF6EE] text-[#005235] text-[11px] font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse"></span>
          Active in Ikoyi, VI, &amp; Lekki
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#1A1C19] mt-1">
          Choose your laundry plan
        </h1>
        <p className="text-sm text-[#5A635B] leading-relaxed">
          One monthly subscription. We deliver your WOSH basket, pick it up when full, and bring back freshly pressed clothes.
        </p>
      </div>

      {/* Hero Photo Banner (resembling Image 1) */}
      <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden shadow-sm bg-[#004D31]">
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80"
          alt="Clean folded laundry in basket"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <p className="text-xs font-semibold text-[#8CD6AE] uppercase tracking-wider">
              Lagos Doorstep Care
            </p>
            <p className="text-lg font-bold font-display text-white">
              Pure Peace of Mind
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8CD6AE]" />
            <span>100% Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Billing Cycle Switcher: Monthly vs Quarterly */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#EBE6DC]">
        <button
          onClick={() => setIsQuarterly(false)}
          className={`py-2.5 rounded-lg text-xs font-bold transition-all text-center ${
            !isQuarterly
              ? 'bg-white text-[#1A1C19] shadow-xs'
              : 'text-[#5A635B] hover:text-[#1A1C19]'
          }`}
        >
          Standard Monthly
        </button>
        <button
          onClick={() => setIsQuarterly(true)}
          className={`py-2.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
            isQuarterly
              ? 'bg-white text-[#1A1C19] shadow-xs'
              : 'text-[#5A635B] hover:text-[#1A1C19]'
          }`}
        >
          <span>Quarterly</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#8CD6AE] text-[#004D31] text-[10px] font-extrabold">
            -10%
          </span>
        </button>
      </div>

      {/* Plans List */}
      <div className="flex flex-col gap-4">
        {PLANS.map(plan => {
          const isCurrent = currentUser.planId === plan.id;
          const isSelected = selectedPlanId === plan.id;
          const displayPrice = isQuarterly ? plan.priceQuarterly : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-2xl p-5 border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#004D31] shadow-md ring-2 ring-[#004D31]'
                  : 'bg-white border-[#E6E1D8] shadow-xs hover:border-[#004D31]/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-5 flex items-center gap-1 bg-[#004D31] text-white px-3 py-0.5 rounded-full shadow-xs text-[10px] font-bold uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-current text-[#A7F3C9]" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-bold text-[#6D776E] tracking-wider uppercase">
                    {plan.badge}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[#1A1C19]">
                    {plan.name}
                  </h3>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    isSelected
                      ? 'bg-[#004D31] border-[#004D31] text-white'
                      : 'bg-[#FAF7F2] border-[#D5CEC2] text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-extrabold text-[#1A1C19] font-display">
                  ₦{displayPrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#5A635B]">
                  / month {isQuarterly && '(billed quarterly)'}
                </span>
              </div>

              {/* Features Pill List */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] flex flex-col gap-2 mb-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#1A1C19]">
                    <Check className="w-3.5 h-3.5 text-[#004D31] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#616962] pt-1">
                <span>{plan.tagline}</span>
                {isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EBF6EE] text-[#005235] font-bold">
                    Your Current Plan
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating CTA Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#E6E1D8] p-4 max-w-xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5A635B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#004D31]" />
          <span>30-day money-back guarantee · Pause or change plan anytime</span>
        </div>
        <button
          onClick={() => setPaymentModalPlanId(selectedPlanId)}
          className="w-full py-3.5 px-6 rounded-xl bg-[#004D31] text-white font-bold text-sm hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <span>
            Choose {activeSelectedPlan.name} (₦
            {(isQuarterly
              ? activeSelectedPlan.priceQuarterly
              : activeSelectedPlan.priceMonthly
            ).toLocaleString()}
            /mo)
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
