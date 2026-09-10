import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, MapPin, Camera, UserCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';
import { Zone } from '../../types';
import { useTranslation } from '../../i18n';

interface PriorityActionBannerProps {
  zone?: Zone;
}

export const PriorityActionBanner: React.FC<PriorityActionBannerProps> = ({ zone }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900/90 via-red-800 to-[#12372A] text-white p-6 shadow-xl border-2 border-danger-red/40">
      {/* Decorative ambient background pulse */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-danger-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Critical Notice */}
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-danger-red rounded-2xl shadow-lg border border-white/20 shrink-0 text-white animate-pulse">
            <AlertOctagon className="h-7 w-7" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-white text-danger-red">
                {t('priority_action_required', 'Priority Action Required')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white/20 text-white border border-white/20">
                {t('zone_2_south_paddy', 'ZONE 2 — South Paddy Field')}
              </span>
              <span className="text-xs text-red-200 flex items-center gap-1 font-semibold">
                <ShieldAlert className="h-3.5 w-3.5" /> {t('high_disease_risk_detected', 'High Disease Risk Detected')}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
              {t('rice_blast_emergence', 'Rice Blast Fungal Infection Emergence')} (82% {t('confidence', 'Confidence')})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-red-100 pt-1">
              <p>
                <strong className="text-white">{t('epidemiological_reason_label', 'Epidemiological Reason')}:</strong> {t('epidemiological_reason_text', 'High humidity (85%) + recent rainfall (2 mm) + AI-detected spindle lesions')}
              </p>
              <p>
                <strong className="text-white">{t('recommended_protocol_label', 'Recommended Protocol')}:</strong> {t('recommended_protocol_text', 'Inspect Zone 2 canopy, confirm lesion density, and review the afternoon spray window.')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Direct Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/field-monitoring')}
            icon={<MapPin className="h-4 w-4" />}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold"
          >
            {t('btn_view_zone', 'View Zone')}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/ai-vision')}
            icon={<Camera className="h-4 w-4" />}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold"
          >
            {t('btn_analyze_image', 'Analyze Image')}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/farmer-advisory')}
            icon={<UserCheck className="h-4 w-4" />}
            className="bg-danger-red hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-900/40"
          >
            <span>{t('btn_view_advisory', 'View Advisory')}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
