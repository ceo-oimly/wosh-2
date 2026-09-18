import React, { useState } from 'react';
import { useWosh } from '../../context/WoshContext';
import { Sparkles, Check, Shirt, Save, Info } from 'lucide-react';

export const PreferencesView: React.FC = () => {
  const { currentUser, updatePreferences } = useWosh();

  const fragranceOptions = [
    { name: 'Lemongrass & White Amber', desc: 'Crisp, citrusy & clean. Our most loved Lagos scent.' },
    { name: 'Fresh Breeze', desc: 'Mild airy scent, like sun-dried cotton.' },
    { name: 'Crisp Lavender', desc: 'Subtle herbal calming fragrance.' },
    { name: 'Unscented / No Scent', desc: '100% fragrance-free for sensitive skin.' },
  ];

  const starchOptions = [
    { name: 'Soft (No Starch)', desc: 'Natural soft cotton feel for t-shirts & loungewear.' },
    { name: 'Medium Crisp (Traditional wear)', desc: 'Perfect for Senator styles, office shirts, and casual kaftans.' },
    { name: 'Extra Crisp', desc: 'Firm starch for heavy native agbada and formal traditional wear.' },
  ];

  const deliveryStyleOptions: Array<'Shirts on hangers' | 'Everything folded'> = [
    'Shirts on hangers',
    'Everything folded',
  ];

  const [selectedFragrance, setSelectedFragrance] = useState(currentUser.preferences.fragrance);
  const [selectedStarch, setSelectedStarch] = useState(currentUser.preferences.starch);
  const [selectedStyle, setSelectedStyle] = useState(currentUser.preferences.deliveryStyle);
  const [notes, setNotes] = useState(currentUser.preferences.specialNotes || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      fragrance: selectedFragrance,
      starch: selectedStarch,
      deliveryStyle: selectedStyle as any,
      specialNotes: notes,
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-display text-[#1A1C19]">
          Laundry Preferences
        </h1>
        <p className="text-sm text-[#5A635B]">
          Tell us how you like your clothes washed, ironed, and delivered.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Fragrance Profile */}
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#004D31]" />
            <h3 className="text-sm font-bold text-[#1A1C19]">Fragrance</h3>
          </div>
          <div className="space-y-2">
            {fragranceOptions.map(opt => {
              const isSelected = selectedFragrance.includes(opt.name.split(' ')[0]);
              return (
                <div
                  key={opt.name}
                  onClick={() => setSelectedFragrance(opt.name)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                    isSelected
                      ? 'border-[#004D31] bg-[#E8F7EE]/60 ring-1 ring-[#004D31]'
                      : 'border-[#E6E1D8] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#1A1C19]">{opt.name}</p>
                    <p className="text-[11px] text-[#5A635B] mt-0.5">{opt.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 ${
                      isSelected
                        ? 'bg-[#004D31] border-[#004D31] text-white'
                        : 'border-[#D5CEC2] text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Starch Preference */}
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Shirt className="w-4 h-4 text-[#004D31]" />
            <h3 className="text-sm font-bold text-[#1A1C19]">Starch Preference</h3>
          </div>
          <div className="space-y-2">
            {starchOptions.map(opt => {
              const isSelected = selectedStarch.includes(opt.name.split(' ')[0]);
              return (
                <div
                  key={opt.name}
                  onClick={() => setSelectedStarch(opt.name)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                    isSelected
                      ? 'border-[#004D31] bg-[#E8F7EE]/60 ring-1 ring-[#004D31]'
                      : 'border-[#E6E1D8] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#1A1C19]">{opt.name}</p>
                    <p className="text-[11px] text-[#5A635B] mt-0.5">{opt.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 ${
                      isSelected
                        ? 'bg-[#004D31] border-[#004D31] text-white'
                        : 'border-[#D5CEC2] text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Style */}
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#1A1C19]">Delivery Style</h3>
          <div className="grid grid-cols-2 gap-2">
            {deliveryStyleOptions.map(style => (
              <button
                type="button"
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  selectedStyle === style
                    ? 'border-[#004D31] bg-[#E8F7EE] text-[#004D31] ring-1 ring-[#004D31]'
                    : 'border-[#E6E1D8] bg-white text-[#5A635B] hover:bg-[#FAF7F2]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col gap-2">
          <h3 className="text-sm font-bold text-[#1A1C19]">Special Laundry Notes</h3>
          <textarea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Please do not bleach my white native wear. Separate gym clothes."
            className="w-full p-3 rounded-xl border border-[#D5CEC2] text-xs text-[#1A1C19] focus:border-[#004D31] focus:ring-2 focus:ring-[#004D31]/10 outline-none resize-none"
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-[#004D31] text-white font-bold text-sm hover:bg-[#003E26] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};
