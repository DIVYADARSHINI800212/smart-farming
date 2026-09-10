import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Microscope, ArrowRight, History, Calendar } from 'lucide-react';
import { DiseaseResultCard } from '../components/disease/DiseaseResultCard';
import { DiseaseProgressionChart } from '../components/disease/DiseaseProgressionChart';
import { TreatmentProtocolCard } from '../components/disease/TreatmentProtocolCard';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  mockDiseaseResult,
  mockDiseaseProgressionTrend,
  mockDiseaseHistory,
} from '../data/diseaseData';
import { useFarmData } from '../hooks/useFarmData';
import { useTranslation } from '../i18n';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const DiseaseDetection: React.FC = () => {
  const { zones } = useOutletContext<FarmDataContext>();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-50 text-danger-red">
            <Microscope className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              {t('disease_detection_title', 'Crop Disease Detection & Pathology Intelligence')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('disease_detection_subtitle', 'Edge vision diagnostics for fungal blast, brown spot, and bacterial leaf blight')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 hidden sm:inline-block">
            {t('demo_mode_badge', 'DEMONSTRATION AI RESULT')}
          </span>
          <Link to="/ai-vision">
            <Button variant="outline" size="sm">
              {t('btn_recalculate', 'Re-Scan Leaf')}
            </Button>
          </Link>
          <Link to="/farmer-advisory">
            <Button variant="primary" size="sm" className="flex items-center gap-1.5 shadow-sm">
              <span>{t('btn_view_advisory', 'View Farmer Advisory')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Decision-Support Workflow Bridge Banner */}
      <div className="p-4 bg-gradient-to-r from-deep-green to-[#1B4D3E] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-soft-green/30 text-white uppercase tracking-wider">
              {t('nav_group_insights', 'Phase 4 Decision Brain')}
            </span>
            <span className="text-xs font-semibold text-soft-green">{t('badge_optimal', 'Integrated Advisory Ready')}</span>
          </div>
          <p className="text-xs text-white/90 font-medium">
            {t('epidemiological_reason_text', 'Convert this 82% Rice Blast detection into structured farmer advisory, multi-pillar treatment options, nearby dealer availability, and timing forecast.')}
          </p>
        </div>
        <Link to="/farmer-advisory" className="shrink-0">
          <Button variant="secondary" size="sm" className="bg-white text-deep-green hover:bg-cream font-bold w-full sm:w-auto">
            <span>{t('btn_view_advisory', 'Open Decision Support')}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* 1. Primary Disease Result Diagnostic Card (Blast 82%) */}
      <DiseaseResultCard disease={mockDiseaseResult} />

      {/* 2. Disease Progression Projection Chart */}
      <DiseaseProgressionChart data={mockDiseaseProgressionTrend} />

      {/* 3. Recommended Agronomic Treatment Regimen */}
      <TreatmentProtocolCard treatment={mockDiseaseResult.treatment} />

      {/* 4. Disease Incident History Log */}
      <Card>
        <CardHeader
          title={t('history_log_title', 'Disease Incident & Scouting History')}
          subtitle={t('history_log_sub', 'Chronological log of verified foliar pathologies')}
          icon={<History className="h-5 w-5 text-gray-500" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {mockDiseaseHistory.length} {t('inferences_logged', 'Past Incidents')}
            </span>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
                <th className="py-2.5 px-3">{t('time', 'Date & Time')}</th>
                <th className="py-2.5 px-3">{t('zones_label', 'Location')}</th>
                <th className="py-2.5 px-3">{t('primary_diagnosis', 'Pathogen Identified')}</th>
                <th className="py-2.5 px-3">{t('confidence', 'Confidence')}</th>
                <th className="py-2.5 px-3">{t('severity', 'Severity')}</th>
                <th className="py-2.5 px-3">{t('affected_leaf_area', 'Affected Area')}</th>
                <th className="py-2.5 px-3">{t('stock_status', 'Treatment Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockDiseaseHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {item.date}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-dark-forest">{item.zone}</td>
                  <td className="py-3 px-3 font-bold text-deep-green">{item.disease}</td>
                  <td className="py-3 px-3 font-bold text-danger-red">{item.confidence}%</td>
                  <td className="py-3 px-3">
                    <Badge severity={item.severity as any}>{t(`badge_${item.severity.toLowerCase()}`, item.severity)}</Badge>
                  </td>
                  <td className="py-3 px-3 text-gray-600">{item.area}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.status.includes('Pending')
                        ? 'bg-red-100 text-danger-red'
                        : 'bg-green-100 text-agri-green'
                    }`}>
                      {item.status.includes('Pending') ? t('badge_active', item.status) : t('badge_resolved', item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
