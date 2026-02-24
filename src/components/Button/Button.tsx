import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'large' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  startIcon,
  endIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClass = 'doodler-button';
  const variantClass = `doodler-button--${variant}`;
  const sizeClass = `doodler-button--${size}`;
  const disabledClass = disabled ? 'doodler-button--disabled' : '';

  const classes = [baseClass, variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {startIcon && <span className="doodler-button__icon doodler-button__icon--start">{startIcon}</span>}
      <span className="doodler-button__text">{children}</span>
      {endIcon && <span className="doodler-button__icon doodler-button__icon--end">{endIcon}</span>}
    </button>
  );
};
