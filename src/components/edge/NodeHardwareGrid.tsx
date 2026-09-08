import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { NodeHardwareDetail } from '../../types';
import {
  BatteryCharging,
  Sun,
  Radio,
  Clock,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';

interface NodeHardwareGridProps {
  nodes: NodeHardwareDetail[];
}

export const NodeHardwareGrid: React.FC<NodeHardwareGridProps> = ({ nodes }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-agri-dark">Deployed Field Microcontroller Nodes</h3>
          <p className="text-xs text-agri-muted">Real-time battery SOC, solar harvesting & LoRa link margins</p>
        </div>
        <Badge variant="info">{nodes.length} Nodes Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <Card key={node.nodeId} className="p-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-agri-dark">{node.name}</h4>
                    <Badge variant={node.status === 'Connected' ? 'success' : 'danger'}>
                      {node.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-agri-muted">
                    ID: <span className="font-mono text-agri-dark">{node.nodeId}</span> • Zone:{' '}
                    <span className="font-medium text-agri-dark">{node.zoneName}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Firmware</span>
                <span className="text-xs font-mono font-medium text-slate-600">{node.firmwareVersion}</span>
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Battery</span>
                </div>
                <p className="text-sm font-bold text-agri-dark">{node.batteryPercentage}%</p>
                <span className="text-[10px] text-emerald-600 font-medium">
                  {node.solarCharging ? 'Solar Charging' : 'Discharging'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Solar Harvester</span>
                </div>
                <p className="text-sm font-bold text-agri-dark">{node.solarCharging ? 'Active' : 'Standby'}</p>
                <span className="text-[10px] text-slate-400">MPPT Controller</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
                  <Radio className="w-3.5 h-3.5 text-teal-600" />
                  <span>LoRa RSSI</span>
                </div>
                <p className="text-sm font-bold text-agri-dark">{node.signalStrengthDbm} dBm</p>
                <span className="text-[10px] text-slate-400">Delivery {node.packetDeliveryRate}%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-agri-muted mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Heartbeat</span>
                </div>
                <p className="text-sm font-bold text-agri-dark">{node.lastSyncAgo}</p>
                <span className="text-[10px] text-slate-400">15m sleep cycle</span>
              </div>
            </div>

            {/* Attached Sensors payload */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-agri-dark block mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-agri-green" />
                Attached Sensor Transducers
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Capacitive Moisture: {node.sensorHealth.capacitiveMoisture}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  DHT22 Temp-RH: {node.sensorHealth.dht22TempHumid}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Rain Gauge: {node.sensorHealth.tippingRain}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  SX1262 LoRa: {node.sensorHealth.loraModule}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Channel: {node.loraFrequency}</span>
              <span className="text-emerald-700 font-mono">Packet Loss: {(100 - node.packetDeliveryRate).toFixed(1)}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NodeHardwareGrid;
