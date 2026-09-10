import React from 'react';
import { History, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Alert } from '../../types';
import { useTranslation } from '../../i18n';
import { translateZoneName, translateLabel } from '../../utils/translationMapper';

interface AlertHistoryLogProps {
  resolvedAlerts: Alert[];
}

export const AlertHistoryLog: React.FC<AlertHistoryLogProps> = ({ resolvedAlerts }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={t('title_alert_history', 'Archived & Resolved Alert History')}
        subtitle={t('permanent_audit_trail', 'Permanent field incident audit trail')}
        icon={<History className="h-5 w-5 text-gray-500" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {t('historical_records_count', { count: resolvedAlerts.length }, `${resolvedAlerts.length} Historical Records`)}
          </span>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
              <th className="py-2.5 px-3">{t('date_time_col', 'Date & Time')}</th>
              <th className="py-2.5 px-3">{t('severity_col', 'Severity')}</th>
              <th className="py-2.5 px-3">{t('category_col', 'Category')}</th>
              <th className="py-2.5 px-3">{t('location_col', 'Location')}</th>
              <th className="py-2.5 px-3">{t('incident_desc_col', 'Incident Title & Description')}</th>
              <th className="py-2.5 px-3">{t('status_col', 'Status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resolvedAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {alert.timestamp}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <Badge severity={alert.severity}>{t(`badge_${alert.severity.toLowerCase()}`, alert.severity)}</Badge>
                </td>
                <td className="py-3 px-3 font-semibold text-deep-green">
                  {t(`cat_${alert.category.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, alert.category)}
                </td>
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-agri-green" />
                    {translateZoneName(alert.zoneName, t)}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-dark-forest">{t(alert.id + '_title', alert.title)}</div>
                  <div className="text-gray-500 line-clamp-1 mt-0.5">{t(alert.id + '_action', alert.recommendedAction)}</div>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 font-semibold text-agri-green bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 className="h-3 w-3" /> {translateLabel('Resolved', 'status', t)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
