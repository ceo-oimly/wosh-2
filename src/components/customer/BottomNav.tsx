import React from 'react';
import { useWosh } from '../../context/WoshContext';
import { CustomerTab } from '../../types';
import { Home, ShoppingBag, Receipt, User, HelpCircle, Navigation } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, currentActiveOrder } = useWosh();

  const navItems: Array<{ id: CustomerTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }> = [
    { id: 'home', label: 'Home', icon: Home },
    {
      id: 'basket',
      label: 'Basket',
      icon: ShoppingBag,
      badge: currentUser.basketStatus === 'Full (Ready for pickup)' ? '!' : undefined,
    },
    {
      id: 'track',
      label: 'Tracking',
      icon: Navigation,
      badge: currentActiveOrder ? 'Live' : undefined,
    },
    { id: 'orders', label: 'Orders', icon: Receipt },
    { id: 'preferences', label: 'Preferences', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E6E1D8] pb-safe px-4 py-1.5 shadow-[0_-4px_16px_rgba(28,28,24,0.05)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-14 py-1 relative transition-colors ${
                isActive ? 'text-[#004D31]' : 'text-[#6D776E] hover:text-[#1A1C19]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full text-white ${
                      item.badge === 'Live' ? 'bg-[#008751] animate-pulse' : 'bg-[#D97706]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold mt-1 tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#004D31] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
