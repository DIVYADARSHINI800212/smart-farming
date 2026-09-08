export interface YieldImpactFactor {
  factor: string;
  category: 'Disease' | 'Pest' | 'Water' | 'Weather' | 'Agronomy';
  impactTonnes: number; // positive or negative
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  recommendation: string;
}

export const MOCK_YIELD_FACTORS: YieldImpactFactor[] = [
  {
    factor: 'Rice Blast Spore Pressure (Zone 2)',
    category: 'Disease',
    impactTonnes: -0.42,
    riskLevel: 'High',
    description: 'Active spindle lesions in lower canopy reduce panicle grain filling efficiency if untreated.',
    recommendation: 'Targeted Tricyclazole spray preserves up to 0.38 tonnes from blast blight.',
  },
  {
    factor: 'Leaf Folder Foliar Damage (Zone 2)',
    category: 'Pest',
    impactTonnes: -0.18,
    riskLevel: 'Medium',
    description: 'Folded leaf clusters reduce photosynthetic solar interception by ~6% in affected quad.',
    recommendation: 'Biological or low-dose eco-chemical spray arrests secondary larval generation.',
  },
  {
    factor: 'Zone 1 Soil Moisture Tension Deficit',
    category: 'Water',
    impactTonnes: -0.15,
    riskLevel: 'Medium',
    description: 'Localized 32% moisture slows tillering node expansion during peak vegetative stage.',
    recommendation: '45-minute furrow irrigation restores soil water potential to optimal 55%.',
  },
  {
    factor: 'Favorable Daytime Canopy Temperatures (27–28°C)',
    category: 'Weather',
    impactTonnes: +0.25,
    riskLevel: 'Low',
    description: 'Consistent canopy temperatures avoid pollen sterility and maximize carbohydrate translocation.',
    recommendation: 'Maintain standing water level to sustain current canopy microclimate.',
  },
  {
    factor: 'Sensor-Guided Split Nitrogen Fertilizer Timing',
    category: 'Agronomy',
    impactTonnes: +0.20,
    riskLevel: 'Low',
    description: 'Sensor-driven urea application avoids excessive vegetative leaf softness and blast vulnerability.',
    recommendation: 'Follow recommended top-dressing schedule at panicle emergence.',
  },
];

export const MOCK_HISTORICAL_YIELDS = [
  { season: '2023 Kuruvai', actualTonnes: 4.2, targetTonnes: 4.5, diseaseIncidents: 4 },
  { season: '2024 Samba', actualTonnes: 4.4, targetTonnes: 4.6, diseaseIncidents: 2 },
  { season: '2025 Kuruvai', actualTonnes: 4.1, targetTonnes: 4.5, diseaseIncidents: 5 },
  { season: '2025 Samba', actualTonnes: 4.6, targetTonnes: 4.8, diseaseIncidents: 2 },
  { season: '2026 Current (Proj)', actualTonnes: 4.8, targetTonnes: 5.0, diseaseIncidents: 3 },
];
