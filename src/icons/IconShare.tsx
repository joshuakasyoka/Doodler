import React, { useId } from 'react';
import { IconProps } from './IconPen';

export const IconShare: React.FC<IconProps> = ({ size = 16, ...props }) => {
  const clipId = useId();
  const clipPathId = `clip0_share_${clipId.replace(/:/g, '_')}`;

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
          d="M14.748 0.294006L0.74798 5.29401L0.72998 6.70001L6.81498 9.04001C6.84756 9.05268 6.87712 9.07204 6.90175 9.09684C6.92638 9.12165 6.94554 9.15134 6.95798 9.18401L9.29998 15.27L10.707 15.253L15.707 1.25301L14.749 0.295006L14.748 0.294006ZM7.31398 7.62501L3.15698 6.02601L12.111 2.82801L7.31398 7.62501ZM8.37398 8.68501L9.97398 12.843L13.172 3.88901L8.37498 8.68601L8.37398 8.68501Z"
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
