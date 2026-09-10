import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Sprout, ScanEye, Microscope } from 'lucide-react';
import { HealthScoreCard } from '../components/ui/HealthScoreCard';
import { HealthAreaComparison } from '../components/crop-health/HealthAreaComparison';
import { CanopyAnalysisCard } from '../components/crop-health/CanopyAnalysisCard';
import { GrowthStageTimeline } from '../components/crop-health/GrowthStageTimeline';
import { NutrientDeficiencyGrid } from '../components/crop-health/NutrientDeficiencyGrid';
import { Button } from '../components/ui/Button';
import {
  mockCropHealthSummary,
  mockNutrientStatus,
  mockGrowthProgression,
} from '../data/cropHealthData';
import { useFarmData } from '../hooks/useFarmData';
import { useTranslation } from '../i18n';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const CropHealth: React.FC = () => {
  const { zones } = useOutletContext<FarmDataContext>();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner with Health Score */}
      <HealthScoreCard
        score={mockCropHealthSummary.score}
        stage={mockCropHealthSummary.stage}
        status={mockCropHealthSummary.status}
        trendText="+3.5% vs last week"
      />

      {/* Quick Action Link Banner */}
      <div className="p-4 bg-white rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-green-50 text-agri-green">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-deep-green">
              {t('ai_vision_title', 'AI Vision Leaf Health Inspection Workflow')}
            </h3>
            <p className="text-xs text-gray-500">
              {t('ai_vision_subtitle', 'Capture or upload crop leaves to isolate foliar anomalies with Edge CNN models.')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/ai-vision">
            <Button variant="secondary" size="sm" icon={<ScanEye className="h-4 w-4" />}>
              {t('nav_ai_vision', 'Open AI Vision')}
            </Button>
          </Link>
          <Link to="/disease-detection">
            <Button variant="primary" size="sm" icon={<Microscope className="h-4 w-4" />}>
              {t('nav_disease_detection', 'View Blast Diagnostic')}
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Healthy vs Affected Area Partitioning */}
      <HealthAreaComparison
        healthyPct={mockCropHealthSummary.healthyAreaPercentage}
        affectedPct={mockCropHealthSummary.affectedAreaPercentage}
        healthyAcres={mockCropHealthSummary.healthyAcres}
        affectedAcres={mockCropHealthSummary.affectedAcres}
        totalAcres={mockCropHealthSummary.totalAcres}
      />

      {/* 2. Biometric Canopy Color & Texture Analytics */}
      <CanopyAnalysisCard
        greennessIndex={mockCropHealthSummary.greennessIndex}
        textureEntropy={mockCropHealthSummary.textureEntropy}
        averageHeightCm={mockCropHealthSummary.averageHeightCm}
        tillersPerHill={mockCropHealthSummary.tillersPerHill}
      />

      {/* 3. Nutrient Status & Deficiency Diagnostics */}
      <NutrientDeficiencyGrid nutrients={mockNutrientStatus} />

      {/* 4. Growth Stage & Phenology Timeline */}
      <GrowthStageTimeline
        stages={mockGrowthProgression}
        currentDay={mockCropHealthSummary.dayNumber}
      />
    </div>
  );
};
