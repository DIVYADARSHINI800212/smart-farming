import React from 'react';
import { Gauge, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { SoilWaterBudget } from '../../types';
import { useTranslation } from '../../context/LanguageContext';
import { translateStatus } from '../../utils/translationMapper';

interface SoilWaterBudgetCardProps {
  budgets?: Record<string, SoilWaterBudget>;
  waterBalance?: SoilWaterBudget[];
}

export const SoilWaterBudgetCard: React.FC<SoilWaterBudgetCardProps> = ({ budgets, waterBalance }) => {
  const { t } = useTranslation();
  const z1 = (budgets && budgets['zone-1']) || (waterBalance && (waterBalance.find(w => w.zoneId === 'zone-1') || waterBalance[0]));
  const z2 = (budgets && budgets['zone-2']) || (waterBalance && (waterBalance.find(w => w.zoneId === 'zone-2') || waterBalance[1]));

  if (!z1 || !z2) return null;

  return (
    <Card>
      <CardHeader
        title={t('soil_moisture_budget_title', 'Soil Moisture & Root-Zone Water Budget')}
        subtitle={t('soil_moisture_budget_subtitle', 'Dielectric permittivity curves, wilting point & over-irrigation protection')}
        icon={<Gauge className="h-5 w-5 text-blue-600" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Zone 1 Budget */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/20 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-deep-green">{t('z1_water_budget', 'Zone 1 (North Field) Water Budget')}</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-yellow-800">
              {translateStatus('Water Stress', t)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-white rounded-lg border border-gray-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('current_budget', 'Current')}</span>
              <span className="font-bold text-amber-600 text-base">{z1.currentMoisture}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('wilting_point', 'Wilting Point')}</span>
              <span className="font-bold text-red-600 text-base">{z1.wiltingPoint}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('field_capacity', 'Field Capacity')}</span>
              <span className="font-bold text-agri-green text-base">{z1.fieldCapacity}%</span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>{t('available_water_depletion', 'Available Water Depletion:')}</span>
              <span className="font-bold text-amber-700">{z1.depletionPercentage}% ({t('depleted_label', 'Depleted')})</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t('over_irrigation_risk', 'Over-Irrigation Risk:')}</span>
              <span className="font-semibold text-agri-green">{t('low_risk_safe', 'Low Risk (Safe)')}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t('water_deficit_replacement', 'Water Deficit Replacement:')}</span>
              <span className="font-bold text-dark-forest">{z1.waterRequirementMm} mm / Acre</span>
            </div>
          </div>
        </div>

        {/* Zone 2 Budget */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-deep-green">{t('z2_water_budget', 'Zone 2 (South Field) Water Budget')}</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
              {t('adequate_moisture', 'Adequate Moisture')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-white rounded-lg border border-gray-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('current_budget', 'Current')}</span>
              <span className="font-bold text-agri-green text-base">{z2.currentMoisture}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('wilting_point', 'Wilting Point')}</span>
              <span className="font-bold text-red-600 text-base">{z2.wiltingPoint}%</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">{t('field_capacity', 'Field Capacity')}</span>
              <span className="font-bold text-agri-green text-base">{z2.fieldCapacity}%</span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>{t('available_water_depletion', 'Available Water Depletion:')}</span>
              <span className="font-bold text-agri-green">{z2.depletionPercentage}% ({t('sufficient_label', 'Sufficient')})</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t('over_irrigation_risk', 'Over-Irrigation Risk:')}</span>
              <span className="font-bold text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> {t('high_risk_do_not_irrigate', 'High Risk (Do Not Irrigate)')}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t('water_deficit_replacement', 'Water Deficit Replacement:')}</span>
              <span className="font-semibold text-gray-400">{t('none_needed', '0.0 mm (None Needed)')}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
