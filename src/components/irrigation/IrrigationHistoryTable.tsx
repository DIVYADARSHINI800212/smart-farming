import React from 'react';
import { History, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { IrrigationLog } from '../../types';
import { useTranslation } from '../../context/LanguageContext';
import { translateZoneName, translateStatus } from '../../utils/translationMapper';

interface IrrigationHistoryTableProps {
  logs: IrrigationLog[];
}

export const IrrigationHistoryTable: React.FC<IrrigationHistoryTableProps> = ({ logs }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={t('irrigation_event_history_log', 'Irrigation Event History Log')}
        subtitle={t('auto_precision_watering_audit', 'Automated precision watering audit trail')}
        icon={<History className="h-5 w-5 text-gray-500" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {logs.length} {t('recorded_cycles_stat', 'Recorded Cycles')}
          </span>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
              <th className="py-2.5 px-3">{t('date_and_time_label', 'Date & Time')}</th>
              <th className="py-2.5 px-3">{t('target_zone', 'Target Zone')}</th>
              <th className="py-2.5 px-3">{t('irrigation_method', 'Method')}</th>
              <th className="py-2.5 px-3">{t('irrigation_duration', 'Duration')}</th>
              <th className="py-2.5 px-3">{t('volume_applied', 'Volume Applied')}</th>
              <th className="py-2.5 px-3">{t('moisture_before_after', 'Moisture (Before → After)')}</th>
              <th className="py-2.5 px-3">{t('water_saved', 'Water Saved')}</th>
              <th className="py-2.5 px-3">{t('status_label', 'Status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {log.date}
                  </div>
                </td>
                <td className="py-3 px-3 font-bold text-dark-forest">{translateZoneName(log.zone, t)}</td>
                <td className="py-3 px-3 text-deep-green font-semibold">{t(log.method, log.method)}</td>
                <td className="py-3 px-3">{log.durationMinutes} {t('mins_unit', 'mins')}</td>
                <td className="py-3 px-3 font-semibold text-blue-700">{log.waterVolumeLiters.toLocaleString()} L</td>
                <td className="py-3 px-3">
                  <span className="text-amber-600 font-bold">{log.startingMoisture}%</span>
                  <span className="text-gray-400 mx-1">&rarr;</span>
                  <span className="text-agri-green font-bold">{log.endingMoisture}%</span>
                </td>
                <td className="py-3 px-3 font-bold text-agri-green">+{log.waterSavedVsFlood}%</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-semibold text-agri-green bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 className="h-3 w-3" /> {translateStatus(log.status, t)}
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
