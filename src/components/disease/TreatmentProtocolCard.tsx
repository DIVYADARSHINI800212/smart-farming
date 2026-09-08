import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, Leaf, AlertCircle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface TreatmentProtocolCardProps {
  treatment: {
    chemical: {
      product: string;
      dosage: string;
      sprayWindow: string;
    };
    biological: {
      product: string;
      dosage: string;
      method: string;
    };
    cultural: string;
  };
}

export const TreatmentProtocolCard: React.FC<TreatmentProtocolCardProps> = ({ treatment }) => {
  return (
    <Card>
      <CardHeader
        title="Recommended Agronomic Treatment Regimen"
        subtitle="Certified crop protection formulations & meteorological spray window"
        icon={<ShieldCheck className="h-5 w-5 text-agri-green" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {/* Chemical Protocol */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-deep-green flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-agri-green" /> Chemical Fungicide Option
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-danger-red">
              Curative Fast-Action
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-dark-forest">{treatment.chemical.product}</h4>
            <div className="mt-1 text-xs text-gray-600">
              <strong className="text-deep-green">Application Rate:</strong> {treatment.chemical.dosage}
            </div>
          </div>

          <div className="p-2.5 bg-green-50 rounded-lg border border-green-200 text-xs text-agri-green flex items-start gap-2">
            <Clock className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Recommended Spray Window:</strong>
              {treatment.chemical.sprayWindow}
            </div>
          </div>
        </div>

        {/* Biological Alternative */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-agri-green flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-agri-green" /> Bio-Control Alternative
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
              Organic / Eco-Friendly
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-dark-forest">{treatment.biological.product}</h4>
            <div className="mt-1 text-xs text-gray-600">
              <strong className="text-deep-green">Application Rate:</strong> {treatment.biological.dosage}
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-deep-green">Method:</strong> {treatment.biological.method}
          </p>
        </div>
      </div>

      <div className="p-3 bg-cream/70 rounded-xl border border-gray-200 text-xs text-gray-600 mt-3 flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-agri-green shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-deep-green">Cultural Field Practice:</strong> {treatment.cultural}
        </div>
      </div>
    </Card>
  );
};
