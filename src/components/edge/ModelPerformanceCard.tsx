import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { EdgeModelSpec } from '../../types';
import { BrainCircuit, Zap, FileCode, CheckCircle2, Cpu } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface ModelPerformanceCardProps {
  models: EdgeModelSpec[];
}

export const ModelPerformanceCard: React.FC<ModelPerformanceCardProps> = ({ models }) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-agri-dark">{t('on_device_ai_models', 'On-Device Edge AI Models & Inferences')}</h3>
            <p className="text-xs text-agri-muted">{t('quantized_int8_desc', 'Quantized INT8 neural networks running locally on Raspberry Pi 4')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">{t('local_npu_deployed', 'LOCAL NPU DEPLOYED')}</Badge>
          <Badge variant="info">{t('zero_cloud_roundtrip', 'ZERO CLOUD ROUND-TRIP')}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-xs transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h4 className="text-sm font-bold text-agri-dark">{model.modelName}</h4>
                <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                  {model.format}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {model.accuracyPct}% Acc
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-100">
                <div className="flex items-center gap-1 text-[10px] text-agri-muted mb-0.5">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>{t('latency_label', 'Latency')}</span>
                </div>
                <span className="font-mono font-bold text-agri-dark">{model.inferenceTimeMs} ms</span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-100">
                <div className="flex items-center gap-1 text-[10px] text-agri-muted mb-0.5">
                  <FileCode className="w-3 h-3 text-blue-500" />
                  <span>{t('size_label', 'Size')}</span>
                </div>
                <span className="font-mono font-bold text-agri-dark">{model.modelSizeMb} MB</span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-100">
                <div className="flex items-center gap-1 text-[10px] text-agri-muted mb-0.5">
                  <Cpu className="w-3 h-3 text-purple-500" />
                  <span>{t('engine_label', 'Engine')}</span>
                </div>
                <span className="font-mono font-bold text-agri-dark text-[10px] truncate">{model.acceleration}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Input: {model.inputShape}
              </span>
              <span>{t('ready_status', 'Ready')}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ModelPerformanceCard;
