import { PestRecord } from '../types';

export const mockPestResult: PestRecord = {
  pestName: 'Rice Leaf Folder',
  scientificName: 'Cnaphalocrocis medinalis (Guenée)',
  confidence: 78,
  severity: 'MEDIUM',
  affectedZone: 'Zone 1 — North Paddy Field',
  affectedAreaPercentage: 14,
  probabilities: [
    { label: 'Leaf Folder', percentage: 78 },
    { label: 'No Pest', percentage: 11 },
    { label: 'Stem Borer', percentage: 6 },
    { label: 'Planthopper', percentage: 5 },
  ],
  infestationLevel: 'Moderate (Approaching Economic Threshold Level)',
  trapCountPerAcre: 14,
  economicThresholdLevel: '10% damaged leaves at tillering stage or 1 adult moth / m²',
  interventions: {
    biological: 'Release egg parasitoid Trichogramma chilonis @ 50,000 / ha (2 to 3 releases at weekly intervals). Conserve predatory spiders (Lycosa pseudoannulata).',
    cultural: 'Avoid excessive application of urea nitrogen fertilizer. Maintain field sanitation and trim grassy bunds hosting alternative graminaceous weeds.',
    monitoring: 'Set up light traps and 4 pheromone traps per acre to monitor peak adult moth flight dynamics prior to oviposition.',
  },
};

export const mockPestPopulationTrend = [
  { day: 'Day -12', mothCountPerAcre: 3, etlThreshold: 10, damagedLeavesPct: 3 },
  { day: 'Day -9', mothCountPerAcre: 5, etlThreshold: 10, damagedLeavesPct: 5 },
  { day: 'Day -6', mothCountPerAcre: 8, etlThreshold: 10, damagedLeavesPct: 8 },
  { day: 'Day -3', mothCountPerAcre: 11, etlThreshold: 10, damagedLeavesPct: 11 },
  { day: 'Day 0 (Current)', mothCountPerAcre: 14, etlThreshold: 10, damagedLeavesPct: 14 },
  { day: 'Day +3 (Projected)', mothCountPerAcre: 16, etlThreshold: 10, damagedLeavesPct: 17 },
  { day: 'Day +7 (Target w/ IPM)', mothCountPerAcre: 4, etlThreshold: 10, damagedLeavesPct: 6 },
];

export const mockPestHistory = [
  {
    id: 'PH-052',
    date: '2026-09-08 11:30',
    zone: 'Zone 1 (North)',
    pest: 'Rice Leaf Folder',
    confidence: 78,
    severity: 'MEDIUM',
    count: '14 moths / acre',
    status: 'Monitoring Active',
  },
  {
    id: 'PH-048',
    date: '2026-08-28 09:15',
    zone: 'Zone 2 (South)',
    pest: 'Yellow Stem Borer (Scirpophaga)',
    confidence: 42,
    severity: 'LOW',
    count: '2 moths / acre',
    status: 'Below ETL (Resolved)',
  },
  {
    id: 'PH-039',
    date: '2026-08-15 17:00',
    zone: 'Zone 1 (North)',
    pest: 'Brown Planthopper (Nilaparvata)',
    confidence: 38,
    severity: 'LOW',
    count: '1 hopper / hill',
    status: 'Clean (Resolved)',
  },
];
