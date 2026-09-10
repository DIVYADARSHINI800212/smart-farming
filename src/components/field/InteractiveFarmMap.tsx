import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Layers, Radio, AlertTriangle, Droplets, Maximize2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { StatusPill } from '../ui/StatusPill';
import { SensorNode, Zone } from '../../types';
import { useTranslation } from '../../i18n';
import { translateLabel, translateCropVariety } from '../../utils/translationMapper';

interface InteractiveFarmMapProps {
  zones: Zone[];
  nodes: SensorNode[];
  selectedZoneId?: string;
  onSelectZone: (zoneId: string) => void;
}

// Custom Leaflet DivIcon for IoT Sensor Nodes with pulse animation
const createNodeIcon = (nodeName: string, status: string) => {
  const isWarning = status !== 'Online';
  const color = isWarning ? '#F4B942' : '#2E7D32';

  return L.divIcon({
    className: 'custom-node-icon',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
        <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: ${color}; opacity: 0.25; animation: pulse-ring 2s infinite;"></div>
        <div style="width: 24px; height: 24px; border-radius: 50%; background: ${color}; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">
          📡
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export const InteractiveFarmMap: React.FC<InteractiveFarmMapProps> = ({
  zones,
  nodes,
  selectedZoneId,
  onSelectZone,
}) => {
  const { t } = useTranslation();
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const center: [number, number] = [10.7870, 79.1396]; // Thanjavur agro coordinates

  const tileUrl = mapType === 'standard'
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  const getTranslatedZoneShort = (zone: Zone) => {
    if (zone.zoneId === 'zone-1') return t('zone_1_label', 'Zone 1');
    if (zone.zoneId === 'zone-2') return t('zone_2_label', 'Zone 2');
    return zone.name.split('—')[0].trim();
  };

  const getTranslatedZoneFullName = (zone: Zone) => {
    if (zone.zoneId === 'zone-1') return t('zone_1_north_paddy', zone.name);
    if (zone.zoneId === 'zone-2') return t('zone_2_south_paddy', zone.name);
    return zone.name;
  };

  return (
    <Card className="p-0 overflow-hidden border-soft-green/40">
      {/* Header with Layer Switch */}
      <div className="p-4 bg-white border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-soft-green/30 text-agri-green">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-deep-green tracking-tight">
              {t('map_gis_title', 'Interactive Farm GIS Telemetry Map')}
            </h3>
            <p className="text-xs text-gray-500">
              {t('map_gis_subtitle', 'Polygon zone risk overlays & GPS-positioned LoRa nodes')}
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex items-center gap-2">
          {/* Zone Selector Buttons */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
            {zones.map((z) => (
              <button
                key={z.zoneId}
                onClick={() => onSelectZone(z.zoneId)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  selectedZoneId === z.zoneId
                    ? 'bg-agri-green text-white shadow-xs'
                    : 'text-gray-600 hover:text-dark-forest'
                }`}
              >
                {getTranslatedZoneShort(z)}
              </button>
            ))}
          </div>

          {/* Satellite Toggle */}
          <button
            onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {mapType === 'standard' ? `🛰️ ${t('satellite_view', 'Satellite')}` : `🗺️ ${t('vector_map', 'Vector Map')}`}
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="h-[420px] w-full relative">
        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={tileUrl}
          />

          {/* Render Farm Zones as Polygons */}
          {zones.map((zone) => {
            const isSelected = selectedZoneId === zone.zoneId;
            const isStress = zone.status === 'Water Stress';
            const isRisk = zone.status === 'Disease Risk';

            const fillColor = isRisk ? '#D9534F' : isStress ? '#F4B942' : '#2E7D32';

            return (
              <Polygon
                key={zone.zoneId}
                positions={zone.bounds}
                pathOptions={{
                  color: fillColor,
                  fillColor: fillColor,
                  fillOpacity: isSelected ? 0.45 : 0.25,
                  weight: isSelected ? 3 : 2,
                  dashArray: isStress ? '5, 5' : undefined,
                }}
                eventHandlers={{
                  click: () => onSelectZone(zone.zoneId),
                }}
              >
                <Popup>
                  <div className="p-1 space-y-2 min-w-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-deep-green">{getTranslatedZoneFullName(zone)}</span>
                      <StatusPill status={zone.status} pulse={false} />
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {translateCropVariety(zone.cropType, t)} • {zone.areaAcres} {t('acres', 'Acres')}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-gray-100 text-[11px]">
                      <div>{t('health_score', 'Health')}: <strong className="text-agri-green">{100 - zone.riskScore}%</strong></div>
                      <div>{t('soil_moisture', 'Moisture')}: <strong>{zone.currentReading.soilMoisture}%</strong></div>
                      <div>{t('status_disease_risk', 'Disease Risk')}: <strong className={zone.status === 'Disease Risk' ? 'text-danger-red' : 'text-gray-700'}>{zone.status === 'Disease Risk' ? `${t('risk_high', 'High')} (${t('disease_blast', 'Blast')} 82%)` : `${t('risk_low', 'Low')} (8%)`}</strong></div>
                      <div>{t('nav_pest_detection', 'Pest Risk')}: <strong className={zone.pestDistribution[0].percentage > 50 ? 'text-yellow-700' : 'text-gray-700'}>{translateLabel(zone.pestDistribution[0].label, 'pest', t)} ({zone.pestDistribution[0].percentage}%)</strong></div>
                      <div>{t('ambient_temp', 'Temp')} / {t('relative_humidity', 'Humidity')}: <strong>{zone.currentReading.temperature}°C / {zone.currentReading.humidity}%</strong></div>
                      <div>{t('last_sync_label', 'Last Update')}: <strong>{zone.currentReading.timestamp}</strong></div>
                    </div>
                    <button
                      onClick={() => onSelectZone(zone.zoneId)}
                      className="w-full mt-1 py-1 px-2 text-center text-[10px] font-bold text-white bg-agri-green hover:bg-green-700 rounded-lg transition-colors shadow-2xs"
                    >
                      {t('open_zone_details', 'Open Zone Details')}
                    </button>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

          {/* Render IoT Nodes */}
          {nodes.map((node) => (
            <Marker
              key={node.nodeId}
              position={node.coordinates}
              icon={createNodeIcon(node.name, node.status)}
            >
              <Popup>
                <div className="p-1 space-y-1 min-w-[190px]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-deep-green">
                    <Radio className="h-3.5 w-3.5 text-agri-green" />
                    {node.name}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    <div>{t('status_label', 'Status')}: <strong className="text-agri-green">{translateLabel(node.status, 'status', t)}</strong></div>
                    <div>{t('battery_label', 'Battery')}: <strong>{node.batteryPercentage}% ({t('solar_harvester', 'Solar')})</strong></div>
                    <div>LoRa RSSI: <strong>{node.signalStrengthDbm} dBm</strong></div>
                    <div>{t('last_seen_label', 'Last Sync')}: <strong>{node.lastSeen}</strong></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay on Map */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-gray-200 text-xs space-y-1.5">
          <div className="font-bold text-deep-green text-[11px] uppercase tracking-wide">
            {t('gis_layer_legend', 'GIS Layer Legend')}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-700"></span>
              <span>{t('legend_healthy', 'Healthy')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-600"></span>
              <span>{t('legend_watch', 'Watch')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-500 border border-red-700"></span>
              <span>{t('legend_high_risk', 'High Risk')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📡</span>
              <span>{t('legend_iot_node', 'IoT Node')}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
