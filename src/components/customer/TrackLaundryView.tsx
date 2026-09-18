import React from 'react';
import { useWosh } from '../../context/WoshContext';
import { CustomerStatus } from '../../types';
import { RIDERS } from '../../data/mockData';
import {
  Clock,
  Phone,
  MessageSquare,
  AlertCircle,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const TrackLaundryView: React.FC = () => {
  const { currentActiveOrder, orders, currentUser, setActiveTab, setRequestPickupModalOpen } = useWosh();

  // Find the latest order if no active ongoing order
  const displayOrder = currentActiveOrder || orders.find(o => o.customerId === currentUser.id);

  const steps: CustomerStatus[] = [
    'Pickup confirmed',
    'Picked up',
    'At WOSH',
    'Washing',
    'Checking',
    'Ready',
    'On the way',
    'Delivered',
  ];

  if (!displayOrder) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-[#E6E1D8] max-w-xl mx-auto my-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#5A635B] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-display text-[#1A1C19] mb-1">
          No Active Laundry
        </h2>
        <p className="text-xs text-[#5A635B] max-w-xs mb-6">
          You don't have any laundry with us right now. Fill your basket and tap below when ready!
        </p>
        <button
          onClick={() => setRequestPickupModalOpen(true)}
          className="py-3 px-6 rounded-xl bg-[#004D31] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#003E26] transition-all"
        >
          Request Pickup
        </button>
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(displayOrder.customerStatus);
  const assignedRider = RIDERS.find(r => r.id === displayOrder.assignedRiderId) || RIDERS[0];

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#005235]">
            Order {displayOrder.id}
          </span>
          <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
            Track My Laundry
          </h1>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
            displayOrder.customerStatus === 'Delivered'
              ? 'bg-[#E8F7EE] text-[#005235] border border-[#CDECD7]'
              : 'bg-[#FFF6E6] text-[#B45309] border border-[#FDE68A]'
          }`}
        >
          {displayOrder.customerStatus}
        </span>
      </div>

      {/* Main Status Hero Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E1D8] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4 mb-5">
          <div>
            <p className="text-xs text-[#616962]">Expected Delivery</p>
            <p className="text-base font-bold text-[#1A1C19] flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-[#004D31]" />
              {displayOrder.expectedDelivery}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#616962]">Clothes Count</p>
            <p className="text-sm font-bold text-[#1A1C19]">
              ~{displayOrder.itemCountEstimated} items
            </p>
          </div>
        </div>

        {/* 8-Step Progress Line with Simple Words */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EBE6DC]">
          {steps.map((stepName, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isUpcoming = idx > currentStepIndex;

            return (
              <div key={stepName} className="relative flex items-start gap-3">
                {/* Step circle marker */}
                <div
                  className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                    isCompleted
                      ? 'bg-[#004D31] border-[#004D31] text-white'
                      : isCurrent
                      ? 'bg-[#E8F7EE] border-[#004D31] text-[#004D31] ring-4 ring-[#E8F7EE]'
                      : 'bg-white border-[#D5CEC2] text-[#8C938D]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm font-bold ${
                      isCurrent
                        ? 'text-[#004D31] text-base'
                        : isCompleted
                        ? 'text-[#1A1C19]'
                        : 'text-[#8C938D]'
                    }`}
                  >
                    {stepName}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-[#5A635B] mt-0.5 leading-relaxed">
                      {stepName === 'Pickup confirmed' &&
                        'We received your request. Rider is scheduled for your pickup slot.'}
                      {stepName === 'Picked up' &&
                        'Our rider has collected your WOSH basket from your address.'}
                      {stepName === 'At WOSH' &&
                        'Your laundry has safely arrived at our Lagos center and is being sorted.'}
                      {stepName === 'Washing' &&
                        'We are washing your clothes with pure filtered water and eco-safe soap.'}
                      {stepName === 'Checking' &&
                        'Our team is steam pressing, ironing, and checking every item.'}
                      {stepName === 'Ready' &&
                        'All clean, crisp, and packed back neatly in your basket.'}
                      {stepName === 'On the way' &&
                        'Rider is on the road heading to your doorstep now.'}
                      {stepName === 'Delivered' &&
                        'Handed over to you. Ready to wear!'}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rider Information Card (Simple & Practical) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#E8F7EE] flex items-center justify-center font-bold text-sm text-[#004D31]">
            {assignedRider.name.charAt(0)}
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6D776E]">
              Your WOSH Rider
            </span>
            <h4 className="text-sm font-bold text-[#1A1C19]">{assignedRider.name}</h4>
            <p className="text-xs text-[#5A635B]">{assignedRider.vehicle} • {assignedRider.assignedArea}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${assignedRider.phone}`}
            className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-center text-[#004D31] hover:bg-[#E8F7EE] transition-colors"
            title="Call Rider"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/234${assignedRider.phone.replace(/\D/g, '').slice(-10)}`}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
            title="WhatsApp Rider"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Pickup Details & Preferences Summary */}
      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E6E1D8] flex flex-col gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1A1C19]">Delivery Address: </strong>
            <span className="text-[#5A635B]">{displayOrder.pickupAddress}, {displayOrder.area}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1A1C19]">Applied Preferences: </strong>
            <span className="text-[#5A635B]">{displayOrder.fragrance} • {displayOrder.starch}</span>
          </div>
        </div>

        {displayOrder.pickupInstructions && (
          <div className="pt-2 border-t border-[#E6E1D8] text-[11px] text-[#616962]">
            <strong>Instructions:</strong> "{displayOrder.pickupInstructions}"
          </div>
        )}
      </div>

      {/* Quick Problem Help Link */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E6E1D8]">
        <div className="flex items-center gap-2 text-xs text-[#5A635B]">
          <AlertCircle className="w-4 h-4 text-[#C2410C]" />
          <span>Have an issue with this laundry order?</span>
        </div>
        <button
          onClick={() => setActiveTab('help')}
          className="text-xs font-bold text-[#004D31] hover:underline flex items-center gap-1"
        >
          Report Problem <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
