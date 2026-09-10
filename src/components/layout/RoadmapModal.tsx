import React from 'react';
import { X, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleName: string;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose, moduleName }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const moduleDescriptions: Record<string, { desc: string; features: string[] }> = {
    'Crop Health': {
      desc: 'Deep crop canopy vegetation index analysis using normalized multi-spectral sensors and farmer leaf captures.',
      features: ['NDVI-equivalent canopy index', 'Nitrogen deficiency detection', 'Chlorophyll degradation monitoring']
    },
    'AI Vision': {
      desc: 'Direct Edge AI camera feed and smartphone leaf macro-lens upload interface.',
      features: ['Real-time 320x320 crop ROI extraction', 'Blur & low-light rejection check', 'Quantized INT8 CNN model inference']
    },
    'Disease Detection': {
      desc: 'Specialized plant pathology diagnostic engine identifying leaf blast, brown spot, and bacterial sheath blight.',
      features: ['Blast spore germination index', 'Severity scoring (0-100%)', 'Heatmap symptom localization']
    },
    'Pest Detection': {
      desc: 'Lightweight object detection and trap count analytics for brown planthopper, leaf folder, and stem borer.',
      features: ['Adult moth count estimation', 'Egg mass density assessment', 'Economic threshold level (ETL) alerts']
    },
    'Smart Irrigation': {
      desc: 'Automated water balance calculations combining soil dielectric permittivity and upcoming 48-hour rain forecasts.',
      features: ['Root zone water potential tracking', 'Water savings calculator (target ≥15%)', 'Daily drip schedule calculator']
    },
    'Environmental Monitoring': {
      desc: 'Micro-climate telemetry aggregator across all deployed LoRa sensor nodes.',
      features: ['Vapor Pressure Deficit (VPD) curves', 'Leaf wetness duration hours', 'Soil temperature gradient']
    },
    'Weather Intelligence': {
      desc: 'Localized hyper-local agricultural weather forecasts and disease-conducive climate tracking.',
      features: ['Spray window suitability index', 'Rain probability timeline', 'Wind velocity drift warnings']
    },
    'Risk Assessment': {
      desc: 'Sensor + Vision fusion engine synthesizing environmental factors with CNN diagnosis.',
      features: ['Multi-criteria risk scoring', 'Calibrated confidence bands', 'Field vulnerability mapping']
    },
    'Farmer Advisory': {
      desc: 'Plain-language, local-language actionable agronomic prescriptions for smallholders.',
      features: ['Organic & biological alternatives', 'Certified dosage recommendations', 'Pre-harvest interval (PHI) alerts']
    },
    'Treatment': {
      desc: 'Comprehensive crop protection regimen planning with integrated safety precautions.',
      features: ['Active ingredient selection', 'Safe mixing protocols', 'Personal protective equipment checklist']
    },
    'Agricultural Inputs': {
      desc: 'Fungicide, pesticide, and bio-fertilizer inventory and registered product reference database.',
      features: ['CIBRC approved formulations', 'Dosage per hectare/acre', 'Product shelf-life monitoring']
    },
    'Product Availability': {
      desc: 'Hyper-local dealer network directory connecting farmers with nearby certified input suppliers.',
      features: ['Dealer distance & phone contact', 'Live stock verification check', 'Government subsidized price caps']
    },
    'Treatment Timing': {
      desc: 'Optimum spray window calculator aligning application time with wind speed, temperature, and rain.',
      features: ['No-spray rain warning windows', 'Beneficial pollinator protection hours', 'Evening vs morning efficacy rates']
    },
    'Treatment Cost': {
      desc: 'Financial input planning estimating total treatment expense per acre.',
      features: ['Input cost vs potential yield loss saved', 'FPO bulk purchasing discounts', 'Application labor estimates']
    },
    'Treatment Follow-Up': {
      desc: 'Post-application effectiveness tracking via follow-up leaf capture photography.',
      features: ['7-day symptom regression review', 'Resistance development warning', 'Next inspection reminder']
    },
    'Farm Analytics': {
      desc: 'Long-term historical telemetry trends, sensor correlations, and field performance indexes.',
      features: ['Season-long moisture deficit curves', 'Disease incidence frequency', 'Yield projection correlations']
    },
    'Yield Forecast': {
      desc: 'Predictive yield modeling based on cumulative growing degree days, water stress, and disease impact.',
      features: ['Expected quintals per acre', 'Stress-induced yield loss delta', 'Harvest window recommendation']
    },
    'Edge AI & Nodes': {
      desc: 'Hardware management interface for LoRa sensor nodes, gateway battery health, and mesh topology.',
      features: ['ESP32 LoRa signal SNR (-dBm)', 'Solar charging efficiency', 'Over-The-Air firmware updates']
    },
    'Reports': {
      desc: 'Automated executive summary generation for Agricultural Extension Officers and FPO admins.',
      features: ['PDF farm audit export', 'Kisan credit compliance records', 'Historical treatment logs']
    },
    'Settings': {
      desc: 'Farm profile, acreage configuration, notification thresholds, and regional language toggles.',
      features: ['Field boundary GIS editor', 'SMS/WhatsApp alert channels', 'Sensor calibration offsets']
    }
  };

  const details = moduleDescriptions[moduleName] || {
    desc: 'Advanced agricultural precision module scheduled for deployment in Phase 2.',
    features: ['Hardware telemetry integration', 'AI vision models', 'Field extension tools']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-forest/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-soft-green/50 overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-deep-green text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles className="h-5 w-5 text-soft-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{moduleName}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-agri-green px-2 py-0.5 rounded-full text-white">
                  Phase 2 Roadmap
                </span>
              </div>
              <p className="text-xs text-soft-green/90 mt-0.5">{t('sih_feature_spec', 'Smart India Hackathon Feature Specification')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 bg-cream/70 rounded-xl border border-[#E6F0EB] text-sm text-dark-forest">
            <p className="font-medium text-deep-green mb-1 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-agri-green" /> Architectural Scope
            </p>
            <p className="text-gray-600 text-xs leading-relaxed">{details.desc}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Planned Deliverables in Phase 2
            </h4>
            <div className="space-y-2">
              {details.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-dark-forest bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <ShieldCheck className="h-4 w-4 text-agri-green shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-xl border border-green-200/60 text-xs text-agri-green flex items-center justify-between">
            <span>{t('sih_phase1_status', 'Core Phase 1 features (Dashboard, Field Monitoring, Alerts) are currently active and ready for evaluation.')}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose} icon={<ArrowRight className="h-4 w-4" />}>
            Got it, Return to Phase 1
          </Button>
        </div>
      </div>
    </div>
  );
};
