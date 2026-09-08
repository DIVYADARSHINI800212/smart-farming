import React from 'react';
import { Cpu, Droplets, Thermometer, CloudRain, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Zone } from '../../types';

interface EnvironmentalRiskFusionProps {
  zones: Zone[];
}

export const EnvironmentalRiskFusion: React.FC<EnvironmentalRiskFusionProps> = ({ zones }) => {
  const z1 = zones.find(z => z.zoneId === 'zone-1');
  const z2 = zones.find(z => z.zoneId === 'zone-2');

  return (
    <Card>
      <CardHeader
        title="Sensor + Vision Fusion Diagnostics"
        subtitle="Calibrating Computer Vision Output with Microclimate IoT Telemetry"
        icon={<Cpu className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
        {/* Zone 1 Fusion Card */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-deep-green">
              Zone 1 (North Field) — Sensor & Vision Fusion
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-yellow-800">
              Water Stress & Pest
            </span>
          </div>

          {/* Sensor readings */}
          <div className="grid grid-cols-4 gap-2 text-center p-2.5 bg-white rounded-lg border border-gray-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Moisture</span>
              <span className="font-bold text-amber-600">{z1?.currentReading.soilMoisture || 32}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Temp</span>
              <span className="font-bold text-dark-forest">{z1?.currentReading.temperature || 28}°C</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Humidity</span>
              <span className="font-bold text-dark-forest">{z1?.currentReading.humidity || 70}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Rain</span>
              <span className="font-bold text-blue-600">{z1?.currentReading.rainfall || 0} mm</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong className="text-deep-green">Fusion Logic:</strong> Low moisture (32%) induces vegetative water stress, thinning cuticle resistance. Fused with 78% Leaf Folder CNN detection, risk confidence is raised to <strong>Medium-High</strong>.
            </p>
          </div>
        </div>

        {/* Zone 2 Fusion Card */}
        <div className="p-4 rounded-xl border border-red-200 bg-red-50/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-deep-green">
              Zone 2 (South Field) — Sensor & Vision Fusion
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-danger-red">
              High Blast Pathogenicity
            </span>
          </div>

          {/* Sensor readings */}
          <div className="grid grid-cols-4 gap-2 text-center p-2.5 bg-white rounded-lg border border-gray-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Moisture</span>
              <span className="font-bold text-agri-green">{z2?.currentReading.soilMoisture || 45}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Temp</span>
              <span className="font-bold text-dark-forest">{z2?.currentReading.temperature || 27}°C</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Humidity</span>
              <span className="font-bold text-danger-red">{z2?.currentReading.humidity || 85}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Rain</span>
              <span className="font-bold text-blue-600">{z2?.currentReading.rainfall || 2} mm</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong className="text-deep-green">Fusion Logic:</strong> High humidity (85%) and 2mm recent rainfall maintain &gt;6 hours of leaf wetness. Combined with 82% Blast CNN inference, the risk engine classifies Zone 2 as <strong>High Risk</strong>.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
