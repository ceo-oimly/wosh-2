import React from 'react';
import { useWosh } from '../../context/WoshContext';
import { PLANS } from '../../data/mockData';
import { ShoppingBag, ArrowRight, Clock, CheckCircle2, Sparkles, MapPin, ChevronRight, Phone, RefreshCw } from 'lucide-react';

export const CustomerHome: React.FC = () => {
  const {
    currentUser,
    currentActiveOrder,
    setActiveTab,
    setRequestPickupModalOpen,
    updateBasketStatus,
    setPaymentModalPlanId
  } = useWosh();

  const currentPlan = PLANS.find(p => p.id === currentUser.planId) || PLANS[1];
  const pickupsLeft = Math.max(0, currentUser.pickupsTotal - currentUser.pickupsUsed);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleBasketIsFull = () => {
    updateBasketStatus('Full (Ready for pickup)');
    setRequestPickupModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 pb-10 max-w-xl mx-auto animate-in fade-in duration-200">
      {/* Greeting Banner */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-[#005235] font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>{currentUser.area}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#1A1C19] tracking-tight">
          {getGreeting()}, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-[#5A635B]">
          Laundry is now one less thing to think about.
        </p>
      </div>

      {/* Main Action Card: YOUR WOSH BASKET */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E1D8] shadow-sm relative overflow-hidden">
        {/* Subtle decorative background ring */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#EBF6EE]/60 pointer-events-none" />

        <div className="flex items-start justify-between relative z-10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F7EE] flex items-center justify-center text-[#004D31]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6D776E]">
                Your WOSH Basket
              </p>
              <h2 className="text-xl font-bold text-[#1A1C19] font-display">
                {currentUser.basketStatus}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('basket')}
            className="text-xs font-semibold text-[#005235] hover:underline flex items-center gap-0.5 mt-1"
          >
            Basket Settings <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual fill meter */}
        <div className="w-full bg-[#F0EBE1] h-2.5 rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-[#004D31] rounded-full transition-all duration-300"
            style={{
              width:
                currentUser.basketStatus === 'Full (Ready for pickup)'
                  ? '100%'
                  : currentUser.basketStatus === 'Almost full'
                  ? '80%'
                  : '15%',
            }}
          />
        </div>

        <p className="text-xs text-[#5A635B] mb-5 leading-relaxed">
          Put your clothes inside your durable WOSH basket anytime. When full, tap the button below and our rider will come for pickup.
        </p>

        {/* Big Prominent Action Button */}
        <button
          onClick={handleBasketIsFull}
          className="w-full py-4 px-6 rounded-xl bg-[#004D31] text-white font-bold text-sm tracking-wide uppercase hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <span>MY BASKET IS FULL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Current Laundry Status Card (if active order exists) */}
      {currentActiveOrder && (
        <div className="bg-[#FAF4EB] rounded-2xl p-5 border border-[#E5DEC7] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A612D] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping" />
              Laundry Status
            </span>
            <button
              onClick={() => setActiveTab('track')}
              className="text-xs font-semibold text-[#004D31] hover:underline flex items-center gap-1"
            >
              Track Laundry <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDE3D0] flex items-center justify-center text-[#004D31] flex-shrink-0 mt-0.5">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A1C19]">
                Your laundry is being {currentActiveOrder.customerStatus.toLowerCase() === 'washing' ? 'washed' : currentActiveOrder.customerStatus.toLowerCase()}
              </h3>
              <p className="text-xs text-[#5A635B] flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#004D31]" />
                Expected delivery: <strong className="text-[#1A1C19]">{currentActiveOrder.expectedDelivery}</strong>
              </p>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-3 text-xs flex items-center justify-between text-[#3F4942]">
            <span>Order {currentActiveOrder.id} • {currentActiveOrder.itemCountEstimated} items</span>
            <span className="font-semibold text-[#005235]">Rider assigned</span>
          </div>
        </div>
      )}

      {/* Plan Summary Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D776E]">
              My Plan
            </span>
            <h3 className="text-lg font-bold text-[#1A1C19] font-display">
              {currentPlan.name}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('plan')}
            className="text-xs font-semibold text-[#005235] hover:underline"
          >
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#F0ECE1] my-3">
          <div className="flex flex-col">
            <span className="text-xs text-[#616962]">Monthly allowance</span>
            <span className="text-sm font-bold text-[#1A1C19]">
              {currentUser.pickupsTotal} pickups per month
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#616962]">Balance this month</span>
            <span className="text-sm font-bold text-[#005235]">
              {pickupsLeft} pickup{pickupsLeft === 1 ? '' : 's'} left
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[#5A635B]">
          <span>Renews on the 1st of next month</span>
          <span className="font-semibold text-[#1A1C19]">₦{currentPlan.priceMonthly.toLocaleString()}/mo</span>
        </div>
      </div>

      {/* Laundry Preferences Shortcut */}
      <div 
        onClick={() => setActiveTab('preferences')}
        className="bg-white rounded-2xl p-4 border border-[#E6E1D8] shadow-xs flex items-center justify-between cursor-pointer hover:border-[#004D31]/40 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F7EE] flex items-center justify-center text-[#004D31]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1A1C19]">Laundry Preferences</p>
            <p className="text-[11px] text-[#616962]">
              {currentUser.preferences.fragrance} • {currentUser.preferences.starch}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#616962]" />
      </div>

      {/* How WOSH Works (Plain Lagos English) */}
      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EBE6DC]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D776E] mb-3">
          How WOSH Works for you
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white border border-[#EBE6DC]">
            <span className="font-bold text-[#004D31]">1. Fill your basket</span>
            <span className="text-[#5A635B]">Drop your clothes inside your WOSH basket at your own pace.</span>
          </div>
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white border border-[#EBE6DC]">
            <span className="font-bold text-[#004D31]">2. Tap full button</span>
            <span className="text-[#5A635B]">Tap "My basket is full". Our rider comes to your Lagos doorstep.</span>
          </div>
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white border border-[#EBE6DC]">
            <span className="font-bold text-[#004D31]">3. Fresh delivery</span>
            <span className="text-[#5A635B]">We wash, steam iron, and bring it back fresh within 24 hours.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
