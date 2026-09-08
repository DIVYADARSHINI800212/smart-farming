import React from 'react';
import { ShieldCheck, TrendingUp } from 'lucide-react';

interface HealthScoreCardProps {
  score: number;
  maxScore?: number;
  stage: string;
  status: string;
  trendText?: string;
  className?: string;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({
  score,
  maxScore = 100,
  stage,
  status,
  trendText = '+3.5% vs last week',
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br from-deep-green to-[#1B5E20] text-white shadow-card border border-soft-green/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${className}`}>
      <div className="flex items-center gap-5">
        <div className="relative flex items-center justify-center h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0 shadow-inner">
          <div className="text-center">
            <span className="text-3xl font-black text-white">{score}</span>
            <span className="text-[10px] uppercase font-bold text-soft-green block -mt-1">/ {maxScore}</span>
          </div>
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-agri-green rounded-full border-2 border-deep-green flex items-center justify-center">
            <ShieldCheck className="h-3 w-3 text-white" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-soft-green/20 text-soft-green border border-soft-green/30">
              Crop Health Score • {status}
            </span>
            <span className="text-xs text-soft-green flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {trendText}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
            Current Stage: {stage}
          </h2>
          <p className="text-xs text-soft-green/80 mt-1 max-w-md">
            Biometric canopy reflectance and sensor fusion indicate healthy tillering vigor with isolated moisture stress.
          </p>
        </div>
      </div>
    </div>
  );
};
