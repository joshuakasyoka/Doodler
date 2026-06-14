import React from 'react';
import { IconProps } from './IconPen';

export const IconOpenExternal: React.FC<IconProps> = ({ size = 16, ...props }) => {
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
        d="M9.74998 1H8.99998V2.5H12.439L9.46898 5.47L8.93898 6L9.99898 7.06L10.529 6.53L13.499 3.562V7H14.999V2C14.999 1.73478 14.8936 1.48043 14.7061 1.29289C14.5185 1.10536 14.2642 1 13.999 1H9.74898H9.74998ZM2.50098 12.438V9H1.00098V14C1.00098 14.2652 1.10633 14.5196 1.29387 14.7071C1.48141 14.8946 1.73576 15 2.00098 15H6.99998V13.5H3.55998L6.52998 10.53L7.05998 10L5.99998 8.94L5.46998 9.47L2.50098 12.438Z"
        fill="currentColor"
      />
    </svg>
  );
};
