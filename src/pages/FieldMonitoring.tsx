import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, RefreshCw } from 'lucide-react';
import { InteractiveFarmMap } from '../components/field/InteractiveFarmMap';
import { ZoneDetailCard } from '../components/field/ZoneDetailCard';
import { NodeStatusCard } from '../components/field/NodeStatusCard';
import { SensorDiagnostics } from '../components/field/SensorDiagnostics';
import { Button } from '../components/ui/Button';
import { useFarmData } from '../hooks/useFarmData';
import { useTranslation } from '../i18n';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const FieldMonitoring: React.FC = () => {
  const { zones, nodes, refreshSensorData, lastRefreshed } = useOutletContext<FarmDataContext>();
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const { t } = useTranslation();

  const selectedZone = zones.find((z) => z.zoneId === selectedZoneId) || zones[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-50 text-agri-green">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              {t('nav_field_monitoring', 'Field & Sensor Telemetry Monitoring')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('env_monitoring_subtitle', 'Live LoRa sensor mesh, spatial zone partitioning, and hardware diagnostics')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {t('last_sync', 'Last LoRa Sync')}: <strong>{lastRefreshed}</strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSensorData}
            icon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            {t('btn_refresh', 'Poll Nodes')}
          </Button>
        </div>
      </div>

      {/* 1. Interactive Farm GIS Map */}
      <InteractiveFarmMap
        zones={zones}
        nodes={nodes}
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
      />

      {/* 2. Zone Detail Cards (Zone 1 & Zone 2) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            {t('chart_field_performance_title', 'Field Zone Telemetry Breakdown')}
          </h2>
          <span className="text-xs text-gray-400">
            {t('chart_field_performance_sub', 'Click map or cards to inspect individual zone')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {zones.map((zone) => (
            <div 
              key={zone.zoneId}
              onClick={() => setSelectedZoneId(zone.zoneId)}
              className="cursor-pointer"
            >
              <ZoneDetailCard
                zone={zone}
                isFocused={selectedZoneId === zone.zoneId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Hardware Node Telemetry & Diagnostic Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-7">
          <NodeStatusCard nodes={nodes} />
        </div>
        <div className="xl:col-span-5">
          <SensorDiagnostics currentReading={selectedZone?.currentReading} />
        </div>
      </div>
    </div>
  );
};
