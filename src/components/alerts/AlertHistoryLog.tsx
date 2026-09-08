import React from 'react';
import { History, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Alert } from '../../types';

interface AlertHistoryLogProps {
  resolvedAlerts: Alert[];
}

export const AlertHistoryLog: React.FC<AlertHistoryLogProps> = ({ resolvedAlerts }) => {
  return (
    <Card>
      <CardHeader
        title="Archived & Resolved Alert History"
        subtitle="Permanent field incident audit trail"
        icon={<History className="h-5 w-5 text-gray-500" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
            {resolvedAlerts.length} Historical Records
          </span>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
              <th className="py-2.5 px-3">Date & Time</th>
              <th className="py-2.5 px-3">Severity</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Incident Title & Description</th>
              <th className="py-2.5 px-3">Status</th>
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
                  <Badge severity={alert.severity}>{alert.severity}</Badge>
                </td>
                <td className="py-3 px-3 font-semibold text-deep-green">
                  {alert.category}
                </td>
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-agri-green" />
                    {alert.zoneName.split('—')[0]}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-dark-forest">{alert.title}</div>
                  <div className="text-gray-500 line-clamp-1 mt-0.5">{alert.recommendedAction}</div>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 font-semibold text-agri-green bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 className="h-3 w-3" /> Resolved
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
