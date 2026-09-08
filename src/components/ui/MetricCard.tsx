import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  highlightColor?: 'agri-green' | 'warning-amber' | 'danger-red' | 'deep-green';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  subtitle,
  trend,
  highlightColor = 'agri-green',
  className = '',
}) => {
  const iconColorStyles = {
    'agri-green': 'bg-green-50 text-agri-green border-green-200/50',
    'warning-amber': 'bg-amber-50 text-amber-600 border-amber-200/50',
    'danger-red': 'bg-red-50 text-danger-red border-red-200/50',
    'deep-green': 'bg-emerald-50 text-deep-green border-emerald-200/50',
  };

  return (
    <div className={`bg-white rounded-xl p-4 border border-[#E6F0EB] shadow-subtle hover:shadow-card transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
        <div className={`p-2 rounded-lg border ${iconColorStyles[highlightColor]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-dark-forest tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold text-gray-500">{unit}</span>}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        {subtitle && <span className="text-gray-500">{subtitle}</span>}
        {trend && (
          <span className={`inline-flex items-center font-medium ${
            trend.isNeutral ? 'text-gray-500' : trend.isPositive ? 'text-agri-green' : 'text-danger-red'
          }`}>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
