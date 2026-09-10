import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ClipboardCheck,
  History,
  TrendingDown,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  Camera,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { BeforeAfterCard } from '../components/advisory/BeforeAfterCard';
import { mockFollowUpLogs } from '../data/followUpData';
import { TreatmentFollowUpLog } from '../types/phase4';
import { useLanguage } from '../context/LanguageContext';

export const TreatmentFollowUp: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<TreatmentFollowUpLog | null>(mockFollowUpLogs[0]);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(mockFollowUpLogs[0].id);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 7 - Final) */}
      <TreatmentWorkflowStepper
        currentStep={7}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner
        type="general"
        customMessage={t('followup_disclaimer', 'Treatment follow-up and clinical response analytics simulated from repeat vision inspections and post-spray canopy chlorophyll measurements.')}
      />

      {/* 3. Header */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-green-50 text-agri-green shrink-0">
            <ClipboardCheck className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_followup', 'Treatment Follow-Up')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                {t('post_intervention_analytics', 'Post-Intervention Analytics')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('followup_subtitle', 'Verify chemical and bio-agent efficacy, track 14-day canopy recovery milestones, and log historical treatment outcomes')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/ai-vision">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5" />
              <span>{t('capture_followup_scan', 'Capture Follow-up Scan')}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4. Before vs After Analytics & Recovery Milestones (Component) */}
      <BeforeAfterCard />

      {/* 5. Follow-Up Action Protocols & Recommendations */}
      <Card>
        <CardHeader
          title={t('agronomic_guidance_directives_title', 'Agronomic Follow-Up Guidance & Monitoring Directives')}
          subtitle={t('agronomic_guidance_directives_sub', 'Prescribed next steps based on Day 7 recovery evaluation')}
          icon={<CheckCircle2 className="h-5 w-5 text-agri-green" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
            <span className="text-[10px] font-bold text-agri-green uppercase tracking-wider block">
              {t('directive_1', 'Directive 1 • Continuous Scouting')}
            </span>
            <h4 className="text-xs font-bold text-dark-forest">{t('dir1_title', 'Monitor Foliar Lesions')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir1_desc', 'Continue daily scouting across Zone 1 and Zone 2 tillers between 06:30 and 08:30 AM to confirm absence of new sporulating rings.')}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
            <span className="text-[10px] font-bold text-deep-green uppercase tracking-wider block">
              {t('directive_2', 'Directive 2 • Smartphone Vision')}
            </span>
            <h4 className="text-xs font-bold text-dark-forest">{t('dir2_title', 'Capture Day 14 Resolution Photo')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir2_desc', 'Take close-up photos of tagged tillers using the AI Vision module at Day 14 to close the incident loop in the edge database.')}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              {t('directive_3', 'Directive 3 • Irrigation Caution')}
            </span>
            <h4 className="text-xs font-bold text-dark-forest">{t('dir3_title', 'Review Sensor Microclimate')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir3_desc', 'Keep soil moisture around 45% without creating standing water pools that elevate canopy humidity above 80%.')}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
              {t('directive_4', 'Directive 4 • Balanced Nutrition')}
            </span>
            <h4 className="text-xs font-bold text-dark-forest">{t('dir4_title', 'Top-Dress Potassium (K)')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir4_desc', 'Apply 15 kg/Ac Muriate of Potash (MOP) to strengthen culms against blast penetration prior to panicle emergence.')}
            </p>
          </div>

          <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5">
            <span className="text-[10px] font-bold text-danger-red uppercase tracking-wider block">
              {t('directive_5', 'Directive 5 • Escalation Trigger')}
            </span>
            <h4 className="text-xs font-bold text-danger-red">{t('dir5_title', 'Escalate if Symptoms Expand')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir5_desc', 'If active lesions expand by more than 10% within 48 hours, immediately escalate to extension officer for booster advice.')}
            </p>
          </div>

          <div className="p-4 bg-green-50/50 rounded-xl border border-green-200 space-y-1.5">
            <span className="text-[10px] font-bold text-agri-green uppercase tracking-wider block">
              {t('directive_6', 'Directive 6 • Edge LoRa Sync')}
            </span>
            <h4 className="text-xs font-bold text-deep-green">{t('dir6_title', 'Audit Gateway Log')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('dir6_desc', 'Ensure LoRa gateway maintains active telemetry connection for rapid automated anomaly detection.')}
            </p>
          </div>
        </div>
      </Card>

      {/* 6. Treatment Incident History Log Table */}
      <Card>
        <CardHeader
          title={t('historical_treatment_log_title', 'Historical Treatment Interventions Log')}
          subtitle={t('historical_treatment_log_sub', 'Audited repository of completed crop protection applications')}
          icon={<History className="h-5 w-5 text-gray-500" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {mockFollowUpLogs.length} {t('verified_incidents', 'Verified Incidents')}
            </span>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
                <th className="py-2.5 px-3">{t('th_date', 'Date')}</th>
                <th className="py-2.5 px-3">{t('th_zone', 'Zone')}</th>
                <th className="py-2.5 px-3">{t('th_problem_diagnosed', 'Problem Diagnosed')}</th>
                <th className="py-2.5 px-3">{t('th_applied_formulation', 'Applied Formulation')}</th>
                <th className="py-2.5 px-3">{t('th_severity_pre', 'Severity Pre')}</th>
                <th className="py-2.5 px-3">{t('th_severity_post', 'Severity Post')}</th>
                <th className="py-2.5 px-3">{t('th_effectiveness', 'Effectiveness')}</th>
                <th className="py-2.5 px-3">{t('th_status', 'Status')}</th>
                <th className="py-2.5 px-3 text-right">{t('th_details', 'Details')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockFollowUpLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <React.Fragment key={log.id}>
                    <tr
                      className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${
                        isExpanded ? 'bg-green-50/30' : ''
                      }`}
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    >
                      <td className="py-3 px-3 text-gray-500 whitespace-nowrap font-medium">
                        {log.date}
                      </td>
                      <td className="py-3 px-3 font-semibold text-dark-forest whitespace-nowrap">
                        {log.zone.split('—')[0]}
                      </td>
                      <td className="py-3 px-3 font-bold text-deep-green">
                        {log.problem}
                      </td>
                      <td className="py-3 px-3 text-gray-700 max-w-[180px] truncate">
                        {log.treatment}
                      </td>
                      <td className="py-3 px-3 font-bold text-danger-red">
                        {log.severityBefore}%
                      </td>
                      <td className="py-3 px-3 font-bold text-agri-green">
                        {log.severityAfter}%
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                          {log.effectivenessScore}% ({log.effectivenessLabel.split(' ')[0]})
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="text-gray-400 hover:text-deep-green p-1">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Detail Row */}
                    {isExpanded && (
                      <tr className="bg-gray-50/60">
                        <td colSpan={9} className="py-3 px-4 text-xs text-gray-700">
                          <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-deep-green">
                                {t('field_incident_notes', 'Field Incident Notes & Agronomic Audit:')}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">{log.id}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{log.notes}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Loop Action */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/treatment-cost')}
          >
            {t('btn_back_to_cost', 'Back to Cost Estimator')}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/farmer-advisory')}
            className="flex items-center gap-2"
          >
            <span>{t('btn_return_advisory', 'Return to Farmer Advisory')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
