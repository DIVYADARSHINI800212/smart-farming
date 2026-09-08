import { VisionDetectionItem } from '../types';

export interface SampleImageOption {
  id: string;
  title: string;
  category: 'Disease' | 'Pest' | 'Healthy';
  defaultZone: string;
  description: string;
  thumbnailUrl: string;
  simulatedClass: string;
  simulatedConfidence: number;
  simulatedSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  probabilities: Array<{ label: string; percentage: number }>;
}

// Visual SVG Leaf illustrations for seamless offline test samples
const leafBlastSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23264E36"/><path d="M50 250 Q200 40 350 240 Q220 280 50 250 Z" fill="%234A7C59"/><ellipse cx="180" cy="150" rx="35" ry="14" fill="%238C5832" transform="rotate(-25 180 150)" stroke="%234A2E18" stroke-width="3"/><ellipse cx="180" cy="150" rx="20" ry="7" fill="%23D9CAB3" transform="rotate(-25 180 150)"/><ellipse cx="230" cy="170" rx="28" ry="11" fill="%238C5832" transform="rotate(-15 230 170)" stroke="%234A2E18" stroke-width="2"/><ellipse cx="230" cy="170" rx="15" ry="5" fill="%23D9CAB3" transform="rotate(-15 230 170)"/><text x="20" y="40" fill="white" font-family="sans-serif" font-size="14" font-weight="bold">SAMPLE: Rice Leaf Blast (Spindle Lesion)</text></svg>`;

const leafFolderSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%231E3F20"/><path d="M40 260 Q180 20 360 220 Q200 270 40 260 Z" fill="%23568259"/><path d="M140 110 Q200 130 250 170 L240 185 Q190 145 130 125 Z" fill="%23C2A649" stroke="%236B5B1E" stroke-width="2"/><line x1="140" y1="110" x2="250" y2="170" stroke="%23FFFFFF" stroke-dasharray="4" stroke-width="2"/><text x="20" y="40" fill="white" font-family="sans-serif" font-size="14" font-weight="bold">SAMPLE: Longitudinal Leaf Fold (Larval Silk)</text></svg>`;

const healthyLeafSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%2317381E"/><path d="M40 260 Q200 20 370 230 Q210 280 40 260 Z" fill="%23388E3C"/><path d="M40 260 Q200 80 370 230" stroke="%2381C784" stroke-width="4" fill="none"/><text x="20" y="40" fill="white" font-family="sans-serif" font-size="14" font-weight="bold">SAMPLE: Healthy Vigor Canopy Leaf</text></svg>`;

export const mockSampleImages: SampleImageOption[] = [
  {
    id: 'sample-blast',
    title: 'Rice Leaf Blast (Spindle Lesions)',
    category: 'Disease',
    defaultZone: 'zone-1',
    description: 'Characteristic diamond/spindle-shaped lesions with gray-white centers and brown necrotic margins.',
    thumbnailUrl: leafBlastSvg,
    simulatedClass: 'Blast (Pyricularia oryzae)',
    simulatedConfidence: 82,
    simulatedSeverity: 'HIGH',
    probabilities: [
      { label: 'Blast', percentage: 82 },
      { label: 'Brown Spot', percentage: 8 },
      { label: 'Healthy', percentage: 6 },
      { label: 'Others', percentage: 4 },
    ],
  },
  {
    id: 'sample-folder',
    title: 'Rice Leaf Folder (Longitudinal Webbing)',
    category: 'Pest',
    defaultZone: 'zone-1',
    description: 'Leaf blades folded longitudinally and fastened with silk threads; white transparent streak damage.',
    thumbnailUrl: leafFolderSvg,
    simulatedClass: 'Leaf Folder (Cnaphalocrocis medinalis)',
    simulatedConfidence: 78,
    simulatedSeverity: 'MEDIUM',
    probabilities: [
      { label: 'Leaf Folder', percentage: 78 },
      { label: 'No Pest', percentage: 11 },
      { label: 'Stem Borer', percentage: 6 },
      { label: 'Planthopper', percentage: 5 },
    ],
  },
  {
    id: 'sample-healthy',
    title: 'Healthy Paddy Canopy',
    category: 'Healthy',
    defaultZone: 'zone-2',
    description: 'Vigorous chlorophyll saturation, uniform cuticle texture, and zero pathogenic spotting.',
    thumbnailUrl: healthyLeafSvg,
    simulatedClass: 'Healthy Canopy (No Pathogen)',
    simulatedConfidence: 94,
    simulatedSeverity: 'LOW',
    probabilities: [
      { label: 'Healthy', percentage: 94 },
      { label: 'Others', percentage: 3 },
      { label: 'Brown Spot', percentage: 2 },
      { label: 'Blast', percentage: 1 },
    ],
  },
];

export const mockDetectionHistory: VisionDetectionItem[] = [
  {
    id: 'det-089',
    zoneId: 'zone-1',
    imageUrl: leafBlastSvg,
    timestamp: 'Today, 14:15',
    detectedClass: 'Blast (Pyricularia oryzae)',
    confidence: 82,
    severity: 'HIGH',
    affectedAreaPercentage: 18,
    targetCategory: 'Disease',
    preprocessingStatus: {
      resolutionCheck: true,
      sharpnessPassed: true,
      contrastNormalised: true,
      roiExtracted: true,
    },
  },
  {
    id: 'det-088',
    zoneId: 'zone-1',
    imageUrl: leafFolderSvg,
    timestamp: 'Today, 11:30',
    detectedClass: 'Leaf Folder (Cnaphalocrocis)',
    confidence: 78,
    severity: 'MEDIUM',
    affectedAreaPercentage: 14,
    targetCategory: 'Pest',
    preprocessingStatus: {
      resolutionCheck: true,
      sharpnessPassed: true,
      contrastNormalised: true,
      roiExtracted: true,
    },
  },
  {
    id: 'det-087',
    zoneId: 'zone-2',
    imageUrl: healthyLeafSvg,
    timestamp: 'Yesterday, 16:45',
    detectedClass: 'Healthy Canopy',
    confidence: 94,
    severity: 'LOW',
    affectedAreaPercentage: 0,
    targetCategory: 'Healthy',
    preprocessingStatus: {
      resolutionCheck: true,
      sharpnessPassed: true,
      contrastNormalised: true,
      roiExtracted: true,
    },
  },
];
