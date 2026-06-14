import React from 'react';

export interface IconLibraryProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IconLibrary: React.FC<IconLibraryProps> = ({ size = 16, ...props }) => {
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
        d="M3.75 0C3.15326 0 2.58097 0.237053 2.15901 0.65901C1.73705 1.08097 1.5 1.65326 1.5 2.25V13.75C1.50159 14.3457 1.73934 14.9165 2.16113 15.3371C2.58291 15.7578 3.1543 15.994 3.75 15.994H14.5V0H3.75ZM13 11.494V1.5H3.75C3.55109 1.5 3.36032 1.57902 3.21967 1.71967C3.07902 1.86032 3 2.05109 3 2.25V11.622C3.235 11.539 3.487 11.494 3.75 11.494H13ZM3 13.744C3 14.158 3.336 14.494 3.75 14.494H13V12.994H3.75C3.55109 12.994 3.36032 13.073 3.21967 13.2137C3.07902 13.3543 3 13.5451 3 13.744Z"
        fill="currentColor"
      />
    </svg>
  );
};
