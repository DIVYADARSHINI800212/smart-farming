import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Save, 
  CheckCircle2, 
  Cpu, 
  Wifi, 
  Radio, 
  Bell, 
  Globe, 
  CloudSun, 
  Database, 
  ShieldCheck, 
  Layers, 
  Sprout, 
  MapPin,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { DemoControlsPanel } from '../components/demo/DemoControlsPanel';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';
import { useFarmData } from '../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const Settings: React.FC = () => {
  const farmData = useOutletContext<FarmDataContext>();
  const { language, setLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('demo');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Form State for Demo configuration
  const [farmName, setFarmName] = useState('Green Valley Precision Agro Unit');
  const [farmAcres, setFarmAcres] = useState('4.8');
  const [farmLocation, setFarmLocation] = useState('Thanjavur Basin, Tamil Nadu');
  const [paddyVariety, setPaddyVariety] = useState('BPT 5204 Samba Masuri');
  const [loraFrequency, setLoraFrequency] = useState('868.1 MHz (SF7/BW125)');
  const [syncInterval, setSyncInterval] = useState('5 mins');
  const [moistureAlertThreshold, setMoistureAlertThreshold] = useState('35');
  const [humidityAlertThreshold, setHumidityAlertThreshold] = useState('80');
  const [weatherApiSource, setWeatherApiSource] = useState('Simulated OpenWeatherMap API v3.0');
  const [enableSmsAlerts, setEnableSmsAlerts] = useState(true);
  const [enableSoundChime, setEnableSoundChime] = useState(true);
  const [advisoryProtocol, setAdvisoryProtocol] = useState('Integrated Pest Management (IPM - KVK)');

  const handleSave = (sectionName: string) => {
    setSaveSuccess(`Configuration for ${sectionName} saved locally for demo`);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const tabs = [
    { id: 'demo', label: t('tab_demo_controls', 'Demo Controls & Presets'), icon: <Sliders className="h-4 w-4" /> },
    { id: 'farm', label: t('tab_farm_settings', '1. Farm Settings'), icon: <MapPin className="h-4 w-4" /> },
    { id: 'field', label: t('tab_field_settings', '2. Field Settings'), icon: <Layers className="h-4 w-4" /> },
    { id: 'crop', label: t('tab_crop_settings', '3. Crop Settings'), icon: <Sprout className="h-4 w-4" /> },
    { id: 'node', label: t('tab_node_config', '4. Node Configuration'), icon: <Radio className="h-4 w-4" /> },
    { id: 'sensor', label: t('tab_sensor_calibration', '5. Sensor Calibration'), icon: <Cpu className="h-4 w-4" /> },
    { id: 'alert', label: t('tab_alert_thresholds', '6. Alert Thresholds'), icon: <Bell className="h-4 w-4" /> },
    { id: 'advisory', label: t('tab_advisory_rules', '7. Advisory Rules'), icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'weather', label: t('tab_weather_data_source', '8. Weather Data Source'), icon: <CloudSun className="h-4 w-4" /> },
    { id: 'sources', label: t('tab_data_storage_sync', '9. Data Storage & Sync'), icon: <Database className="h-4 w-4" /> },
    { id: 'language', label: t('tab_language_preferences', '10. Language Preferences'), icon: <Globe className="h-4 w-4" /> },
    { id: 'notifications', label: t('tab_notifications', '11. Notifications'), icon: <Bell className="h-4 w-4" /> },
    { id: 'system', label: t('tab_system_health', '12. System Health'), icon: <HardDrive className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gray-100 text-deep-green">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('settings_title', 'System Configuration & Platform Settings')}
              </h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                Frontend Sandbox
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('settings_subtitle', 'Manage field parameters, LoRa transceiver channels, sensor thresholds, and interactive SIH demo scenarios')}
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-agri-green animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <span>{saveSuccess}</span>
          </div>
        )}
      </div>

      {/* Main Settings Body: Left Navigation Tabs + Right Section Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#E6F0EB] p-3 shadow-xs space-y-1 h-fit">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {t('configuration_sections', 'Configuration Sections')}
          </div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-agri-green text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-dark-forest'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-gray-400'}>{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Section Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 0: DEMO CONTROLS (ALWAYS PROMINENT) */}
          {activeTab === 'demo' && (
            <DemoControlsPanel farmData={farmData} />
          )}

          {/* TAB 1: Farm Settings */}
          {activeTab === 'farm' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('farm_details_profile', '1. Farm Details & Owner Profile')}</h3>
                <p className="text-xs text-gray-500">{t('farm_details_desc', 'Physical address, geographic coordinates, and total surveyed acreage')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('farm_name_label', 'Farm Identification Name')}</label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-agri-green"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('total_monitored_acres', 'Total Monitored Acres')}</label>
                  <input
                    type="text"
                    value={farmAcres}
                    onChange={(e) => setFarmAcres(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-agri-green"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('regional_agro_climatic_zone', 'Regional Agro-Climatic Zone')}</label>
                  <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-agri-green"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('farm_details_profile', 'Farm Details'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_farm_settings', 'Save Farm Settings')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 2: Field Settings */}
          {activeTab === 'field' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('field_partition_soil', '2. Field Partitioning & Soil Classification')}</h3>
                <p className="text-xs text-gray-500">{t('field_partition_desc', 'Polygon boundaries and spatial division between Zone 1 and Zone 2')}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-deep-green block">{t('zone1_north_paddy_field', 'Zone 1 — North Paddy Field')}</span>
                    <span className="text-gray-500 text-[11px]">{t('zone1_soil_desc', '2.3 Acres • Clayey Loam • Alluvial Delta Soil')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-agri-green font-bold text-[10px]">{t('active_node_01', 'Active Node 01')}</span>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-deep-green block">{t('zone2_south_paddy_field', 'Zone 2 — South Paddy Field')}</span>
                    <span className="text-gray-500 text-[11px]">{t('zone2_soil_desc', '2.5 Acres • Deep Clay Soil • High Water Retention')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-agri-green font-bold text-[10px]">{t('active_node_02', 'Active Node 02')}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('field_partition_soil', 'Field Partitioning'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_field_settings', 'Save Field Settings')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 3: Crop Settings */}
          {activeTab === 'crop' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('crop_variety_pheno', '3. Crop Variety & Phenological Stage')}</h3>
                <p className="text-xs text-gray-500">{t('crop_variety_desc', 'Paddy cultivars, planting calendar, and expected harvest dates')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('primary_paddy_variety', 'Primary Paddy Variety')}</label>
                  <select
                    value={paddyVariety}
                    onChange={(e) => setPaddyVariety(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
                  >
                    <option value="BPT 5204 Samba Masuri">BPT 5204 Samba Masuri (Semi-dwarf)</option>
                    <option value="ADT 43 Rice">ADT 43 Rice (Short duration 110d)</option>
                    <option value="CO 51 Paddy">CO 51 Blast Resistant Variety</option>
                    <option value="CR 1009 Sub-1">CR 1009 Sub-1 (Flood tolerant)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('current_phenological_stage', 'Current Phenological Stage')}</label>
                  <input
                    type="text"
                    disabled
                    value={t('panicle_tillering_stage', 'Panicle Initiation / Active Tillering (Day 65)')}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-600"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('crop_variety_pheno', 'Crop Cultivars'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_crop_settings', 'Save Crop Settings')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 4: Node Configuration */}
          {activeTab === 'node' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('lora_node_gateway_net', '4. LoRa Field Node & Gateway Network')}</h3>
                <p className="text-xs text-gray-500">{t('lora_node_gateway_desc', 'Sub-GHz RF transmission channel, packet preamble, and sleep cycles')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('lora_wireless_freq', 'LoRa Wireless Frequency')}</label>
                  <select
                    value={loraFrequency}
                    onChange={(e) => setLoraFrequency(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="868.1 MHz (SF7/BW125)">868.1 MHz (India/EU Band - Spreading Factor 7)</option>
                    <option value="865.0 MHz (SF8/BW125)">865.0 MHz (Licensed Agro Frequency)</option>
                    <option value="433.0 MHz (Long Range)">433.0 MHz (Dense Foliage Penetration)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('telemetry_ping_interval', 'Telemetry Ping Interval')}</label>
                  <select
                    value={syncInterval}
                    onChange={(e) => setSyncInterval(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="1 min">1 Minute (Debug / Demo High Speed)</option>
                    <option value="5 mins">5 Minutes (Default Solar Optimized)</option>
                    <option value="15 mins">15 Minutes (Ultra Low Power Mode)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('lora_node_gateway_net', 'LoRa Node Configuration'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_node_settings', 'Save Node Settings')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 5: Sensor Calibration */}
          {activeTab === 'sensor' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('sensor_calib_offsets', '5. Hardware Sensor Calibration Offsets')}</h3>
                <p className="text-xs text-gray-500">{t('sensor_calib_desc', 'Capacitive soil probe calibration and DHT22 thermal trim values')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="font-bold text-deep-green block">{t('soil_moisture_probe', 'Soil Moisture Probe')}</span>
                  <span className="text-gray-500 text-[11px] block">Offset: 0.0% • 3.3V ADC</span>
                  <span className="text-agri-green font-bold">{t('calibrated_air_water', 'Calibrated (Air/Water)')}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="font-bold text-deep-green block">{t('temperature_sensor_label', 'Temperature Sensor')}</span>
                  <span className="text-gray-500 text-[11px] block">Offset: +0.2°C trimmed</span>
                  <span className="text-agri-green font-bold">{t('nist_reference_aligned', 'NIST Reference Aligned')}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="font-bold text-deep-green block">{t('rain_tipping_gauge', 'Rain Tipping Gauge')}</span>
                  <span className="text-gray-500 text-[11px] block">Bucket: 0.2mm per tip</span>
                  <span className="text-agri-green font-bold">{t('hardware_pulse_counted', 'Hardware Pulse Counted')}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('sensor_calib_offsets', 'Sensor Calibration'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_calibration', 'Save Calibration')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 6: Alert Thresholds */}
          {activeTab === 'alert' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('alert_thresholds_triggers', '6. Alert Thresholds & Critical Triggers')}</h3>
                <p className="text-xs text-gray-500">{t('alert_thresholds_desc', 'Automated rules that raise high-priority dashboard banners and alerts')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">
                    {t('water_stress_trigger', 'Water Stress Trigger (Moisture < %)')}
                  </label>
                  <input
                    type="number"
                    value={moistureAlertThreshold}
                    onChange={(e) => setMoistureAlertThreshold(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Default: 35% trigger for tillering stage</span>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">
                    {t('disease_humidity_trigger', 'Disease Favorable Humidity Trigger (> %)')}
                  </label>
                  <input
                    type="number"
                    value={humidityAlertThreshold}
                    onChange={(e) => setHumidityAlertThreshold(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Default: 80% triggers blast spore spore check</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('alert_thresholds_triggers', 'Alert Thresholds'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_thresholds', 'Save Thresholds')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 7: Advisory Rules */}
          {activeTab === 'advisory' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('farmer_advisory_engine_rules', '7. Farmer Advisory Decision Engine Rules')}</h3>
                <p className="text-xs text-gray-500">{t('farmer_advisory_rules_desc', 'Guideline framework for treatment recommendations and dosage calculations')}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">{t('prescription_philosophy', 'Prescription Philosophy')}</label>
                <select
                  value={advisoryProtocol}
                  onChange={(e) => setAdvisoryProtocol(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                >
                  <option value="Integrated Pest Management (IPM - KVK)">Integrated Pest Management (IPM - ICAR / KVK Standard)</option>
                  <option value="Certified Organic Protocol">Certified Organic Only (Bio-fungicides & Neem Extracts)</option>
                  <option value="Maximum Rapid Curative (Chemical Priority)">Maximum Rapid Curative (Chemical Fungicide Priority)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('farmer_advisory_engine_rules', 'Advisory Rules'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_advisory_rules', 'Save Advisory Rules')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 8: Weather API */}
          {activeTab === 'weather' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('weather_api_endpoint', '8. Weather API & Meteorological Endpoint')}</h3>
                <p className="text-xs text-gray-500">{t('weather_api_desc', 'Forecast feed integration for spray windows and rainfast verification')}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">{t('weather_ingestion_provider', 'Weather Ingestion Provider')}</label>
                  <input
                    type="text"
                    value={weatherApiSource}
                    onChange={(e) => setWeatherApiSource(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50"
                  />
                </div>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-900">
                  <span>Forecast status: <strong>{t('live_synthetic_sandbox', 'Live Synthetic Sandbox (Hourly micro-updates enabled)')}</strong></span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('weather_api_endpoint', 'Weather API'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_weather_api', 'Save Weather API')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 9: Data Storage & Sync */}
          {activeTab === 'sources' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('data_persistence_sync', '9. Data Persistence & Cloud Sync')}</h3>
                <p className="text-xs text-gray-500">{t('data_persistence_desc', 'Offline-first local SQLite buffering on gateway with batch cloud replication')}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-deep-green block">{t('local_edge_database', 'Local Edge Database')}</span>
                    <span className="text-gray-500 text-[11px]">SQLite v3.42 • 14.2 GB Free • 0ms local query latency</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-agri-green font-bold text-[10px]">{t('status_operational', 'Operational')}</span>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-deep-green block">{t('cloud_sync_label', 'Best-Effort Cloud Synchronization')}</span>
                    <span className="text-gray-500 text-[11px]">HTTPS REST / MQTT • Batch Sync on Cellular Wi-Fi available</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">{t('queued_0_pending', 'Queued (0 pending)')}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('data_persistence_sync', 'Data Storage'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_storage', 'Save Storage Settings')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 10: Language Preferences */}
          {activeTab === 'language' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('tab_language', '10. Localized Language Settings')}</h3>
                <p className="text-xs text-gray-500">{t('language_tab_desc', 'Switch farmer interface across English, Tamil, and Hindi')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { code: 'EN' as SupportedLanguage, name: 'English', sub: t('language_en_desc', 'Default Agronomic Terminology') },
                  { code: 'TA' as SupportedLanguage, name: 'தமிழ் (Tamil)', sub: t('language_ta_desc', 'தமிழ்நாடு விவசாய வழிகாட்டி') },
                  { code: 'HI' as SupportedLanguage, name: 'हिन्दी (Hindi)', sub: t('language_hi_desc', 'किसान परामर्श व सटीक खेती') },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      handleSave(`Language switched to ${l.name}`);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      language.toUpperCase() === l.code
                        ? 'border-agri-green bg-green-50/50 shadow-xs ring-2 ring-agri-green/20'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-deep-green block">{l.name}</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">{l.sub}</span>
                    {language.toUpperCase() === l.code && (
                      <span className="text-[10px] font-bold text-agri-green mt-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {t('active', 'Active')}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                <p className="font-semibold">{t('instant_switch_note', 'Changes take effect immediately across all screens and widgets.')}</p>
              </div>
            </div>
          )}

          {/* TAB 11: Notification Preferences */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('notification_audio_chimes', '11. Notification & Audio Chimes')}</h3>
                <p className="text-xs text-gray-500">{t('notification_audio_desc', 'Channel routing for critical pest and disease threshold breaches')}</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSmsAlerts}
                    onChange={(e) => setEnableSmsAlerts(e.target.checked)}
                    className="accent-agri-green h-4 w-4 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-dark-forest block">{t('simulated_sms_alerts', 'Simulated SMS & WhatsApp Alerts')}</span>
                    <span className="text-[11px] text-gray-500">{t('dispatch_push_alerts', 'Dispatch push alerts to registered farmer phone (+91 9840X XXXXX)')}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSoundChime}
                    onChange={(e) => setEnableSoundChime(e.target.checked)}
                    className="accent-agri-green h-4 w-4 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-dark-forest block">{t('audible_alert_chime', 'Audible High-Severity Alert Chime')}</span>
                    <span className="text-[11px] text-gray-500">{t('sound_tone_80', 'Sound tone when disease risk exceeds 80%')}</span>
                  </div>
                </label>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => handleSave(t('notification_audio_chimes', 'Notification Preferences'))} icon={<Save className="h-3.5 w-3.5" />}>
                  {t('btn_save_preferences', 'Save Preferences')}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 12: System Health */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-deep-green">{t('edge_system_health_audit', '12. Edge Gateway System Health Audit')}</h3>
                <p className="text-xs text-gray-500">{t('edge_health_desc', 'Hardware thermals, CPU load, memory utilization, and uptime')}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">{t('cpu_load_label', 'CPU Load')}</span>
                  <span className="text-base font-black text-deep-green mt-1 block">18% (Quad-Core)</span>
                  <span className="text-[10px] text-agri-green font-semibold">{t('status_nominal', 'Nominal')}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">{t('ram_usage_label', 'RAM Usage')}</span>
                  <span className="text-base font-black text-deep-green mt-1 block">1.2 / 4.0 GB</span>
                  <span className="text-[10px] text-agri-green font-semibold">70% Free</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">{t('gateway_temp_label', 'Gateway Temp')}</span>
                  <span className="text-base font-black text-deep-green mt-1 block">41.2°C</span>
                  <span className="text-[10px] text-agri-green font-semibold">{t('passive_cooled', 'Passive Cooled')}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">{t('system_uptime_label', 'System Uptime')}</span>
                  <span className="text-base font-black text-deep-green mt-1 block">99.8%</span>
                  <span className="text-[10px] text-agri-green font-semibold">18 Days Active</span>
                </div>
              </div>

              <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 text-xs text-deep-green flex items-center justify-between">
                <span>{t('system_status_label', 'System Status')}: <strong>{t('operational_sih_ready', 'Operational (SIH Prototype Ready)')}</strong></span>
                <span className="text-gray-400 text-[11px]">Firmware v2.4.1-edge-int8</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
