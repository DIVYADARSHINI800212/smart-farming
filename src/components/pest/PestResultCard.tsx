import React from 'react';
import { Bug, AlertTriangle, MapPin, CheckCircle2, ShieldCheck, Gauge } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ConfidenceBar } from '../ui/ConfidenceBar';
import { PestRecord } from '../../types';

interface PestResultCardProps {
  pest: PestRecord;
}

export const PestResultCard: React.FC<PestResultCardProps> = ({ pest }) => {
  return (
    <Card className="border-amber-200 shadow-card">
      <CardHeader
        title="Edge Entomology Inference Diagnostic"
        subtitle="YOLOv8-Nano INT8 Insect & Damage Detection Model"
        icon={<Bug className="h-5 w-5 text-warning-amber" />}
        action={
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            DEMONSTRATION / MOCK AI RESULT
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-2">
        {/* Left 2 Cols: Main Diagnostic */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-warning-amber/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge severity={pest.severity}>{pest.severity} SEVERITY</Badge>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-agri-green" /> {pest.affectedZone}
                </span>
              </div>
              <span className="text-xs font-bold text-yellow-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Trap Count: {pest.trapCountPerAcre} moths / acre
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-2xl font-black text-deep-green tracking-tight">
                {pest.pestName}
              </h3>
              <p className="text-xs text-gray-500 italic mt-0.5">
                Scientific Taxon: {pest.scientificName}
              </p>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-yellow-800">{pest.confidence}%</span>
              <span className="text-xs font-semibold text-gray-500">Inference Confidence Level</span>
            </div>
          </div>

          {/* Probabilities Breakdown */}
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-subtle space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Entomological Classification Probabilities
            </h4>
            {pest.probabilities.map((item, idx) => (
              <ConfidenceBar
                key={idx}
                label={item.label}
                percentage={item.percentage}
                isDominant={idx === 0}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Threshold & Infestation Level */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-green">
              <Gauge className="h-4 w-4 text-warning-amber" /> Economic Threshold Status
            </div>

            <div className="p-3 bg-white rounded-lg border border-amber-200">
              <span className="text-[11px] text-gray-400 block font-semibold">Infestation Level</span>
              <span className="text-sm font-bold text-yellow-800">{pest.infestationLevel}</span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs">
              <span className="text-[11px] text-gray-400 block font-semibold">ETL Guideline</span>
              <p className="text-gray-600 mt-0.5">{pest.economicThresholdLevel}</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-yellow-800">
            <strong className="block font-bold">Field Advisory:</strong>
            Damaged leaves at 14% (above 10% tillering ETL). Initiate biological parasitoid release.
          </div>
        </div>
      </div>
    </Card>
  );
};
