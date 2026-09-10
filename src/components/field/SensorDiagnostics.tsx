import React from 'react';
import { Activity, CloudRain, Gauge, Thermometer, Cpu } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { useTranslation } from '../../i18n';
import { Zone } from '../../types';

interface SensorDiagnosticsProps {
  currentReading?: Zone['currentReading'];
}

export const SensorDiagnostics: React.FC<SensorDiagnosticsProps> = ({ currentReading }) => {
  const { t } = useTranslation();

  const soilMoisture = currentReading?.soilMoisture ?? 32;
  const temperature = currentReading?.temperature ?? 28;
  const humidity = currentReading?.humidity ?? 70;
  const rainfall = currentReading?.rainfall ?? 0;

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader
        title={t('sensor_node_diag_title', 'Field Sensor Node Diagnostic Matrix')}
        subtitle={t('sensor_node_diag_sub', 'Edge sensor calibration & sampling telemetry')}
        icon={<Activity className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('sensors_calibrated_count', '4 / 4 Probes Online')}
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
        {/* Probe 1: Soil Moisture Dielectric Probe */}
        <div className="p-3.5 bg-gray-50/70 hover:bg-white rounded-xl border border-gray-100 hover:border-soft-green/50 transition-all shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-700 shrink-0">
                  <Gauge className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-deep-green leading-snug break-words">
                    {t('sensor_probe_soil', 'Soil Dielectric Probe')}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    {t('metric_soil_moisture', 'Soil Moisture')}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t('status_healthy', 'Healthy')}
              </span>
            </div>

            {/* Prominent Primary Metric Value */}
            <div className="my-2.5 px-3 py-2 bg-white rounded-lg border border-gray-100 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-deep-green tracking-tight font-mono">
                  {soilMoisture}
                </span>
                <span className="text-xs font-bold text-gray-500">% VWC</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                0–3.3V ADC
              </span>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t('sensor_probe_soil_desc', 'Corrosion-resistant capacitive PCB probe. Calibrated for alluvial clay loam.')}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>{t('diag_bus', 'Bus')}: <strong className="text-gray-700 font-mono">ADC Ch. 4</strong></span>
            <span>{t('diag_calib', 'Calib')}: <strong className="text-gray-700 font-mono">Clay Loam</strong></span>
          </div>
        </div>

        {/* Probe 2: DHT22 Microclimate */}
        <div className="p-3.5 bg-gray-50/70 hover:bg-white rounded-xl border border-gray-100 hover:border-soft-green/50 transition-all shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-sky-100/70 text-sky-700 shrink-0">
                  <Thermometer className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-deep-green leading-snug break-words">
                    {t('sensor_probe_dht22', 'DHT22 Microclimate')}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    {t('sensor_temp_humidity', 'Temp & Ambient RH')}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200/50 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                {t('status_normal', 'Normal')}
              </span>
            </div>

            {/* Prominent Primary Metric Value */}
            <div className="my-2.5 px-3 py-2 bg-white rounded-lg border border-gray-100 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-deep-green tracking-tight font-mono">
                  {temperature}°C
                </span>
                <span className="text-xs font-bold text-gray-400 font-mono">
                  / {humidity}% RH
                </span>
              </div>
              <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">
                ±0.5°C
              </span>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t('sensor_probe_dht22_desc', 'Dual temperature & relative humidity sensor with solar radiation shield.')}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>{t('diag_bus', 'Bus')}: <strong className="text-gray-700 font-mono">1-Wire GPIO</strong></span>
            <span>{t('status_active', 'Active')}: <strong className="text-gray-700 font-mono">DHT22</strong></span>
          </div>
        </div>

        {/* Probe 3: Tipping Bucket Gauge (Rainfall) */}
        <div className="p-3.5 bg-gray-50/70 hover:bg-white rounded-xl border border-gray-100 hover:border-soft-green/50 transition-all shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-purple-100/70 text-purple-700 shrink-0">
                  <CloudRain className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-deep-green leading-snug break-words">
                    {t('sensor_probe_rain', 'Tipping Bucket Gauge')}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    {t('sensor_precipitation', 'Precipitation Monitor')}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100/80 text-purple-800 border border-purple-200/50 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                {t('status_active', 'Active')}
              </span>
            </div>

            {/* Prominent Primary Metric Value */}
            <div className="my-2.5 px-3 py-2 bg-white rounded-lg border border-gray-100 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-deep-green tracking-tight font-mono">
                  {typeof rainfall === 'number' ? rainfall.toFixed(1) : rainfall}
                </span>
                <span className="text-xs font-bold text-gray-500">mm / 24h</span>
              </div>
              <span className="text-[10px] font-semibold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200/60">
                0.2mm Pulse
              </span>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t('sensor_probe_rain_desc', 'Reed switch event counter recording 0.2mm precipitation pulses.')}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>{t('diag_bus', 'Bus')}: <strong className="text-gray-700 font-mono">GPIO IRQ</strong></span>
            <span>{t('diag_filter', 'Filter')}: <strong className="text-gray-700 font-mono">Debounced</strong></span>
          </div>
        </div>

        {/* Probe 4: Edge AI Inference Hub */}
        <div className="p-3.5 bg-gray-50/70 hover:bg-white rounded-xl border border-gray-100 hover:border-soft-green/50 transition-all shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-amber-100/70 text-amber-700 shrink-0">
                  <Cpu className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-deep-green leading-snug break-words">
                    {t('sensor_probe_edge', 'Edge AI Inference Hub')}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    {t('sensor_gateway_sub', 'RPi4 / ESP32 Gateway')}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200/50 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {t('status_online', 'Online')}
              </span>
            </div>

            {/* Prominent Primary Metric Value */}
            <div className="my-2.5 px-3 py-2 bg-white rounded-lg border border-gray-100 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-deep-green tracking-tight font-mono">
                  100%
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {t('diag_offline_ready', 'Offline-Ready')}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                TFLite INT8
              </span>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t('sensor_probe_edge_desc', 'Raspberry Pi 4 / ESP32 Gateway with local SQLite buffer & TFLite engine.')}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>{t('diag_engine', 'Engine')}: <strong className="text-gray-700 font-mono">MobileNet</strong></span>
            <span>DB: <strong className="text-gray-700 font-mono">SQLite</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
};
