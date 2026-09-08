import React from 'react';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { SprayWindowCard } from '../components/weather/SprayWindowCard';
import { HourlyForecastScroll } from '../components/weather/HourlyForecastScroll';
import { SevenDayForecastGrid } from '../components/weather/SevenDayForecastGrid';
import {
  mockCurrentWeather,
  mockHourlyForecast,
  mock7DayForecast,
  mockSprayWindowSuitability,
} from '../data/weatherData';
import { CloudRain, MapPin, Radio } from 'lucide-react';

export const WeatherIntelligence: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-blue-500 animate-pulse" />
              On-Farm Davis Vantage Pro2 Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-agri-dark tracking-tight">Weather Intelligence</h1>
          <p className="text-sm text-agri-muted">
            Hyperlocal meteorological forecasts, agricultural spray suitability windows, and rainfall predictions
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>Farm Coordinates: 10.7870° N, 79.1378° E (Thanjavur Basin)</span>
        </div>
      </div>

      {/* Current Hero Weather Card */}
      <CurrentWeatherCard weather={mockCurrentWeather} />

      {/* Agricultural Spray Window Advisor */}
      <SprayWindowCard windows={mockSprayWindowSuitability} />

      {/* 24h Hourly Forecast Scroll */}
      <HourlyForecastScroll hourly={mockHourlyForecast} />

      {/* 7-Day Agricultural Outlook */}
      <SevenDayForecastGrid daily={mock7DayForecast} />

      {/* Agrometeorology Context */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-agri-muted">
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong className="text-agri-dark">ET₀ Reference Evapotranspiration:</strong> Current diurnal rate is 4.8 mm/day. Irrigation cycles are dynamically offset against any forecasted precipitation &gt; 5 mm.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">Model: GFS 0.25° + Local Bias Correction</span>
      </div>
    </div>
  );
};

export default WeatherIntelligence;
