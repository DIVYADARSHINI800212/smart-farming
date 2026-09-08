import React from 'react';

interface ConfidenceBarProps {
  label: string;
  percentage: number;
  sublabel?: string;
  isDominant?: boolean;
  className?: string;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  label,
  percentage,
  sublabel,
  isDominant = false,
  className = '',
}) => {
  const getBarColor = (name: string, pct: number) => {
    if (name.toLowerCase().includes('healthy') || name.toLowerCase().includes('no pest')) {
      return 'bg-agri-green';
    }
    if (pct >= 70) {
      return 'bg-danger-red';
    }
    if (pct >= 40) {
      return 'bg-warning-amber';
    }
    return 'bg-blue-600';
  };

  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
        <div className="flex items-center gap-2">
          <span className={`text-dark-forest ${isDominant ? 'font-bold' : ''}`}>{label}</span>
          {sublabel && <span className="text-gray-400 text-[11px]">({sublabel})</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`font-bold ${isDominant ? 'text-deep-green text-sm' : 'text-gray-600'}`}>
            {clamped}%
          </span>
          {isDominant && (
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-red-100 text-danger-red">
              Top Result
            </span>
          )}
        </div>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(label, clamped)}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
