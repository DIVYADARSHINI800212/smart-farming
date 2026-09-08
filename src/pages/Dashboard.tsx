import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FarmHealthBanner } from '../components/dashboard/FarmHealthBanner';
import { TelemetryGrid } from '../components/dashboard/TelemetryGrid';
import { RiskGauges } from '../components/dashboard/RiskGauges';
import { IrrigationCard } from '../components/dashboard/IrrigationCard';
import { ActiveAlertsFeed } from '../components/dashboard/ActiveAlertsFeed';
import { AIRecommendations } from '../components/dashboard/AIRecommendations';
import { CropHealthChart } from '../components/dashboard/CropHealthChart';
import { SoilMoistureChart } from '../components/dashboard/SoilMoistureChart';
import { RiskDistributionChart } from '../components/dashboard/RiskDistributionChart';
import { FieldPerformance } from '../components/dashboard/FieldPerformance';
import { useFarmData } from '../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const Dashboard: React.FC = () => {
  const {
    farmOverview,
    zones,
    alerts,
    recommendations,
    trendData,
    healthTrend30Days,
    riskDistribution,
    acknowledgeAlert,
  } = useOutletContext<FarmDataContext>();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Overall Farm Health Score Banner */}
      <FarmHealthBanner overview={farmOverview} />

      {/* 2. Key Telemetry Metrics Grid */}
      <TelemetryGrid zones={zones} />

      {/* 3. Disease & Pest Edge AI Risk Gauges */}
      <RiskGauges zones={zones} />

      {/* 4. Smart Irrigation & Active Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IrrigationCard zones={zones} />
        <ActiveAlertsFeed alerts={alerts} onAcknowledge={acknowledgeAlert} />
      </div>

      {/* 5. AI Recommendations Panel */}
      <AIRecommendations recommendations={recommendations} />

      {/* 6. Recharts Visualizations (Crop Health & Soil Moisture) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropHealthChart data={healthTrend30Days} />
        <SoilMoistureChart data={trendData} />
      </div>

      {/* 7. Risk Distribution Radar & Field Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskDistributionChart data={riskDistribution} />
        </div>
        <div className="lg:col-span-2">
          <FieldPerformance zones={zones} />
        </div>
      </div>
    </div>
  );
};
