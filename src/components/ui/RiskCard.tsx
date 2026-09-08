import React from 'react';
import { AlertOctagon, ShieldCheck, AlertTriangle, Flame } from 'lucide-react';
import { RiskLevel } from '../../types';

interface RiskCardProps {
  title: string;
  riskLevel: RiskLevel;
  score: number;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({
  title,
  riskLevel,
  score,
  description,
  icon,
  className = '',
}) => {
  const getRiskStyle = (level: RiskLevel) => {
    switch (level) {
      case 'Critical':
        return {
          bg: 'bg-red-50/70 border-danger-red/40',
          badge: 'bg-danger-red text-white',
          bar: 'bg-danger-red',
          text: 'text-danger-red',
        };
      case 'High':
      case 'Medium-High':
        return {
          bg: 'bg-red-50/40 border-red-200',
          badge: 'bg-danger-red/15 text-danger-red border border-danger-red/30',
          bar: 'bg-danger-red',
          text: 'text-danger-red',
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50/40 border-amber-200',
          badge: 'bg-warning-amber/20 text-yellow-800 border border-warning-amber/40',
          bar: 'bg-warning-amber',
          text: 'text-yellow-800',
        };
      default:
        return {
          bg: 'bg-white border-[#E6F0EB]',
          badge: 'bg-green-100 text-agri-green border border-green-200',
          bar: 'bg-agri-green',
          text: 'text-agri-green',
        };
    }
  };

  const style = getRiskStyle(riskLevel);

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 shadow-subtle ${style.bg} ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <div className="p-1.5 rounded-lg bg-white shadow-xs border border-gray-100">{icon}</div>}
          <h4 className="text-xs font-bold text-dark-forest">{title}</h4>
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
          {riskLevel}
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-black text-dark-forest tracking-tight">{score}</span>
        <span className="text-[11px] text-gray-500 font-semibold">/ 100 Risk Index</span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2 border border-gray-200/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-[11px] text-gray-500 mt-2.5 leading-relaxed">{description}</p>
    </div>
  );
};
