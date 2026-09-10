export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertCategory = 
  | 'Disease' 
  | 'Pest' 
  | 'Irrigation' 
  | 'Weather' 
  | 'Heat Stress' 
  | 'Flood' 
  | 'Drought';

export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: SeverityLevel;
  category: AlertCategory;
  zoneId: string;
  zoneName: string;
  timestamp: string;
  status: AlertStatus;
  recommendedAction: string;
  metricImpact?: string;
}

export interface SensorReading {
  soilMoisture: number;      // %
  temperature: number;       // °C
  humidity: number;          // %
  rainfall: number;          // mm
  waterLevel?: number;       // cm
  timestamp: string;
}

export interface SensorNode {
  nodeId: string;
  name: string;
  zoneId: string;
  zoneName: string;
  status: 'Online' | 'Offline' | 'Warning';
  batteryPercentage: number;
  signalStrengthDbm: number; // e.g. -68 dBm
  lastSeen: string;
  sensorHealth: {
    soilMoistureSensor: 'Active' | 'Fault' | 'Calibrating';
    tempHumiditySensor: 'Active' | 'Fault' | 'Calibrating';
    rainSensor: 'Active' | 'Fault' | 'Calibrating';
    loraTransceiver: 'Active' | 'Fault' | 'Calibrating';
  };
  coordinates: [number, number]; // [lat, lng]
}

export interface DiseaseProbability {
  label: 'Blast' | 'Brown Spot' | 'Healthy' | 'Others';
  percentage: number;
}

export interface PestProbability {
  label: 'Leaf Folder' | 'Stem Borer' | 'Planthopper' | 'No Pest';
  percentage: number;
}

export interface Zone {
  zoneId: string;
  name: string;
  cropType: string;
  growthStage: string;
  areaAcres: number;
  status: 'Healthy' | 'Water Stress' | 'Disease Risk' | 'Pest Infestation';
  currentReading: SensorReading;
  diseaseDistribution: DiseaseProbability[];
  pestDistribution: PestProbability[];
  riskScore: number; // 0 - 100
  affectedAreaPercentage: number;
  bounds: [number, number][]; // Polygon coordinates [[lat, lng], ...]
  nodeId: string;
}

export interface FarmOverview {
  farmId: string;
  name: string;
  location: string;
  totalAcres: number;
  healthScore: number; // 0 - 100
  cropHealthStatus: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  edgeGateway: {
    name: string;
    model: string;
    status: 'Online' | 'Syncing' | 'Offline';
    lastSync: string;
    firmwareVersion: string;
    loraFrequency: string;
    activeNodes: number;
    queuedEvents: number;
  };
  weatherSummary: {
    temperature: number;
    condition: string;
    humidity: number;
    windKmh: number;
    rainProbability: number;
    forecast: string;
  };
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Irrigation' | 'Treatment' | 'Inspection' | 'Prevention';
  zoneId: string;
  zoneName: string;
  urgency: 'Immediate' | 'Today' | 'Within 48h';
  description: string;
  recommendedDosage?: string;
  potentialBenefit: string;
}

export interface TrendDataPoint {
  time: string;
  cropHealth: number;
  zone1Moisture: number;
  zone2Moisture: number;
  optimalMin: number;
  optimalMax: number;
  temperature: number;
  humidity: number;
}

/* =========================================================================
   PHASE 2 TYPES: AI & CROP INTELLIGENCE
   ========================================================================= */

export type NutrientStatus = 'Deficient' | 'Borderline' | 'Optimal' | 'Excess';

export interface NutrientIndicator {
  nutrient: 'Nitrogen (N)' | 'Phosphorus (P)' | 'Potassium (K)' | 'Zinc (Zn)' | 'Iron (Fe)' | 'Sulfur (S)';
  status: NutrientStatus;
  percentage: number;
  symptoms: string;
  recommendation: string;
}

export interface CropGrowthMetric {
  stageName: string;
  dayNumber: number;
  totalDays: number;
  canopyCoverPercentage: number;
  averageHeightCm: number;
  tilleringCountPerHill: number;
  greennessIndex: number; // DGCI (0 - 1)
  textureEntropy: number; // Texture irregularity
}

export interface VisionDetectionItem {
  id: string;
  zoneId: string;
  imageUrl: string;
  timestamp: string;
  detectedClass: string;
  confidence: number;
  severity: SeverityLevel;
  affectedAreaPercentage: number;
  targetCategory: 'Disease' | 'Pest' | 'Healthy';
  preprocessingStatus: {
    resolutionCheck: boolean;
    sharpnessPassed: boolean;
    contrastNormalised: boolean;
    roiExtracted: boolean;
  };
}

export interface DiseaseRecord {
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: SeverityLevel;
  affectedZone: string;
  affectedAreaPercentage: number;
  probabilities: Array<{ label: string; percentage: number }>;
  symptoms: string[];
  progressionStage: string;
  treatment: {
    chemical: {
      product: string;
      dosage: string;
      sprayWindow: string;
    };
    biological: {
      product: string;
      dosage: string;
      method: string;
    };
    cultural: string;
  };
}

export interface PestRecord {
  pestName: string;
  scientificName: string;
  confidence: number;
  severity: SeverityLevel;
  affectedZone: string;
  affectedAreaPercentage: number;
  probabilities: Array<{ label: string; percentage: number }>;
  infestationLevel: string;
  trapCountPerAcre: number;
  economicThresholdLevel: string;
  interventions: {
    biological: string;
    cultural: string;
    monitoring: string;
  };
}

export type RiskLevel = 'Low' | 'Medium' | 'Medium-High' | 'High' | 'Critical';

export interface MultiFactorRisk {
  overallRisk: RiskLevel;
  overallScore: number; // 0 - 100
  diseaseRisk: RiskLevel;
  diseaseScore: number;
  pestRisk: RiskLevel;
  pestScore: number;
  waterStressRisk: RiskLevel;
  waterStressScore: number;
  heatStressRisk: RiskLevel;
  heatStressScore: number;
  droughtRisk: RiskLevel;
  droughtScore: number;
  floodRisk: RiskLevel;
  floodScore: number;
  environmentalRisk: RiskLevel;
  environmentalScore: number;
  yieldRisk: RiskLevel;
  yieldScore: number;
  riskFactors: Array<{
    factor: string;
    impact: 'High' | 'Medium' | 'Low';
    description: string;
    zone: string;
  }>;
}

/* =========================================================================
   PHASE 3 TYPES: SMART IRRIGATION, ENVIRONMENT, WEATHER, EDGE NODES
   ========================================================================= */

export interface IrrigationLog {
  id: string;
  date: string;
  zone: string;
  durationMinutes: number;
  waterVolumeLiters: number;
  startingMoisture: number;
  endingMoisture: number;
  waterSavedVsFlood: number; // %
  method: 'Precision Drip' | 'Automated Furrow' | 'Sub-surface';
  status: 'Completed' | 'Interrupted';
}

export interface SoilWaterBudget {
  zoneId: string;
  currentMoisture: number;
  wiltingPoint: number; // e.g. 20%
  fieldCapacity: number; // e.g. 60%
  depletionPercentage: number;
  soilTemperature: number;
  waterRequirementMm: number;
  recommendedDurationMins: number;
  recommendedTime: string;
  overIrrigationRisk: 'Low' | 'Medium' | 'High';
}

export interface MicroclimateMetrics {
  airTemperature: number;
  soilTemperature: number;
  relativeHumidity: number;
  rainfall24h: number;
  windSpeedKmh: number;
  windDirection: string;
  vpdKpa: number; // Vapor Pressure Deficit in kPa
  vpdStatus: 'Low Transpiration' | 'Optimal' | 'High Evaporative Stress';
  leafWetnessHours: number;
  leafWetnessRisk: 'Low' | 'Moderate' | 'High (Blast Sporulation Risk)';
  heatStressIndex: 'Low' | 'Moderate' | 'High';
  humidityStressIndex: 'Low' | 'Moderate' | 'High';
}

export interface HourlyForecastItem {
  time: string;
  temp: number;
  humidity: number;
  rainProb: number;
  condition: string;
  icon: string;
}

export interface DailyForecastItem {
  day: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  rainProb: number;
  expectedRainMm: number;
  windSpeed: number;
}

export interface SprayWindowSuitability {
  date: string;
  timeWindow: string;
  temperatureStatus: 'Suitable' | 'Marginal' | 'Unsuitable';
  tempValue: string;
  windStatus: 'Low' | 'Moderate' | 'High';
  windValue: string;
  rainfallRisk: 'Low' | 'Moderate' | 'High';
  rainProbValue: string;
  humidityStatus: 'Suitable' | 'Marginal' | 'Unsuitable';
  humidityValue: string;
  overallStatus: 'GOOD APPLICATION WINDOW' | 'MARGINAL WINDOW' | 'NO-SPRAY WINDOW';
  notes: string;
}

export interface EdgeGatewayDiagnostics {
  gatewayId: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'SYNCING';
  processingLatencyMs: number;
  cpuLoadPercentage: number;
  cpuTemperature: number;
  memoryUsageMb: number;
  totalMemoryMb: number;
  emmcStorageUsedGb: number;
  emmcStorageTotalGb: number;
  sqliteBufferedPackets: number;
  sqliteCachedImages: number;
  uptimeHours: number;
  connectedNodesCount: number;
  offlineNodesCount: number;
}

export interface NodeHardwareDetail {
  nodeId: string;
  name: string;
  zoneName: string;
  status: 'Connected' | 'Warning' | 'Offline';
  batteryPercentage: number;
  solarCharging: boolean;
  signalStrengthDbm: number;
  packetDeliveryRate: number; // e.g. 99.4%
  lastSyncAgo: string;
  firmwareVersion: string;
  loraFrequency: string;
  sensorHealth: {
    capacitiveMoisture: 'Active' | 'Fault';
    dht22TempHumid: 'Active' | 'Fault';
    tippingRain: 'Active' | 'Fault';
    loraModule: 'Active' | 'Fault';
  };
}

export interface EdgeModelSpec {
  modelName: string;
  format: string;
  modelSizeMb: number;
  inferenceTimeMs: number;
  accuracyPct: number;
  inputShape: string;
  acceleration: string;
}
