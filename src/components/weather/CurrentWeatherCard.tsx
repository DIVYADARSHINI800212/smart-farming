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

interface CurrentWeatherCardProps {
  weather: typeof mockCurrentWeather;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather }) => {
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
                {weather.condition}
              </Badge>
            </div>
            <p className="text-sm text-agri-muted mt-1">
              Feels like <span className="font-semibold text-agri-dark">{weather.feelsLike}°C</span> • Dew Point:{' '}
              <span className="font-medium text-agri-dark">{weather.dewPoint}°C</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-slate-400 block text-[10px]">Sunrise</span>
              <span className="font-semibold text-agri-dark">06:04 AM</span>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Sunset className="w-4 h-4 text-rose-500" />
            <div>
              <span className="text-slate-400 block text-[10px]">Sunset</span>
              <span className="font-semibold text-agri-dark">18:22 PM</span>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl">
            <span className="text-emerald-700 font-medium block text-[10px]">Station Link</span>
            <span className="font-mono text-emerald-800 font-semibold">Live (Davis Vantage Pro2)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>Humidity</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.humidity}%</p>
          <span className="text-[10px] text-slate-400">Dew Point: {weather.dewPoint}°C</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Wind className="w-3.5 h-3.5 text-teal-500" />
            <span>Wind Speed</span>
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
            <span>Rain Probability</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.rainProbability}%</p>
          <span className="text-[10px] text-slate-400">Accum: {weather.rainfallTodayMm} mm</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>UV Index</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.uvIndex} / 11</p>
          <span className="text-[10px] text-amber-600 font-medium">Moderate Solar Load</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span>Barometer</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">{weather.pressureHpa} hPa</p>
          <span className="text-[10px] text-slate-400">Stable gradient</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <CloudFog className="w-3.5 h-3.5 text-agri-green" />
            <span>Leaf Transpiration</span>
          </div>
          <p className="text-lg font-bold text-agri-dark">Optimal</p>
          <span className="text-[10px] text-slate-400">VPD: 1.12 kPa</span>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeatherCard;
