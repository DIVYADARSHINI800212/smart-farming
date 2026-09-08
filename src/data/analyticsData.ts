export interface AnalyticsMetricPoint {
  date: string;
  cropHealth: number;
  blastRisk: number;
  leafFolderRisk: number;
  soilMoistureZ1: number;
  soilMoistureZ2: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  waterUsageLiters: number;
  waterSavedLiters: number;
  treatmentEffectiveness: number;
}

export const ANALYTICS_DATA_7D: AnalyticsMetricPoint[] = [
  { date: 'Sep 03', cropHealth: 81, blastRisk: 45, leafFolderRisk: 55, soilMoistureZ1: 36, soilMoistureZ2: 48, temperature: 27, humidity: 72, rainfall: 0, waterUsageLiters: 1200, waterSavedLiters: 300, treatmentEffectiveness: 72 },
  { date: 'Sep 04', cropHealth: 82, blastRisk: 52, leafFolderRisk: 62, soilMoistureZ1: 34, soilMoistureZ2: 47, temperature: 28, humidity: 75, rainfall: 0, waterUsageLiters: 1100, waterSavedLiters: 350, treatmentEffectiveness: 75 },
  { date: 'Sep 05', cropHealth: 83, blastRisk: 68, leafFolderRisk: 70, soilMoistureZ1: 33, soilMoistureZ2: 46, temperature: 27, humidity: 80, rainfall: 1, waterUsageLiters: 900, waterSavedLiters: 420, treatmentEffectiveness: 78 },
  { date: 'Sep 06', cropHealth: 84, blastRisk: 75, leafFolderRisk: 74, soilMoistureZ1: 32, soilMoistureZ2: 45, temperature: 28, humidity: 82, rainfall: 3, waterUsageLiters: 800, waterSavedLiters: 480, treatmentEffectiveness: 82 },
  { date: 'Sep 07', cropHealth: 84, blastRisk: 82, leafFolderRisk: 78, soilMoistureZ1: 31, soilMoistureZ2: 45, temperature: 27, humidity: 85, rainfall: 2, waterUsageLiters: 750, waterSavedLiters: 520, treatmentEffectiveness: 85 },
  { date: 'Sep 08', cropHealth: 85, blastRisk: 78, leafFolderRisk: 72, soilMoistureZ1: 32, soilMoistureZ2: 46, temperature: 28, humidity: 83, rainfall: 0, waterUsageLiters: 850, waterSavedLiters: 500, treatmentEffectiveness: 88 },
  { date: 'Today', cropHealth: 85, blastRisk: 72, leafFolderRisk: 68, soilMoistureZ1: 32, soilMoistureZ2: 45, temperature: 27, humidity: 85, rainfall: 0, waterUsageLiters: 800, waterSavedLiters: 540, treatmentEffectiveness: 89 },
];

export const ANALYTICS_DATA_30D: AnalyticsMetricPoint[] = [
  { date: 'Week 1', cropHealth: 76, blastRisk: 25, leafFolderRisk: 30, soilMoistureZ1: 42, soilMoistureZ2: 50, temperature: 29, humidity: 68, rainfall: 12, waterUsageLiters: 8200, waterSavedLiters: 1800, treatmentEffectiveness: 65 },
  { date: 'Week 2', cropHealth: 79, blastRisk: 38, leafFolderRisk: 42, soilMoistureZ1: 38, soilMoistureZ2: 49, temperature: 28, humidity: 72, rainfall: 8, waterUsageLiters: 7600, waterSavedLiters: 2100, treatmentEffectiveness: 74 },
  { date: 'Week 3', cropHealth: 82, blastRisk: 62, leafFolderRisk: 58, soilMoistureZ1: 35, soilMoistureZ2: 46, temperature: 27, humidity: 80, rainfall: 15, waterUsageLiters: 6400, waterSavedLiters: 2800, treatmentEffectiveness: 82 },
  { date: 'Week 4', cropHealth: 84, blastRisk: 82, leafFolderRisk: 78, soilMoistureZ1: 32, soilMoistureZ2: 45, temperature: 27, humidity: 85, rainfall: 6, waterUsageLiters: 5900, waterSavedLiters: 3200, treatmentEffectiveness: 89 },
];

export const ANALYTICS_DATA_90D: AnalyticsMetricPoint[] = [
  { date: 'Month 1', cropHealth: 72, blastRisk: 18, leafFolderRisk: 22, soilMoistureZ1: 48, soilMoistureZ2: 52, temperature: 30, humidity: 64, rainfall: 45, waterUsageLiters: 28000, waterSavedLiters: 5200, treatmentEffectiveness: 60 },
  { date: 'Month 2', cropHealth: 78, blastRisk: 42, leafFolderRisk: 48, soilMoistureZ1: 39, soilMoistureZ2: 48, temperature: 28, humidity: 74, rainfall: 38, waterUsageLiters: 24500, waterSavedLiters: 7800, treatmentEffectiveness: 76 },
  { date: 'Month 3', cropHealth: 84, blastRisk: 76, leafFolderRisk: 72, soilMoistureZ1: 33, soilMoistureZ2: 45, temperature: 27, humidity: 82, rainfall: 22, waterUsageLiters: 21000, waterSavedLiters: 9800, treatmentEffectiveness: 89 },
];

export const ANALYTICS_DATA_SEASON: AnalyticsMetricPoint[] = [
  { date: 'Germination', cropHealth: 68, blastRisk: 10, leafFolderRisk: 15, soilMoistureZ1: 55, soilMoistureZ2: 55, temperature: 31, humidity: 62, rainfall: 60, waterUsageLiters: 32000, waterSavedLiters: 4000, treatmentEffectiveness: 55 },
  { date: 'Tillering', cropHealth: 76, blastRisk: 35, leafFolderRisk: 40, soilMoistureZ1: 38, soilMoistureZ2: 49, temperature: 29, humidity: 70, rainfall: 42, waterUsageLiters: 27000, waterSavedLiters: 8200, treatmentEffectiveness: 72 },
  { date: 'Panicle Init.', cropHealth: 84, blastRisk: 82, leafFolderRisk: 78, soilMoistureZ1: 32, soilMoistureZ2: 45, temperature: 27, humidity: 85, rainfall: 18, waterUsageLiters: 22000, waterSavedLiters: 11400, treatmentEffectiveness: 89 },
  { date: 'Flowering (Proj)', cropHealth: 86, blastRisk: 40, leafFolderRisk: 35, soilMoistureZ1: 45, soilMoistureZ2: 48, temperature: 26, humidity: 75, rainfall: 25, waterUsageLiters: 20000, waterSavedLiters: 13000, treatmentEffectiveness: 92 },
  { date: 'Harvest (Proj)', cropHealth: 88, blastRisk: 20, leafFolderRisk: 18, soilMoistureZ1: 40, soilMoistureZ2: 42, temperature: 28, humidity: 65, rainfall: 10, waterUsageLiters: 14000, waterSavedLiters: 15800, treatmentEffectiveness: 94 },
];
