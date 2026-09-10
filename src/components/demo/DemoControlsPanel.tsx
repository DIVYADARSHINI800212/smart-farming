import React, { useState } from 'react';
import { Sliders, RefreshCw, CheckCircle2, AlertTriangle, CloudRain, Bug, Droplets, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { DemoPreset, useFarmData } from '../../hooks/useFarmData';
import { useTranslation } from '../../i18n';

type FarmDataContext = ReturnType<typeof useFarmData>;

interface DemoControlsPanelProps {
  farmData: FarmDataContext;
}

export const DemoControlsPanel: React.FC<DemoControlsPanelProps> = ({ farmData }) => {
  const { t } = useTranslation();
  const { zones, activePreset, applyPreset, updateZoneReading } = farmData;
  const z2 = zones.find(z => z.zoneId === 'zone-2') || zones[1] || zones[0];

  const [savedFeedback, setSavedFeedback] = useState(false);

  const presets: { id: DemoPreset; name: string; icon: React.ReactNode; desc: string; badgeColor: string }[] = [
    { id: 'disease_risk', name: 'Disease Risk (Primary SIH)', icon: <AlertTriangle className="h-4 w-4" />, desc: 'Z2 Blast (82%) + 85% Humidity + 2mm Rain', badgeColor: 'bg-red-100 text-danger-red border-red-200' },
    { id: 'normal', name: 'Normal Optimal Farm', icon: <CheckCircle2 className="h-4 w-4" />, desc: 'Moisture 54%, 26°C, Low Risk across zones', badgeColor: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'water_stress', name: 'Severe Water Stress', icon: <Droplets className="h-4 w-4" />, desc: 'Moisture 22%, 33°C, Drought Risk alert', badgeColor: 'bg-amber-100 text-yellow-800 border-amber-200' },
    { id: 'heavy_rain', name: 'Heavy Monsoon / Flood', icon: <CloudRain className="h-4 w-4" />, desc: '42mm Rainfall, 88% Soil Saturation', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'pest_outbreak', name: 'Pest Outbreak (Leaf Folder)', icon: <Bug className="h-4 w-4" />, desc: 'Leaf Folder 88%, High defoliation risk', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
  ];

  const handleSliderChange = (param: keyof typeof z2.currentReading, value: number) => {
    updateZoneReading('zone-2', { [param]: value });
    showSaveToast();
  };

  const showSaveToast = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handlePresetSelect = (presetId: DemoPreset) => {
    applyPreset(presetId);
    showSaveToast();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-50 text-agri-green">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-deep-green tracking-tight">
                {t('live_demo_controls', 'Live Demo Controls & Scenario Simulator')}
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                SIH Jury Tool
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('live_demo_sub', 'Instantly toggle farm conditions and adjust live parameters across all pages')}
            </p>
          </div>
        </div>

        {savedFeedback && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-agri-green animate-in fade-in">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{t('config_saved_demo', 'Configuration saved locally for demo')}</span>
          </div>
        )}
      </div>

      {/* Preset Buttons Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          {t('preset_demonstrations', 'Preset Demonstrations')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {presets.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-agri-green bg-green-50/50 shadow-xs ring-2 ring-agri-green/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-agri-green text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {preset.icon}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-agri-green flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
                  )}
                </div>
                <h5 className="text-xs font-bold text-dark-forest">
                  {preset.name}
                </h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                  {preset.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Zone 2 Parameter Sliders */}
      <div className="pt-2 border-t border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {t('finetune_simulated_telemetry', 'Fine-Tune Simulated Telemetry (Zone 2)')}
          </span>
          <span className="text-[11px] text-gray-500">
            {t('realtime_update_dashboard', 'Real-time update across dashboard & graphs')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Soil Moisture Slider */}
          <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-600">{t('soil_moisture_label', 'Soil Moisture')}</span>
              <span className="font-black text-deep-green">{z2.currentReading.soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={z2.currentReading.soilMoisture}
              onChange={(e) => handleSliderChange('soilMoisture', +e.target.value)}
              className="w-full accent-agri-green h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>{t('dry_10', 'Dry (10%)')}</span>
              <span>{t('saturated_90', 'Saturated (90%)')}</span>
            </div>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-600">{t('canopy_temp_label', 'Canopy Temperature')}</span>
              <span className="font-black text-deep-green">{z2.currentReading.temperature}°C</span>
            </div>
            <input
              type="range"
              min="18"
              max="42"
              step="0.5"
              value={z2.currentReading.temperature}
              onChange={(e) => handleSliderChange('temperature', +e.target.value)}
              className="w-full accent-agri-green h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>{t('cool_18', 'Cool (18°C)')}</span>
              <span>{t('extreme_42', 'Extreme (42°C)')}</span>
            </div>
          </div>

          {/* Humidity Slider */}
          <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-600">{t('relative_humidity', 'Relative Humidity')}</span>
              <span className="font-black text-deep-green">{z2.currentReading.humidity}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={z2.currentReading.humidity}
              onChange={(e) => handleSliderChange('humidity', +e.target.value)}
              className="w-full accent-agri-green h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>{t('dry_30', 'Dry (30%)')}</span>
              <span>{t('humid_100', 'Humid (100%)')}</span>
            </div>
          </div>

          {/* Rainfall Slider */}
          <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-600">{t('recent_rainfall_label', 'Recent Rainfall')}</span>
              <span className="font-black text-deep-green">{z2.currentReading.rainfall} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={z2.currentReading.rainfall}
              onChange={(e) => handleSliderChange('rainfall', +e.target.value)}
              className="w-full accent-agri-green h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>0 mm</span>
              <span>50 mm (Heavy)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
