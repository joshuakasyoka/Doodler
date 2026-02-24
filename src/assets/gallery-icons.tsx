import React from 'react';

export const IconKrachten: React.FC<{ size?: number; className?: string }> = ({ size = 100, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pot */}
      <path
        d="M30 70L35 75L65 75L70 70L70 60L65 55L35 55L30 60L30 70Z"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M32 60L68 60"
        stroke="#171717"
        strokeWidth="2"
      />
      {/* Stem */}
      <line
        x1="50"
        y1="55"
        x2="50"
        y2="45"
        stroke="#171717"
        strokeWidth="2"
      />
      {/* Left leaf */}
      <path
        d="M50 45L40 40L45 35L50 40L50 45Z"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="45"
        y1="37"
        x2="50"
        y2="40"
        stroke="#171717"
        strokeWidth="1.5"
      />
      {/* Right leaf */}
      <path
        d="M50 45L60 40L55 35L50 40L50 45Z"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="55"
        y1="37"
        x2="50"
        y2="40"
        stroke="#171717"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const IconKlachten: React.FC<{ size?: number; className?: string }> = ({ size = 100, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Wrench handle */}
      <line
        x1="20"
        y1="80"
        x2="65"
        y2="35"
        stroke="#171717"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Wrench jaw (U-shape) */}
      <path
        d="M65 35L75 25L80 30L70 40L65 35Z"
        stroke="#171717"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75 25L85 20L80 30"
        stroke="#171717"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hole at bottom */}
      <circle
        cx="20"
        cy="80"
        r="4"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const IconInzichten: React.FC<{ size?: number; className?: string }> = ({ size = 100, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lightbulb glass */}
      <ellipse
        cx="50"
        cy="40"
        rx="20"
        ry="25"
        stroke="#171717"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Filament */}
      <path
        d="M45 35Q50 30 55 35"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M45 40Q50 45 55 40"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      {/* Base */}
      <rect
        x="42"
        y="60"
        width="16"
        height="8"
        rx="1"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M42 60L40 65L42 68L58 68L60 65L58 60"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      {/* Radiating lines (light rays) */}
      <line x1="30" y1="25" x2="25" y2="20" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="70" y1="25" x2="75" y2="20" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="25" y1="40" x2="20" y2="40" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="75" y1="40" x2="80" y2="40" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="30" y1="55" x2="25" y2="60" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="70" y1="55" x2="75" y2="60" stroke="#171717" strokeWidth="1.5" strokeDasharray="2,2" />
    </svg>
  );
};

export const IconAanpak: React.FC<{ size?: number; className?: string }> = ({ size = 100, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Paper */}
      <rect
        x="20"
        y="60"
        width="50"
        height="30"
        rx="1"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
        transform="rotate(-5 45 75)"
      />
      {/* Wavy line on paper */}
      <path
        d="M30 75Q35 70 40 75T50 75T60 75"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
        transform="rotate(-5 45 75)"
      />
      {/* Pencil */}
      <line
        x1="70"
        y1="25"
        x2="45"
        y2="70"
        stroke="#171717"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Pencil tip */}
      <path
        d="M45 70L40 75L45 72L50 70L45 70Z"
        stroke="#171717"
        strokeWidth="2"
        fill="none"
      />
      {/* Pencil body lines */}
      <line x1="65" y1="35" x2="50" y2="65" stroke="#171717" strokeWidth="1.5" />
      <line x1="60" y1="30" x2="48" y2="68" stroke="#171717" strokeWidth="1.5" />
    </svg>
  );
};
