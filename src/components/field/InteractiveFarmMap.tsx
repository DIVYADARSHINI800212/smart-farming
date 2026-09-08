import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Layers, Radio, AlertTriangle, Droplets, Maximize2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { StatusPill } from '../ui/StatusPill';
import { SensorNode, Zone } from '../../types';

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
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const center: [number, number] = [10.7870, 79.1396]; // Thanjavur agro coordinates

  const tileUrl = mapType === 'standard'
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

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
              Interactive Farm GIS Telemetry Map
            </h3>
            <p className="text-xs text-gray-500">
              Polygon zone risk overlays & GPS-positioned LoRa nodes
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
                {z.name.split('—')[0].trim()}
              </button>
            ))}
          </div>

          {/* Satellite Toggle */}
          <button
            onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {mapType === 'standard' ? '🛰️ Satellite' : '🗺️ Vector Map'}
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
                  <div className="p-1 space-y-1.5 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-deep-green">{zone.name}</span>
                      <StatusPill status={zone.status} pulse={false} />
                    </div>
                    <p className="text-[11px] text-gray-500">{zone.cropType}</p>
                    <div className="grid grid-cols-2 gap-1 pt-1 border-t border-gray-100 text-[11px]">
                      <div>Moisture: <strong>{zone.currentReading.soilMoisture}%</strong></div>
                      <div>Temp: <strong>{zone.currentReading.temperature}°C</strong></div>
                      <div>Humidity: <strong>{zone.currentReading.humidity}%</strong></div>
                      <div>Rain: <strong>{zone.currentReading.rainfall} mm</strong></div>
                    </div>
                    <div className="text-[10px] text-gray-400 pt-1">
                      Click zone to focus telemetry details below.
                    </div>
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
                    <div>Status: <strong className="text-agri-green">{node.status}</strong></div>
                    <div>Battery: <strong>{node.batteryPercentage}% (Solar)</strong></div>
                    <div>LoRa RSSI: <strong>{node.signalStrengthDbm} dBm</strong></div>
                    <div>Last Sync: <strong>{node.lastSeen}</strong></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay on Map */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-gray-200 text-xs space-y-1.5">
          <div className="font-bold text-deep-green text-[11px] uppercase tracking-wide">
            GIS Layer Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-400 opacity-70 border border-amber-600"></span>
            <span>Zone 1: Water Stress (32% Moisture)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500 opacity-70 border border-red-700"></span>
            <span>Zone 2: Disease Risk (82% Blast)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">📡</span>
            <span>ESP32 LoRa Field Nodes (Nodes 1 & 2)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
