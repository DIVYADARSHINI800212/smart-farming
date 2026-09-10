import React from 'react';
import { CloudSun } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { MicroclimateMetrics } from '../../types';
import { useTranslation } from '../../i18n';
import { translateZoneName, translateLabel } from '../../utils/translationMapper';

interface MicroclimateGridProps {
  metrics: MicroclimateMetrics;
  zoneName: string;
}

export const MicroclimateGrid: React.FC<MicroclimateGridProps> = ({ metrics, zoneName }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* 4 Core Agricultural Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Vapor Pressure Deficit (VPD) */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('vapor_pressure_deficit', 'Vapor Pressure Deficit')}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.vpdStatus === 'Optimal' ? 'bg-green-100 text-agri-green' : 'bg-amber-100 text-yellow-800'
              }`}>
                {translateLabel(metrics.vpdStatus, 'status', t)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-deep-green">{metrics.vpdKpa}</span>
              <span className="text-xs text-gray-500 font-semibold">kPa</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {t('vpd_target_desc', 'Target: 0.8 – 1.4 kPa. Healthy stomatal conductance and transpirational pull without leaf dessication.')}
          </p>
        </div>

        {/* 2. Leaf Wetness Duration */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('leaf_wetness_hours', 'Leaf Wetness Hours')}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.leafWetnessHours > 5 ? 'bg-red-100 text-danger-red' : 'bg-green-100 text-agri-green'
              }`}>
                {metrics.leafWetnessHours > 5 ? t('fungal_threat', 'Fungal Threat') : t('safe_duration', 'Safe Duration')}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-dark-forest">{metrics.leafWetnessHours}</span>
              <span className="text-xs text-gray-500 font-semibold">{t('hours_24h', 'Hours (24h)')}</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {metrics.leafWetnessHours > 5 ? t('continuous_wetness_risk', 'Continuous wetness >6h promotes blast fungal spore germination.') : t('normal_foliar_microclimate', 'Normal foliar microclimate.')}
          </p>
        </div>

        {/* 3. Heat Stress Index */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('heat_stress_index', 'Heat Stress Index')}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
                {translateLabel(metrics.heatStressIndex, 'risk', t)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-dark-forest">{metrics.airTemperature}°C</span>
              <span className="text-xs text-gray-500 font-semibold">{t('canopy_ambient', 'Canopy Ambient')}</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {t('below_critical_threshold', 'Below critical reproductive threshold (>35°C). Zero floral sterility risk.')}
          </p>
        </div>

        {/* 4. Humidity Stress Index */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('humidity_stress_index', 'Humidity Stress')}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                metrics.humidityStressIndex === 'High' ? 'bg-red-100 text-danger-red' : 'bg-green-100 text-agri-green'
              }`}>
                {translateLabel(metrics.humidityStressIndex, 'risk', t)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-2xl font-black ${metrics.relativeHumidity > 80 ? 'text-danger-red' : 'text-dark-forest'}`}>
                {metrics.relativeHumidity}%
              </span>
              <span className="text-xs text-gray-500 font-semibold">{t('rel_humidity_abbr', 'Rel. Humidity')}</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {metrics.relativeHumidity > 80 ? t('humidity_suppresses_transpiration', 'Suppresses transpiration and accelerates spore spread.') : t('normal_veg_growth', 'Normal vegetative microclimate.')}
          </p>
        </div>
      </div>

      {/* Sensor Readings Strip */}
      <Card>
        <CardHeader
          title={`${t('detailed_microclimate_title', 'Detailed Microclimate Telemetry')} (${translateZoneName(zoneName, t)})`}
          subtitle={t('detailed_microclimate_sub', 'Real-time multi-sensor readings from deployed ESP32 LoRa nodes')}
          icon={<CloudSun className="h-5 w-5 text-agri-green" />}
        />

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('ambient_temp', 'Air Temperature')}</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.airTemperature}°C</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('soil_temp', 'Soil Temperature')}</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.soilTemperature}°C</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('relative_humidity', 'Relative Humidity')}</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.relativeHumidity}%</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('rain_24h', '24h Rainfall')}</span>
            <span className="text-lg font-black text-blue-700 mt-0.5 block">{metrics.rainfall24h} mm</span>
          </div>
          <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('wind_speed_label', 'Wind Velocity')}</span>
            <span className="text-lg font-black text-dark-forest mt-0.5 block">{metrics.windSpeedKmh} km/h</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
