import React from 'react';
import './Chip.css';

export type ChipVariant = 'default' | 'secondary' | 'outline';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ChipVariant;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'doodler-chip';
  const variantClass = `doodler-chip--${variant}`;

  const classes = [baseClass, variantClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
