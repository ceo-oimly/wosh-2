import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { X, Calendar, Clock, MapPin, FileText, CheckCircle2, Shield } from 'lucide-react';

export const RequestPickupModal: React.FC = () => {
  const {
    requestPickupModalOpen,
    setRequestPickupModalOpen,
    currentUser,
    requestPickup,
    showToast
  } = useWosh();

  const timeSlots = [
    'Today, 2:00 PM - 4:00 PM',
    'Today, 5:00 PM - 7:00 PM',
    'Tomorrow, 8:00 AM - 10:00 AM',
    'Tomorrow, 11:00 AM - 1:00 PM',
    'Tomorrow, 2:00 PM - 4:00 PM',
  ];

  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [address, setAddress] = useState(currentUser.pickupAddress);
  const [instructions, setInstructions] = useState(currentUser.pickupInstructions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!requestPickupModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      showToast('Please enter your pickup address');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      requestPickup(selectedSlot, address, instructions);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6E1D8] max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0ECE1] sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#005235]">
              WOSH Lagos
            </span>
            <h2 className="text-xl font-bold font-display text-[#1A1C19]">
              Request Laundry Pickup
            </h2>
          </div>
          <button
            onClick={() => setRequestPickupModalOpen(false)}
            className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#EEE8DC] flex items-center justify-center text-[#5A635B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Choose pickup time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D776E] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#004D31]" />
              Choose Pickup Time
            </label>
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    selectedSlot === slot
                      ? 'border-[#004D31] bg-[#E8F7EE] text-[#004D31] ring-1 ring-[#004D31]'
                      : 'border-[#E6E1D8] bg-white text-[#1A1C19] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {slot}
                  </span>
                  {selectedSlot === slot && (
                    <CheckCircle2 className="w-4 h-4 text-[#004D31]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Confirm Address */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D776E] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#004D31]" />
              Pickup Address
            </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="e.g. Flat 4B, 14 Glover Road, Ikoyi"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#004D31] focus:ring-2 focus:ring-[#004D31]/10 text-xs text-[#1A1C19] outline-none"
              required
            />
            <span className="text-[11px] text-[#616962]">
              Area: {currentUser.area}
            </span>
          </div>

          {/* Pickup Instructions */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D776E] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#004D31]" />
              Pickup Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="e.g. Leave with estate gate security, or call me when you reach the house"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#004D31] focus:ring-2 focus:ring-[#004D31]/10 text-xs text-[#1A1C19] outline-none resize-none"
            />
          </div>

          {/* Guarantee / Info */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] text-xs text-[#5A635B] flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#004D31] flex-shrink-0 mt-0.5" />
            <span>
              Our dispatch rider will arrive with an ID badge and hand you a tagged receipt slip when taking your WOSH basket.
            </span>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#004D31] text-white font-bold text-sm hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Pickup...</span>
              ) : (
                <span>Confirm & Request Pickup</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
