import React from 'react';
import { AlertCircle, ShieldCheck, Leaf, Eye, ShieldAlert } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';

interface EarlyWarningSectionProps {
  interventions: {
    biological: string;
    cultural: string;
    monitoring: string;
  };
}

export const EarlyWarningSection: React.FC<EarlyWarningSectionProps> = ({ interventions }) => {
  return (
    <Card>
      <CardHeader
        title="Integrated Pest Management (IPM) Protocols & Early Warning"
        subtitle="Tiered biological & cultural threshold interventions"
        icon={<ShieldAlert className="h-5 w-5 text-warning-amber" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-agri-green">
            <Leaf className="h-4 w-4" /> 1. Biological Parasitoids
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {interventions.biological}
          </p>
          <div className="text-[10px] text-agri-green bg-green-50 px-2 py-1 rounded font-semibold inline-block">
            Impact: 60-70% egg parasitism
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-green">
            <ShieldCheck className="h-4 w-4 text-agri-green" /> 2. Agronomic & Cultural Controls
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {interventions.cultural}
          </p>
          <div className="text-[10px] text-gray-600 bg-gray-100 px-2 py-1 rounded font-semibold inline-block">
            Reduces succulent foliage attraction
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Eye className="h-4 w-4 text-warning-amber" /> 3. Pheromone & Light Trapping
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {interventions.monitoring}
          </p>
          <div className="text-[10px] text-yellow-800 bg-amber-50 px-2 py-1 rounded font-semibold inline-block">
            Continuous surveillance
          </div>
        </div>
      </div>
    </Card>
  );
};
