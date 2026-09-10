import React from 'react';
import { Scan } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { useTranslation } from '../../i18n';

interface CanopyAnalysisCardProps {
  greennessIndex: number;
  textureEntropy: number;
  averageHeightCm: number;
  tillersPerHill: number;
}

export const CanopyAnalysisCard: React.FC<CanopyAnalysisCardProps> = ({
  greennessIndex,
  textureEntropy,
  averageHeightCm,
  tillersPerHill,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={t('title_canopy_analysis', 'Biometric Canopy Color & Texture Analytics')}
        subtitle={t('canopy_analysis_sub', 'Edge optical vegetation indexes & morphometry')}
        icon={<Scan className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        <div className="p-3.5 bg-cream/70 rounded-xl border border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('dark_green_color_index', 'Dark Green Color Index')}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-agri-green">{greennessIndex}</span>
            <span className="text-xs text-gray-400">/ 1.0 DGCI</span>
          </div>
          <span className="text-[11px] text-agri-green font-semibold block mt-1">
            {t('high_chlorophyll', 'High Chlorophyll')}
          </span>
        </div>

        <div className="p-3.5 bg-cream/70 rounded-xl border border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('texture_entropy', 'Texture Entropy')}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-dark-forest">{textureEntropy}</span>
            <span className="text-xs text-gray-400">{t('score_label', 'Score')}</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">
            {t('minor_leaf_folding', 'Minor Leaf Folding')}
          </span>
        </div>

        <div className="p-3.5 bg-cream/70 rounded-xl border border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('avg_canopy_height', 'Average Canopy Height')}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-dark-forest">{averageHeightCm}</span>
            <span className="text-xs text-gray-400">cm</span>
          </div>
          <span className="text-[11px] text-gray-500 block mt-1">
            {t('normal_for_day_42', 'Normal for Day 42')}
          </span>
        </div>

        <div className="p-3.5 bg-cream/70 rounded-xl border border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('tillering_density', 'Tillering Density')}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-agri-green">{tillersPerHill}</span>
            <span className="text-xs text-gray-400">{t('per_hill', 'per hill')}</span>
          </div>
          <span className="text-[11px] text-agri-green font-semibold block mt-1">
            {t('optimal_tillering', 'Optimal Tillering')}
          </span>
        </div>
      </div>
    </Card>
  );
};
