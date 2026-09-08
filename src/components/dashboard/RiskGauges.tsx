import React from 'react';
import { Microscope, Bug, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Zone } from '../../types';

interface RiskGaugesProps {
  zones: Zone[];
}

export const RiskGauges: React.FC<RiskGaugesProps> = ({ zones }) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Disease Risk Card */}
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader
            title="Disease Risk Assessment"
            subtitle="Edge Vision Model (INT8 CNN MobileNetV2) • Zone 2 Focus"
            icon={<Microscope className="h-5 w-5" />}
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-danger-red/10 text-danger-red border border-danger-red/20">
                <AlertTriangle className="h-3.5 w-3.5" /> High Risk (82%)
              </span>
            }
          />

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 mb-4 text-xs text-danger-red font-medium">
            <strong>Critical Alert:</strong> Rice Blast symptoms detected in Zone 2. Microclimate conditions (85% Humidity, 27°C, 2mm rainfall) heavily accelerate fungal conidia germination.
          </div>

          <div className="space-y-3">
            {diseaseData.map((item, idx) => (
              <ProgressBar
                key={idx}
                label={item.label}
                value={item.percentage}
                variant={
                  item.label === 'Blast' ? 'danger-red' :
                  item.label === 'Healthy' ? 'agri-green' : 'warning-amber'
                }
                sublabel={item.label === 'Blast' ? 'Pathogenic Lesions' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Inference Latency: <strong>142ms</strong> (Edge-Local)</span>
          <span>Sample: <strong>Z2_Canopy_042.jpg</strong></span>
        </div>
      </Card>

      {/* Pest Risk Card */}
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader
            title="Pest Risk Assessment"
            subtitle="Trap & Leaf Fold Analytics • Zone 1 Focus"
            icon={<Bug className="h-5 w-5" />}
            action={
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-warning-amber/20 text-yellow-800 border border-warning-amber/30">
                <AlertTriangle className="h-3.5 w-3.5" /> High Activity (78%)
              </span>
            }
          />

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 mb-4 text-xs text-yellow-800 font-medium">
            <strong>Advisory Notice:</strong> Leaf Folder moth counts exceeded economic threshold level in Zone 1. Check for longitudinal leaf folding before chemical intervention.
          </div>

          <div className="space-y-3">
            {pestData.map((item, idx) => (
              <ProgressBar
                key={idx}
                label={item.label}
                value={item.percentage}
                variant={
                  item.label === 'Leaf Folder' ? 'warning-amber' :
                  item.label === 'No Pest' ? 'agri-green' : 'blue'
                }
                sublabel={item.label === 'Leaf Folder' ? 'Dominant Species' : undefined}
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
