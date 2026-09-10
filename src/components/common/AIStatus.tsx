import React from 'react';
import { Cpu, CheckCircle2, Zap, Activity } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface AIStatusProps {
  compact?: boolean;
  className?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({ compact = false, className = '' }) => {
  const { t } = useTranslation();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/70 rounded-full text-xs text-deep-green ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-agri-green"></span>
        </span>
        <span className="font-semibold">{t('edge_ai', 'Edge AI')}:</span>
        <span className="text-agri-green font-bold">{t('badge_online', 'Online')}</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500 text-[11px]">140ms INT8 • {t('demo_mode_badge', 'Demo Mode')}</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#E6F0EB] p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-soft-green/30 text-agri-green">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-deep-green uppercase tracking-wide">
              {t('edge_ai_telemetry_status', 'Edge AI Telemetry Status')}
            </h4>
            <p className="text-[10px] text-gray-500">
              {t('local_inference_pipeline', 'Local on-device inference pipeline (ESP32 + RPi4)')}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
          <CheckCircle2 className="h-3 w-3 text-agri-green" />
          {t('badge_online', 'ONLINE').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('edge_ai', 'Edge AI')}</span>
          <span className="text-xs font-bold text-agri-green flex items-center gap-1 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-agri-green"></span>
            {t('badge_online', 'Online')}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('image_processing', 'Image Processing')}</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            {t('ready_320px', 'Ready (320px)')}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('disease_model', 'Disease Model')}</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            {t('loaded_int8', 'Loaded (INT8)')}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('pest_model', 'Pest Model')}</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            {t('loaded_yolov8', 'Loaded (YOLOv8)')}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('inference_mode', 'Inference Mode')}</span>
          <span className="text-xs font-bold text-deep-green flex items-center gap-1 mt-0.5">
            <Activity className="h-3 w-3 text-agri-green" />
            {t('local_edge', 'Local / Edge')}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">{t('average_latency', 'Average Latency')}</span>
          <span className="text-xs font-bold text-deep-green flex items-center gap-1 mt-0.5">
            <Zap className="h-3 w-3 text-warning-amber" />
            140 ms
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
        <span>{t('data_mode', 'Data Mode')}: <strong className="text-gray-600">{t('simulated_demo', 'Simulated / Demo')}</strong></span>
        <span>{t('local_database', 'Local Database')}: <strong className="text-gray-600">{t('sqlite_active_lag', 'SQLite Active (0 sync lag)')}</strong></span>
      </div>
    </div>
  );
};

