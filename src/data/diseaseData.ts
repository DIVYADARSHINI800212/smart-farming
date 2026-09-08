import { DiseaseRecord } from '../types';

export const mockDiseaseResult: DiseaseRecord = {
  diseaseName: 'Rice Leaf Blast',
  scientificName: 'Pyricularia oryzae (Magnaporthe oryzae)',
  confidence: 82,
  severity: 'HIGH',
  affectedZone: 'Zone 1 — North Paddy Field',
  affectedAreaPercentage: 18,
  probabilities: [
    { label: 'Blast', percentage: 82 },
    { label: 'Brown Spot', percentage: 8 },
    { label: 'Healthy', percentage: 6 },
    { label: 'Others', percentage: 4 },
  ],
  symptoms: [
    'Spindle/diamond-shaped lesions on lower and middle leaves',
    'Gray-white ash center with brown to dark reddish-brown margins',
    'Foliar coalescence leading to leaf tip desiccation and withering',
    'Sporulating fuzzy fungal velvety growth observed under high relative humidity',
  ],
  progressionStage: 'Active Tillering Lesion Phase (Pre-Panicle Emergence)',
  treatment: {
    chemical: {
      product: 'Tricyclazole 75% WP (Beam / Baan equivalent)',
      dosage: '120 grams in 200 Liters of water per acre',
      sprayWindow: 'Tomorrow morning 07:00 - 09:30 AM (Wind speed < 7 km/h, zero rain)',
    },
    biological: {
      product: 'Pseudomonas fluorescens (Liquid Formulation)',
      dosage: '1.0 kg / 1.0 Liter per acre in 200 Liters water',
      method: 'Foliar spray with sticky wetting agent at early symptom onset',
    },
    cultural: 'Avoid excess split applications of chemical nitrogen fertilizer. Drain field water slightly to reduce canopy humidity.',
  },
};

export const mockDiseaseProgressionTrend = [
  { day: 'Day -10', untreatedProgression: 4, withIntervention: 4, blastRiskIndex: 22 },
  { day: 'Day -6', untreatedProgression: 8, withIntervention: 8, blastRiskIndex: 45 },
  { day: 'Day -3', untreatedProgression: 12, withIntervention: 12, blastRiskIndex: 68 },
  { day: 'Day 0 (Current)', untreatedProgression: 18, withIntervention: 18, blastRiskIndex: 82 },
  { day: 'Day +3 (Projected)', untreatedProgression: 28, withIntervention: 14, blastRiskIndex: 65 },
  { day: 'Day +7 (Projected)', untreatedProgression: 44, withIntervention: 7, blastRiskIndex: 30 },
  { day: 'Day +14 (Projected)', untreatedProgression: 65, withIntervention: 2, blastRiskIndex: 12 },
];

export const mockDiseaseHistory = [
  {
    id: 'DH-104',
    date: '2026-09-08 14:15',
    zone: 'Zone 1 (North)',
    disease: 'Rice Leaf Blast',
    confidence: 82,
    severity: 'HIGH',
    area: '18% (0.41 Ac)',
    status: 'Action Pending',
  },
  {
    id: 'DH-098',
    date: '2026-09-02 10:20',
    zone: 'Zone 2 (South)',
    disease: 'Brown Spot (Bipolaris oryzae)',
    confidence: 68,
    severity: 'MEDIUM',
    area: '7% (0.17 Ac)',
    status: 'Treated (Resolved)',
  },
  {
    id: 'DH-084',
    date: '2026-08-24 16:10',
    zone: 'Zone 1 (North)',
    disease: 'Bacterial Leaf Blight (Suspicion)',
    confidence: 34,
    severity: 'LOW',
    area: '2% (0.05 Ac)',
    status: 'Dismissed (Nutrient)',
  },
];
