import React from 'react';
import { Card } from '../ui/Card';
import { HourlyForecastItem } from '../../types';
import { Sun, CloudSun, CloudRain, Droplets, Wind, Clock } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface HourlyForecastScrollProps {
  hourly: HourlyForecastItem[];
}

export const HourlyForecastScroll: React.FC<HourlyForecastScrollProps> = ({ hourly }) => {
  const { t } = useTranslation();

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear dawn':
      case 'clear':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'partly cloudy':
        return <CloudSun className="w-5 h-5 text-amber-400" />;
      case 'rain showers':
      case 'rain':
      case 'light drizzle risk':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <CloudSun className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-agri-green" />
          <h3 className="text-base font-semibold text-agri-dark">{t('twenty_four_hour_forecast', '24-Hour Micro-Forecast')}</h3>
        </div>
        <span className="text-xs text-agri-muted">{t('hourly_ecmwf_blend', 'Hourly ECMWF / GFS Blend')}</span>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="flex gap-3 min-w-max">
          {hourly.map((hour, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-between p-3 rounded-xl border text-center transition-all w-28 ${
                idx === 0
                  ? 'bg-agri-green/10 border-agri-green/30 shadow-xs ring-1 ring-agri-green/20'
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <span className={`text-xs font-semibold ${idx === 0 ? 'text-agri-green' : 'text-agri-dark'}`}>
                {idx === 0 ? t('now', 'Now') : hour.time}
              </span>

              <div className="my-2.5">{getConditionIcon(hour.condition)}</div>

              <span className="text-base font-bold text-agri-dark">{hour.temp}°C</span>

              <div className="mt-2 space-y-1 w-full border-t border-slate-100 pt-2 text-[10px]">
                <div className="flex items-center justify-center gap-1 text-blue-600 font-medium">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{hour.rainProb}%</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-slate-400">
                  <Wind className="w-2.5 h-2.5" />
                  <span>RH {hour.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HourlyForecastScroll;
