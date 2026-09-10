import React from 'react';
import { Radio, BatteryCharging, Wifi, Clock, Cpu, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { SensorNode } from '../../types';
import { useTranslation } from '../../i18n';
import { translateLabel, translateZoneName } from '../../utils/translationMapper';

interface NodeStatusCardProps {
  nodes: SensorNode[];
}

export const NodeStatusCard: React.FC<NodeStatusCardProps> = ({ nodes }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={t('deployed_nodes_title', 'Field IoT Telemetry Nodes')}
        subtitle={t('field_iot_nodes_sub', 'ESP32 + LoRa SX1276 Hardware Status (Unit 1)')}
        icon={<Cpu className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-agri-green border border-green-200">
            {t('nodes_streaming_count', '2 / 2 Nodes Streaming')}
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div
            key={node.nodeId}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-soft-green/50 transition-all shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-green-100 text-agri-green">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deep-green">{node.name}</h4>
                    <span className="text-[11px] text-gray-500">{translateZoneName(node.zoneName, t)}</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-agri-green animate-pulse"></span>
                  {translateLabel(node.status, 'status', t)}
                </span>
              </div>

              {/* Hardware Metrics */}
              <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 bg-white rounded-lg border border-gray-100 text-center">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">{t('battery_label', 'Battery')}</span>
                  <span className="text-xs font-bold text-dark-forest flex items-center justify-center gap-1 mt-0.5">
                    <BatteryCharging className="h-3.5 w-3.5 text-agri-green" />
                    {node.batteryPercentage}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">LoRa RSSI</span>
                  <span className="text-xs font-bold text-dark-forest flex items-center justify-center gap-1 mt-0.5">
                    <Wifi className="h-3.5 w-3.5 text-blue-600" />
                    {node.signalStrengthDbm} dBm
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">{t('last_seen_label', 'Last Seen')}</span>
                  <span className="text-xs font-bold text-dark-forest flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                    {node.lastSeen}
                  </span>
                </div>
              </div>

              {/* Sensor Diagnostics Status */}
              <div className="mt-3 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-gray-600">
                  <span>{t('capacitive_probe_label', 'Capacitive Moisture Probe:')}</span>
                  <span className="text-agri-green font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {t('probe_healthy', 'Healthy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-600">
                  <span>{t('temp_humidity_probe_label', 'DHT22 Temp & Humidity:')}</span>
                  <span className="text-agri-green font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {t('probe_healthy', 'Healthy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-600">
                  <span>{t('rain_gauge_probe_label', 'Tipping Bucket Rain Gauge:')}</span>
                  <span className="text-agri-green font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {t('probe_healthy', 'Healthy')}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>{t('firmware_label', 'Firmware')}: <strong>FreeRTOS v10.4</strong></span>
              <span>GPS: <strong>{node.coordinates[0].toFixed(4)}°N, {node.coordinates[1].toFixed(4)}°E</strong></span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
