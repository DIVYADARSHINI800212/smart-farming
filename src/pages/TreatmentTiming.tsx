import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  Thermometer,
  Droplets,
  Wind,
  CloudSun,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { getTimingData } from '../data/timingData';
import { useLanguage } from '../context/LanguageContext';

export const TreatmentTiming: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('zone-1');
  const timing = getTimingData(selectedZone);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 5) */}
      <TreatmentWorkflowStepper
        currentStep={5}
        nextStepTitle={t('action_estimate_cost', 'Estimate Treatment Cost')}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner type="weather" />

      {/* 3. Header & Zone Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-800 shrink-0">
            <CalendarClock className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_timing', 'Treatment Timing')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {t('microclimate_spray_feasibility', 'Microclimate Spray Feasibility')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('timing_subtitle', 'Evaluating ambient temperature, wind drift risk, leaf surface wetness, and rainfall probability to prevent spray wash-off')}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <ZoneSelector
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />
        </div>
      </div>

      {/* 4. Application Suitability Score & Best Application Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Suitability Score Card (5 Cols) */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between bg-linear-to-br from-white to-green-50/40 border-agri-green/30">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {t('suitability_score_label', 'Application Suitability Score')}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  timing.overallStatus === 'Suitable'
                    ? 'bg-green-100 text-agri-green'
                    : 'bg-amber-100 text-yellow-800'
                }`}>
                  {timing.overallStatus === 'Suitable' ? t('badge_suitable', 'Suitable') : t('badge_caution', 'Caution')} {t('window_label', 'WINDOW')}
                </span>
              </div>

              <div className="my-5 flex items-baseline gap-2">
                <span className="text-5xl font-black text-deep-green tracking-tight">
                  {timing.overallScore}
                </span>
                <span className="text-base font-bold text-gray-400">/ 100</span>
              </div>

              {/* Contributing Telemetry Factors */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100">
                  <span className="text-gray-500 font-medium">{t('air_temp_label', 'Air Temperature')}</span>
                  <span className="font-bold text-deep-green">{timing.factors.temperatureStatus.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100">
                  <span className="text-gray-500 font-medium">{t('precip_wash_risk', 'Precipitation Wash Risk')}</span>
                  <span className="font-bold text-agri-green">{timing.factors.rainfallRisk.split(' ')[0]} {timing.factors.rainfallRisk.split(' ')[1]}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100">
                  <span className="text-gray-500 font-medium">{t('wind_drift_risk', 'Wind Drift Risk')}</span>
                  <span className="font-bold text-dark-forest">{timing.factors.windStatus.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100">
                  <span className="text-gray-500 font-medium">{t('foliar_adherence_rh', 'Foliar Adherence (RH)')}</span>
                  <span className="font-bold text-deep-green">{timing.factors.humidityStatus.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-agri-green shrink-0" />
              <span>{t('optimal_drift_threshold', 'Optimal drift safety threshold is under 12 km/h wind speed.')}</span>
            </div>
          </Card>
        </div>

        {/* Best Application Window Highlight (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="h-full bg-deep-green text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg shadow-deep-green/20 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <CalendarClock className="h-48 w-48 text-white" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-soft-green animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-soft-green">
                  {t('optimal_timing_rec', 'Optimal Spray Timing Recommendation')}
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-white/80 block">{t('recommended_day_window', 'Recommended Day & Window:')}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {timing.bestApplicationWindow.day}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 text-soft-green font-bold text-sm sm:text-base mt-2">
                  <Clock className="h-4 w-4" />
                  <span>{timing.bestApplicationWindow.time}</span>
                </div>
              </div>

              <p className="text-xs text-white/85 leading-relaxed max-w-xl">
                {timing.bestApplicationWindow.recommendationNote}
              </p>
            </div>

            {/* Current Atmospheric Telemetry Bar */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-white/60 block text-[10px]">{t('current_temp', 'Current Temp')}</span>
                <span className="font-bold text-soft-green">{timing.currentConditions.temperature}°C</span>
              </div>
              <div>
                <span className="text-white/60 block text-[10px]">{t('humidity_label', 'Humidity')}</span>
                <span className="font-bold text-soft-green">{timing.currentConditions.humidity}%</span>
              </div>
              <div>
                <span className="text-white/60 block text-[10px]">{t('wind_velocity', 'Wind Velocity')}</span>
                <span className="font-bold text-soft-green">{timing.currentConditions.windSpeedKmh} km/h</span>
              </div>
              <div>
                <span className="text-white/60 block text-[10px]">{t('rain_probability', 'Rain Probability')}</span>
                <span className="font-bold text-soft-green">{timing.currentConditions.rainProbability}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Meteorological Warnings & Label Constraints */}
      <Card>
        <CardHeader
          title={t('meteorological_safeguards_title', 'Meteorological Application Safeguards')}
          subtitle={t('meteorological_safeguards_sub', 'Strict chemical drift and efficacy safety boundaries')}
          icon={<AlertTriangle className="h-5 w-5 text-warning-amber" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {timing.warnings.map((warn, wIdx) => (
            <div
              key={wIdx}
              className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900"
            >
              <div className="p-1 rounded-lg bg-amber-200 text-amber-800 shrink-0 mt-0.5">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <p className="font-medium leading-relaxed">{warn}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. 24-Hour Timeline with Slots (Suitable, Caution, Not Suitable) */}
      <Card>
        <CardHeader
          title={t('timeline_24h_title', '24-Hour Application Window Forecast')}
          subtitle={t('timeline_24h_sub', 'Hourly suitability classification based on forecasted dew evaporation, wind, and cloud convection')}
          icon={<Clock className="h-5 w-5 text-deep-green" />}
        />

        <div className="space-y-3 pt-2">
          {timing.hourlyTimeline.map((slot, idx) => {
            const getStatusBadge = (s: string) => {
              switch (s) {
                case 'Suitable':
                  return 'bg-green-100 text-agri-green border-green-200';
                case 'Caution':
                  return 'bg-amber-100 text-yellow-800 border-amber-200';
                case 'Not Suitable':
                  return 'bg-red-100 text-danger-red border-red-200';
                default:
                  return 'bg-gray-100 text-gray-600 border-gray-200';
              }
            };

            const statusLabel = slot.suitabilityStatus === 'Suitable' ? t('badge_suitable', 'Suitable')
              : slot.suitabilityStatus === 'Caution' ? t('badge_caution', 'Caution')
              : t('badge_not_suitable', 'Not Suitable');

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  slot.suitabilityStatus === 'Suitable'
                    ? 'bg-white border-gray-200 hover:border-agri-green'
                    : slot.suitabilityStatus === 'Caution'
                    ? 'bg-amber-50/30 border-amber-200'
                    : 'bg-red-50/30 border-red-200'
                }`}
              >
                {/* Left Time & Status */}
                <div className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <span className="text-[10px] text-gray-400 font-bold block">{slot.date}</span>
                    <span className="text-xs font-bold text-deep-green">{slot.timeWindow}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${getStatusBadge(slot.suitabilityStatus)}`}>
                    {statusLabel.toUpperCase()} ({slot.suitabilityScore}%)
                  </span>
                </div>

                {/* Center Telemetry Pill */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Thermometer className="h-3.5 w-3.5 text-gray-400" />
                    <strong>{slot.temperature.value}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3.5 w-3.5 text-blue-400" />
                    <span>{t('rain_label', 'Rain')}: {slot.rainfall.value}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-3.5 w-3.5 text-teal-500" />
                    <span>{t('wind_label', 'Wind')}: {slot.wind.value}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3.5 w-3.5 text-gray-400" />
                    <span>RH: {slot.humidity.value}</span>
                  </span>
                </div>

                {/* Right Reason Note */}
                <div className="text-right md:max-w-xs">
                  <p className="text-[11px] text-gray-500 line-clamp-1 italic">
                    {slot.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 7. Bottom Navigation */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/product-availability')}
          >
            {t('btn_back_to_availability', 'Back to Product Availability')}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/treatment-cost')}
            className="flex items-center gap-2"
          >
            <span>{t('action_estimate_cost', 'Estimate Treatment Cost')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
