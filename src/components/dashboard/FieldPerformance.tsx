import React from 'react';
import { Layers, MapPin, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../ui/Card';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { Zone } from '../../types';

interface FieldPerformanceProps {
  zones: Zone[];
}

export const FieldPerformance: React.FC<FieldPerformanceProps> = ({ zones }) => {
  return (
    <Card>
      <CardHeader
        title="Field Zone Performance & Status"
        subtitle="Deployment Unit 1 Acreage Partitioning"
        icon={<Layers className="h-5 w-5 text-agri-green" />}
        action={
          <Link to="/field-monitoring">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
              Open Field Map
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone) => (
          <div
            key={zone.zoneId}
            className="p-4 bg-white rounded-xl border border-[#E6F0EB] shadow-subtle hover:border-agri-green/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-deep-green">{zone.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{zone.cropType} • {zone.growthStage}</p>
                </div>
                <StatusPill status={zone.status} />
              </div>

              {/* Sensor Metric Row */}
              <div className="grid grid-cols-4 gap-2 mt-4 p-3 bg-cream/50 rounded-xl border border-gray-100 text-center">
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Moisture</span>
                  <span className={`text-sm font-black ${zone.currentReading.soilMoisture < 35 ? 'text-amber-600' : 'text-agri-green'}`}>
                    {zone.currentReading.soilMoisture}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Temp</span>
                  <span className="text-sm font-black text-dark-forest">
                    {zone.currentReading.temperature}°C
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Humidity</span>
                  <span className={`text-sm font-black ${zone.currentReading.humidity > 80 ? 'text-danger-red' : 'text-dark-forest'}`}>
                    {zone.currentReading.humidity}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Rain</span>
                  <span className="text-sm font-black text-blue-600">
                    {zone.currentReading.rainfall} mm
                  </span>
                </div>
              </div>

              {/* Affected Area progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 font-medium">Estimated Affected Area:</span>
                  <span className="font-bold text-dark-forest">
                    {zone.affectedAreaPercentage}% ({((zone.areaAcres * zone.affectedAreaPercentage) / 100).toFixed(2)} Acres)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      zone.status === 'Disease Risk' ? 'bg-danger-red' :
                      zone.status === 'Water Stress' ? 'bg-warning-amber' : 'bg-agri-green'
                    }`}
                    style={{ width: `${zone.affectedAreaPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Hardware: <strong>{zone.nodeId.toUpperCase()}</strong></span>
              <Link to="/field-monitoring" className="text-agri-green font-semibold hover:underline flex items-center gap-1">
                Inspect Zone <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
