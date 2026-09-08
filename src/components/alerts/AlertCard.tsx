import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Bug,
  Microscope,
  Droplets,
  CloudSun,
  Flame,
  Waves,
  Sun
} from 'lucide-react';
import { Alert, AlertCategory, SeverityLevel } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}

const getCategoryIcon = (category: AlertCategory) => {
  switch (category) {
    case 'Disease':
      return <Microscope className="h-4 w-4 text-danger-red" />;
    case 'Pest':
      return <Bug className="h-4 w-4 text-warning-amber" />;
    case 'Irrigation':
      return <Droplets className="h-4 w-4 text-blue-600" />;
    case 'Weather':
      return <CloudSun className="h-4 w-4 text-purple-600" />;
    case 'Heat Stress':
      return <Flame className="h-4 w-4 text-amber-600" />;
    case 'Flood':
      return <Waves className="h-4 w-4 text-blue-800" />;
    case 'Drought':
      return <Sun className="h-4 w-4 text-orange-600" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  }
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge, onResolve }) => {
  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';

  return (
    <div 
      className={`p-5 rounded-2xl border transition-all shadow-subtle ${
        alert.status === 'Resolved' 
          ? 'bg-gray-50/70 border-gray-200 opacity-75' 
          : isCritical 
            ? 'bg-red-50/50 border-danger-red/40 hover:border-danger-red' 
            : isHigh 
              ? 'bg-red-50/20 border-red-200 hover:border-red-300' 
              : 'bg-white border-[#E6F0EB] hover:border-soft-green'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-white border border-gray-200 shrink-0 shadow-xs">
            {getCategoryIcon(alert.category)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge severity={alert.severity}>{alert.severity}</Badge>
              <span className="text-xs font-bold text-deep-green bg-cream px-2.5 py-0.5 rounded-full border border-gray-200">
                {alert.category}
              </span>
              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-agri-green" /> {alert.zoneName}
              </span>
            </div>

            <h3 className="text-base font-bold text-dark-forest mt-1.5">{alert.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{alert.message}</p>
          </div>
        </div>

        {/* Timestamp and Status */}
        <div className="flex sm:flex-col items-end justify-between shrink-0 text-right">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {alert.timestamp}
          </span>
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
            alert.status === 'Active' ? 'bg-danger-red/10 text-danger-red' :
            alert.status === 'Acknowledged' ? 'bg-amber-100 text-yellow-800' :
            'bg-green-100 text-agri-green'
          }`}>
            {alert.status}
          </span>
        </div>
      </div>

      {/* Recommended Action Box */}
      <div className="mt-4 p-3 bg-white rounded-xl border border-gray-200/80 text-xs text-dark-forest space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-deep-green">
          <Sparkles className="h-3.5 w-3.5 text-agri-green" /> Recommended Action:
        </div>
        <p className="text-gray-600 pl-5 leading-relaxed">{alert.recommendedAction}</p>
        {alert.metricImpact && (
          <div className="pl-5 pt-1 text-[11px] text-gray-400 font-medium">
            Telemetry Trigger: {alert.metricImpact}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] text-gray-400">
          Alert ID: <strong>{alert.id}</strong> • Edge Rule #482
        </div>

        <div className="flex items-center gap-2">
          {alert.status === 'Active' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAcknowledge(alert.id)}
              icon={<CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />}
            >
              Acknowledge
            </Button>
          )}
          {alert.status !== 'Resolved' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onResolve(alert.id)}
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
            >
              Mark as Resolved
            </Button>
          )}
          {alert.status === 'Resolved' && (
            <span className="text-xs text-agri-green font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Incident Resolved
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
