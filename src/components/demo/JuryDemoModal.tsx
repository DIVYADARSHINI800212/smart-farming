import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  Camera,
  Cpu,
  Microscope,
  Layers,
  AlertTriangle,
  UserCheck,
  CalendarClock,
  ClipboardCheck,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../ui/Button';

interface JuryDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  path: string;
  badge: string;
  description: string;
  techHighlight: string;
  icon: React.ReactNode;
  keyMetrics: { label: string; value: string }[];
}

const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Executive Farm Dashboard',
    subtitle: 'System Health & Priority Alert',
    path: '/',
    badge: 'Sense & Monitor',
    icon: <LayoutDashboard className="h-6 w-6 text-agri-green" />,
    description: 'The farmer or extension officer opens the platform. The dashboard instantly surfaces a 84/100 Farm Health Score and raises a critical Priority Action flagging Zone 2 under active fungal threat.',
    techHighlight: 'Live LoRa 868MHz sensor ingestion + dynamic risk aggregation across dual paddy zones.',
    keyMetrics: [
      { label: 'Farm Health', value: '84 / 100' },
      { label: 'Monitored Area', value: '4.8 Acres' },
      { label: 'Status', value: 'Priority Action in Z2' },
    ],
  },
  {
    stepNumber: 2,
    title: 'Zone 2 Spatial & Microclimate Telemetry',
    subtitle: 'High Humidity & Rain Inflow',
    path: '/field-monitoring',
    badge: 'Spatial GIS',
    icon: <ShieldAlert className="h-6 w-6 text-danger-red" />,
    description: 'Navigating to GIS Field Monitoring shows Zone 2 polygon highlighted in red. Soil moisture is 45%, canopy temp is 27°C, relative humidity is 85%, and recent rainfall is 2 mm — optimum condition for blast spore emergence.',
    techHighlight: 'Interactive Leaflet GIS with GPS node positioning and microclimate threshold evaluation.',
    keyMetrics: [
      { label: 'Relative Humidity', value: '85% (Critical)' },
      { label: 'Temperature', value: '27°C (Conducive)' },
      { label: 'Recent Rain', value: '2 mm' },
    ],
  },
  {
    stepNumber: 3,
    title: 'Farmer Leaf Image Ingestion',
    subtitle: 'Mobile Wi-Fi Capture Flow',
    path: '/ai-vision',
    badge: 'Edge Ingestion',
    icon: <Camera className="h-6 w-6 text-deep-green" />,
    description: 'The farmer photographs suspect rice leaves in Zone 2 using their smartphone. The image is securely uploaded to the Edge AI Gateway over local Wi-Fi without needing an internet connection.',
    techHighlight: 'Edge preprocessing: quality blur check, 320x320 resize, region-of-interest cropping, and tensor normalization.',
    keyMetrics: [
      { label: 'Image Quality', value: '94% Sharpness' },
      { label: 'Crop Region', value: 'Paddy Leaf Lamina' },
      { label: 'Connectivity', value: 'Offline Edge Wi-Fi' },
    ],
  },
  {
    stepNumber: 4,
    title: 'Edge AI Vision Inference',
    subtitle: 'On-Device Lightweight CNN',
    path: '/ai-vision',
    badge: 'On-Device AI',
    icon: <Cpu className="h-6 w-6 text-purple-600" />,
    description: 'The quantized MobileNetV2 and YOLOv8 models process the preprocessed leaf image entirely on the edge hardware (Raspberry Pi 4 / ESP32) in under 140ms.',
    techHighlight: 'INT8 quantized neural network inference with zero cloud round-trip latency.',
    keyMetrics: [
      { label: 'Inference Latency', value: '140 ms' },
      { label: 'Model Size', value: '4.2 MB (INT8)' },
      { label: 'Compute Engine', value: 'Edge Gateway' },
    ],
  },
  {
    stepNumber: 5,
    title: 'Disease Detection: Rice Blast (82%)',
    subtitle: 'Spindle-shaped Lesion Classification',
    path: '/disease-detection',
    badge: 'Disease AI',
    icon: <Microscope className="h-6 w-6 text-danger-red" />,
    description: 'The Disease AI engine confirms Rice Blast (Magnaporthe oryzae) with 82% confidence, 8% Brown Spot, and 6% Healthy tissue, with 18% of surveyed quad foliage affected.',
    techHighlight: 'Multi-class probability distribution with confidence calibration and severity stratification.',
    keyMetrics: [
      { label: 'Rice Blast', value: '82% Confidence' },
      { label: 'Affected Area', value: '18% of Zone 2' },
      { label: 'Severity Band', value: 'High' },
    ],
  },
  {
    stepNumber: 6,
    title: 'Multi-Modal Sensor + Vision Fusion',
    subtitle: 'Microclimate Calibration of Visual AI',
    path: '/risk-assessment',
    badge: 'Sensor Fusion',
    icon: <Layers className="h-6 w-6 text-warning-amber" />,
    description: 'The platform does not rely on photos alone. The Fusion Engine cross-references the 82% Blast visual detection with 85% humidity and 27°C canopy heat to validate true epidemiological risk.',
    techHighlight: 'Rule-calibrated fusion algorithm preventing false positives in dry or unfavorable ambient weather.',
    keyMetrics: [
      { label: 'Visual Score', value: '82% AI Confidence' },
      { label: 'Microclimate Favorability', value: '92% Conducive' },
      { label: 'Fused Risk Index', value: '88 / 100 (High)' },
    ],
  },
  {
    stepNumber: 7,
    title: 'Comprehensive Risk Assessment',
    subtitle: 'Holistic 5-Pillar Farm Threat Matrix',
    path: '/risk-assessment',
    badge: 'Risk Matrix',
    icon: <AlertTriangle className="h-6 w-6 text-danger-red" />,
    description: 'Surfaces the complete risk profile: Disease Risk (High), Pest Risk (Medium - 78% Leaf Folder), Water Stress (Low in Z2, Moderate in Z1), and Environmental Spore Viability.',
    techHighlight: 'Holistic risk matrix enabling prioritized farmer action before irreversible canopy defoliation occurs.',
    keyMetrics: [
      { label: 'Overall Risk', value: 'Medium-High' },
      { label: 'Disease Threat', value: 'High (Blast)' },
      { label: 'Pest Threat', value: 'Medium (Leaf Folder)' },
    ],
  },
  {
    stepNumber: 8,
    title: 'Actionable Farmer Advisory',
    subtitle: 'Plain-Language Agronomic Guidance',
    path: '/farmer-advisory',
    badge: 'Decision Support',
    icon: <UserCheck className="h-6 w-6 text-deep-green" />,
    description: 'Translates raw sensor telemetry and AI confidence into plain-language advice in Tamil, Hindi, or English. Instructs the farmer to inspect Zone 2 and prepare targeted fungicidal treatment.',
    techHighlight: 'Tri-lingual localized guidance aligned with regional agricultural university (TNAU / ICAR / KVK) recommendations.',
    keyMetrics: [
      { label: 'Recommended Action', value: 'Fungicidal Spray' },
      { label: 'Urgency', value: 'Within 24 Hours' },
      { label: 'Target Zone', value: 'Zone 2 South' },
    ],
  },
  {
    stepNumber: 9,
    title: 'Targeted Treatment Recommendation',
    subtitle: 'Active Ingredient, Dosage & Stockists',
    path: '/treatment-recommendation',
    badge: 'Prescription Protocol',
    icon: <ShieldAlert className="h-6 w-6 text-agri-green" />,
    description: 'Prescribes Tricyclazole 75% WP at 0.6 g/L (120 g per 200L knapsack tank for 2.5 acres). Links directly to verified nearby agricultural input stockists with live stock availability.',
    techHighlight: 'Evidence-based agronomic dosing engine with safe spray methodology and nearby dealer inventory directory.',
    keyMetrics: [
      { label: 'Active Chemical', value: 'Tricyclazole 75% WP' },
      { label: 'Dosage Rate', value: '0.6 g / Litre' },
      { label: 'Nearby Stockists', value: '3 In Stock (< 4.2 km)' },
    ],
  },
  {
    stepNumber: 10,
    title: 'Treatment Timing & Spray Weather Window',
    subtitle: 'Wind, Rainfast & Inversion Check',
    path: '/treatment-timing',
    badge: 'Weather Timing',
    icon: <CalendarClock className="h-6 w-6 text-blue-600" />,
    description: 'Checks micro-forecast conditions before the farmer sprays. Confirms low wind (11 km/h), rainfast threshold met (no rain for 14 hrs), recommending spraying today between 4:00 PM and 6:30 PM.',
    techHighlight: 'Weather-aware spray decision engine preventing costly wash-off chemical losses and spray drift.',
    keyMetrics: [
      { label: 'Optimal Window', value: '4:00 PM – 6:30 PM' },
      { label: 'Rainfast Safety', value: '14 hrs dry window' },
      { label: 'Wind Drift Risk', value: 'Minimal (11 km/h)' },
    ],
  },
  {
    stepNumber: 11,
    title: 'Follow-Up, Costing & Yield Protection',
    subtitle: 'Complete Loop: Sense to Monitor',
    path: '/treatment-follow-up',
    badge: 'Full Loop Closed',
    icon: <ClipboardCheck className="h-6 w-6 text-agri-green" />,
    description: 'Calculates total treatment expense (₹1,480 total / ₹592/acre). Sets up day 3 and day 7 post-treatment follow-up photo inspections to track canopy recovery and safeguard 4.8 tonnes expected yield.',
    techHighlight: 'Closed-loop precision agriculture: Sense → Analyze → Predict → Advise → Act → Monitor.',
    keyMetrics: [
      { label: 'Estimated Cost', value: '₹1,480 (Chemical+Labor)' },
      { label: 'Yield Safeguarded', value: '~0.4 Tonnes Protected' },
      { label: 'Follow-up Date', value: 'Day +3 & Day +7' },
    ],
  },
];

export const JuryDemoModal: React.FC<JuryDemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleJumpToScreen = () => {
    navigate(currentStep.path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-forest/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-deep-green via-[#1a4435] to-deep-green text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-soft-green/20 border border-soft-green/30 text-soft-green">
              <Sparkles className="h-5 w-5 text-soft-green animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-soft-green">
                  Smart India Hackathon (SIH) 2026
                </span>
                <span className="text-[10px] font-semibold bg-white/10 px-2 py-0.5 rounded-full">
                  Guided Jury Demo
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white mt-0.5">
                Sense → Analyze → Predict → Advise → Act → Monitor
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Exit Demo"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar & Step Dots */}
        <div className="bg-gray-50 border-b border-gray-200/60 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {DEMO_STEPS.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-7 bg-agri-green'
                    : idx < currentStepIndex
                    ? 'w-2 bg-agri-green/60'
                    : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
                title={`Step ${s.stepNumber}: ${s.title}`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-gray-500 shrink-0 ml-4">
            Step {currentStep.stepNumber} of {DEMO_STEPS.length}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-green-50 border border-green-100 shrink-0">
                {currentStep.icon}
              </div>
              <div>
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green border border-soft-green/50">
                  {currentStep.badge}
                </span>
                <h4 className="text-lg font-black text-deep-green tracking-tight mt-1">
                  {currentStep.title}
                </h4>
                <p className="text-xs font-semibold text-gray-500">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleJumpToScreen}
              icon={<ExternalLink className="h-3.5 w-3.5" />}
              className="shrink-0 text-xs text-agri-green border-agri-green/40 hover:bg-green-50"
            >
              Jump to Screen
            </Button>
          </div>

          {/* Core Story Description */}
          <div className="bg-cream/50 rounded-2xl p-4 border border-amber-100/60 text-xs text-dark-forest leading-relaxed space-y-2">
            <p className="font-medium text-gray-700">
              {currentStep.description}
            </p>
          </div>

          {/* Key Scenario Metrics */}
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Primary Scenario Telemetry Values
            </span>
            <div className="grid grid-cols-3 gap-3">
              {currentStep.keyMetrics.map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 font-medium block truncate">{m.label}</span>
                  <span className="text-xs font-black text-deep-green block mt-0.5 truncate">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Innovation Note */}
          <div className="bg-green-50/60 rounded-xl p-3.5 border border-green-100 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-agri-green shrink-0 mt-0.5" />
            <div className="text-[11px] text-deep-green leading-relaxed">
              <strong>SIH Innovation Architecture:</strong> {currentStep.techHighlight}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Exit Demo
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              icon={<ChevronLeft className="h-4 w-4" />}
              className="text-xs"
            >
              Previous
            </Button>

            {currentStepIndex < DEMO_STEPS.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                className="text-xs"
              >
                <span>Next Step</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleJumpToScreen}
                icon={<CheckCircle2 className="h-4 w-4" />}
                className="text-xs bg-agri-green"
              >
                Complete & Explore
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
