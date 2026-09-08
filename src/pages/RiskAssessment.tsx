import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { RiskMatrixGrid } from '../components/risk/RiskMatrixGrid';
import { EnvironmentalRiskFusion } from '../components/risk/EnvironmentalRiskFusion';
import { RiskForecastTimeline } from '../components/risk/RiskForecastTimeline';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  mockMultiFactorRisk,
  mockRiskForecast7Days,
} from '../data/riskData';
import { useFarmData } from '../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const RiskAssessment: React.FC = () => {
  const { zones } = useOutletContext<FarmDataContext>();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-warning-amber">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              Cross-Module Fused Risk Assessment
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Synthesis of foliar computer vision, edge IoT sensors, and meteorological forecasting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/field-monitoring">
            <Button variant="outline" size="sm" icon={<Layers className="h-4 w-4" />}>
              View Field Map
            </Button>
          </Link>
          <Link to="/alerts">
            <Button variant="primary" size="sm" icon={<AlertTriangle className="h-4 w-4" />}>
              Active Incidents
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Overall Synthesis Banner & 8-Factor Risk Cards */}
      <RiskMatrixGrid riskData={mockMultiFactorRisk} />

      {/* 2. Sensor + Vision Fusion Diagnostics (Zone 1 & Zone 2) */}
      <EnvironmentalRiskFusion zones={zones} />

      {/* 3. 7-Day Predictive Risk Forecast Trajectory */}
      <RiskForecastTimeline data={mockRiskForecast7Days} />

      {/* 4. Contributing Risk Factors Table */}
      <Card>
        <CardHeader
          title="Root-Cause Contributing Risk Factors"
          subtitle="Ranked agronomic hazards and active vulnerabilities"
          icon={<AlertTriangle className="h-5 w-5 text-warning-amber" />}
        />

        <div className="divide-y divide-gray-100 mt-2">
          {mockMultiFactorRisk.riskFactors.map((factor, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 shrink-0 ${
                  factor.impact === 'High'
                    ? 'bg-red-100 text-danger-red border border-red-200'
                    : factor.impact === 'Medium'
                    ? 'bg-amber-100 text-yellow-800 border border-amber-200'
                    : 'bg-green-100 text-agri-green border border-green-200'
                }`}>
                  {factor.impact} Impact
                </span>
                <div>
                  <h4 className="text-xs font-bold text-dark-forest">{factor.factor}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{factor.description}</p>
                </div>
              </div>

              <span className="text-xs font-semibold text-deep-green px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 self-start sm:self-auto shrink-0">
                {factor.zone}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
