import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { PLANS } from '../../data/mockData';
import { X, CreditCard, Building2, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { paymentModalPlanId, setPaymentModalPlanId, changePlan, currentUser, showToast } = useWosh();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('5399 •••• •••• 4012');
  const [expiry, setExpiry] = useState('09/28');
  const [cvv, setCvv] = useState('419');

  if (!paymentModalPlanId) return null;

  const plan = PLANS.find(p => p.id === paymentModalPlanId) || PLANS[1];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        changePlan(plan.id);
        setIsSuccess(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6E1D8] max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0ECE1] sticky top-0 bg-white z-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#005235]">
              Secure Payment
            </span>
            <h2 className="text-xl font-bold font-display text-[#1A1C19]">
              Subscribe to WOSH
            </h2>
          </div>
          <button
            onClick={() => setPaymentModalPlanId(null)}
            className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#EEE8DC] flex items-center justify-center text-[#5A635B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#E8F7EE] text-[#004D31] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#1A1C19] mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-[#5A635B] max-w-xs">
              Welcome to {plan.name}. Your physical WOSH basket and welcome pack are scheduled for delivery.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 flex flex-col gap-5">
            {/* Plan summary */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#616962]">Selected Plan</p>
                <h4 className="text-base font-bold text-[#1A1C19]">{plan.name}</h4>
                <p className="text-[11px] text-[#005235]">{plan.pickupsPerMonth} pickups / month</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#616962]">Amount to Pay</p>
                <p className="text-xl font-extrabold text-[#1A1C19] font-display">
                  ₦{plan.priceMonthly.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6D776E]">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#004D31] bg-[#E8F7EE] text-[#004D31]'
                      : 'border-[#E6E1D8] bg-white text-[#5A635B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Debit / Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-[#004D31] bg-[#E8F7EE] text-[#004D31]'
                      : 'border-[#E6E1D8] bg-white text-[#5A635B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Bank Transfer</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] text-xs font-mono outline-none focus:border-[#004D31]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={e => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] text-xs font-mono outline-none focus:border-[#004D31]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] text-xs font-mono outline-none focus:border-[#004D31]"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8] text-xs space-y-2">
                <p className="font-semibold text-[#1A1C19]">Transfer directly to WOSH Nigeria:</p>
                <div className="bg-white p-3 rounded-lg border border-[#E6E1D8] space-y-1">
                  <p className="text-[#616962]">Bank: <strong className="text-[#1A1C19]">GTBank</strong></p>
                  <p className="text-[#616962]">Account Name: <strong className="text-[#1A1C19]">WOSH Laundry Services Ltd</strong></p>
                  <p className="text-[#616962]">Account Number: <strong className="text-[#004D31] font-mono text-sm">0628391042</strong></p>
                </div>
                <p className="text-[11px] text-[#616962]">
                  Your subscription will activate immediately once payment is detected.
                </p>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-[#616962] justify-center">
              <Lock className="w-3.5 h-3.5 text-[#004D31]" />
              <span>Secured 256-bit payment in Nigerian Naira (₦)</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-[#004D31] text-white font-bold text-sm hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming ₦{plan.priceMonthly.toLocaleString()}...</span>
              ) : (
                <span>Pay ₦{plan.priceMonthly.toLocaleString()} Now</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
