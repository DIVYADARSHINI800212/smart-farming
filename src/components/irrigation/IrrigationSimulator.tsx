import React, { useState, useEffect } from 'react';
import { Droplets, Play, Square, Activity, Gauge, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusPill } from '../ui/StatusPill';
import { Zone } from '../../types';

interface IrrigationSimulatorProps {
  zones: Zone[];
  onMoistureUpdated?: (newMoisture: number) => void;
}

export const IrrigationSimulator: React.FC<IrrigationSimulatorProps> = ({
  zones,
  onMoistureUpdated,
}) => {
  const z1 = zones.find(z => z.zoneId === 'zone-1');
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [currentMoisture, setCurrentMoisture] = useState(z1?.currentReading.soilMoisture || 32);
  const totalDurationSeconds = 45 * 60; // 45 minutes

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isIrrigating) {
      timer = setInterval(() => {
        setProgressSeconds(prev => {
          const next = prev + 15; // fast-forward simulation: 15s per second
          if (next >= totalDurationSeconds) {
            setIsIrrigating(false);
            return totalDurationSeconds;
          }
          return next;
        });

        setCurrentMoisture(prev => {
          const next = Math.min(55, +(prev + 0.3).toFixed(1));
          if (onMoistureUpdated) {
            onMoistureUpdated(next);
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isIrrigating, totalDurationSeconds, onMoistureUpdated]);

  const handleToggle = () => {
    if (!isIrrigating && progressSeconds >= totalDurationSeconds) {
      setProgressSeconds(0);
      setCurrentMoisture(32);
    }
    setIsIrrigating(!isIrrigating);
  };

  const progressPct = Math.min(100, Math.round((progressSeconds / totalDurationSeconds) * 100));
  const remainingMinutes = Math.max(0, Math.ceil((totalDurationSeconds - progressSeconds) / 60));

  return (
    <Card className="border-agri-green/30 bg-gradient-to-br from-white to-green-50/20 shadow-card">
      <CardHeader
        title="Interactive Precision Drip Irrigation Simulation"
        subtitle="Automated solenoid valve actuation & root-zone water balance model"
        icon={<Droplets className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            SIMULATION / DEMO FUNCTIONALITY
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-2">
        {/* Left 2 Cols: Valve State & Live Control */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-white border border-[#E6F0EB] shadow-subtle">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Target Acreage Partition
                </span>
                <h3 className="text-base font-bold text-deep-green mt-0.5">
                  Zone 1 — Solenoid Valve #01 (North Paddy Field)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  isIrrigating
                    ? 'bg-green-100 text-agri-green border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  <span className={`h-2 w-2 rounded-full ${isIrrigating ? 'bg-agri-green animate-ping' : 'bg-gray-400'}`}></span>
                  Valve: {isIrrigating ? 'OPEN (FLOWING)' : 'CLOSED (IDLE)'}
                </span>
              </div>
            </div>

            {/* Live Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Moisture Level</span>
                <span className={`text-lg font-black ${currentMoisture < 40 ? 'text-amber-600' : 'text-agri-green'}`}>
                  {currentMoisture}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Flow Rate</span>
                <span className="text-lg font-black text-blue-600">
                  {isIrrigating ? '42.0 L/min' : '0.0 L/min'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Time Remaining</span>
                <span className="text-lg font-black text-dark-forest">
                  {remainingMinutes} mins
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Water Saved</span>
                <span className="text-lg font-black text-agri-green">
                  18.4%
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-deep-green flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-agri-green" /> Irrigation Cycle Progress
                </span>
                <span className="text-dark-forest">{progressPct}% Completed</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isIrrigating ? 'bg-agri-green animate-pulse' : 'bg-agri-green'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Recommended target: <strong>55% Soil Moisture (45 min cycle)</strong>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={isIrrigating ? 'danger' : 'primary'}
                  size="md"
                  onClick={handleToggle}
                  icon={isIrrigating ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                >
                  {isIrrigating ? 'Stop Valve Actuation' : progressPct >= 100 ? 'Restart Simulation' : 'Start 45-Min Irrigation'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Agronomic Justification & Weather Confirmation */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-green">
              <Activity className="h-4 w-4 text-agri-green" /> Fused Recommendation
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Zone 1 soil moisture has dropped to <strong>32%</strong>, crossing the vegetative stress line. Drip delivery of 38,000 Liters restores root-zone field capacity without ponding.
            </p>

            <div className="p-2.5 bg-green-50 rounded-lg border border-green-200 text-xs text-agri-green flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Rainfall Forecast Check:</strong>
                0 mm rain forecast for next 18 hours. Safe to irrigate with 0% risk of leaching.
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-yellow-800">
            <strong className="font-bold">SIH Water Conservation Target:</strong>
            Preserving 18.4% water vs conventional flood method.
          </div>
        </div>
      </div>
    </Card>
  );
};
