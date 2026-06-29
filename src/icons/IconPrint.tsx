import React from 'react';

export interface IconPrintProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IconPrint: React.FC<IconPrintProps> = ({ size = 16, ...props }) => {
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
        d="M14.5 13.5V5.414C14.4999 5.14881 14.3945 4.89449 14.207 4.707L9.793 0.293C9.60551 0.105451 9.3512 5.66374e-05 9.086 0H1.5V13.5C1.5 14.163 1.76339 14.7989 2.23223 15.2678C2.70107 15.7366 3.33696 16 4 16H12C12.663 16 13.2989 15.7366 13.7678 15.2678C14.2366 14.7989 14.5 14.163 14.5 13.5ZM13 13.5V6.5H8V1.5H3V13.5C3 13.7652 3.10536 14.0196 3.29289 14.2071C3.48043 14.3946 3.73478 14.5 4 14.5H12C12.2652 14.5 12.5196 14.3946 12.7071 14.2071C12.8946 14.0196 13 13.7652 13 13.5ZM9.5 5V2.121L12.379 5H9.5ZM5.13 5H4.505V6.25H6.625V5H5.13ZM4.505 8H11.625V9.25H4.505V8ZM5.13 11H4.505V12.25H11.625V11H5.13Z"
        fill="currentColor"
      />
    </svg>
  );
};
