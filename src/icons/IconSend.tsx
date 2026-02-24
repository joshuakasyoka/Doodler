import React from 'react';
import { IconProps } from './IconPen';

export const IconSend: React.FC<IconProps> = ({ size = 20, ...props }) => {
  const clipId = React.useId();
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7485 2.29395L2.74847 7.29395L2.73047 8.69994L8.81547 11.0399C8.84805 11.0526 8.87761 11.072 8.90224 11.0968C8.92687 11.1216 8.94602 11.1513 8.95847 11.1839L11.3005 17.2699L12.7075 17.2529L17.7075 3.25295L16.7495 2.29495L16.7485 2.29395ZM9.31447 9.62495L5.15747 8.02595L14.1115 4.82795L9.31447 9.62495ZM10.3745 10.6849L11.9745 14.8429L15.1725 5.88895L10.3755 10.6859L10.3745 10.6849Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="16" height="16" fill="white" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};
