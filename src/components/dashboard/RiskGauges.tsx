import React from 'react';
import { Microscope, Bug, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Zone } from '../../types';
import { useTranslation } from '../../i18n';
import { translateLabel } from '../../utils/translationMapper';

interface RiskGaugesProps {
  zones: Zone[];
}

export const RiskGauges: React.FC<RiskGaugesProps> = ({ zones }) => {
  const { t } = useTranslation();
  const z1 = zones.find(z => z.zoneId === 'zone-1');
  const z2 = zones.find(z => z.zoneId === 'zone-2');

  const diseaseData = z2?.diseaseDistribution || [
    { label: 'Blast', percentage: 82 },
    { label: 'Brown Spot', percentage: 8 },
    { label: 'Healthy', percentage: 6 },
    { label: 'Others', percentage: 4 },
  ];

  const pestData = z1?.pestDistribution || [
    { label: 'Leaf Folder', percentage: 78 },
    { label: 'No Pest', percentage: 11 },
    { label: 'Stem Borer', percentage: 6 },
    { label: 'Planthopper', percentage: 5 },
  ];

  const translateDiseaseLabel = (lbl: string) => {
    return translateLabel(lbl, 'disease', t);
  };

  const translatePestLabel = (lbl: string) => {
    return translateLabel(lbl, 'pest', t);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Disease Risk Card */}
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader
            title={t('disease_risk_gauge_title', 'Disease Risk Assessment')}
            subtitle="Edge Vision Model (INT8 CNN MobileNetV2) • Zone 2 Focus"
            icon={<Microscope className="h-5 w-5" />}
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-danger-red/10 text-danger-red border border-danger-red/20">
                <AlertTriangle className="h-3.5 w-3.5" /> {t('badge_high', 'High')} (82%)
              </span>
            }
          />

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 mb-4 text-xs text-danger-red font-medium">
            <strong>{t('badge_critical', 'Critical Alert')}:</strong> {t('rice_blast_emergence', 'Rice Blast symptoms detected in Zone 2. Microclimate conditions (85% Humidity, 27°C, 2mm rainfall) heavily accelerate fungal conidia germination.')}
          </div>

          <div className="space-y-3">
            {diseaseData.map((item, idx) => (
              <ProgressBar
                key={idx}
                label={translateDiseaseLabel(item.label)}
                value={item.percentage}
                variant={
                  item.label === 'Blast' ? 'danger-red' :
                  item.label === 'Healthy' ? 'agri-green' : 'warning-amber'
                }
                sublabel={item.label === 'Blast' ? t('symptom_progression', 'Pathogenic Lesions') : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>{t('latency', 'Inference Latency')}: <strong>142ms</strong> (Edge-Local)</span>
          <span>Sample: <strong>Z2_Canopy_042.jpg</strong></span>
        </div>
      </Card>

      {/* Pest Risk Card */}
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader
            title={t('pest_risk_gauge_title', 'Pest Risk Assessment')}
            subtitle="Trap & Leaf Fold Analytics • Zone 1 Focus"
            icon={<Bug className="h-5 w-5" />}
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-warning-amber/20 text-yellow-800 border border-warning-amber/30">
                <AlertTriangle className="h-3.5 w-3.5" /> {t('badge_high', 'High')} (78%)
              </span>
            }
          />

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 mb-4 text-xs text-yellow-800 font-medium">
            <strong>{t('badge_advisory', 'Advisory Notice')}:</strong> {t('pest_threshold_exceeded', 'Leaf Folder moth counts exceeded economic threshold level in Zone 1. Check for longitudinal leaf folding before chemical intervention.')}
          </div>

          <div className="space-y-3">
            {pestData.map((item, idx) => (
              <ProgressBar
                key={idx}
                label={translatePestLabel(item.label)}
                value={item.percentage}
                variant={
                  item.label === 'Leaf Folder' ? 'warning-amber' :
                  item.label === 'No Pest' ? 'agri-green' : 'blue'
                }
                sublabel={item.label === 'Leaf Folder' ? t('dominant_species', 'Dominant Species') : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Pest Model: <strong>YOLOv8-Nano INT8</strong></span>
          <span>Trap Count: <strong>14 moths / quad</strong></span>
        </div>
      </Card>
    </div>
  );
};
