import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { ProblemType } from '../../types';
import { MessageSquare, Phone, AlertTriangle, HelpCircle, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const { currentUser, orders, reportProblem, showToast } = useWosh();

  const [selectedOrder, setSelectedOrder] = useState<string>(
    orders.find(o => o.customerId === currentUser.id)?.id || 'WSH-1082'
  );
  const [problemType, setProblemType] = useState<ProblemType>('Laundry not clean');
  const [problemText, setProblemText] = useState('');
  const [problemSubmitted, setProblemSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const problemOptions: ProblemType[] = [
    'Missing item',
    'Damaged item',
    'Laundry not clean',
    'Wrong item',
    'Late delivery',
    'Other',
  ];

  const faqs = [
    {
      q: 'What clothes can I put inside my WOSH basket?',
      a: 'Everything you wear! Everyday shirts, trousers, native wear (Senators, bubas), gym clothes, underwear, bedsheets, and towels. Our team sorts colors and whites carefully before washing.',
    },
    {
      q: 'What if my estate has strict gate security?',
      a: 'Our riders are familiar with estate security across Ikoyi, VI, and Lekki. Just write your estate gate instructions when requesting pickup, or tell the security to accept the delivery.',
    },
    {
      q: 'How fast do I get my clean clothes back?',
      a: 'For WOSH Regular and Plus, your clean and ironed laundry is delivered back within 24 hours. WOSH Premium members enjoy same-day / 12-hour turnaround.',
    },
    {
      q: 'Can you wash native wear like Agbada, Kaftan, and Lace?',
      a: 'Yes! We use gentle low-temperature washing, spot stain treatment, and steam pressing so your traditional wear looks crisp and sharp.',
    },
    {
      q: 'How do I pause or cancel my subscription?',
      a: 'You can pause anytime with zero penalty. If you are travelling outside Lagos or taking a break, just message us on WhatsApp or change your plan settings in one tap.',
    },
  ];

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) {
      showToast('Please describe the problem briefly');
      return;
    }
    reportProblem(selectedOrder, problemType, problemText);
    setProblemSubmitted(true);
    setProblemText('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
          Customer Support
        </h1>
        <p className="text-sm text-[#5A635B]">
          We are here to make laundry hassle-free for you in Lagos.
        </p>
      </div>

      {/* Quick Contact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://wa.me/2348032418920"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col items-center text-center gap-1.5 hover:bg-[#25D366]/20 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-[#1A1C19]">Chat on WhatsApp</span>
          <span className="text-[11px] text-[#25D366] font-semibold">Replies in &lt; 5 mins</span>
        </a>

        <a
          href="tel:08009674524"
          className="p-4 rounded-2xl bg-white border border-[#E6E1D8] flex flex-col items-center text-center gap-1.5 hover:bg-[#FAF7F2] transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-[#004D31] text-white flex items-center justify-center shadow-xs">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-[#1A1C19]">Call Customer Support</span>
          <span className="text-[11px] text-[#616962]">0800-WOSH-LAGOS</span>
        </a>
      </div>

      {/* Report a Problem Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#C2410C]" />
          <div>
            <h3 className="text-sm font-bold text-[#1A1C19]">Report a Problem</h3>
            <p className="text-[11px] text-[#5A635B]">
              Any issue with your laundry? Tell us and we will sort it out today.
            </p>
          </div>
        </div>

        {problemSubmitted ? (
          <div className="p-4 rounded-xl bg-[#E8F7EE] border border-[#CDECD7] text-center flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-[#004D31]" />
            <p className="text-xs font-bold text-[#004D31]">Problem Received!</p>
            <p className="text-[11px] text-[#5A635B] max-w-xs">
              Our team has been alerted and will reach out to you within 30 minutes.
            </p>
            <button
              onClick={() => setProblemSubmitted(false)}
              className="mt-1 text-xs font-semibold text-[#004D31] underline"
            >
              Report another issue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitProblem} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                Select Order
              </label>
              <select
                value={selectedOrder}
                onChange={e => setSelectedOrder(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] text-xs text-[#1A1C19] outline-none bg-white"
              >
                {orders
                  .filter(o => o.customerId === currentUser.id)
                  .map(o => (
                    <option key={o.id} value={o.id}>
                      Order {o.id} - {o.customerStatus} ({o.createdAt})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                What went wrong?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {problemOptions.map(p => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setProblemType(p)}
                    className={`py-2 px-2 rounded-lg border text-[11px] font-semibold transition-all ${
                      problemType === p
                        ? 'border-[#004D31] bg-[#E8F7EE] text-[#004D31]'
                        : 'border-[#E6E1D8] text-[#5A635B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1A1C19] block mb-1">
                Tell us more details
              </label>
              <textarea
                rows={2}
                value={problemText}
                onChange={e => setProblemText(e.target.value)}
                placeholder="e.g. One white shirt collar is still stained, or my delivery was late by 1 hour."
                className="w-full p-2.5 rounded-xl border border-[#D5CEC2] text-xs text-[#1A1C19] outline-none resize-none focus:border-[#004D31]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#004D31] text-white text-xs font-bold hover:bg-[#003E26] transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Support</span>
            </button>
          </form>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#1A1C19] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#004D31]" />
          Common Questions
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#F0ECE1] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-bold text-[#1A1C19] hover:bg-[#FAF7F2]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5A635B] transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 text-xs text-[#5A635B] leading-relaxed border-t border-[#F0ECE1] bg-[#FAF7F2]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
