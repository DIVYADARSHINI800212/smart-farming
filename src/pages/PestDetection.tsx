import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Bug, History, Calendar } from 'lucide-react';
import { PestResultCard } from '../components/pest/PestResultCard';
import { PestPopulationChart } from '../components/pest/PestPopulationChart';
import { EarlyWarningSection } from '../components/pest/EarlyWarningSection';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  mockPestResult,
  mockPestPopulationTrend,
  mockPestHistory,
} from '../data/pestData';
import { useFarmData } from '../hooks/useFarmData';
import { useTranslation } from '../i18n';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const PestDetection: React.FC = () => {
  const { zones } = useOutletContext<FarmDataContext>();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-warning-amber">
            <Bug className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              {t('pest_detection_title', 'Pest Detection & Entomological Surveillance')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('pest_detection_subtitle', 'Light trap and canopy webbing inference for leaf folder, stem borer, and planthoppers')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {t('demo_mode_badge', 'DEMONSTRATION AI RESULT')}
          </span>
          <Link to="/ai-vision">
            <Button variant="outline" size="sm">
              {t('btn_recalculate', 'Re-Scan Leaf')}
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Primary Pest Result Diagnostic Card (Leaf Folder 78%) */}
      <PestResultCard pest={mockPestResult} />

      {/* 2. 14-Day Pest Population Trend Chart */}
      <PestPopulationChart data={mockPestPopulationTrend} />

      {/* 3. Integrated Pest Management (IPM) & Early Warning Protocols */}
      <EarlyWarningSection interventions={mockPestResult.interventions} />

      {/* 4. Pest Surveillance History Log */}
      <Card>
        <CardHeader
          title={t('history_log_title', 'Pest Trap & Canopy Surveillance History')}
          subtitle={t('history_log_sub', 'Chronological log of verified entomological observations')}
          icon={<History className="h-5 w-5 text-gray-500" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {mockPestHistory.length} {t('inferences_logged', 'Past Inferences')}
            </span>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
                <th className="py-2.5 px-3">{t('time', 'Date & Time')}</th>
                <th className="py-2.5 px-3">{t('zones_label', 'Location')}</th>
                <th className="py-2.5 px-3">{t('primary_diagnosis', 'Insect Species Identified')}</th>
                <th className="py-2.5 px-3">{t('confidence', 'Confidence')}</th>
                <th className="py-2.5 px-3">{t('severity', 'Severity')}</th>
                <th className="py-2.5 px-3">{t('trap_status', 'Trap Count')}</th>
                <th className="py-2.5 px-3">{t('stock_status', 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPestHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {item.date}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-dark-forest">{item.zone}</td>
                  <td className="py-3 px-3 font-bold text-deep-green">{item.pest}</td>
                  <td className="py-3 px-3 font-bold text-yellow-800">{item.confidence}%</td>
                  <td className="py-3 px-3">
                    <Badge severity={item.severity as any}>{t(`badge_${item.severity.toLowerCase()}`, item.severity)}</Badge>
                  </td>
                  <td className="py-3 px-3 text-gray-600">{item.count}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.status.includes('Active')
                        ? 'bg-amber-100 text-yellow-800'
                        : 'bg-green-100 text-agri-green'
                    }`}>
                      {item.status.includes('Active') ? t('badge_active', item.status) : t('badge_resolved', item.status)}
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
