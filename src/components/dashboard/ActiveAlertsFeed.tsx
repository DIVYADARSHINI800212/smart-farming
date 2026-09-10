import React from 'react';
import { ArrowRight, CheckCircle2, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Alert } from '../../types';
import { useTranslation } from '../../i18n';

interface ActiveAlertsFeedProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

export const ActiveAlertsFeed: React.FC<ActiveAlertsFeedProps> = ({ alerts, onAcknowledge }) => {
  const { t } = useTranslation();
  const activeAlerts = alerts.filter(a => a.status === 'Active').slice(0, 3);

  return (
    <Card>
      <CardHeader
        title={t('active_alerts_feed_title', 'Active Field Alerts')}
        subtitle={t('active_alerts_feed_sub', 'Ranked by edge risk severity & priority')}
        icon={<BellRing className="h-5 w-5 text-danger-red" />}
        action={
          <Link to="/alerts">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
              {t('all_alerts_link', 'All Alerts')} ({alerts.length})
            </Button>
          </Link>
        }
      />

      <div className="space-y-3">
        {activeAlerts.map((alert) => {
          const normId = alert.id.replace('-', '_');
          const alertTitle = t(`alt_${normId}_title`, alert.title);
          const alertMessage = t(`alt_${normId}_msg`, alert.message);
          const alertAction = alert.recommendedAction ? t(`alt_${normId}_action`, alert.recommendedAction) : alert.recommendedAction;

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                alert.severity === 'CRITICAL' ? 'bg-red-50/50 border-danger-red/30' :
                alert.severity === 'HIGH' ? 'bg-red-50/30 border-red-200' :
                'bg-amber-50/30 border-amber-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge severity={alert.severity}>{t(`badge_${alert.severity.toLowerCase()}`, alert.severity)}</Badge>
                  <span className="text-xs font-semibold text-gray-500">• {t('cat_' + alert.category.toLowerCase().replace(/\s+/g, '_'), alert.category)}</span>
                  <span className="text-xs font-medium text-deep-green px-2 py-0.5 rounded bg-white border border-gray-200">
                    {alert.zoneName}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">{alert.timestamp}</span>
              </div>

              <h4 className="text-sm font-bold text-dark-forest mt-2">{alertTitle}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alertMessage}</p>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 italic truncate max-w-sm">
                  {t('recommendation_prefix', 'Rec')}: {alertAction}
                </span>
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="text-xs font-semibold text-agri-green hover:text-deep-green flex items-center gap-1 hover:underline shrink-0 ml-2"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> {t('btn_acknowledge', 'Acknowledge')}
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </Card>
  );
};
