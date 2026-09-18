import React, { useState } from 'react';
import { WoshProvider, useWosh } from './context/WoshContext';
import { Header } from './components/Header';
import { CustomerHome } from './components/customer/CustomerHome';
import { BasketView } from './components/customer/BasketView';
import { TrackLaundryView } from './components/customer/TrackLaundryView';
import { OrderHistoryView } from './components/customer/OrderHistoryView';
import { PlansView } from './components/customer/PlansView';
import { PreferencesView } from './components/customer/PreferencesView';
import { HelpSupportView } from './components/customer/HelpSupportView';
import { BottomNav } from './components/customer/BottomNav';
import { RequestPickupModal } from './components/customer/RequestPickupModal';
import { PaymentModal } from './components/customer/PaymentModal';
import { OperationsDashboard } from './components/operations/OperationsDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Smartphone, Monitor, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, activeTab, toastMessage } = useWosh();
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'fluid'>('mobile');

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col selection:bg-[#8CD6AE] selection:text-[#004D31]">
      <Header />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#004D31] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-[#8CD6AE]/30 pointer-events-auto">
            <CheckCircle2 className="w-4 h-4 text-[#8CD6AE]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Role-Specific View */}
      {role === 'customer' ? (
        <main className="flex-1 flex flex-col items-center justify-start w-full py-4 px-3 sm:px-4">
          {/* Mobile frame toggle switch */}
          <div className="w-full max-w-xl flex items-center justify-between mb-3 text-xs text-[#616962] px-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#005235]">
              Customer App Preview
            </span>
            <div className="flex items-center gap-1 bg-[#EEE8DC] p-0.5 rounded-lg text-[11px] font-semibold">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  deviceMode === 'mobile' ? 'bg-white text-[#1A1C19] shadow-xs' : 'text-[#616962]'
                }`}
                title="Mobile Screen Frame"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setDeviceMode('fluid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  deviceMode === 'fluid' ? 'bg-white text-[#1A1C19] shadow-xs' : 'text-[#616962]'
                }`}
                title="Expanded Fluid View"
              >
                <Monitor className="w-3 h-3" />
                <span>Fluid</span>
              </button>
            </div>
          </div>

          {/* Customer Container */}
          <div
            className={`w-full transition-all duration-300 ${
              deviceMode === 'mobile'
                ? 'max-w-md bg-[#FAF7F2] rounded-3xl shadow-xl border border-[#E6E1D8] p-4 sm:p-5 relative pb-20'
                : 'max-w-xl pb-24'
            }`}
          >
            {activeTab === 'home' && <CustomerHome />}
            {activeTab === 'basket' && <BasketView />}
            {activeTab === 'track' && <TrackLaundryView />}
            {activeTab === 'orders' && <OrderHistoryView />}
            {activeTab === 'plan' && <PlansView />}
            {activeTab === 'preferences' && <PreferencesView />}
            {activeTab === 'help' && <HelpSupportView />}
          </div>

          <BottomNav />
          <RequestPickupModal />
          <PaymentModal />
        </main>
      ) : role === 'operations' ? (
        <main className="flex-1 w-full py-6">
          <OperationsDashboard />
        </main>
      ) : (
        <main className="flex-1 w-full py-6">
          <AdminDashboard />
        </main>
      )}
    </div>
  );
};

export default function App() {
  return (
    <WoshProvider>
      <MainContent />
    </WoshProvider>
  );
}
