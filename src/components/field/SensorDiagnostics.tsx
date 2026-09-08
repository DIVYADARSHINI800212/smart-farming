import React from 'react';
import { Activity, ShieldCheck, Gauge, HardDrive, RefreshCw } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';

export const SensorDiagnostics: React.FC = () => {
  return (
    <Card>
      <CardHeader
        title="Field Sensor Node Diagnostic Matrix"
        subtitle="Edge sensor calibration & sampling telemetry"
        icon={<Activity className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="h-4 w-4 text-agri-green" />
            <span className="text-xs font-bold text-deep-green">Soil Dielectric Probe</span>
          </div>
          <p className="text-[11px] text-gray-500">Corrosion-resistant capacitive PCB probe. Calibrated for alluvial clay loam.</p>
          <div className="mt-2 text-[10px] text-agri-green font-semibold bg-green-50 px-2 py-1 rounded inline-block">
            Status: Active (0-3.3V ADC)
          </div>
        </div>

        <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold text-deep-green">DHT22 Microclimate</span>
          </div>
          <p className="text-[11px] text-gray-500">Dual temperature & relative humidity sensor with solar radiation shield.</p>
          <div className="mt-2 text-[10px] text-blue-800 font-semibold bg-blue-50 px-2 py-1 rounded inline-block">
            Status: Active (±0.5°C accuracy)
          </div>
        </div>

        <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-bold text-deep-green">Tipping Bucket Gauge</span>
          </div>
          <p className="text-[11px] text-gray-500">Reed switch event counter recording 0.2mm precipitation pulses.</p>
          <div className="mt-2 text-[10px] text-purple-800 font-semibold bg-purple-50 px-2 py-1 rounded inline-block">
            Status: Active (Interrupt Driven)
          </div>
        </div>

        <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-deep-green">Edge AI Inference Hub</span>
          </div>
          <p className="text-[11px] text-gray-500">Raspberry Pi 4 / ESP32 Gateway with local SQLite buffer & TFLite engine.</p>
          <div className="mt-2 text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded inline-block">
            Status: Offline-Capable (100%)
          </div>
        </div>
      </div>
    </Card>
  );
};
