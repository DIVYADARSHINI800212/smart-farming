import React from 'react';
import { Card } from '../ui/Card';
import { DailyForecastItem } from '../../types';
import { Sun, CloudSun, CloudRain, Droplets, Calendar } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { translateLabel } from '../../utils/translationMapper';

interface SevenDayForecastGridProps {
  daily: DailyForecastItem[];
}

export const SevenDayForecastGrid: React.FC<SevenDayForecastGridProps> = ({ daily }) => {
  const { t } = useTranslation();

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear skies':
      case 'sunny & warm':
      case 'mostly sunny':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'partly cloudy':
        return <CloudSun className="w-5 h-5 text-amber-400" />;
      case 'scattered showers':
      case 'heavy rain':
      case 'light rain showers':
      case 'afternoon drizzle':
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <CloudSun className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-agri-green" />
          <h3 className="text-base font-semibold text-agri-dark">{t('seven_day_outlook', '7-Day Agricultural Outlook')}</h3>
        </div>
        <span className="text-xs text-agri-muted">{t('updated_25_mins_ago', 'Updated 25 mins ago')}</span>
      </div>

      <div className="space-y-3">
        {daily.map((item, idx) => {
          // Temperature bar calculation relative to expected range 18°C - 36°C
          const minRange = 18;
          const maxRange = 36;
          const leftPercent = Math.max(0, ((item.minTemp - minRange) / (maxRange - minRange)) * 100);
          const widthPercent = Math.max(12, ((item.maxTemp - item.minTemp) / (maxRange - minRange)) * 100);

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                idx === 0
                  ? 'bg-agri-green/5 border-agri-green/20'
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4 sm:w-44">
                <div className="p-2 bg-slate-50 rounded-lg">{getConditionIcon(item.condition)}</div>
                <div>
                  <div className="text-sm font-semibold text-agri-dark flex items-center gap-1.5">
                    {item.day}
                    {idx === 0 && (
                      <span className="text-[10px] bg-agri-green/10 text-agri-green font-bold px-1.5 py-0.5 rounded">
                        {t('today', 'Today')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-agri-muted">{item.date}</div>
                </div>
              </div>

              <div className="text-xs text-agri-muted sm:w-44">
                <span className="text-agri-dark font-medium block">{translateLabel(item.condition, 'weather', t)}</span>
                {item.expectedRainMm > 0 ? (
                  <span className="text-[11px] text-blue-600 font-medium">
                    {item.expectedRainMm} mm {t('expected_label', 'expected')}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">0 mm {t('precipitation_label', 'precipitation')}</span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:w-28 text-xs">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold text-agri-dark">{item.rainProb}%</span>
                <span className="text-[10px] text-slate-400">{t('rain_unit', 'rain')}</span>
              </div>

              {/* Min - Max Range Bar */}
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="text-xs font-mono font-medium text-slate-500 w-8 text-right">
                  {item.minTemp}°
                </span>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-amber-400 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-agri-dark w-8">{item.maxTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SevenDayForecastGrid;
