import React from 'react';
import { Leaf, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { NutrientIndicator } from '../../types';

interface NutrientDeficiencyGridProps {
  nutrients: NutrientIndicator[];
}

export const NutrientDeficiencyGrid: React.FC<NutrientDeficiencyGridProps> = ({ nutrients }) => {
  return (
    <Card>
      <CardHeader
        title="Plant Nutrient Health & Deficiency Diagnostics"
        subtitle="Spectral chlorophyll & foliar symptom analysis"
        icon={<Leaf className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {nutrients.map((item, idx) => {
          const isDeficient = item.status === 'Deficient';
          const isBorderline = item.status === 'Borderline';
          const isOptimal = item.status === 'Optimal';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isDeficient
                  ? 'bg-amber-50/40 border-amber-200'
                  : isBorderline
                  ? 'bg-yellow-50/40 border-yellow-200'
                  : 'bg-white border-gray-100 shadow-subtle'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-dark-forest">{item.nutrient}</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isDeficient
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : isBorderline
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-green-100 text-agri-green border border-green-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Sufficiency Index</span>
                  <span className="font-bold text-dark-forest">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isDeficient ? 'bg-amber-500' : isBorderline ? 'bg-yellow-500' : 'bg-agri-green'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-deep-green">Symptoms:</strong> {item.symptoms}
                </p>
                <p className="text-agri-green font-medium">
                  <strong className="text-deep-green">Recommendation:</strong> {item.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
