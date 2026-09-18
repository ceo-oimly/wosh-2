import React from 'react';
import { useWosh } from '../../context/WoshContext';
import { ShoppingBag, ArrowRight, CheckCircle, Info, Home, ShieldCheck } from 'lucide-react';

export const BasketView: React.FC = () => {
  const {
    currentUser,
    updateBasketStatus,
    setRequestPickupModalOpen
  } = useWosh();

  const statusOptions: Array<'Empty' | 'Almost full' | 'Full (Ready for pickup)'> = [
    'Empty',
    'Almost full',
    'Full (Ready for pickup)'
  ];

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
          My WOSH Basket
        </h1>
        <p className="text-sm text-[#5A635B]">
          Your durable laundry basket for everyday clothes, bedsheets, and towels.
        </p>
      </div>

      {/* Basket Visual Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E6E1D8] shadow-sm flex flex-col items-center text-center">
        {/* Physical Basket Illustration */}
        <div className="relative w-40 h-40 rounded-3xl bg-[#FAF7F2] border-2 border-dashed border-[#8CD6AE] flex flex-col items-center justify-center p-4 mb-5">
          <div className="w-24 h-28 rounded-2xl bg-[#E8F7EE] border border-[#CDECD7] flex flex-col items-center justify-end p-2 relative shadow-inner overflow-hidden">
            {/* Clothes Fill representation based on state */}
            <div
              className="w-full bg-[#004D31] rounded-lg transition-all duration-500 opacity-90 flex items-center justify-center text-[10px] text-[#A7F3C9] font-bold"
              style={{
                height:
                  currentUser.basketStatus === 'Full (Ready for pickup)'
                    ? '90%'
                    : currentUser.basketStatus === 'Almost full'
                    ? '65%'
                    : '15%',
              }}
            >
              {currentUser.basketStatus === 'Full (Ready for pickup)' && 'FULL'}
            </div>
          </div>
          <span className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#004D31] text-[#FAF7F2] text-xs font-bold tracking-wide">
            Basket #{currentUser.id === 'cust-1' ? '042' : '088'}
          </span>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-[#6D776E] mb-1">
          Current Basket Status
        </p>
        <h2 className="text-2xl font-bold font-display text-[#1A1C19] mb-4">
          {currentUser.basketStatus === 'Full (Ready for pickup)' ? 'Ready for pickup' : currentUser.basketStatus}
        </h2>

        {/* Status Selector Pills */}
        <div className="w-full grid grid-cols-3 gap-2 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E6E1D8] mb-6">
          {statusOptions.map(opt => {
            const isSelected = currentUser.basketStatus === opt;
            const label = opt === 'Full (Ready for pickup)' ? 'Ready for pickup' : opt;
            return (
              <button
                key={opt}
                onClick={() => updateBasketStatus(opt)}
                className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all text-center ${
                  isSelected
                    ? 'bg-[#004D31] text-white shadow-xs'
                    : 'text-[#5A635B] hover:text-[#1A1C19]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => setRequestPickupModalOpen(true)}
          className="w-full py-4 px-6 rounded-xl bg-[#004D31] text-white font-bold text-sm tracking-wide uppercase hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <span>Request Pickup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Simple Details (No sensors, no Bluetooth, pure real-world convenience) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-4">
        <h3 className="text-sm font-bold text-[#1A1C19] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#004D31]" />
          About your physical WOSH basket
        </h3>

        <div className="space-y-3 text-xs text-[#5A635B] leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1A1C19]">Delivered right to your house:</strong> When you subscribe to WOSH in Lagos, we bring your clean woven basket directly to your flat or home.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1A1C19]">Holds about 20–25 items:</strong> Easily fits shirts, trousers, native wear, underwear, gym clothes, towels, or bedsheets.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1A1C19]">No weighing, no sorting:</strong> Just drop all your dirty laundry inside. Our team sorts colors, whites, and delicates before washing.
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Address preview */}
      <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E6E1D8] flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white border border-[#E6E1D8] text-[#004D31]">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6D776E]">
              Pickup Address
            </span>
            <p className="text-xs font-bold text-[#1A1C19]">{currentUser.pickupAddress}</p>
            <p className="text-[11px] text-[#616962]">{currentUser.area}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
