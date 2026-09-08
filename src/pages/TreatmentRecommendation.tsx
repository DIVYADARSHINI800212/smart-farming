import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  FlaskConical,
  Sprout,
  Sliders,
  ArrowRight,
  Info,
  Clock,
  FileCheck,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { getTreatmentData } from '../data/treatmentData';
import { TreatmentCategory } from '../types/phase4';
import { useLanguage } from '../context/LanguageContext';

export const TreatmentRecommendation: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('zone-1');
  const [selectedStrategyCategory, setSelectedStrategyCategory] = useState<TreatmentCategory>('Chemical');
  const treatment = getTreatmentData(selectedZone);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const activeStrategy = treatment.alternativeStrategies.find((s) => s.category === selectedStrategyCategory) || treatment.primaryDemoTreatment;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 2) */}
      <TreatmentWorkflowStepper
        currentStep={2}
        nextStepTitle={t('action_view_inputs')}
      />

      {/* 2. Prominent Prototype Disclaimer */}
      <DemoDisclaimerBanner type="chemical" />

      {/* 3. Header & Zone Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-red-50 text-danger-red shrink-0">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_treatment')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-danger-red">
                Prescription-Free Protocol
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Converting AI vision diagnostics into multi-pillar agronomic management strategies and label-guided dosage references
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

      {/* 4. Detected Problem Diagnostic Card */}
      <Card>
        <CardHeader
          title="Diagnostic Problem Profile"
          subtitle="Pathological baseline requiring intervention"
          icon={<AlertTriangle className="h-5 w-5 text-danger-red" />}
          action={
            <Badge severity={treatment.detectedProblem.severity as any}>
              {treatment.detectedProblem.severity} SEVERITY
            </Badge>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block">Identified Disease</span>
            <span className="text-sm font-bold text-deep-green mt-0.5 block truncate">
              {treatment.detectedProblem.disease}
            </span>
            <span className="text-[10px] text-gray-400 italic block truncate">
              {treatment.detectedProblem.pathogenType}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block">Vision Confidence</span>
            <span className="text-sm font-bold text-danger-red mt-0.5 block">
              {treatment.detectedProblem.confidence}% High Certainty
            </span>
            <span className="text-[10px] text-gray-400 block">MobileNetV2 Edge Model</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block">Affected Target Area</span>
            <span className="text-sm font-bold text-dark-forest mt-0.5 block">
              {treatment.detectedProblem.affectedArea}
            </span>
            <span className="text-[10px] text-gray-400 block">Confined to North Bunds</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block">Selected Field Zone</span>
            <span className="text-sm font-bold text-agri-green mt-0.5 block">
              {treatment.zoneName}
            </span>
            <span className="text-[10px] text-gray-400 block">Active Vegetative Cycle</span>
          </div>
        </div>
      </Card>

      {/* 5. Four Management Strategy Phases */}
      <Card>
        <CardHeader
          title="Four-Phase Agronomic Management Strategy"
          subtitle="Holistic crop protection workflow from immediate containment to post-spray verification"
          icon={<Sliders className="h-5 w-5 text-agri-green" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-danger-red block mb-1">
                Phase 1 • Immediate
              </span>
              <h4 className="text-xs font-bold text-dark-forest mb-2">Immediate Containment</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {treatment.managementPhases.immediateAction}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-danger-red mt-3 block">Action within 24h</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-800 block mb-1">
                Phase 2 • Preventive
              </span>
              <h4 className="text-xs font-bold text-dark-forest mb-2">Buffer Zone Barrier</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {treatment.managementPhases.preventiveAction}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-yellow-800 mt-3 block">Day 0 to +2</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
                Phase 3 • Monitoring
              </span>
              <h4 className="text-xs font-bold text-dark-forest mb-2">Symptom Tracking</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {treatment.managementPhases.monitoringAction}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-blue-800 mt-3 block">Daily Scouting</span>
          </div>

          <div className="p-4 rounded-xl border border-green-200 bg-green-50/40 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-agri-green block mb-1">
                Phase 4 • Follow-up
              </span>
              <h4 className="text-xs font-bold text-dark-forest mb-2">Recovery Verification</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {treatment.managementPhases.followUpAction}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-agri-green mt-3 block">Day +3 to +14</span>
          </div>
        </div>
      </Card>

      {/* 6. Selectable Alternative Management Options (Tabs) */}
      <Card>
        <CardHeader
          title="Selectable Management Options (IPM Framework)"
          subtitle="Explore Chemical, Biological, Cultural, or Integrated Pest Management options before deciding"
          icon={<Leaf className="h-5 w-5 text-agri-green" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-soft-green/30 text-deep-green">
              Non-Prescriptive Options
            </span>
          }
        />

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-gray-100 pb-3">
          {treatment.alternativeStrategies.map((strat) => {
            const isSelected = selectedStrategyCategory === strat.category;
            return (
              <button
                key={strat.id}
                onClick={() => setSelectedStrategyCategory(strat.category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-deep-green text-white shadow-md shadow-deep-green/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {strat.category === 'Chemical' && <FlaskConical className="h-4 w-4 text-blue-400" />}
                {strat.category === 'Biological' && <Leaf className="h-4 w-4 text-agri-green" />}
                {strat.category === 'Cultural' && <Sprout className="h-4 w-4 text-amber-500" />}
                {strat.category === 'IPM' && <ShieldCheck className="h-4 w-4 text-purple-400" />}
                <span>{strat.category} Strategy</span>
              </button>
            );
          })}
        </div>

        {/* Active Strategy Card Display */}
        <div className="mt-4 p-5 bg-cream/60 rounded-2xl border border-[#E6F0EB] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-agri-green">
                  {activeStrategy.category} Management Option
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                  {activeStrategy.safetyRating}
                </span>
              </div>
              <h3 className="text-base font-black text-deep-green mt-0.5">
                {activeStrategy.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500 block">Est. Cost / Acre</span>
              <span className="text-lg font-black text-deep-green">
                ₹{activeStrategy.estimatedCostPerAcre}
              </span>
            </div>
          </div>

          {/* Core Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Product / Formulation</span>
              <span className="font-bold text-dark-forest">{activeStrategy.productName}</span>
              <span className="text-[10px] text-gray-400 block">{activeStrategy.formulation}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Active Ingredient</span>
              <span className="font-bold text-deep-green">{activeStrategy.activeIngredient}</span>
              <span className="text-[10px] text-gray-400 block">Standard Reference Spec</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Application Method</span>
              <span className="font-bold text-dark-forest">{activeStrategy.applicationMethod}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Demo Application Rate</span>
              <span className="font-bold text-agri-green">{activeStrategy.applicationRate}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Application Frequency</span>
              <span className="font-bold text-dark-forest">{activeStrategy.frequency}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-gray-500 block text-[11px]">Treatment Duration / PHI</span>
              <span className="font-bold text-dark-forest">
                {activeStrategy.treatmentDuration} (PHI: {activeStrategy.preHarvestIntervalDays}d)
              </span>
            </div>
          </div>

          {/* Advantages & Precautions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-green-50/50 rounded-xl border border-green-200 text-xs">
              <span className="text-[11px] font-bold text-agri-green uppercase tracking-wider block mb-1.5">
                Key Agronomic Advantages
              </span>
              <ul className="space-y-1 text-gray-700">
                {activeStrategy.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-agri-green shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 text-xs">
              <span className="text-[11px] font-bold text-yellow-800 uppercase tracking-wider block mb-1.5">
                Precautions & Field Boundaries
              </span>
              <ul className="space-y-1 text-gray-700">
                {activeStrategy.precautions.map((prec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-yellow-800 shrink-0 mt-0.5" />
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center text-xs text-gray-500 font-medium">
            "Demo data — verify current local label, CIB&RC registration, and agricultural extension guidance."
          </div>
        </div>
      </Card>

      {/* 7. Safety, Compliance & PPE Section */}
      <Card>
        <CardHeader
          title="Mandatory Safety, Storage & Regulatory Checklist"
          subtitle="Occupational health precautions and ecological compliance guidelines"
          icon={<ShieldCheck className="h-5 w-5 text-deep-green" />}
          action={
            <span className="text-xs font-bold text-danger-red bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              Mandatory Compliance
            </span>
          }
        />

        <div className="space-y-2.5 pt-1">
          {treatment.safetyChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3 text-xs text-gray-700 hover:bg-gray-100/70 transition-colors"
            >
              <div className="h-5 w-5 rounded-full bg-deep-green/10 text-deep-green flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                {idx + 1}
              </div>
              <p className="leading-relaxed font-medium">{item}</p>
            </div>
          ))}
        </div>

        {/* Bottom Workflow Action Bar */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/farmer-advisory')}
          >
            Back to Advisory
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/agricultural-inputs')}
            className="flex items-center gap-2"
          >
            <span>{t('action_view_inputs')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
