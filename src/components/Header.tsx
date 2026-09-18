import React, { useState } from 'react';
import { useWosh } from '../context/WoshContext';
import { WoshLogo } from './WoshLogo';
import { User, Shield, HelpCircle, ChevronDown, Check, Smartphone, Layers } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, currentUser, switchUser, allCustomers, setActiveTab } = useWosh();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE6DC] px-4 py-3 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Logo & Lagos Location badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setRole('customer');
              setActiveTab('home');
            }}
            className="text-left focus:outline-none"
            title="WOSH Lagos Home"
          >
            <WoshLogo size="sm" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF6EE] border border-[#CDECD7] text-[#005235] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse"></span>
            <span>Ikoyi • VI • Lekki</span>
          </div>
        </div>

        {/* Center: Mode / Role Switcher */}
        <div className="flex items-center bg-[#EEE8DC] p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setRole('customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'customer'
                ? 'bg-[#004D31] text-white shadow-xs'
                : 'text-[#5A635B] hover:text-[#1A1C19]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Customer</span> App
          </button>

          <button
            onClick={() => setRole('operations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'operations'
                ? 'bg-[#004D31] text-white shadow-xs'
                : 'text-[#5A635B] hover:text-[#1A1C19]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Operations
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-[#004D31] text-white shadow-xs'
                : 'text-[#5A635B] hover:text-[#1A1C19]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Right: User Switcher / Help */}
        <div className="flex items-center gap-2">
          {role === 'customer' && (
            <button
              onClick={() => setActiveTab('help')}
              className="p-2 rounded-xl text-[#5A635B] hover:text-[#004D31] hover:bg-[#EAE4D7] transition-colors"
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}

          {/* User selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#E6E1D8] hover:border-[#004D31]/30 transition-all text-left shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#004D31] text-[#A7F3C9] flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-[#1A1C19] hidden md:inline max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A635B]" />
            </button>

            {userDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E6E1D8] p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#F0ECE1]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6D776E]">Switch Customer</p>
                  <p className="text-xs text-[#1A1C19] font-medium truncate">{currentUser.name}</p>
                </div>
                <div className="py-1">
                  {allCustomers.map(c => (
                    <button
                      key={c.id}
                      onClick={() => switchUser(c.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-[#FAF7F2] text-xs transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-[#1A1C19]">{c.name}</p>
                        <p className="text-[11px] text-[#616962]">{c.area}</p>
                      </div>
                      {c.id === currentUser.id && (
                        <Check className="w-4 h-4 text-[#004D31]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
