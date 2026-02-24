import React from 'react';
import { IconProps } from './IconPen';

export const IconDocument: React.FC<IconProps> = ({ size = 20, ...props }) => {
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
        d="M16.5 15.5V7.414C16.4999 7.14881 16.3945 6.89449 16.207 6.707L11.793 2.293C11.6055 2.10545 11.3512 2.00006 11.086 2H3.5V15.5C3.5 16.163 3.76339 16.7989 4.23223 17.2678C4.70107 17.7366 5.33696 18 6 18H14C14.663 18 15.2989 17.7366 15.7678 17.2678C16.2366 16.7989 16.5 16.163 16.5 15.5ZM15 15.5V8.5H10V3.5H5V15.5C5 15.7652 5.10536 16.0196 5.29289 16.2071C5.48043 16.3946 5.73478 16.5 6 16.5H14C14.2652 16.5 14.5196 16.3946 14.7071 16.2071C14.8946 16.0196 15 15.7652 15 15.5ZM11.5 7V4.121L14.379 7H11.5ZM7.13 7H6.505V8.25H8.625V7H7.13ZM6.505 10H13.625V11.25H6.505V10ZM7.13 13H6.505V14.25H13.625V13H7.13Z"
        fill="currentColor"
      />
    </svg>
  );
};
