import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface SearchItem {
  id: string;
  title: string;
  category: 'Pages' | 'Zones' | 'Diseases & Pests' | 'Intelligence' | 'Treatments';
  path: string;
  keywords: string[];
  description: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  { id: '1', title: 'Dashboard', category: 'Pages', path: '/', keywords: ['home', 'overview', 'summary', 'health score'], description: 'Farm overview, health score, priority actions and active telemetry' },
  { id: '2', title: 'Field Monitoring & Map', category: 'Pages', path: '/field-monitoring', keywords: ['map', 'gis', 'satellite', 'zones', 'nodes'], description: 'Interactive GIS map, GPS node telemetry and spatial zones' },
  { id: '3', title: 'Crop Health Index', category: 'Pages', path: '/crop-health', keywords: ['ndvi', 'vigor', 'canopy', 'stress'], description: 'Multi-spectral vegetation index, canopy density and chlorophyll analysis' },
  { id: '4', title: 'AI Vision Leaf Inspection', category: 'Pages', path: '/ai-vision', keywords: ['camera', 'image', 'capture', 'photo', 'upload'], description: 'Smartphone leaf capture, quality pre-check and edge CNN inference' },
  { id: '5', title: 'Disease Detection (Blast)', category: 'Diseases & Pests', path: '/disease-detection', keywords: ['blast', 'brown spot', 'sheath blight', 'fungal', 'spores'], description: 'CNN classification, 82% Blast identification with confidence breakdown' },
  { id: '6', title: 'Pest Detection (Leaf Folder)', category: 'Diseases & Pests', path: '/pest-detection', keywords: ['leaf folder', 'stem borer', 'planthopper', 'insects', 'trap'], description: 'YOLO pest identification, 78% Leaf Folder detection and severity' },
  { id: '7', title: 'Zone 1 — North Paddy Field', category: 'Zones', path: '/field-monitoring', keywords: ['zone 1', 'z1', 'north', 'moisture', 'water stress', '32%'], description: 'ADT 43 Rice, 2.3 Acres, 32% Soil Moisture (Water Stress detected)' },
  { id: '8', title: 'Zone 2 — South Paddy Field', category: 'Zones', path: '/field-monitoring', keywords: ['zone 2', 'z2', 'south', 'blast', 'humidity', '85%', '27c'], description: 'BPT 5204 Samba, 2.5 Acres, 85% Humidity, 82% Blast Risk' },
  { id: '9', title: 'Smart Irrigation', category: 'Intelligence', path: '/smart-irrigation', keywords: ['irrigation', 'water', 'pump', 'schedule', 'soil moisture', 'valve'], description: 'Crop water tension, automated irrigation window, water savings' },
  { id: '10', title: 'Environmental Monitoring', category: 'Intelligence', path: '/environmental-monitoring', keywords: ['temp', 'temperature', 'humidity', 'vpd', 'sensor'], description: 'Microclimate canopy sensors, ambient humidity, heat stress metrics' },
  { id: '11', title: 'Weather Intelligence', category: 'Intelligence', path: '/weather-intelligence', keywords: ['weather', 'forecast', 'rain', 'wind', 'spray window'], description: 'Multi-day micro-forecast, precipitation probability and spray suitability' },
  { id: '12', title: 'Risk Assessment Matrix', category: 'Intelligence', path: '/risk-assessment', keywords: ['risk', 'fusion', 'score', 'conducive', 'spore'], description: 'Calibrated Sensor + Image AI fusion risk engine' },
  { id: '13', title: 'Farmer Advisory Hub', category: 'Intelligence', path: '/farmer-advisory', keywords: ['advisory', 'recommendation', 'farmer', 'action', 'decision'], description: 'Plain-language actionable agronomic decision support' },
  { id: '14', title: 'Treatment Recommendation', category: 'Treatments', path: '/treatment-recommendation', keywords: ['treatment', 'tricyclazole', 'fungicide', 'dosage', 'chemical', 'organic'], description: 'Targeted protocol: Tricyclazole 75% WP @ 0.6g/L with safety guidance' },
  { id: '15', title: 'Agricultural Inputs', category: 'Treatments', path: '/agricultural-inputs', keywords: ['inputs', 'fertilizer', 'spray', 'formulation'], description: 'Approved agrochemical list, bio-pesticides and spray specifications' },
  { id: '16', title: 'Product Availability & Dealers', category: 'Treatments', path: '/product-availability', keywords: ['dealers', 'store', 'shop', 'stock', 'nearby', 'contact'], description: 'Nearby verified agricultural input stockists and availability' },
  { id: '17', title: 'Treatment Timing & Spray Window', category: 'Treatments', path: '/treatment-timing', keywords: ['timing', 'spray window', 'hours', 'rainfast', 'wind speed'], description: 'Real-time weather spray window evaluator and rainfast countdown' },
  { id: '18', title: 'Treatment Cost Estimator', category: 'Treatments', path: '/treatment-cost', keywords: ['cost', 'price', 'rupees', 'labor', 'expense', 'estimate'], description: 'Field chemical and labor expense calculation with ROI breakdown' },
  { id: '19', title: 'Treatment Follow-Up & Audit', category: 'Treatments', path: '/treatment-follow-up', keywords: ['follow up', 'recovery', 'log', 'inspection', 'history'], description: 'Post-treatment recovery timeline, photo log and canopy healing score' },
  { id: '20', title: 'Active Field Alerts', category: 'Pages', path: '/alerts', keywords: ['alerts', 'notifications', 'warnings', 'critical'], description: 'Consolidated, prioritized severity feed and resolution tracking' },
  { id: '21', title: 'Farm Analytics', category: 'Pages', path: '/farm-analytics', keywords: ['analytics', 'charts', 'trends', 'performance', 'history'], description: 'Recharts temporal trends, water savings, and treatment effectiveness' },
  { id: '22', title: 'Yield Risk Forecast', category: 'Pages', path: '/yield-forecast', keywords: ['yield', 'forecast', 'harvest', 'tonnes', 'loss', 'production'], description: 'Expected yield estimates, loss risk factors and seasonal projections' },
  { id: '23', title: 'Edge AI & Hardware Nodes', category: 'Pages', path: '/edge-nodes', keywords: ['edge', 'hardware', 'lora', 'nodes', 'esp32', 'rpi4', 'battery'], description: 'Node status, LoRa 868MHz packet telemetry and gateway compute load' },
  { id: '24', title: 'Farm Reports Engine', category: 'Pages', path: '/reports', keywords: ['reports', 'pdf', 'generate', 'export', 'summary'], description: '12 farm audit report cards with instant modal preview and download' },
  { id: '25', title: 'System Settings & Demo Controls', category: 'Pages', path: '/settings', keywords: ['settings', 'config', 'demo', 'presets', 'simulation'], description: 'Farm parameters, LoRa thresholds and interactive Demo Controls panel' },
];

export const GlobalSearch: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResults = query.trim() === '' ? [] : SEARCH_DATABASE.filter(item => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('search_placeholder', 'Search farm, zones, diseases...')}
          className="w-full pl-9 pr-8 py-1.5 bg-gray-50 hover:bg-gray-100 focus:bg-white text-xs text-dark-forest rounded-full border border-gray-200 focus:border-agri-green focus:outline-none focus:ring-2 focus:ring-agri-green/20 transition-all placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 p-0.5 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 min-w-[280px] bg-white rounded-2xl shadow-xl border border-gray-200 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>{t('search_matching_results', 'Matching Results')} ({filteredResults.length})</span>
            <span className="flex items-center gap-1"><CornerDownLeft className="h-2.5 w-2.5" /> {t('search_to_select', 'to select')}</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400">
              {t('search_no_results', 'No results for')} "{query}". {t('search_try_hint', 'Try "Zone 2", "Blast", "Reports", "Timing"...')}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-green-50/70 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-deep-green group-hover:text-agri-green">
                        {item.title}
                      </span>
                      <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-agri-green shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
