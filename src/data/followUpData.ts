import { RecoveryProgressStep, TreatmentFollowUpLog } from '../types/phase4';

export const mockFollowUpLogs: TreatmentFollowUpLog[] = [
  {
    id: 'TF-2026-088',
    date: '2026-09-02 (7 Days Ago)',
    zone: 'Zone 1 — North Paddy Field',
    problem: 'Leaf Folder Infestation (78% initial)',
    treatment: 'Chlorantraniliprole 18.5% SC @ 60 ml/Ac',
    severityBefore: 65,
    severityAfter: 22,
    pestActivityBefore: 65,
    pestActivityAfter: 22,
    effectivenessScore: 82,
    effectivenessLabel: 'Highly Effective',
    status: 'Completed',
    notes: 'Significant mortality of leaf folder larvae; fresh foliage unfolding normally without webbed damage.',
  },
  {
    id: 'TF-2026-081',
    date: '2026-08-26 (14 Days Ago)',
    zone: 'Zone 2 — South Paddy Field',
    problem: 'Early Brown Spot Outbreak (Bipolaris oryzae)',
    treatment: 'Pseudomonas fluorescens 1.5% LF @ 1.0 L/Ac',
    severityBefore: 72,
    severityAfter: 38,
    pestActivityBefore: 30,
    pestActivityAfter: 15,
    effectivenessScore: 74,
    effectivenessLabel: 'Moderately Effective',
    status: 'Completed',
    notes: 'Lesion edges haloed and desiccated; secondary spread prevented during tillering.',
  },
  {
    id: 'TF-2026-074',
    date: '2026-08-14 (26 Days Ago)',
    zone: 'Zone 1 — North Paddy Field',
    problem: 'Bacterial Leaf Streak Suspicion',
    treatment: 'Copper Oxychloride + Agronomic Field Water Draining',
    severityBefore: 45,
    severityAfter: 12,
    pestActivityBefore: 10,
    pestActivityAfter: 5,
    effectivenessScore: 88,
    effectivenessLabel: 'Highly Effective',
    status: 'Completed',
    notes: 'Streak yellowing arrested completely following 4-day dry soil exposure.',
  },
];

export const mockRecoveryProgress: RecoveryProgressStep[] = [
  {
    day: 'Day 0',
    title: 'Treatment Application Executed',
    description: 'Foliar spray completed during low-wind morning window. Droplet adhesion verified across leaf blades.',
    symptomState: 'Active Lesions (Baseline 72%)',
    isPassed: true,
    isCurrent: false,
  },
  {
    day: 'Day 3',
    title: 'Early Physiological Response',
    description: 'Fungal mycelium growth arrested at margin borders. Melanin inhibition darkens lesion rings.',
    symptomState: 'Progression Halted (Severity ~55%)',
    isPassed: true,
    isCurrent: false,
  },
  {
    day: 'Day 7',
    title: 'Reduced Symptoms & Tissue Drying',
    description: 'Central ash sporulation completely desiccates into crisp brown scar tissue. No new lesion spread.',
    symptomState: 'Lesion Inactive (Severity 38%)',
    isPassed: true,
    isCurrent: true,
  },
  {
    day: 'Day 14',
    title: 'Full Canopy Recovery Assessment',
    description: 'New upper flag leaf expansion unaffected. Full photosynthetic canopy greenness restored.',
    symptomState: 'Target Resolved (Severity < 15%)',
    isPassed: false,
    isCurrent: false,
  },
];

export const mockSeverityComparisonData = [
  { metric: 'Disease Severity (%)', before: 72, after: 38, target: 15 },
  { metric: 'Pest Leaf Folding (%)', before: 65, after: 28, target: 10 },
  { metric: 'Infected Area (%)', before: 34, after: 14, target: 5 },
  { metric: 'Canopy Photosynthetic Index (0-100)', before: 52, after: 84, target: 90 },
];

export const mockRecoveryTimelineChart = [
  { day: 'Day 0', untreated: 72, treated: 72, benchmark: 72 },
  { day: 'Day 2', untreated: 78, treated: 62, benchmark: 65 },
  { day: 'Day 4', untreated: 84, treated: 50, benchmark: 52 },
  { day: 'Day 7', untreated: 90, treated: 38, benchmark: 35 },
  { day: 'Day 10', untreated: 94, treated: 24, benchmark: 22 },
  { day: 'Day 14', untreated: 98, treated: 14, benchmark: 12 },
];
