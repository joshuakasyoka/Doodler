import React, { useId } from 'react';
import { IconProps } from './IconPen';

export const IconGalleryToggle: React.FC<IconProps> = ({ size = 16, ...props }) => {
  const clipId = useId();
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4999 2.5H1.49994V9.19L2.96994 7.72L3.18994 7.5H6.93994L6.96994 7.47L10.4699 3.97H11.5299L14.4999 6.94V2.5ZM7.99994 8.56L9.52994 10.09L10.0599 10.62L8.99994 11.68L8.46994 11.15L6.31994 9H3.80994L1.52994 11.28L1.49994 11.31V12.5C1.49994 12.7652 1.6053 13.0196 1.79283 13.2071C1.98037 13.3946 2.23472 13.5 2.49994 13.5H13.4999C13.7652 13.5 14.0195 13.3946 14.207 13.2071C14.3946 13.0196 14.4999 12.7652 14.4999 12.5V9.06L10.9999 5.56L8.02994 8.53L7.99994 8.56ZM-5.85951e-05 10.81V12.5C-5.85951e-05 13.163 0.263333 13.7989 0.732174 14.2678C1.20102 14.7366 1.8369 15 2.49994 15H13.4999C14.163 15 14.7989 14.7366 15.2677 14.2678C15.7365 13.7989 15.9999 13.163 15.9999 12.5V9.56L16.5599 9L16.0299 8.47L15.9999 8.44V1H-5.85951e-05V10.69L-0.0600586 10.75L-5.85951e-05 10.81Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
