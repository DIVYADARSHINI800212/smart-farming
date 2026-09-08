import React from 'react';
import { Droplets, Clock, AlertCircle, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Zone } from '../../types';

interface IrrigationCardProps {
  zones: Zone[];
}

export const IrrigationCard: React.FC<IrrigationCardProps> = ({ zones }) => {
  const z1 = zones.find(z => z.zoneId === 'zone-1');

  return (
    <Card className="bg-gradient-to-br from-white to-[#F0F8F3] border-agri-green/20">
      <CardHeader
        title="Smart Irrigation Advisory"
        subtitle="Automated Soil Dielectric & Weather Fusion Engine"
        icon={<Droplets className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Action Recommended
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        {/* Metric 1 */}
        <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <span className="text-xs text-gray-500 font-medium block">Zone 1 Moisture</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-600">{z1?.currentReading.soilMoisture || 32}%</span>
            <span className="text-xs text-gray-400">/ 55% target</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">
            Water Stress Threshold
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <span className="text-xs text-gray-500 font-medium block">Recommended Cycle</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-agri-green">45</span>
            <span className="text-xs text-gray-500 font-semibold">Minutes</span>
          </div>
          <span className="text-[11px] text-gray-500 block mt-1">
            Optimal timing: 16:30 - 17:15
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <span className="text-xs text-gray-500 font-medium block">Projected Water Saved</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-deep-green">18.4%</span>
            <span className="text-xs text-agri-green font-semibold">vs flood</span>
          </div>
          <span className="text-[11px] text-agri-green font-semibold block mt-1">
            Exceeds SIH Target (≥15%)
          </span>
        </div>
      </div>

      <div className="p-3 bg-white/80 rounded-xl border border-agri-green/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-agri-green shrink-0 mt-0.5" />
          <p className="text-xs text-dark-forest">
            <strong>Weather Confirmation:</strong> 0mm rain predicted next 18 hours. Safe to irrigate Zone 1 without risk of over-saturation.
          </p>
        </div>
        <div className="shrink-0 flex gap-2">
          <Button variant="secondary" size="sm">
            View Valve Controls (P2)
          </Button>
        </div>
      </div>
    </Card>
  );
};
