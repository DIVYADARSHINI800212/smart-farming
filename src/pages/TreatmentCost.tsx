import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CircleDollarSign,
  Calculator,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { CostCalculatorCard } from '../components/advisory/CostCalculatorCard';
import { mockDefaultCostInputsZone1, mockDefaultCostInputsZone2 } from '../data/costData';
import { useLanguage } from '../context/LanguageContext';

export const TreatmentCost: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('zone-1');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const currentInputs = selectedZone === 'zone-2' ? mockDefaultCostInputsZone2 : mockDefaultCostInputsZone1;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 6) */}
      <TreatmentWorkflowStepper
        currentStep={6}
        nextStepTitle={t('action_start_followup')}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner type="cost" />

      {/* 3. Header & Zone Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-800 shrink-0">
            <CircleDollarSign className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_cost')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-yellow-800">
                Budget & Economic Threshold Analysis
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Estimate variable input costs, manual labor overhead, and machinery expenses to assess treatment return on investment (ROI)
            </p>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <ZoneSelector
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />
        </div>
      </div>

      {/* 4. Interactive Calculator & Multi-Strategy Comparison Component */}
      <CostCalculatorCard
        key={selectedZone}
        initialAcres={currentInputs.farmAreaAcres}
        initialAffectedAcres={currentInputs.affectedAreaAcres}
      />

      {/* 5. Bottom Navigation */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/treatment-timing')}
          >
            Back to Application Timing
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/treatment-follow-up')}
            className="flex items-center gap-2"
          >
            <span>{t('action_start_followup')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
