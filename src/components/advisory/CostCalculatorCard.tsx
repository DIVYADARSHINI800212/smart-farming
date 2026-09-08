import React, { useState } from 'react';
import { CircleDollarSign, Calculator, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockStrategyComparisons } from '../../data/costData';
import { useLanguage } from '../../context/LanguageContext';

interface CostCalculatorCardProps {
  initialAcres?: number;
  initialAffectedAcres?: number;
}

export const CostCalculatorCard: React.FC<CostCalculatorCardProps> = ({
  initialAcres = 2.3,
  initialAffectedAcres = 0.41,
}) => {
  const { t } = useLanguage();

  // State inputs
  const [farmArea, setFarmArea] = useState<number>(initialAcres);
  const [affectedArea, setAffectedArea] = useState<number>(initialAffectedAcres);
  const [productUnitPrice, setProductUnitPrice] = useState<number>(420); // ₹ per pack/acre
  const [labourCostPerAcre, setLabourCostPerAcre] = useState<number>(350); // ₹ per acre
  const [applicationCostPerAcre, setApplicationCostPerAcre] = useState<number>(150); // ₹ sprayer rental/fuel

  // Calculations based on affected acreage
  const totalProductCost = Math.round(productUnitPrice * affectedArea);
  const totalLabourCost = Math.round(labourCostPerAcre * affectedArea);
  const totalApplicationCost = Math.round(applicationCostPerAcre * affectedArea);
  const estimatedTotal = totalProductCost + totalLabourCost + totalApplicationCost;

  const costPerAcre = Math.round(estimatedTotal / (affectedArea || 1));
  const costPerHectare = Math.round(costPerAcre / 0.404686);
  const potentialSavings = Math.round(affectedArea * 18500); // Protected crop yield value approx ₹18.5k/acre

  return (
    <div className="space-y-6">
      {/* Interactive Calculator Input & Live Metrics Grid */}
      <Card>
        <CardHeader
          title="Interactive Treatment Expense Calculator"
          subtitle="Customize acreage, input pricing, and operational costs to calculate precise budget"
          icon={<Calculator className="h-5 w-5 text-agri-green" />}
          action={
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-soft-green/30 text-deep-green">
              Live State Engine
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Inputs Section (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Input Parameters & Field Dimensions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Farm Area */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Total Farm Area (Acres)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="50"
                    value={farmArea}
                    onChange={(e) => setFarmArea(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full px-3 py-1.5 text-sm font-bold text-deep-green bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green/30"
                  />
                  <span className="text-xs text-gray-500 font-medium">Ac</span>
                </div>
              </div>

              {/* Affected Area */}
              <div className="p-3 bg-red-50/60 rounded-xl border border-red-200">
                <label className="text-xs font-semibold text-danger-red block mb-1">
                  Affected Target Area (Acres)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max={farmArea}
                    value={affectedArea}
                    onChange={(e) => setAffectedArea(Math.min(farmArea, Math.max(0.05, parseFloat(e.target.value) || 0.05)))}
                    className="w-full px-3 py-1.5 text-sm font-bold text-danger-red bg-white border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-danger-red/30"
                  />
                  <span className="text-xs text-red-600 font-medium">Ac</span>
                </div>
                <span className="text-[10px] text-gray-500 block mt-1">
                  {Math.round((affectedArea / farmArea) * 100)}% of total field
                </span>
              </div>

              {/* Product Price per Acre */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Product / Formulation Cost (₹ / Acre)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    step="20"
                    min="100"
                    value={productUnitPrice}
                    onChange={(e) => setProductUnitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-bold text-deep-green bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green/30"
                  />
                </div>
              </div>

              {/* Labour Cost per Acre */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Spraying Labour (₹ / Acre)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    step="25"
                    min="50"
                    value={labourCostPerAcre}
                    onChange={(e) => setLabourCostPerAcre(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-bold text-deep-green bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green/30"
                  />
                </div>
              </div>

              {/* Application / Sprayer Rental */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Application Machinery / Knapsack Sprayer Rental & Fuel (₹ / Acre)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    step="25"
                    min="0"
                    value={applicationCostPerAcre}
                    onChange={(e) => setApplicationCostPerAcre(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-bold text-deep-green bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 bg-linear-to-br from-deep-green to-[#1B4D3E] text-white p-5 rounded-2xl flex flex-col justify-between shadow-lg shadow-deep-green/20">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <span className="text-xs uppercase tracking-wider font-semibold text-soft-green">
                  Estimated Treatment Total
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold text-white">
                  Affected: {affectedArea} Ac
                </span>
              </div>

              {/* Primary Cost Value */}
              <div className="my-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-soft-green">₹</span>
                  <span className="text-4xl font-black tracking-tight">{estimatedTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-soft-green/80 mt-1">
                  Total outlay for targeted {affectedArea} acre spot spray
                </p>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2 py-3 border-t border-white/10 text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Product Inputs:</span>
                  <span className="font-semibold text-white">₹{totalProductCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Field Labour:</span>
                  <span className="font-semibold text-white">₹{totalLabourCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Spraying Equipment:</span>
                  <span className="font-semibold text-white">₹{totalApplicationCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                  <span className="text-soft-green">Cost per Acre:</span>
                  <span>₹{costPerAcre.toLocaleString()} / Ac</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Cost per Hectare:</span>
                  <span>₹{costPerHectare.toLocaleString()} / Ha</span>
                </div>
              </div>
            </div>

            {/* Potential Yield Loss Avoidance */}
            <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/15 text-xs">
              <div className="flex items-center gap-1.5 text-soft-green font-bold mb-1">
                <TrendingUp className="h-4 w-4" />
                <span>Protected Crop Value</span>
              </div>
              <p className="text-white/90 text-[11px] leading-tight">
                Preventing severe blast progression on {affectedArea} Ac protects an estimated{' '}
                <strong className="text-white">₹{potentialSavings.toLocaleString()}</strong> in harvest grain value.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3 Strategy Comparison Section */}
      <Card>
        <CardHeader
          title="Management Strategy Cost & ROI Comparison"
          subtitle="Compare financial impact across Chemical, Biological, and Integrated Pest Management (IPM)"
          icon={<CircleDollarSign className="h-5 w-5 text-gray-500" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {mockStrategyComparisons.map((strat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                idx === 0
                  ? 'bg-green-50/50 border-agri-green/40 shadow-xs'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    strat.category === 'Chemical'
                      ? 'bg-blue-100 text-blue-800'
                      : strat.category === 'Biological'
                      ? 'bg-green-100 text-agri-green'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {strat.category}
                  </span>
                  <span className="text-xs font-bold text-deep-green">
                    ₹{strat.costPerAcre} / Ac
                  </span>
                </div>

                <h4 className="text-xs font-bold text-dark-forest leading-snug mb-3">
                  {strat.strategyName}
                </h4>

                <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-2.5">
                  <div className="flex justify-between">
                    <span>Input Cost:</span>
                    <span className="font-semibold text-gray-800">₹{strat.productCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labour + Equip:</span>
                    <span className="font-semibold text-gray-800">₹{strat.labourCost + strat.applicationCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Hectare:</span>
                    <span className="font-semibold text-gray-800">₹{strat.costPerHectare}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="p-2 rounded-lg bg-gray-50 text-[11px] font-medium text-gray-700">
                  <span className="font-bold text-agri-green">{strat.roiEstimate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 mt-4 text-center">
          * Demo estimates only. Actual pesticide, bio-agent, and local agricultural labor rates fluctuate by market conditions.
        </p>
      </Card>
    </div>
  );
};
