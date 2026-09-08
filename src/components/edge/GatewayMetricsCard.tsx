import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { EdgeGatewayDiagnostics } from '../../types';
import { Server, Activity, HardDrive, Cpu, Radio, ShieldCheck, Database, RefreshCw } from 'lucide-react';

interface GatewayMetricsCardProps {
  gateway: EdgeGatewayDiagnostics;
}

export const GatewayMetricsCard: React.FC<GatewayMetricsCardProps> = ({ gateway }) => {
  const ramPercent = Math.round((gateway.memoryUsageMb / gateway.totalMemoryMb) * 100);
  const storagePercent = Math.round((gateway.emmcStorageUsedGb / gateway.emmcStorageTotalGb) * 100);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-agri-dark">{gateway.name}</h3>
              <Badge variant={gateway.status === 'ONLINE' ? 'success' : 'danger'}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 inline-block animate-pulse" />
                {gateway.status}
              </Badge>
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
            <span>Sync Telemetry</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inference Latency</span>
          </div>
          <p className="text-base font-bold text-agri-dark">{gateway.processingLatencyMs} ms</p>
          <span className="text-[10px] text-emerald-600 font-medium">On-Device Edge CNN</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Radio className="w-3.5 h-3.5 text-teal-600" />
            <span>LoRa Concentrator</span>
          </div>
          <p className="text-base font-bold text-agri-dark">8 Channels</p>
          <span className="text-[10px] text-slate-500">SX1302 Baseband Core</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>SQLite Buffered Packets</span>
          </div>
          <p className="text-base font-bold text-agri-dark">{gateway.sqliteBufferedPackets}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Zero data loss on RF drop</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Continuous Uptime</span>
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
