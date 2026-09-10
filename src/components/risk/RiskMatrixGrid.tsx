import React from 'react';
import { 
  ShieldAlert, 
  Microscope, 
  Bug, 
  Droplets, 
  Flame, 
  Sun, 
  Waves, 
  CloudSun, 
  TrendingDown 
} from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { RiskCard } from '../ui/RiskCard';
import { MultiFactorRisk } from '../../types';
import { useTranslation } from '../../context/LanguageContext';
import { translateRiskLevel } from '../../utils/translationMapper';

interface RiskMatrixGridProps {
  riskData: MultiFactorRisk;
}

export const RiskMatrixGrid: React.FC<RiskMatrixGridProps> = ({ riskData }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Overall Synthesis Banner Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-deep-green via-[#1c4838] to-[#12372A] text-white shadow-card border border-soft-green/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-black text-white">{riskData.overallScore}</span>
              <span className="text-[10px] uppercase font-bold text-soft-green block -mt-1">/ 100</span>
            </div>
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-warning-amber rounded-full border-2 border-deep-green flex items-center justify-center">
              <ShieldAlert className="h-3 w-3 text-dark-forest" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-warning-amber border border-amber-500/30">
                {t('composite_risk_prefix', 'Composite Risk:')} {translateRiskLevel(riskData.overallRisk, t)}
              </span>
              <span className="text-xs text-soft-green">{t('sensor_vision_fusion', 'Sensor + Vision Fusion')}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {t('multi_factor_risk_matrix', 'Multi-Factor Farm Risk Matrix')}
            </h2>
            <p className="text-xs text-soft-green/80 mt-1 max-w-xl leading-relaxed">
              {t('multi_factor_risk_desc', 'Composite index combining real-time IoT microclimate telemetry (humidity, soil dielectric permittivity) with edge pathology and entomology computer vision models.')}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 shrink-0 min-w-[200px]">
          <span className="text-xs text-soft-green block font-medium">{t('yield_impact_projection', 'Yield Impact Projection')}</span>
          <span className="text-xl font-bold text-warning-amber mt-0.5 block">{t('yield_impact_potential_val', '-8.4% Potential')}</span>
          <span className="text-[11px] text-soft-green/70 block mt-1">{t('if_unaddressed_7d', 'If unaddressed over 7 days')}</span>
        </div>
      </div>

      {/* 8-Factor Risk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Disease Risk */}
        <RiskCard
          title={t('disease_fungal_risk', 'Disease Fungal Risk')}
          riskLevel={riskData.diseaseRisk}
          score={riskData.diseaseScore}
          description={t('disease_fungal_risk_desc', 'Zone 2 Blast fungal sporulation risk accelerated by 85% relative humidity.')}
          icon={<Microscope className="h-4 w-4 text-danger-red" />}
        />

        {/* 2. Pest Risk */}
        <RiskCard
          title={t('pest_infestation_risk', 'Pest Infestation Risk')}
          riskLevel={riskData.pestRisk}
          score={riskData.pestScore}
          description={t('pest_infestation_risk_desc', 'Zone 1 Leaf folder trap counts (14/acre) exceeding tillering threshold.')}
          icon={<Bug className="h-4 w-4 text-warning-amber" />}
        />

        {/* 3. Water Stress Risk */}
        <RiskCard
          title={t('water_stress_risk', 'Water Stress Risk')}
          riskLevel={riskData.waterStressRisk}
          score={riskData.waterStressScore}
          description={t('water_stress_risk_desc', 'Zone 1 soil moisture at 32% (below 45% vegetative optimum).')}
          icon={<Droplets className="h-4 w-4 text-blue-600" />}
        />

        {/* 4. Heat Stress Risk */}
        <RiskCard
          title={t('heat_stress_risk', 'Heat Stress Risk')}
          riskLevel={riskData.heatStressRisk}
          score={riskData.heatStressScore}
          description={t('heat_stress_risk_desc', 'Canopy temperature steady at 28°C; well within physiological comfort band.')}
          icon={<Flame className="h-4 w-4 text-amber-600" />}
        />

        {/* 5. Drought Risk */}
        <RiskCard
          title={t('drought_potential_risk', 'Drought Potential Risk')}
          riskLevel={riskData.droughtRisk}
          score={riskData.droughtScore}
          description={t('drought_potential_risk_desc', 'Cumulative 0mm rain over 24h in Zone 1. Replenishment scheduled.')}
          icon={<Sun className="h-4 w-4 text-orange-600" />}
        />

        {/* 6. Flood Risk */}
        <RiskCard
          title={t('flash_flood_risk', 'Flash Flood Risk')}
          riskLevel={riskData.floodRisk}
          score={riskData.floodScore}
          description={t('flash_flood_risk_desc', 'Rainfall at 2mm in Zone 2; field bunds flowing normally.')}
          icon={<Waves className="h-4 w-4 text-blue-800" />}
        />

        {/* 7. Environmental Risk */}
        <RiskCard
          title={t('environmental_microclimate_title', 'Environmental Microclimate')}
          riskLevel={riskData.environmentalRisk}
          score={riskData.environmentalScore}
          description={t('environmental_microclimate_desc', 'Favorable dew point and evening leaf wetness duration.')}
          icon={<CloudSun className="h-4 w-4 text-purple-600" />}
        />

        {/* 8. Yield Impact Risk */}
        <RiskCard
          title={t('projected_yield_risk', 'Projected Yield Risk')}
          riskLevel={riskData.yieldRisk}
          score={riskData.yieldScore}
          description={t('projected_yield_risk_desc', 'Yield reduction averted upon executing recommended bio-controls.')}
          icon={<TrendingDown className="h-4 w-4 text-red-600" />}
        />
      </div>
    </div>
  );
};
