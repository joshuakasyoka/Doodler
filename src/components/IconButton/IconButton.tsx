import React from 'react';
import './IconButton.css';

export type IconButtonSize = 'large' | 'small';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  'aria-label': string;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  size = 'large',
  'aria-label': ariaLabel,
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'doodler-icon-button';
  const sizeClass = `doodler-icon-button--${size}`;

  const classes = [baseClass, sizeClass, className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};
