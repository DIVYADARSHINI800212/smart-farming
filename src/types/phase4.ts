export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

export interface FarmSituationMetric {
  title: string;
  value: string;
  status: 'Optimal' | 'Caution' | 'Warning' | 'Critical' | 'Normal';
  score?: number;
  trend?: string;
  colorClass: string;
}

export interface FarmerAdvisoryData {
  zoneId: string;
  zoneName: string;
  crop: string;
  growthStage: string;
  lastAnalysisTime: string;
  situation: {
    cropHealth: number;
    diseaseRisk: string;
    pestRisk: string;
    waterStress: string;
    weatherRisk: string;
    overallRisk: string;
  };
  diagnosis: {
    primaryIssue: string;
    scientificName: string;
    confidence: number;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    affectedArea: string;
    symptoms: string[];
  };
  sensorEvidence: {
    temperature: number;
    humidity: number;
    soilMoisture: number;
    rainfall: number;
    explanation: {
      temperatureNote: string;
      humidityNote: string;
      moistureNote: string;
      rainfallNote: string;
    };
  };
  fusionWeights: {
    imageAiPercent: number;
    sensorDataPercent: number;
    weatherDataPercent: number;
    riskEnginePercent: number;
    fusionSummary: string;
  };
  actions: Array<{
    id: string;
    title: string;
    priority: PriorityLevel;
    description: string;
    timeframe: string;
    iconType: 'inspect' | 'treat' | 'irrigate' | 'monitor' | 'weather' | 'recheck';
  }>;
  timelineStages: Array<{
    stage: string;
    time: string;
    status: 'completed' | 'current' | 'upcoming';
    details: string;
  }>;
  farmerFriendlySummary: string;
}

export type TreatmentCategory = 'Chemical' | 'Biological' | 'Cultural' | 'IPM';

export interface TreatmentStrategyOption {
  id: string;
  category: TreatmentCategory;
  name: string;
  productName: string;
  activeIngredient: string;
  formulation: string;
  applicationMethod: string;
  applicationRate: string;
  frequency: string;
  treatmentDuration: string;
  efficacy: string;
  preHarvestIntervalDays: number;
  safetyRating: 'Standard Caution' | 'Low Toxicity' | 'Minimal Impact' | 'Preventive Only';
  advantages: string[];
  precautions: string[];
  estimatedCostPerAcre: number;
}

export interface TreatmentRecommendationData {
  zoneId: string;
  zoneName: string;
  detectedProblem: {
    disease: string;
    confidence: number;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    affectedArea: string;
    pathogenType: string;
  };
  managementPhases: {
    immediateAction: string;
    preventiveAction: string;
    monitoringAction: string;
    followUpAction: string;
  };
  primaryDemoTreatment: TreatmentStrategyOption;
  alternativeStrategies: TreatmentStrategyOption[];
  safetyChecklist: string[];
}

export type InputCategory = 
  | 'Fungicides'
  | 'Insecticides'
  | 'Biological Inputs'
  | 'Fertilizers'
  | 'Biofertilizers'
  | 'Soil Amendments'
  | 'Plant Growth Inputs';

export interface AgriculturalInputItem {
  id: string;
  name: string;
  category: InputCategory;
  activeIngredient: string;
  formulation: string;
  targetCrop: string;
  targetDiseaseOrPest: string;
  applicationMethod: string;
  labelDosage: string;
  safetyInfo: string;
  usageRestrictions: string;
  organicCertified: boolean;
  packSize: string;
  referencePrice: number;
}

export type StockStatus = 'In Stock' | 'Limited Stock' | 'Out of Stock' | 'Unknown';

export interface DealerProductItem {
  id: string;
  dealerName: string;
  dealerType: 'Cooperative FPO' | 'Authorized Agro Center' | 'Private Retailer';
  location: string;
  distanceKm: number;
  contactNumber: string;
  address: string;
  operatingHours: string;
  stockedProducts: Array<{
    inputName: string;
    category: InputCategory;
    activeIngredient: string;
    status: StockStatus;
    estimatedPriceInr: number;
    packSize: string;
  }>;
}

export interface TreatmentTimingWindow {
  date: string;
  timeWindow: string;
  suitabilityScore: number; // 0 - 100
  suitabilityStatus: 'Suitable' | 'Caution' | 'Not Suitable';
  temperature: { value: string; status: 'Suitable' | 'Marginal' | 'Unsuitable' };
  rainfall: { value: string; status: 'Low risk' | 'Moderate' | 'High' };
  wind: { value: string; status: 'Low' | 'Moderate' | 'High' };
  humidity: { value: string; status: 'Acceptable' | 'Marginal' | 'Unsuitable' };
  reason: string;
}

export interface TreatmentTimingData {
  zoneId: string;
  overallScore: number;
  overallStatus: 'Suitable' | 'Marginal' | 'Unsuitable';
  currentConditions: {
    temperature: number;
    humidity: number;
    rainProbability: number;
    expectedRainfallMm: number;
    windSpeedKmh: number;
    windDirection: string;
    condition: string;
  };
  factors: {
    temperatureStatus: string;
    rainfallRisk: string;
    windStatus: string;
    humidityStatus: string;
  };
  bestApplicationWindow: {
    day: string;
    time: string;
    recommendationNote: string;
  };
  warnings: string[];
  hourlyTimeline: TreatmentTimingWindow[];
}

export interface CostCalculatorInputs {
  farmAreaAcres: number;
  affectedAreaAcres: number;
  productUnitPrice: number;
  productQuantityPerAcre: number;
  labourCostPerAcre: number;
  applicationCostPerAcre: number;
}

export interface CostStrategyComparison {
  strategyName: string;
  category: TreatmentCategory;
  productCost: number;
  labourCost: number;
  applicationCost: number;
  totalCost: number;
  costPerAcre: number;
  costPerHectare: number;
  potentialCropSavings: number;
  roiEstimate: string;
}

export interface TreatmentFollowUpLog {
  id: string;
  date: string;
  zone: string;
  problem: string;
  treatment: string;
  severityBefore: number;
  severityAfter: number;
  pestActivityBefore?: number;
  pestActivityAfter?: number;
  effectivenessScore: number;
  effectivenessLabel: 'Highly Effective' | 'Moderately Effective' | 'Partial Response' | 'Under Observation';
  status: 'Completed' | 'Pending Review' | 'Second Spray Needed';
  notes: string;
}

export interface RecoveryProgressStep {
  day: string;
  title: string;
  description: string;
  symptomState: string;
  isPassed: boolean;
  isCurrent: boolean;
}
