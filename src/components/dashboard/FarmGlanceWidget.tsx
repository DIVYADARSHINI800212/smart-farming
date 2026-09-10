import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, MapPin, Radio, Bell } from 'lucide-react';
import { FarmOverview, Zone, Alert } from '../../types';
import { useTranslation } from '../../i18n';

interface FarmGlanceWidgetProps {
  overview: FarmOverview;
  zones: Zone[];
  alerts: Alert[];
}

export const FarmGlanceWidget: React.FC<FarmGlanceWidgetProps> = ({ overview, zones, alerts }) => {
  const { t } = useTranslation();
  const totalArea = overview.totalAcres;
  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;

  // Calculate weighted affected area
  const affectedAcres = zones.reduce((acc, z) => {
    return acc + (z.areaAcres * (z.affectedAreaPercentage / 100));
  }, 0);

  const healthyAcres = Math.max(0, +(totalArea - affectedAcres).toFixed(1));
  const affectedAcresFormatted = +affectedAcres.toFixed(1);

  const items = [
    {
      label: t('total_farm_area', 'Total Farm Area'),
      value: `${totalArea} ${t('acres', 'Acres')}`,
      sub: t('thanjavur_unit', 'Thanjavur Pilot Unit'),
      icon: <Layers className="h-4 w-4 text-agri-green" />,
      bg: 'bg-green-50/70 border-green-100',
    },
    {
      label: t('healthy_canopy_area', 'Healthy Canopy Area'),
      value: `${healthyAcres} ${t('acres', 'Acres')}`,
      sub: `${Math.round((healthyAcres / totalArea) * 100)}% ${t('total_acreage_pct', 'of total acreage')}`,
      icon: <CheckCircle2 className="h-4 w-4 text-agri-green" />,
      bg: 'bg-green-50/70 border-green-100',
    },
    {
      label: t('stressed_affected_area', 'Stressed / Affected Area'),
      value: `${affectedAcresFormatted} ${t('acres', 'Acres')}`,
      sub: t('z1_moisture_z2_blast', 'Z1 moisture + Z2 blast lesion quad'),
      icon: <AlertTriangle className="h-4 w-4 text-danger-red" />,
      bg: 'bg-red-50/60 border-red-100',
    },
    {
      label: t('monitored_field_zones', 'Monitored Field Zones'),
      value: `${zones.length} ${t('zones_label', 'Zones')}`,
      sub: t('z1_z2_zones_sub', 'Zone 1 (North) & Zone 2 (South)'),
      icon: <MapPin className="h-4 w-4 text-blue-500" />,
      bg: 'bg-blue-50/60 border-blue-100',
    },
    {
      label: t('connected_iot_nodes', 'Connected IoT Nodes'),
      value: `2 ${t('nodes_active', 'Nodes Active')}`,
      sub: t('lora_freq_sub', 'Node 01 & 02 • LoRa 868MHz'),
      icon: <Radio className="h-4 w-4 text-agri-green animate-pulse" />,
      bg: 'bg-green-50/70 border-green-100',
    },
    {
      label: t('active_field_alerts', 'Active Field Alerts'),
      value: `${activeAlertsCount} ${t('unresolved', 'Unresolved')}`,
      sub: t('high_disease_water_stress', '1 High Disease, 1 Water Stress'),
      icon: <Bell className="h-4 w-4 text-warning-amber" />,
      bg: 'bg-amber-50/60 border-amber-100',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h4 className="text-sm font-bold text-deep-green uppercase tracking-wide">
            {t('farm_at_a_glance', 'Farm at a Glance')}
          </h4>
          <p className="text-xs text-gray-500">
            {t('farm_glance_sub', 'Real-time physical acreage, edge deployment, and health audit')}
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-soft-green/30 text-deep-green border border-soft-green/50">
          {t('pilot_zone_badge', 'SIH Multi-Zone Pilot')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((it, idx) => (
          <div key={idx} className={`p-3 rounded-xl border ${it.bg} space-y-1`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">
                {it.label}
              </span>
              {it.icon}
            </div>
            <div className="text-sm font-black text-deep-green truncate">
              {it.value}
            </div>
            <p className="text-[10px] text-gray-500 truncate leading-tight">
              {it.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
