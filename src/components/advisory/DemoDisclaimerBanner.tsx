import React from 'react';
import { AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DemoDisclaimerBannerProps {
  type?: 'general' | 'chemical' | 'weather' | 'availability' | 'cost';
  customMessage?: string;
  className?: string;
}

export const DemoDisclaimerBanner: React.FC<DemoDisclaimerBannerProps> = ({
  type = 'general',
  customMessage,
  className = '',
}) => {
  const { t } = useLanguage();

  const getMessage = () => {
    if (customMessage) return customMessage;
    switch (type) {
      case 'chemical':
        return t('disclaimer_chemical', 'DEMO / PROTOTYPE DATA — Prototype agricultural input & chemical information only. Verify current approved product labels, registered dosages, and local agricultural university/KVK guidance before real-world use.');
      case 'weather':
        return t('disclaimer_weather', 'DEMO WEATHER TIMING — Weather-derived application window simulated from edge sensors and meteorological estimates. Actual spray timing must account for immediate local field conditions.');
      case 'availability':
        return t('disclaimer_availability', 'DEMO AVAILABILITY DIRECTORY — Simulated agro-dealer inventory and contact directory. Real supplier and e-NAM/PACS integration planned for production.');
      case 'cost':
        return t('disclaimer_cost', 'DEMO ESTIMATE — All prices, acreage rates, and savings are simulated estimates. Actual costs vary by regional dealer, market price, and labour rates.');
      default:
        return t('disclaimer_general', 'Prototype agricultural system for SIH demonstration. Sensor values, vision inference, and advisory outputs are simulated.');
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border bg-amber-50/80 border-amber-200 text-amber-900 shadow-xs ${className}`}
      role="alert"
    >
      <div className="p-1 rounded-lg bg-amber-200/70 text-amber-800 shrink-0 mt-0.5">
        {type === 'chemical' ? (
          <ShieldAlert className="h-4 w-4 text-amber-900" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-900" />
        )}
      </div>
      <div className="flex-1 text-xs">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="font-bold tracking-wide uppercase text-[10px] px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
            {t('badge_demo_data', 'DEMO / PROTOTYPE DATA')}
          </span>
          <span className="text-[11px] font-semibold text-amber-800">
            {t('badge_simulation_model', 'Hackathon Simulation Model')}
          </span>
        </div>
        <p className="text-amber-800 leading-relaxed font-medium">
          {getMessage()}
        </p>
      </div>
    </div>
  );
};
