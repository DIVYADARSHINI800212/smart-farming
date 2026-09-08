import React from 'react';
import { getStatusColor } from '../../utils/formatters';

interface StatusPillProps {
  status: string;
  className?: string;
  pulse?: boolean;
}

export const StatusPill: React.FC<StatusPillProps> = ({ 
  status, 
  className = '', 
  pulse = true 
}) => {
  const colors = getStatusColor(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${className}`}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors.dot}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`}></span>
      </span>
      {status}
    </span>
  );
};
