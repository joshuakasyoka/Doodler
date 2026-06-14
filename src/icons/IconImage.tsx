import React, { useId } from 'react';
import { IconProps } from './IconPen';

export const IconImage: React.FC<IconProps> = ({ size = 16, ...props }) => {
  const clipId = useId();
  const clipPathId = `clip0_image_${clipId.replace(/:/g, '_')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 2.5H1.5V9.19L2.97 7.72L3.19 7.5H6.94L6.97 7.47L10.47 3.97H11.53L14.5 6.94V2.5ZM8 8.56L9.53 10.09L10.06 10.62L9 11.68L8.47 11.15L6.32 9H3.81L1.53 11.28L1.5 11.31V12.5C1.5 12.7652 1.60536 13.0196 1.7929 13.2071C1.98043 13.3946 2.23479 13.5 2.5 13.5H13.5C13.7652 13.5 14.0196 13.3946 14.2071 13.2071C14.3946 13.0196 14.5 12.7652 14.5 12.5V9.06L11 5.56L8.03 8.53L8 8.56ZM2.44007e-06 10.81V12.5C2.44007e-06 13.163 0.263395 13.7989 0.732235 14.2678C1.20108 14.7366 1.83696 15 2.5 15H13.5C14.163 15 14.7989 14.7366 15.2678 14.2678C15.7366 13.7989 16 13.163 16 12.5V9.56L16.56 9L16.03 8.47L16 8.44V1H2.44007e-06V10.69L-0.0599976 10.75L2.44007e-06 10.81Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
