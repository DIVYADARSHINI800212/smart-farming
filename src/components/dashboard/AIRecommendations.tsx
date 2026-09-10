import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { AIRecommendation } from '../../types';
import { useTranslation } from '../../i18n';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gradient-to-br from-white via-white to-green-50/30">
      <CardHeader
        title={t('ai_recommendations_title', 'AI Agronomic Recommendations')}
        subtitle={t('ai_recommendations_sub', 'Fused Edge Sensor & Disease Intelligence Engine')}
        icon={<Sparkles className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 bg-white rounded-xl border border-[#E6F0EB] shadow-subtle hover:border-soft-green/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  rec.urgency === 'Immediate' ? 'bg-red-100 text-danger-red' :
                  rec.urgency === 'Today' ? 'bg-amber-100 text-yellow-800' :
                  'bg-green-100 text-agri-green'
                }`}>
                  {rec.urgency === 'Immediate' ? t('urgency_immediate', 'Immediate') : rec.urgency === 'Today' ? t('today', 'Today') : t('urgency_scheduled', rec.urgency)}
                </span>
                <span className="text-[11px] font-semibold text-gray-500">
                  {t('cat_' + rec.category.toLowerCase().replace(/\s+/g, '_'), rec.category)}
                </span>
              </div>

              <h4 className="text-sm font-bold text-deep-green leading-snug">
                {t(`rec_${rec.id.replace('-', '_')}_title`, rec.title)}
              </h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {t(`rec_${rec.id.replace('-', '_')}_desc`, rec.description)}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              {rec.recommendedDosage && (
                <div className="text-[11px] bg-gray-50 p-2 rounded-lg border border-gray-100 text-gray-700">
                  <span className="font-semibold text-deep-green block">{t('dosage_label', 'Prescribed Rate')}:</span>
                  {rec.recommendedDosage}
                </div>
              )}
              <div className="text-[11px] text-agri-green font-medium flex items-start gap-1">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{rec.potentialBenefit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
