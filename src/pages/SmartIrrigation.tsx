import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { IrrigationSimulator } from '../components/irrigation/IrrigationSimulator';
import { SoilWaterBudgetCard } from '../components/irrigation/SoilWaterBudgetCard';
import { WaterConsumptionChart } from '../components/irrigation/WaterConsumptionChart';
import { IrrigationHistoryTable } from '../components/irrigation/IrrigationHistoryTable';
import { mockZones } from '../data/mockData';
import {
  mockSoilWaterBudgets,
  mockWaterConsumptionTrends,
  mockIrrigationHistory,
} from '../data/irrigationData';
import { Droplets, Waves, Gauge, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n';

export const SmartIrrigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-agri-green bg-agri-green/10 px-2 py-0.5 rounded">
              {t('smart_irrigation_title', 'Closed-Loop Soil Hydrology')}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-agri-dark tracking-tight">
            {t('smart_irrigation_title', 'Smart Irrigation Control')}
          </h1>
          <p className="text-sm text-agri-muted">
            {t('smart_irrigation_subtitle', 'VPD-driven automated irrigation scheduling, real-time solenoid control, and evapotranspiration budgets')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-agri-green border border-emerald-200">
            {t('auto_irrigation_active', 'Solenoids: 1 Running (Zone 1)')}
          </span>
        </div>
      </div>

      {/* Top KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('water_saved', 'Daily Water Conservation')}
          value="4,120 L"
          unit=""
          icon={<Droplets className="w-5 h-5 text-blue-600" />}
          trend={{ value: `28.5% ${t('water_saved', 'saved')}`, isPositive: true }}
          highlightColor="agri-green"
          subtitle={t('vs_traditional_timer', 'vs. traditional timer baseline')}
        />
        <MetricCard
          title={t('irrigation_mode', 'Active Solenoid Valves')}
          value="1"
          unit="/ 4 Zones"
          icon={<Waves className="w-5 h-5 text-teal-600" />}
          highlightColor="deep-green"
          subtitle={t('zone_1_north_paddy', 'Zone 1 running (42 L/min)')}
        />
        <MetricCard
          title={t('soil_moisture', 'Mean Root-Zone Moisture')}
          value="38.5%"
          unit=""
          icon={<Gauge className="w-5 h-5 text-emerald-600" />}
          highlightColor="agri-green"
          subtitle={t('badge_optimal', 'Optimal field capacity band')}
        />
        <MetricCard
          title={t('next_cycle', 'Next Scheduled Cycle')}
          value="06:30 AM"
          unit=""
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          highlightColor="warning-amber"
          subtitle={t('zone_2_south_paddy', 'Zone 2 • ET₀ triggered')}
        />
      </div>

      {/* Main Row: Simulator + Water Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <IrrigationSimulator zones={mockZones} />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <SoilWaterBudgetCard budgets={mockSoilWaterBudgets} />
        </div>
      </div>

      {/* Weekly Water Consumption Chart */}
      <div>
        <WaterConsumptionChart data={mockWaterConsumptionTrends} />
      </div>

      {/* Irrigation Audit Trail History */}
      <div>
        <IrrigationHistoryTable logs={mockIrrigationHistory} />
      </div>

      {/* Educational Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 flex items-center gap-3">
        <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-xs text-agri-muted">
          <span className="font-bold text-agri-dark">ET₀ Dynamic Throttling:</span> The system continually blends real-time Penman-Monteith reference evapotranspiration, forecasted rainfall probability, and root-zone sensor readings to delay irrigation runs if rain is imminent within 6 hours.
        </div>
      </div>
    </div>
  );
};

export default SmartIrrigation;
