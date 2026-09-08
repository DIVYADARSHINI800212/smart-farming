import { CropGrowthMetric, NutrientIndicator } from '../types';

export const mockCropHealthSummary = {
  score: 86,
  status: 'Good Condition',
  stage: 'Vegetative (Active Tillering)',
  dayNumber: 42,
  totalDays: 120,
  healthyAreaPercentage: 82,
  affectedAreaPercentage: 18,
  totalAcres: 4.8,
  healthyAcres: 3.94,
  affectedAcres: 0.86,
  greennessIndex: 0.68, // DGCI 0-1
  textureEntropy: 1.42,
  canopyCoverPercentage: 74,
  averageHeightCm: 38.5,
  tillersPerHill: 16,
};

export const mockNutrientStatus: NutrientIndicator[] = [
  {
    nutrient: 'Nitrogen (N)',
    status: 'Deficient',
    percentage: 64,
    symptoms: 'Mild pale green coloration observed on older lower canopy leaves in Zone 1.',
    recommendation: 'Top-dress with Urea @ 25 kg/acre or apply 1% foliar spray of water-soluble N-P-K.',
  },
  {
    nutrient: 'Phosphorus (P)',
    status: 'Optimal',
    percentage: 88,
    symptoms: 'Robust root anchoring and vigorous basal tillering formation.',
    recommendation: 'Baseline basal application is sufficient; continue standard monitoring.',
  },
  {
    nutrient: 'Potassium (K)',
    status: 'Optimal',
    percentage: 85,
    symptoms: 'Strong culm erectness and healthy resistance to lodging.',
    recommendation: 'Maintain current regime; plan booster dose at panicle initiation stage.',
  },
  {
    nutrient: 'Zinc (Zn)',
    status: 'Borderline',
    percentage: 71,
    symptoms: 'Slight rusty discolored flecks visible along middle leaf midribs.',
    recommendation: 'Foliar spray of 0.5% Zinc Sulfate (ZnSO4) + 1% urea during early morning.',
  },
];

export const mockGrowthProgression: CropGrowthMetric[] = [
  { stageName: 'Seedling & Germination', dayNumber: 10, totalDays: 120, canopyCoverPercentage: 15, averageHeightCm: 12, tilleringCountPerHill: 2, greennessIndex: 0.52, textureEntropy: 0.8 },
  { stageName: 'Early Vegetative', dayNumber: 25, totalDays: 120, canopyCoverPercentage: 42, averageHeightCm: 24, tilleringCountPerHill: 8, greennessIndex: 0.62, textureEntropy: 1.1 },
  { stageName: 'Active Tillering (Current)', dayNumber: 42, totalDays: 120, canopyCoverPercentage: 74, averageHeightCm: 38.5, tilleringCountPerHill: 16, greennessIndex: 0.68, textureEntropy: 1.42 },
  { stageName: 'Panicle Initiation (Projected)', dayNumber: 65, totalDays: 120, canopyCoverPercentage: 88, averageHeightCm: 65, tilleringCountPerHill: 22, greennessIndex: 0.75, textureEntropy: 1.6 },
  { stageName: 'Heading & Flowering (Projected)', dayNumber: 85, totalDays: 120, canopyCoverPercentage: 94, averageHeightCm: 85, tilleringCountPerHill: 22, greennessIndex: 0.72, textureEntropy: 1.7 },
  { stageName: 'Ripening & Harvest (Projected)', dayNumber: 120, totalDays: 120, canopyCoverPercentage: 85, averageHeightCm: 90, tilleringCountPerHill: 22, greennessIndex: 0.45, textureEntropy: 1.3 },
];

export const mockHealthTrendHistorical = [
  { date: 'Week 1', currentSeason: 94, historicalAvg: 90, targetIndex: 85 },
  { date: 'Week 2', currentSeason: 92, historicalAvg: 89, targetIndex: 85 },
  { date: 'Week 3', currentSeason: 90, historicalAvg: 88, targetIndex: 85 },
  { date: 'Week 4', currentSeason: 88, historicalAvg: 86, targetIndex: 85 },
  { date: 'Week 5', currentSeason: 87, historicalAvg: 85, targetIndex: 85 },
  { date: 'Week 6 (Now)', currentSeason: 86, historicalAvg: 84, targetIndex: 85 },
];
