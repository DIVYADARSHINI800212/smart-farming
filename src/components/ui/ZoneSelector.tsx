import React from 'react';
import { MapPin } from 'lucide-react';

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
  const zones = [
    {
      id: 'zone-1',
      name: 'Zone 1 (North Field)',
      crop: 'Paddy ADT 43 • 2.3 Acres',
      statusNote: 'Water Stress (32%)',
    },
    {
      id: 'zone-2',
      name: 'Zone 2 (South Field)',
      crop: 'Paddy BPT 5204 • 2.5 Acres',
      statusNote: 'Disease Risk (85% Hum)',
    },
  ];

  return (
    <div className={`flex flex-wrap sm:flex-nowrap items-center gap-2 ${className}`}>
      {zones.map((zone) => {
        const isSelected = selectedZone === zone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelectZone(zone.id)}
            className={`flex-1 p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
              isSelected
                ? 'bg-agri-green text-white border-agri-green shadow-md shadow-agri-green/20'
                : 'bg-white text-gray-700 border-gray-200 hover:border-soft-green hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-green-50 text-agri-green'}`}>
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-deep-green'}`}>
                  {zone.name}
                </span>
                <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-soft-green' : 'text-gray-500'}`}>
                  {zone.crop}
                </span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
              isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {zone.statusNote}
            </span>
          </button>
        );
      })}
    </div>
  );
};
