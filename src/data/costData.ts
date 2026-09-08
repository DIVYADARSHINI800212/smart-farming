import { CostCalculatorInputs, CostStrategyComparison } from '../types/phase4';

export const mockDefaultCostInputsZone1: CostCalculatorInputs = {
  farmAreaAcres: 2.3,
  affectedAreaAcres: 0.41,
  productUnitPrice: 420, // Price for 120g pack
  productQuantityPerAcre: 1, // 1 pack of 120g per acre
  labourCostPerAcre: 350,
  applicationCostPerAcre: 150,
};

export const mockDefaultCostInputsZone2: CostCalculatorInputs = {
  farmAreaAcres: 2.5,
  affectedAreaAcres: 0.85,
  productUnitPrice: 420,
  productQuantityPerAcre: 1,
  labourCostPerAcre: 350,
  applicationCostPerAcre: 150,
};

export const mockStrategyComparisons: CostStrategyComparison[] = [
  {
    strategyName: 'Option A: Chemical Management (Tricyclazole 75% WP)',
    category: 'Chemical',
    productCost: 420,
    labourCost: 350,
    applicationCost: 150,
    totalCost: 920,
    costPerAcre: 920,
    costPerHectare: 2273,
    potentialCropSavings: 8500,
    roiEstimate: '9.2x Yield Value Protected',
  },
  {
    strategyName: 'Option B: Biological Management (Pseudomonas Bio-Shield)',
    category: 'Biological',
    productCost: 310,
    labourCost: 350,
    applicationCost: 150,
    totalCost: 810,
    costPerAcre: 810,
    costPerHectare: 2001,
    potentialCropSavings: 6800,
    roiEstimate: '8.4x Eco-Yield Protected (0 Residue)',
  },
  {
    strategyName: 'Option C: Integrated Pest Management (Bio + Cultural Barrier)',
    category: 'IPM',
    productCost: 480,
    labourCost: 400,
    applicationCost: 150,
    totalCost: 1030,
    costPerAcre: 1030,
    costPerHectare: 2545,
    potentialCropSavings: 11200,
    roiEstimate: '10.8x Multi-Pest Protection ROI',
  },
];
