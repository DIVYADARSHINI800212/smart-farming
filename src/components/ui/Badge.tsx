import React from 'react';
import { SeverityLevel } from '../../types';
import { getSeverityBgColor } from '../../utils/formatters';

interface BadgeProps {
  children: React.ReactNode;
  severity?: SeverityLevel;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  severity,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  if (severity) {
    return (
      <span className={`inline-flex items-center font-semibold rounded-full border ${getSeverityBgColor(severity)} ${sizeStyles[size]} ${className}`}>
        {children}
      </span>
    );
  }

  const variantStyles = {
    default: 'bg-soft-green/30 text-deep-green border-soft-green/60',
    outline: 'bg-transparent text-gray-700 border-gray-300',
    success: 'bg-green-100 text-agri-green border-green-200',
    warning: 'bg-amber-100 text-yellow-800 border-amber-200',
    danger: 'bg-red-100 text-danger-red border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
