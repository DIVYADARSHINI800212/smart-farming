import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckSquare } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AIRecommendation } from '../../types';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card className="bg-gradient-to-br from-white via-white to-green-50/30">
      <CardHeader
        title="AI Agronomic Recommendations"
        subtitle="Fused Edge Sensor & Disease Intelligence Engine"
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
                  {rec.urgency} Action
                </span>
                <span className="text-[11px] font-semibold text-gray-500">{rec.category}</span>
              </div>

              <h4 className="text-sm font-bold text-deep-green leading-snug">{rec.title}</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{rec.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              {rec.recommendedDosage && (
                <div className="text-[11px] bg-gray-50 p-2 rounded-lg border border-gray-100 text-gray-700">
                  <span className="font-semibold text-deep-green block">Prescribed Rate:</span>
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
