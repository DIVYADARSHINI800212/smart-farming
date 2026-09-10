import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { EdgeGatewayDiagnostics } from '../../types';
import { Server, Activity, Database, Radio, HardDrive, Cpu, ShieldCheck, RefreshCw } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface GatewayMetricsCardProps {
  gateway: EdgeGatewayDiagnostics;
}

export const GatewayMetricsCard: React.FC<GatewayMetricsCardProps> = ({ gateway }) => {
  const { t } = useTranslation();
  const ramPercent = Math.round((gateway.memoryUsageMb / gateway.totalMemoryMb) * 100);
  const storagePercent = Math.round((gateway.emmcStorageUsedGb / gateway.emmcStorageTotalGb) * 100);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-agri-green">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-agri-dark">Raspberry Pi 4 Model B (4GB)</h3>
              <Badge variant="success">{t('online_host_edge_gateway', 'Online (Host Edge Gateway)')}</Badge>
            </div>
            <p className="text-xs text-agri-muted">
              ID: <span className="font-mono text-agri-dark">{gateway.gatewayId}</span> • Connected Nodes:{' '}
              <span className="font-mono text-agri-dark">{gateway.connectedNodesCount} active</span> • CPU Temp:{' '}
              <span className="font-mono text-agri-dark">{gateway.cpuTemperature}°C</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 text-xs text-agri-green bg-agri-green/10 hover:bg-agri-green/20 px-3 py-1.5 rounded-lg font-medium transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t('sync_telemetry', 'Sync Telemetry')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('inference_latency', 'Inference Latency')}</span>
          </div>
          <p className="text-base font-bold text-agri-dark">{gateway.processingLatencyMs} ms</p>
          <span className="text-[10px] text-emerald-600 font-medium">{t('on_device_edge_cnn', 'On-Device Edge CNN')}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Radio className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('lora_concentrator', 'LoRa Concentrator')}</span>
          </div>
          <p className="text-base font-bold text-agri-dark">8 Channels</p>
          <span className="text-[10px] text-slate-500">{t('sx1302_core', 'SX1302 Baseband Core')}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t('sqlite_buffered_packets', 'SQLite Buffered Packets')}</span>
          </div>
          <p className="text-base font-bold text-agri-dark">{gateway.sqliteBufferedPackets}</p>
          <span className="text-[10px] text-emerald-600 font-medium">{t('zero_data_loss_rf', 'Zero data loss on RF drop')}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>{t('continuous_uptime', 'Continuous Uptime')}</span>
          </div>
          <p className="text-base font-bold text-agri-dark">{gateway.uptimeHours} hrs</p>
          <span className="text-[10px] text-slate-500">14 consecutive days</span>
        </div>
      </div>

      {/* Resource Utilization */}
      <div className="space-y-4 pt-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-agri-muted">
              <Cpu className="w-3.5 h-3.5 text-slate-500" />
              <span>RAM Allocation ({gateway.memoryUsageMb} MB / {gateway.totalMemoryMb} MB)</span>
            </span>
            <span className="font-semibold text-agri-dark">{ramPercent}%</span>
          </div>
          <ProgressBar value={ramPercent} variant="agri-green" />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-agri-muted">
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
              <span>eMMC Flash Storage ({gateway.emmcStorageUsedGb} GB / {gateway.emmcStorageTotalGb} GB)</span>
            </span>
            <span className="font-semibold text-agri-dark">{storagePercent}%</span>
          </div>
          <ProgressBar value={storagePercent} variant="blue" />
        </div>
      </div>
    </Card>
  );
};

export default GatewayMetricsCard;
