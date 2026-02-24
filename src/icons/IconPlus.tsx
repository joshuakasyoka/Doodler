import React from 'react';

export interface IconPlusProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IconPlus: React.FC<IconPlusProps> = ({ size = 20, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.75 3.75V3H9.25V8.75H3.5V10.25H9.25V16H10.75V10.25H16.5V8.75H10.75V3.75Z"
        fill="currentColor"
      />
    </svg>
  );
};
