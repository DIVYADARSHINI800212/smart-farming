import React from 'react';
import { ShieldCheck, TrendingUp } from 'lucide-react';
import { FarmOverview } from '../../types';
import { useTranslation } from '../../i18n';

interface FarmHealthBannerProps {
  overview: FarmOverview;
}

export const FarmHealthBanner: React.FC<FarmHealthBannerProps> = ({ overview }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-deep-green via-[#194435] to-[#12372A] text-white p-6 shadow-xl border border-soft-green/20">
      {/* Background Decorative Pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-soft-green via-agri-green to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Score & Title */}
        <div className="flex items-center gap-5">
          {/* Radial circular score badge */}
          <div className="relative flex items-center justify-center h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0 shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-black text-white tracking-tight">{overview.healthScore}</span>
              <span className="text-[10px] uppercase font-bold text-soft-green block -mt-1">/ 100</span>
            </div>
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-agri-green rounded-full border-2 border-deep-green flex items-center justify-center">
              <ShieldCheck className="h-3 w-3 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-soft-green/20 text-soft-green border border-soft-green/30">
                {t('farm_health_score', 'Farm Health Score')} • {t(`badge_${overview.cropHealthStatus.toLowerCase()}`, overview.cropHealthStatus)}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-soft-green">
                <TrendingUp className="h-3.5 w-3.5" /> +4.2% {t('vs_last_week', 'vs last week')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              {t('precision_crop_soil', 'Precision Crop & Soil Intelligence')}
            </h2>
            <p className="text-xs sm:text-sm text-soft-green/80 mt-1 max-w-xl leading-relaxed">
              {t('farm_health_desc', 'Real-time multi-spectral sensor analysis and edge disease inference indicate stable vegetative growth with localized moisture stress in Zone 1.')}
            </p>
          </div>
        </div>

        {/* Right Side: Quick Diagnostic Pills */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 min-w-[130px]">
            <span className="text-[11px] text-soft-green font-medium block">{t('zone_1_status', 'Zone 1 Status')}</span>
            <span className="text-sm font-bold text-warning-amber flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-warning-amber animate-pulse"></span>
              {t('water_stress', 'Water Stress')} (32%)
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 min-w-[130px]">
            <span className="text-[11px] text-soft-green font-medium block">{t('zone_2_status', 'Zone 2 Status')}</span>
            <span className="text-sm font-bold text-danger-red flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-danger-red animate-pulse"></span>
              {t('blast_risk', 'Blast Risk')} (82%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
