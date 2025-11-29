import React from 'react';

const Logo = ({ variant = 'full', size = 'default', className = '', dark = false }) => {
  const sizes = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const iconSize = sizes[size] || sizes.default;

  if (variant === 'icon') {
    return (
      <div className={`${iconSize} ${className}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="EventPlanner Logo"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={dark ? "#60A5FA" : "#3B82F6"} />
              <stop offset="100%" stopColor={dark ? "#8B5CF6" : "#6366F1"} />
            </linearGradient>
          </defs>
          <rect x="20" y="15" width="60" height="70" rx="8" fill="url(#logoGradient)" />
          <circle cx="35" cy="30" r="3" fill="white" opacity="0.9" />
          <circle cx="50" cy="30" r="3" fill="white" opacity="0.9" />
          <circle cx="65" cy="30" r="3" fill="white" opacity="0.9" />
          <line x1="25" y1="45" x2="75" y2="45" stroke="white" strokeWidth="2" opacity="0.7" />
          <line x1="25" y1="60" x2="75" y2="60" stroke="white" strokeWidth="2" opacity="0.7" />
          <circle cx="50" cy="75" r="8" fill="white" />
          <path d="M 50 70 L 50 80 M 45 75 L 55 75" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={iconSize}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="EventPlanner Logo"
        >
          <defs>
            <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={dark ? "#60A5FA" : "#3B82F6"} />
              <stop offset="100%" stopColor={dark ? "#8B5CF6" : "#6366F1"} />
            </linearGradient>
          </defs>
          <rect x="20" y="15" width="60" height="70" rx="8" fill="url(#logoGradientFull)" />
          <circle cx="35" cy="30" r="3" fill="white" opacity="0.9" />
          <circle cx="50" cy="30" r="3" fill="white" opacity="0.9" />
          <circle cx="65" cy="30" r="3" fill="white" opacity="0.9" />
          <line x1="25" y1="45" x2="75" y2="45" stroke="white" strokeWidth="2" opacity="0.7" />
          <line x1="25" y1="60" x2="75" y2="60" stroke="white" strokeWidth="2" opacity="0.7" />
          <circle cx="50" cy="75" r="8" fill="white" />
          <path d="M 50 70 L 50 80 M 45 75 L 55 75" stroke="url(#logoGradientFull)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'} ${size === 'xl' ? 'text-3xl' : size === 'large' ? 'text-2xl' : 'text-xl'}`}>
        Gatherly
      </span>
    </div>
  );
};

export default Logo;

