import React from 'react';
import { Sprout, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Zone } from '../../types';
import { useTranslation } from '../../i18n';

interface TelemetryGridProps {
  zones: Zone[];
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({ zones }) => {
  const { t } = useTranslation();
  const z1 = zones.find(z => z.zoneId === 'zone-1');
  const z2 = zones.find(z => z.zoneId === 'zone-2');

  const avgMoisture = z1 && z2 ? ((z1.currentReading.soilMoisture + z2.currentReading.soilMoisture) / 2).toFixed(1) : '38.5';
  const avgTemp = z1 && z2 ? ((z1.currentReading.temperature + z2.currentReading.temperature) / 2).toFixed(1) : '27.5';
  const avgHumidity = z1 && z2 ? Math.round((z1.currentReading.humidity + z2.currentReading.humidity) / 2) : 78;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Crop Health */}
      <MetricCard
        title={t('crop_health_index', 'Crop Health Index')}
        value="88"
        unit="%"
        subtitle={t('normal_veg_growth', 'Normal vegetative growth')}
        trend={{ value: "+2.1% this week", isPositive: true }}
        icon={<Sprout className="h-5 w-5" />}
        highlightColor="agri-green"
      />

      {/* 2. Soil Moisture */}
      <MetricCard
        title={t('soil_moisture', 'Soil Moisture')}
        value={avgMoisture}
        unit="%"
        subtitle={`Z1: ${z1?.currentReading.soilMoisture}% (${t('low_label', 'Low')}) • Z2: ${z2?.currentReading.soilMoisture}%`}
        trend={{ value: t('water_deficit_z1', 'Water Deficit Z1'), isPositive: false }}
        icon={<Droplets className="h-5 w-5" />}
        highlightColor="warning-amber"
      />

      {/* 3. Canopy Temperature */}
      <MetricCard
        title={t('field_temperature', 'Field Temperature')}
        value={avgTemp}
        unit="°C"
        subtitle={`Z1: ${z1?.currentReading.temperature}°C • Z2: ${z2?.currentReading.temperature}°C`}
        trend={{ value: t('optimal_range', 'Optimal Range (25-30°C)'), isNeutral: true }}
        icon={<Thermometer className="h-5 w-5" />}
        highlightColor="agri-green"
      />

      {/* 4. Ambient Humidity */}
      <MetricCard
        title={t('relative_humidity', 'Relative Humidity')}
        value={avgHumidity}
        unit="%"
        subtitle={`Z1: ${z1?.currentReading.humidity}% • Z2: ${z2?.currentReading.humidity}% (${t('high_label', 'High')})`}
        trend={{ value: t('disease_favorable_z2', 'Disease Favorable Z2'), isPositive: false }}
        icon={<CloudRain className="h-5 w-5" />}
        highlightColor="danger-red"
      />
    </div>
  );
};
