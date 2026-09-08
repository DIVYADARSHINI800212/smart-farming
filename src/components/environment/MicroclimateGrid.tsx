import React from 'react';
import { CloudSun, Droplets, Thermometer, Wind, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { MicroclimateMetrics } from '../../types';

interface MicroclimateGridProps {
  metrics: MicroclimateMetrics;
  zoneName: string;
}

export const MicroclimateGrid: React.FC<MicroclimateGridProps> = ({ metrics, zoneName }) => {
  return (
    <div className="space-y-4">
      {/* 4 Core Agricultural Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Vapor Pressure Deficit (VPD) */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vapor Pressure Deficit</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.vpdStatus === 'Optimal' ? 'bg-green-100 text-agri-green' : 'bg-amber-100 text-yellow-800'
              }`}>
                {metrics.vpdStatus}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-deep-green">{metrics.vpdKpa}</span>
              <span className="text-xs text-gray-500 font-semibold">kPa</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            Target: 0.8 – 1.4 kPa. Healthy stomatal conductance and transpirational pull without leaf dessication.
          </p>
        </div>

        {/* 2. Leaf Wetness Duration */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Leaf Wetness Hours</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.leafWetnessHours > 5 ? 'bg-red-100 text-danger-red' : 'bg-green-100 text-agri-green'
              }`}>
                {metrics.leafWetnessHours > 5 ? 'Fungal Threat' : 'Safe Duration'}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-dark-forest">{metrics.leafWetnessHours}</span>
              <span className="text-xs text-gray-500 font-semibold">Hours (24h)</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {metrics.leafWetnessRisk}. Continuous wetness &gt;6h promotes blast fungal spore germination.
          </p>
        </div>

        {/* 3. Heat Stress Index */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Heat Stress Index</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
                {metrics.heatStressIndex} Stress
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-dark-forest">{metrics.airTemperature}°C</span>
              <span className="text-xs text-gray-500 font-semibold">Canopy Ambient</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            Below critical reproductive threshold (&gt;35°C). Zero floral sterility risk.
          </p>
        </div>

        {/* 4. Humidity Stress Index */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Humidity Stress</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.humidityStressIndex === 'High' ? 'bg-red-100 text-danger-red' : 'bg-green-100 text-agri-green'
              }`}>
                {metrics.humidityStressIndex} Stress
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-2xl font-black ${metrics.relativeHumidity > 80 ? 'text-danger-red' : 'text-dark-forest'}`}>
                {metrics.relativeHumidity}%
              </span>
              <span className="text-xs text-gray-500 font-semibold">Rel. Humidity</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {metrics.relativeHumidity > 80 ? 'Suppresses transpiration and accelerates spore spread.' : 'Normal vegetative microclimate.'}
          </p>
        </div>
      </div>

      {/* Sensor Readings Strip */}
      <Card>
        <CardHeader
          title={`Detailed Microclimate Telemetry (${zoneName})`}
          subtitle="Real-time multi-sensor readings from deployed ESP32 LoRa nodes"
          icon={<CloudSun className="h-5 w-5 text-agri-green" />}
        />

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Air Temperature</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.airTemperature}°C</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Soil Temperature</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.soilTemperature}°C</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Relative Humidity</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.relativeHumidity}%</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">24h Rainfall</span>
            <span className="text-lg font-black text-blue-700 mt-0.5 block">{metrics.rainfall24h} mm</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Wind Velocity</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.windSpeedKmh} km/h</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
