import React from 'react';

export interface IconPlusProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IconPlus: React.FC<IconPlusProps> = ({ size = 16, ...props }) => {
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
        d="M8 1V15M1 8H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
