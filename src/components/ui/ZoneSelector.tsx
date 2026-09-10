import React from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface ZoneSelectorProps {
  selectedZone: string;
  onSelectZone: (zoneId: string) => void;
  className?: string;
}

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({
  selectedZone,
  onSelectZone,
  className = '',
}) => {
  const { t } = useTranslation();

  const zones = [
    {
      id: 'zone-1',
      name: t('zone_1_north_paddy', 'Zone 1 (North Field)'),
      crop: `Paddy ADT 43 • 2.3 ${t('acres', 'Acres')}`,
      statusNote: `${t('water_stress', 'Water Stress')} (32%)`,
    },
    {
      id: 'zone-2',
      name: t('zone_2_south_paddy', 'Zone 2 (South Field)'),
      crop: `Paddy BPT 5204 • 2.5 ${t('acres', 'Acres')}`,
      statusNote: `${t('blast_risk', 'Blast Risk')} (85% Hum)`,
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full ${className}`}>
      {zones.map((zone) => {
        const isSelected = selectedZone === zone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelectZone(zone.id)}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 min-w-0 ${
              isSelected
                ? 'bg-agri-green text-white border-agri-green shadow-md shadow-agri-green/20'
                : 'bg-white text-gray-700 border-gray-200 hover:border-soft-green hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-green-50 text-agri-green'}`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <span className={`text-xs font-bold leading-snug break-words ${isSelected ? 'text-white' : 'text-deep-green'}`}>
                  {zone.name}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 text-center ${
                isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {zone.statusNote}
              </span>
            </div>
            <div className={`text-[11px] leading-relaxed break-words pl-7 ${isSelected ? 'text-soft-green' : 'text-gray-500'}`}>
              {zone.crop}
            </div>
          </button>
        );
      })}
    </div>
  );
};
