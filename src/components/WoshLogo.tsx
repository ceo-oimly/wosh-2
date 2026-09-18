import React from 'react';

interface WoshLogoProps {
  className?: string;
  showLagos?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export const WoshLogo: React.FC<WoshLogoProps> = ({
  className = '',
  showLagos = true,
  size = 'md',
  theme = 'dark'
}) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  const textColor = theme === 'light' ? 'text-white' : 'text-[#1A1C19]';
  const subColor = theme === 'light' ? 'text-[#8CD6AE]' : 'text-[#5A635B]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* WOSH Icon Badge */}
      <div className={`relative ${iconSize} rounded-xl bg-[#E8F7EE] p-1 flex items-center justify-center shadow-xs flex-shrink-0`}>
        <div className="w-full h-full rounded-lg bg-[#004D31] flex flex-col items-center justify-center p-0.5 relative">
          {/* Top Arc */}
          <div className="w-3.5 h-1 border-t-2 border-[#8CD6AE] rounded-t-full mb-0.5"></div>
          {/* Center Basket / Drum Circle */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#8CD6AE] shadow-xs"></div>
        </div>
      </div>

      {/* Wordmark & Lagos */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-extrabold tracking-tight ${titleSize} font-display ${textColor}`}>
            WOSH
          </span>
          <span className="w-2 h-2 rounded-full bg-[#008751] inline-block -mt-1"></span>
        </div>
        {showLagos && (
          <span className={`font-semibold tracking-widest uppercase ${subSize} ${subColor} -mt-0.5`}>
            Lagos
          </span>
        )}
      </div>
    </div>
  );
};
