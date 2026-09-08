import { MultiFactorRisk } from '../types';

export const mockMultiFactorRisk: MultiFactorRisk = {
  overallRisk: 'Medium-High',
  overallScore: 72,
  diseaseRisk: 'High',
  diseaseScore: 82,
  pestRisk: 'Medium',
  pestScore: 78,
  waterStressRisk: 'Medium',
  waterStressScore: 68,
  heatStressRisk: 'Low',
  heatStressScore: 24,
  droughtRisk: 'Medium',
  droughtScore: 54,
  floodRisk: 'Low',
  floodScore: 18,
  environmentalRisk: 'Medium',
  environmentalScore: 62,
  yieldRisk: 'Medium',
  yieldScore: 58,
  riskFactors: [
    {
      factor: 'Rice Blast Spore Microclimate',
      impact: 'High',
      description: 'Zone 2 relative humidity (85%) and leaf surface wetness from 2mm rain elevate fungal infection velocity.',
      zone: 'Zone 2 (South)',
    },
    {
      factor: 'Leaf Folder Infestation Population',
      impact: 'Medium',
      description: 'Zone 1 moth counts at 14/acre surpass the 10% economic threshold during active tillering.',
      zone: 'Zone 1 (North)',
    },
    {
      factor: 'Soil Water Deficit Stress',
      impact: 'Medium',
      description: 'Zone 1 volumetric soil moisture has drifted to 32% (below 45% agronomic vegetative threshold).',
      zone: 'Zone 1 (North)',
    },
    {
      factor: 'Delayed Irrigation Risk',
      impact: 'Medium',
      description: 'Projected 48-hour moisture drop if scheduled 45-minute irrigation cycle is deferred.',
      zone: 'Zone 1 (North)',
    },
    {
      factor: 'Atmospheric Heat & Transpiration',
      impact: 'Low',
      description: 'Canopy temperature steady at 28°C; well within physiological tolerance band of 24°C - 32°C.',
      zone: 'Both Zones',
    },
  ],
};

export const mockRiskForecast7Days = [
  { day: 'Day 1 (Today)', overallRisk: 72, diseaseRisk: 82, pestRisk: 78, waterStress: 68 },
  { day: 'Day 2', overallRisk: 74, diseaseRisk: 85, pestRisk: 76, waterStress: 72 },
  { day: 'Day 3', overallRisk: 68, diseaseRisk: 75, pestRisk: 65, waterStress: 42 },
  { day: 'Day 4', overallRisk: 55, diseaseRisk: 58, pestRisk: 50, waterStress: 35 },
  { day: 'Day 5', overallRisk: 42, diseaseRisk: 40, pestRisk: 38, waterStress: 30 },
  { day: 'Day 6', overallRisk: 35, diseaseRisk: 30, pestRisk: 32, waterStress: 28 },
  { day: 'Day 7', overallRisk: 28, diseaseRisk: 22, pestRisk: 25, waterStress: 25 },
];
