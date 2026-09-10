import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Layers,
  Radio,
  Cpu,
  Server,
  BrainCircuit,
  LayoutDashboard,
  ArrowRight,
  Wifi,
  Database,
  CheckCircle2,
} from 'lucide-react';

import { useTranslation } from '../../context/LanguageContext';

export const ArchitectureFlowDiagram: React.FC = () => {
  const { t } = useTranslation();
  const steps = [
    {
      id: 1,
      title: 'Field Perception',
      badge: 'Sensor Layer',
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      items: ['Capacitive Soil Moisture', 'Tipping Bucket Rain', 'DHT22 / SHT40 Temp-RH', 'OV5640 RGB Lens'],
      protocol: 'I2C / SPI / ADC',
      color: 'border-emerald-200 bg-emerald-50/40',
    },
    {
      id: 2,
      title: 'Telemetry Nodes',
      badge: 'Field Nodes',
      icon: <Cpu className="w-5 h-5 text-teal-600" />,
      items: ['ESP32 Dual Core', 'Deep Sleep 15m Cycles', 'Solar MPPT + LiPo', 'SPI Flash Local Queue'],
      protocol: 'SX1262 LoRa 868MHz',
      color: 'border-teal-200 bg-teal-50/40',
    },
    {
      id: 3,
      title: 'Local Gateway',
      badge: 'Edge Hub Base',
      icon: <Server className="w-5 h-5 text-blue-600" />,
      items: ['Raspberry Pi 4 (4GB)', 'Local SQLite Cache', 'Offline Autonomous Loop', 'ChirpStack LoRaWAN'],
      protocol: 'MQTT / HTTP IPC',
      color: 'border-blue-200 bg-blue-50/40',
    },
    {
      id: 4,
      title: 'Edge AI Acceleration',
      badge: 'Neural Inference',
      icon: <BrainCircuit className="w-5 h-5 text-purple-600" />,
      items: ['TFLite MobileNetV2 (142ms)', 'YOLOv8 Nano INT8 (118ms)', 'Direct NEON Acceleration', 'Local Plant Pathologist'],
      protocol: 'IPC Shared Memory',
      color: 'border-purple-200 bg-purple-50/40',
    },
    {
      id: 5,
      title: 'Agri Operations',
      badge: 'Farm UI & Solenoids',
      icon: <LayoutDashboard className="w-5 h-5 text-amber-600" />,
      items: ['React Control Dashboard', 'Zone Solenoid Relays', 'Automated Irrigation Loop', 'Early Blast Alerts'],
      protocol: 'WebSocket / GPIO',
      color: 'border-amber-200 bg-amber-50/40',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-agri-dark">{t('edge_architecture_topology', 'Edge Architecture & Data Topology')}</h3>
            <p className="text-xs text-agri-muted">{t('resilient_mesh_desc', 'Resilient offline-first IoT mesh with on-prem quantized neural inference')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-ping inline-block" />
            LORA MESH ACTIVE
          </Badge>
          <Badge variant="info">{t('offline_capable_badge', 'OFFLINE CAPABLE')}</Badge>
        </div>
      </div>

      {/* Pipeline steps horizontally */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col">
            <div className={`p-4 rounded-xl border flex-1 transition-all hover:shadow-sm ${step.color}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-white shadow-2xs">{step.icon}</div>
                <span className="text-[10px] font-mono font-bold text-slate-400">STAGE 0{step.id}</span>
              </div>

              <h4 className="text-sm font-bold text-agri-dark">{step.title}</h4>
              <span className="text-[10px] font-medium text-slate-500 block mb-3">{step.badge}</span>

              <ul className="space-y-1.5 mb-4">
                {step.items.map((item, i) => (
                  <li key={i} className="text-xs text-agri-muted flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Link:</span>
                <span className="font-semibold text-agri-dark">{step.protocol}</span>
              </div>
            </div>

            {/* Arrow connector between stages on desktop */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-2xs items-center justify-center text-slate-400">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resilience notice */}
      <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-agri-muted">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-500 shrink-0" />
          <span>
            <strong className="text-agri-dark">{t('zero_data_loss_arch_label', 'Zero-Data-Loss Architecture:')}</strong> {t('zero_data_loss_arch_desc', 'Nodes queue up to 2,048 telemetry packets locally in SPI flash during RF fading, auto-syncing upon LoRa link reacquisition.')}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
          <Wifi className="w-3 h-3" />
          <span>RSSI -68 dBm (Avg)</span>
        </div>
      </div>
    </Card>
  );
};

export default ArchitectureFlowDiagram;
