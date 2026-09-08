import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  CloudRain, 
  CloudSun, 
  AlertTriangle, 
  Camera, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Zone } from '../../types';

interface ZoneDetailCardProps {
  zone: Zone;
  isFocused?: boolean;
}

export const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({ zone, isFocused = false }) => {
  return (
    <Card 
      className={`transition-all duration-300 ${
        isFocused 
          ? 'border-2 border-agri-green ring-4 ring-agri-green/10 shadow-card-hover' 
          : 'hover:border-soft-green/60'
      }`}
    >
      <CardHeader
        title={zone.name}
        subtitle={`${zone.cropType} • ${zone.growthStage} • ${zone.areaAcres} Acres`}
        icon={<Layers className="h-5 w-5 text-agri-green" />}
        action={<StatusPill status={zone.status} />}
      />

      {/* Sensor Metrics Big Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {/* Soil Moisture */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Soil Moisture</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${zone.currentReading.soilMoisture < 35 ? 'text-amber-600' : 'text-agri-green'}`}>
                {zone.currentReading.soilMoisture}%
              </span>
              <span className="text-[10px] text-gray-400">
                {zone.currentReading.soilMoisture < 35 ? 'Low' : 'Adequate'}
              </span>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 text-agri-green">
            <Thermometer className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Canopy Temp</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-dark-forest">
                {zone.currentReading.temperature}°C
              </span>
              <span className="text-[10px] text-gray-400">Normal</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${zone.currentReading.humidity > 80 ? 'bg-red-100 text-danger-red' : 'bg-blue-100 text-blue-700'}`}>
            <CloudSun className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Rel. Humidity</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${zone.currentReading.humidity > 80 ? 'text-danger-red' : 'text-dark-forest'}`}>
                {zone.currentReading.humidity}%
              </span>
              <span className="text-[10px] text-gray-400">
                {zone.currentReading.humidity > 80 ? 'High' : 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Rainfall */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
            <CloudRain className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Rain Gauge</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-blue-800">
                {zone.currentReading.rainfall} mm
              </span>
              <span className="text-[10px] text-gray-400">24h Cum.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disease and Pest Breakdown Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pt-2 border-t border-gray-100">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            AI Disease Classification Probabilities
          </h4>
          <div className="space-y-2">
            {zone.diseaseDistribution.map((d, i) => (
              <ProgressBar
                key={i}
                label={d.label}
                value={d.percentage}
                variant={d.label === 'Blast' ? 'danger-red' : d.label === 'Healthy' ? 'agri-green' : 'warning-amber'}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Pest Population & Trap Analytics
          </h4>
          <div className="space-y-2">
            {zone.pestDistribution.map((p, i) => (
              <ProgressBar
                key={i}
                label={p.label}
                value={p.percentage}
                variant={p.label === 'Leaf Folder' ? 'warning-amber' : p.label === 'No Pest' ? 'agri-green' : 'blue'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 text-agri-green" />
          <span>Last telemetry packet: <strong>{zone.currentReading.timestamp}</strong></span>
          <span>• Node: <strong>{zone.nodeId.toUpperCase()}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Camera className="h-3.5 w-3.5" />}>
            Capture Leaf (Phase 2)
          </Button>
          <Button variant="primary" size="sm">
            {zone.status === 'Water Stress' ? 'Irrigate Zone' : 'View Advisory'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
