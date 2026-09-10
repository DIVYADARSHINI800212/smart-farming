import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  CloudRain, 
  CloudSun, 
  Camera, 
  Clock, 
  Layers,
} from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Zone } from '../../types';
import { useTranslation } from '../../i18n';
import { translateLabel, translateGrowthStage, translateCropVariety } from '../../utils/translationMapper';

interface ZoneDetailCardProps {
  zone: Zone;
  isFocused?: boolean;
}

export const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({ zone, isFocused = false }) => {
  const { t } = useTranslation();

  const getTranslatedZoneName = (name: string) => {
    if (name.includes('Zone 1')) return t('zone_1_north_paddy', name);
    if (name.includes('Zone 2')) return t('zone_2_south_paddy', name);
    return name;
  };

  const getTranslatedLabel = (label: string) => {
    // Try disease mapping first
    if (['Blast', 'Brown Spot', 'Healthy', 'Others'].includes(label)) {
      return translateLabel(label, 'disease', t);
    }
    // Try pest mapping
    if (['Leaf Folder', 'Stem Borer', 'Planthopper', 'No Pest'].includes(label)) {
      return translateLabel(label, 'pest', t);
    }
    return label;
  };

  return (
    <Card 
      className={`transition-all duration-300 ${
        isFocused 
          ? 'border-2 border-agri-green ring-4 ring-agri-green/10 shadow-card-hover' 
          : 'hover:border-soft-green/60'
      }`}
    >
      <CardHeader
        title={getTranslatedZoneName(zone.name)}
        subtitle={`${translateCropVariety(zone.cropType, t)} • ${translateGrowthStage(zone.growthStage, t)} • ${zone.areaAcres} ${t('acres', 'Acres')}`}
        icon={<Layers className="h-5 w-5 text-agri-green" />}
        action={<StatusPill status={zone.status} />}
      />

      {/* Sensor Metrics Big Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {/* Soil Moisture */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('soil_moisture', 'Soil Moisture')}</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${zone.currentReading.soilMoisture < 35 ? 'text-amber-600' : 'text-agri-green'}`}>
                {zone.currentReading.soilMoisture}%
              </span>
              <span className="text-[10px] text-gray-400">
                {zone.currentReading.soilMoisture < 35 ? t('low_label', 'Low') : t('badge_optimal', 'Adequate')}
              </span>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 text-agri-green">
            <Thermometer className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('ambient_temp', 'Canopy Temp')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-dark-forest">
                {zone.currentReading.temperature}°C
              </span>
              <span className="text-[10px] text-gray-400">{t('badge_good', 'Normal')}</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${zone.currentReading.humidity > 80 ? 'bg-red-100 text-danger-red' : 'bg-blue-100 text-blue-700'}`}>
            <CloudSun className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('relative_humidity', 'Rel. Humidity')}</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${zone.currentReading.humidity > 80 ? 'text-danger-red' : 'text-dark-forest'}`}>
                {zone.currentReading.humidity}%
              </span>
              <span className="text-[10px] text-gray-400">
                {zone.currentReading.humidity > 80 ? t('high_label', 'High') : t('badge_good', 'Normal')}
              </span>
            </div>
          </div>
        </div>

        {/* Rainfall */}
        <div className="p-3 bg-cream/70 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
            <CloudRain className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('precipitation_prob', 'Rain Gauge')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-blue-800">
                {zone.currentReading.rainfall} mm
              </span>
              <span className="text-[10px] text-gray-400">24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disease and Pest Breakdown Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pt-2 border-t border-gray-100">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            {t('class_probability_dist', 'AI Disease Classification Probabilities')}
          </h4>
          <div className="space-y-2">
            {zone.diseaseDistribution.map((d, i) => (
              <ProgressBar
                key={i}
                label={getTranslatedLabel(d.label)}
                value={d.percentage}
                variant={d.label === 'Blast' ? 'danger-red' : d.label === 'Healthy' ? 'agri-green' : 'warning-amber'}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            {t('pest_density', 'Pest Population & Trap Analytics')}
          </h4>
          <div className="space-y-2">
            {zone.pestDistribution.map((p, i) => (
              <ProgressBar
                key={i}
                label={getTranslatedLabel(p.label)}
                value={p.percentage}
                variant={p.label === 'Leaf Folder' ? 'warning-amber' : p.label === 'No Pest' ? 'agri-green' : 'blue'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 text-agri-green" />
          <span>{t('last_sync', 'Last packet')}: <strong>{zone.currentReading.timestamp}</strong></span>
          <span>• {t('tab_node_config', 'Node')}: <strong>{zone.nodeId.toUpperCase()}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Camera className="h-3.5 w-3.5" />}>
            {t('btn_capture_image', 'Capture Leaf')}
          </Button>
          <Button variant="primary" size="sm">
            {zone.status === 'Water Stress' ? t('smart_irrigation_title', 'Irrigate Zone') : t('btn_view_advisory', 'View Advisory')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
