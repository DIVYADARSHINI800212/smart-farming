import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { CropGrowthMetric } from '../../types';

interface GrowthStageTimelineProps {
  stages: CropGrowthMetric[];
  currentDay: number;
}

export const GrowthStageTimeline: React.FC<GrowthStageTimelineProps> = ({ stages, currentDay }) => {
  return (
    <Card>
      <CardHeader
        title="Crop Growth & Phenology Progression"
        subtitle={`Paddy Crop Cycle • Day ${currentDay} of 120 (Vegetative Stage)`}
        icon={<Calendar className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-agri-green border border-green-200">
            Day 42 / 120
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {stages.map((stage, idx) => {
          const isPassed = currentDay > stage.dayNumber;
          const isCurrent = stage.stageName.includes('Current');

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-green-50/70 border-agri-green ring-2 ring-agri-green/20'
                  : isPassed
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-50/50 border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Day {stage.dayNumber}
                </span>
                {isPassed && <CheckCircle2 className="h-4 w-4 text-agri-green" />}
                {isCurrent && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-agri-green text-white">
                    Active
                  </span>
                )}
                {!isPassed && !isCurrent && <Clock className="h-4 w-4 text-gray-400" />}
              </div>

              <h4 className="text-sm font-bold text-dark-forest mt-2">{stage.stageName}</h4>

              <div className="mt-3 pt-2.5 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block">Canopy Cover</span>
                  <span className="font-semibold text-dark-forest">{stage.canopyCoverPercentage}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Height</span>
                  <span className="font-semibold text-dark-forest">{stage.averageHeightCm} cm</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
