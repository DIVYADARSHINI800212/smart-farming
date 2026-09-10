import React from 'react';
import { Microscope, AlertTriangle, MapPin } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ConfidenceBar } from '../ui/ConfidenceBar';
import { DiseaseRecord } from '../../types';
import { useTranslation } from '../../i18n';

interface DiseaseResultCardProps {
  disease: DiseaseRecord;
}

export const DiseaseResultCard: React.FC<DiseaseResultCardProps> = ({ disease }) => {
  const { t } = useTranslation();

  return (
    <Card className="border-red-200 shadow-card">
      <CardHeader
        title={t('disease_detection_title', 'Edge Disease Classification Diagnostic')}
        subtitle="MobileNetV2 Transfer-Learned Pathology CNN • INT8 Quantized"
        icon={<Microscope className="h-5 w-5 text-danger-red" />}
        action={
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {t('demo_mode_badge', 'DEMONSTRATION / MOCK AI RESULT')}
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-2">
        {/* Left 2 Cols: Main Diagnosis */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-red-50/50 border border-danger-red/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge severity={disease.severity}>{t(`badge_${disease.severity.toLowerCase()}`, disease.severity)} {t('severity', 'SEVERITY')}</Badge>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-agri-green" /> {disease.affectedZone}
                </span>
              </div>
              <span className="text-xs font-bold text-danger-red bg-red-100 px-2.5 py-0.5 rounded-full">
                {t('affected_leaf_area', 'Affected Area')}: {disease.affectedAreaPercentage}% (0.41 {t('acres', 'Acres')})
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-2xl font-black text-deep-green tracking-tight">
                {t('blast_disease_name', disease.diseaseName)}
              </h3>
              <p className="text-xs text-gray-500 italic mt-0.5">
                {t('pathogen_type', 'Causal Organism')}: {disease.scientificName}
              </p>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-danger-red">{disease.confidence}%</span>
              <span className="text-xs font-semibold text-gray-500">{t('confidence', 'Inference Confidence Level')}</span>
            </div>
          </div>

          {/* Probabilities Breakdown */}
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-subtle space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {t('class_probability_dist', 'Multi-Class Prediction Probability Output')}
            </h4>
            {disease.probabilities.map((item, idx) => (
              <ConfidenceBar
                key={idx}
                label={item.label}
                percentage={item.percentage}
                isDominant={idx === 0}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Observed Symptoms */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-deep-green mb-2.5">
              {t('symptom_progression', 'Verified Symptom Manifestations')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {disease.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-danger-red shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-yellow-800">
            <strong className="block font-bold">{t('severity_assessment', 'Phenology Vulnerability')}:</strong>
            {disease.progressionStage}.
          </div>
        </div>
      </div>
    </Card>
  );
};
