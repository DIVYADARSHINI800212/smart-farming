import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  variant?: 'agri-green' | 'warning-amber' | 'danger-red' | 'blue';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  variant = 'agri-green',
  showPercentage = true,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  const variantStyles = {
    'agri-green': 'bg-agri-green',
    'warning-amber': 'bg-warning-amber',
    'danger-red': 'bg-danger-red',
    'blue': 'bg-blue-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          {label && <span className="text-gray-700">{label}</span>}
          <div className="flex items-center gap-2">
            {sublabel && <span className="text-gray-400 text-[11px]">{sublabel}</span>}
            {showPercentage && <span className="text-dark-forest font-semibold">{Math.round(clamped)}%</span>}
          </div>
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantStyles[variant]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
