import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  UserCheck,
  ShieldAlert,
  Boxes,
  Store,
  CalendarClock,
  CircleDollarSign,
  ClipboardCheck,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface WorkflowStep {
  id: number;
  labelKey: string;
  defaultLabel: string;
  path: string;
  icon: React.ReactNode;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 1, labelKey: 'nav_farmer_advisory', defaultLabel: 'Advisory', path: '/farmer-advisory', icon: <UserCheck className="h-4 w-4" /> },
  { id: 2, labelKey: 'nav_treatment', defaultLabel: 'Treatment', path: '/treatment-recommendation', icon: <ShieldAlert className="h-4 w-4" /> },
  { id: 3, labelKey: 'nav_inputs', defaultLabel: 'Inputs', path: '/agricultural-inputs', icon: <Boxes className="h-4 w-4" /> },
  { id: 4, labelKey: 'nav_availability', defaultLabel: 'Availability', path: '/product-availability', icon: <Store className="h-4 w-4" /> },
  { id: 5, labelKey: 'nav_timing', defaultLabel: 'Timing', path: '/treatment-timing', icon: <CalendarClock className="h-4 w-4" /> },
  { id: 6, labelKey: 'nav_cost', defaultLabel: 'Cost', path: '/treatment-cost', icon: <CircleDollarSign className="h-4 w-4" /> },
  { id: 7, labelKey: 'nav_followup', defaultLabel: 'Follow-Up', path: '/treatment-follow-up', icon: <ClipboardCheck className="h-4 w-4" /> },
];

interface TreatmentWorkflowStepperProps {
  currentStep: number;
  nextStepTitle?: string;
  className?: string;
}

export const TreatmentWorkflowStepper: React.FC<TreatmentWorkflowStepperProps> = ({
  currentStep,
  nextStepTitle,
  className = '',
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const prevStep = WORKFLOW_STEPS.find((s) => s.id === currentStep - 1);
  const nextStep = WORKFLOW_STEPS.find((s) => s.id === currentStep + 1);

  return (
    <div className={`bg-white rounded-2xl border border-[#E6F0EB] p-3 sm:p-4 shadow-subtle ${className}`}>
      {/* Top Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-deep-green tracking-wide uppercase text-[10px] px-2 py-0.5 rounded bg-soft-green/30">
            Phase 4 Integrated Pipeline
          </span>
          <span className="text-gray-500 font-medium">
            Step {currentStep} of 7 — {WORKFLOW_STEPS[currentStep - 1]?.defaultLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {prevStep && (
            <button
              onClick={() => navigate(prevStep.path)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-600 hover:text-deep-green hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t('action_back')}</span>
            </button>
          )}

          {nextStep && (
            <button
              onClick={() => navigate(nextStep.path)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-agri-green text-white hover:bg-deep-green shadow-xs transition-all"
            >
              <span>{nextStepTitle || t('action_next')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Step Nav */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center justify-between min-w-[620px] gap-1">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <React.Fragment key={step.id}>
                <NavLink
                  to={step.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all group shrink-0 ${
                    isActive
                      ? 'bg-deep-green text-white shadow-md shadow-deep-green/20'
                      : isCompleted
                      ? 'bg-soft-green/20 text-deep-green hover:bg-soft-green/30'
                      : 'text-gray-500 hover:text-dark-forest hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-agri-green text-white'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] opacity-75 font-normal">Step {step.id}</span>
                    <span className="truncate">{step.defaultLabel}</span>
                  </div>
                </NavLink>

                {idx < WORKFLOW_STEPS.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 shrink-0 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
