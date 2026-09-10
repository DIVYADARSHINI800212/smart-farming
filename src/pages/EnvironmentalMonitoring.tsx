import React, { useState } from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { MicroclimateGrid } from '../components/environment/MicroclimateGrid';
import { EnvironmentalTrendChart } from '../components/environment/EnvironmentalTrendChart';
import { mockZones } from '../data/mockData';
import {
  mockMicroclimateZone1,
  mockMicroclimateZone2,
  mock24HourEnvironmentalTrend,
} from '../data/environmentalData';
import { ThermometerSun, Droplets, Sun, Wind } from 'lucide-react';
import { useTranslation } from '../i18n';

export const EnvironmentalMonitoring: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('zone-1');
  const { t } = useTranslation();

  const activeZone = mockZones.find((z) => z.zoneId === selectedZone) || mockZones[0];
  const activeMetrics = selectedZone === 'zone-2' ? mockMicroclimateZone2 : mockMicroclimateZone1;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
              {t('env_monitoring_title', 'Canopy Microclimate & Physics')}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-agri-dark tracking-tight">
            {t('env_monitoring_title', 'Environmental Monitoring')}
          </h1>
          <p className="text-sm text-agri-muted">
            {t('env_monitoring_subtitle', 'Continuous sub-canopy Vapor Pressure Deficit (VPD), diurnal leaf wetness duration, and thermal equilibrium')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ZoneSelector
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('vapor_pressure_deficit', 'Vapor Pressure Deficit')}
          value={activeMetrics.vpdKpa.toFixed(2)}
          unit="kPa"
          icon={<ThermometerSun className="w-5 h-5 text-emerald-600" />}
          highlightColor="agri-green"
          subtitle={`${t('stock_status', 'Status')}: ${activeMetrics.vpdStatus}`}
        />
        <MetricCard
          title={t('leaf_wetness_duration', 'Leaf Wetness Duration')}
          value={activeMetrics.leafWetnessHours.toString()}
          unit={t('ago_hours', 'hrs')}
          icon={<Droplets className="w-5 h-5 text-blue-600" />}
          highlightColor="deep-green"
          subtitle={`${t('severity', 'Risk')}: ${activeMetrics.leafWetnessRisk}`}
        />
        <MetricCard
          title={t('ambient_temp', 'Soil Temperature')}
          value={activeMetrics.soilTemperature.toString()}
          unit="°C"
          icon={<Sun className="w-5 h-5 text-amber-600" />}
          highlightColor="warning-amber"
          subtitle={t('rhizosphere_thermal_band', 'Rhizosphere thermal band')}
        />
        <MetricCard
          title={t('relative_humidity', 'Relative Humidity')}
          value={`${activeMetrics.relativeHumidity}`}
          unit="%"
          icon={<Wind className="w-5 h-5 text-teal-600" />}
          highlightColor="deep-green"
          subtitle={`Stress: ${activeMetrics.humidityStressIndex}`}
        />
      </div>

      {/* Microclimate Core Grid */}
      <MicroclimateGrid metrics={activeMetrics} zoneName={activeZone.name} />

      {/* Diurnal Trend Recharts */}
      <EnvironmentalTrendChart data={mock24HourEnvironmentalTrend} />
    </div>
  );
};

export default EnvironmentalMonitoring;
