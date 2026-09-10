import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockCurrentWeather } from '../../data/weatherData';
import {
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  CloudFog,
  Compass,
} from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { translateLabel } from '../../utils/translationMapper';

interface CurrentWeatherCardProps {
  weather: typeof mockCurrentWeather;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather }) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-white via-white to-agri-bg/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm text-amber-500">
            <CloudSun className="w-12 h-12" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold text-agri-dark tracking-tight">{weather.temperature}°C</span>
              <Badge variant="info">
                {translateLabel(weather.condition, 'weather', t)}
              </Badge>
            </div>
            <p className="text-sm text-agri-muted mt-1">
              {t('feels_like', 'Feels like')} <span className="font-semibold text-agri-dark">{weather.feelsLike}°C</span> • {t('dew_point_label', 'Dew Point')}:{' '}
              <span className="font-medium text-agri-dark">{weather.dewPoint}°C</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-slate-400 block text-[10px]">{t('sunrise', 'Sunrise')}</span>
              <span className="font-semibold text-agri-dark">06:04 AM</span>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Sunset className="w-4 h-4 text-rose-500" />
            <div>
              <span className="text-slate-400 block text-[10px]">{t('sunset', 'Sunset')}</span>
              <span className="font-semibold text-agri-dark">18:22 PM</span>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl">
            <span className="text-emerald-700 font-medium block text-[10px]">{t('station_link', 'Station Link')}</span>
            <span className="font-mono text-emerald-800 font-semibold">{t('live_station_link', 'Live (Davis Vantage Pro2)')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('metric_humidity', 'Humidity')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.humidity}%</p>
          <span className="text-[10px] text-slate-400">{t('dew_point_label', 'Dew Point')}: {weather.dewPoint}°C</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Wind className="w-3.5 h-3.5 text-teal-500" />
            <span>{t('wind_speed_label', 'Wind Speed')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.windSpeedKmh} km/h</p>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Compass className="w-3 h-3 text-teal-600" />
            {weather.windDirection}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('rain_probability', 'Rain Probability')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.rainProbability}%</p>
          <span className="text-[10px] text-slate-400">{t('accum_label', 'Accum')}: {weather.rainfallTodayMm} mm</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('uv_index', 'UV Index')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.uvIndex} / 11</p>
          <span className="text-[10px] text-amber-600 font-medium">{t('moderate_solar_load', 'Moderate Solar Load')}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('barometer_label', 'Barometer')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.pressureHpa} hPa</p>
          <span className="text-[10px] text-slate-400">{t('stable_gradient', 'Stable gradient')}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <CloudFog className="w-3.5 h-3.5 text-agri-green" />
            <span>{t('leaf_transpiration', 'Leaf Transpiration')}</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{t('optimal_state', 'Optimal')}</p>
          <span className="text-[10px] text-slate-400">VPD: 1.12 kPa</span>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeatherCard;
