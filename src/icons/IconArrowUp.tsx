import React from 'react';
import { IconProps } from './IconPen';

export const IconArrowUp: React.FC<IconProps> = ({ size = 16, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.70743 1.39606C8.5199 1.20859 8.26559 1.10327 8.00043 1.10327C7.73527 1.10327 7.48096 1.20859 7.29343 1.39606L2.22043 6.47006L1.69043 7.00006L2.75043 8.06006L3.28043 7.53006L7.25043 3.56006V15.0001H8.75043V3.56006L12.7204 7.53006L13.2504 8.06006L14.3104 7.00006L13.7804 6.47006L8.70743 1.39606Z"
        fill="currentColor"
      />
    </svg>
  );
};
