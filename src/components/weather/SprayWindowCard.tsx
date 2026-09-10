import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SprayWindowSuitability } from '../../types';
import { Sparkles, Wind, Droplets, Thermometer, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface SprayWindowCardProps {
  windows: SprayWindowSuitability[];
}

export const SprayWindowCard: React.FC<SprayWindowCardProps> = ({ windows }) => {
  const { t } = useTranslation();
  const currentWindow = windows[0];

  const getStatusBadge = (status: SprayWindowSuitability['overallStatus']) => {
    switch (status) {
      case 'GOOD APPLICATION WINDOW':
        return <Badge variant="success">{t('optimal_application_window', 'OPTIMAL APPLICATION WINDOW')}</Badge>;
      case 'MARGINAL WINDOW':
        return <Badge variant="warning">{t('marginal_window', 'MARGINAL WINDOW')}</Badge>;
      case 'NO-SPRAY WINDOW':
      default:
        return <Badge variant="danger">{t('no_spray_conditions', 'NO-SPRAY CONDITIONS')}</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-agri-dark">{t('spray_advisory_title', 'Pesticide & Foliar Spray Advisory')}</h3>
            <p className="text-xs text-agri-muted">{t('spray_advisory_subtitle', 'Drift avoidance, droplet evaporation & rainfastness assessment')}</p>
          </div>
        </div>
        {currentWindow && getStatusBadge(currentWindow.overallStatus)}
      </div>

      {currentWindow && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-100 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-agri-green" />
            <span className="text-xs font-bold uppercase tracking-wider text-agri-green">
              {t('recommended_spray_timing', 'Recommended Spray Timing:')} {currentWindow.date}
            </span>
          </div>
          <div className="text-xl font-extrabold text-agri-dark tracking-tight">
            {currentWindow.timeWindow}
          </div>
          <p className="text-xs text-agri-muted mt-1 leading-relaxed">{currentWindow.notes}</p>
        </div>
      )}

      {currentWindow && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
              <Wind className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('wind_speed_drift', 'Wind Speed & Drift')}</span>
            </div>
            <p className="text-sm font-bold text-agri-dark">{currentWindow.windValue}</p>
            <span className="text-[10px] text-emerald-600 font-medium">{currentWindow.windStatus} Drift Risk</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('metric_temperature', 'Temperature')}</span>
            </div>
            <p className="text-sm font-bold text-agri-dark">{currentWindow.tempValue}</p>
            <span className="text-[10px] text-emerald-600 font-medium">{currentWindow.temperatureStatus}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('rel_humidity', 'Relative Humidity')}</span>
            </div>
            <p className="text-sm font-bold text-agri-dark">{currentWindow.humidityValue}</p>
            <span className="text-[10px] text-emerald-600 font-medium">{currentWindow.humidityStatus}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('rain_washoff_risk', 'Rain Washoff Risk')}</span>
            </div>
            <p className="text-sm font-bold text-agri-dark">{currentWindow.rainProbValue}</p>
            <span className="text-[10px] text-emerald-600 font-medium">{currentWindow.rainfallRisk} Risk</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase text-agri-muted tracking-wider">{t('all_upcoming_windows', 'All Upcoming Evaluation Windows')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {windows.map((w, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-white text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-agri-dark">{w.timeWindow}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  w.overallStatus === 'GOOD APPLICATION WINDOW'
                    ? 'bg-emerald-100 text-emerald-800'
                    : w.overallStatus === 'MARGINAL WINDOW'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {w.overallStatus === 'GOOD APPLICATION WINDOW' ? t('optimal_state', 'Optimal') : w.overallStatus === 'MARGINAL WINDOW' ? t('marginal_state', 'Marginal') : t('no_spray_state', 'No Spray')}
                </span>
              </div>
              <p className="text-agri-muted text-[11px] truncate">{w.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SprayWindowCard;
