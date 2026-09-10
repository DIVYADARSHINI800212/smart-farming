import React, { useState, useEffect } from 'react';
import { Droplets, Play, Square, Activity, Gauge, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusPill } from '../ui/StatusPill';
import { Zone } from '../../types';

import { useTranslation } from '../../context/LanguageContext';

interface IrrigationSimulatorProps {
  zones: Zone[];
  onMoistureUpdated?: (newMoisture: number) => void;
}

export const IrrigationSimulator: React.FC<IrrigationSimulatorProps> = ({
  zones,
  onMoistureUpdated,
}) => {
  const { t } = useTranslation();
  const z1 = zones.find(z => z.zoneId === 'zone-1');
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [currentMoisture, setCurrentMoisture] = useState(z1?.currentReading.soilMoisture || 32);
  const totalDurationSeconds = 45 * 60; // 45 minutes simulation scaled

  useEffect(() => {
    let interval: any = null;
    if (isIrrigating) {
      interval = setInterval(() => {
        setProgressSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsIrrigating(false);
            return totalDurationSeconds;
          }
          return prev + 60; // advance 1 min every simulated tick
        });

        setCurrentMoisture((prev) => {
          const next = prev >= 55 ? 55 : Math.min(55, Math.round((prev + 0.5) * 10) / 10);
          if (onMoistureUpdated) {
            onMoistureUpdated(next);
          }
          return next;
        });
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isIrrigating]);

  const handleToggle = () => {
    if (progressSeconds >= totalDurationSeconds) {
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
        title={t('interactive_drip_simulation', 'Interactive Precision Drip Irrigation Simulation')}
        subtitle={t('automated_solenoid_valve_actuation', 'Automated solenoid valve actuation & root-zone water balance model')}
        icon={<Droplets className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {t('simulation_demo_functionality', 'SIMULATION / DEMO FUNCTIONALITY')}
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
                  {t('target_acreage_partition', 'Target Acreage Partition')}
                </span>
                <h3 className="text-base font-bold text-deep-green mt-0.5">
                  {t('zone_1_name', 'Zone 1')} — {t('solenoid_valve_01', 'Solenoid Valve #01 (North Paddy Field)')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  isIrrigating
                    ? 'bg-green-100 text-agri-green border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  <span className={`h-2 w-2 rounded-full ${isIrrigating ? 'bg-agri-green animate-ping' : 'bg-gray-400'}`}></span>
                  {t('valve_label', 'Valve:')} {isIrrigating ? t('valve_open_flowing', 'OPEN (FLOWING)') : t('valve_closed_idle', 'CLOSED (IDLE)')}
                </span>
              </div>
            </div>

            {/* Live Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">{t('moisture_level', 'Moisture Level')}</span>
                <span className={`text-lg font-black ${currentMoisture < 40 ? 'text-amber-600' : 'text-agri-green'}`}>
                  {currentMoisture}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">{t('flow_rate', 'Flow Rate')}</span>
                <span className="text-lg font-black text-blue-600">
                  {isIrrigating ? '42.0 L/min' : '0.0 L/min'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">{t('time_remaining', 'Time Remaining')}</span>
                <span className="text-lg font-black text-dark-forest">
                  {remainingMinutes} {t('mins_unit', 'mins')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">{t('water_saved', 'Water Saved')}</span>
                <span className="text-lg font-black text-agri-green">
                  18.4%
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-deep-green flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-agri-green" /> {t('irrigation_cycle_progress', 'Irrigation Cycle Progress')}
                </span>
                <span className="text-dark-forest">{progressPct}% {t('completed_label', 'Completed')}</span>
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
                {t('recommended_target_label', 'Recommended target:')} <strong>55% {t('soil_moisture_label', 'Soil Moisture')} (45 {t('min_cycle_label', 'min cycle')})</strong>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={isIrrigating ? 'danger' : 'primary'}
                  size="md"
                  onClick={handleToggle}
                  icon={isIrrigating ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                >
                  {isIrrigating ? t('stop_valve_actuation', 'Stop Valve Actuation') : progressPct >= 100 ? t('restart_simulation', 'Restart Simulation') : t('start_45min_irrigation', 'Start 45-Min Irrigation')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Agronomic Justification & Weather Confirmation */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-green">
              <Activity className="h-4 w-4 text-agri-green" /> {t('fused_recommendation', 'Fused Recommendation')}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Zone 1 soil moisture has dropped to <strong>32%</strong>, crossing the vegetative stress line. Drip delivery of 38,000 Liters restores root-zone field capacity without ponding.
            </p>

            <div className="p-2.5 bg-green-50 rounded-lg border border-green-200 text-xs text-agri-green flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{t('rainfall_forecast_check', 'Rainfall Forecast Check:')}</strong>
                0 mm rain forecast for next 18 hours. Safe to irrigate with 0% risk of leaching.
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-yellow-800">
            <strong className="font-bold">{t('sih_water_target', 'SIH Water Conservation Target:')}</strong>{' '}
            {t('preserving_water_vs_flood', 'Preserving 18.4% water vs conventional flood method.')}
          </div>
        </div>
      </div>
    </Card>
  );
};
