import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Droplets, 
  Sun, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { MOCK_YIELD_FACTORS, MOCK_HISTORICAL_YIELDS } from '../data/yieldData';
import { Button } from '../components/ui/Button';

export const YieldForecast: React.FC = () => {
  const expectedYieldTonnes = 4.8;
  const potentialHarvestTonnes = 5.1;
  const estimatedYieldRisk = 'Medium';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-warning-amber">
            <TrendingUp className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                Yield Risk Forecasting & Loss Mitigation
              </h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-yellow-800 border border-amber-200">
                Demo Forecast
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Machine-learning yield risk assessment combining microclimate indices, disease foliar incidence, and water stress factors
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
          <span>Model: <strong>Random Forest Regressor v1.2 (INT8)</strong></span>
        </div>
      </div>

      {/* Main Expected Yield & Risk Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: Expected Yield */}
        <div className="bg-gradient-to-br from-deep-green to-[#1b4334] text-white p-6 rounded-2xl shadow-md border border-soft-green/20 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-soft-green block">
            Projected Total Harvest
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{expectedYieldTonnes}</span>
            <span className="text-sm font-bold text-soft-green">Tonnes (4.8 Acres)</span>
          </div>
          <div className="text-xs text-soft-green/80 flex items-center justify-between pt-2 border-t border-white/10">
            <span>Per Acre: <strong>1.00 Tonne / Acre</strong></span>
            <span>Target: <strong>5.0 Tonnes</strong></span>
          </div>
        </div>

        {/* Metric 2: Overall Yield Risk */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
            Current Yield Vulnerability Risk
          </span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-warning-amber">
              {estimatedYieldRisk}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-yellow-800">
              Score: 58 / 100
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
            Main drivers: <strong>Rice blast emergence in Zone 2</strong> (-0.42t) and <strong>Zone 1 moisture deficit</strong> (-0.15t).
          </p>
        </div>

        {/* Metric 3: Harvest Protection Opportunity */}
        <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
            Treatable Yield Protection
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-agri-green">+0.48</span>
            <span className="text-sm font-bold text-gray-500">Tonnes Retrievable</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
            Timely application of prescribed <strong>Tricyclazole 75% WP</strong> prevents irreversible panicle grain shedding.
          </p>
        </div>
      </div>

      {/* Visual Factor Impact Breakdown */}
      <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-deep-green uppercase tracking-wide">
              Agronomic Factor Impact Breakdown
            </h3>
            <p className="text-xs text-gray-500">
              Contribution of biophysical, pathology, and sensor-monitored variables toward final expected tonnage
            </p>
          </div>
          <span className="text-xs text-gray-400 italic">
            *Demo Forecast — Simulated machine-learning weights
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {MOCK_YIELD_FACTORS.map((f, idx) => {
            const isNegative = f.impactTonnes < 0;
            return (
              <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark-forest">
                      {f.factor}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      f.riskLevel === 'High' ? 'bg-red-100 text-danger-red' :
                      f.riskLevel === 'Medium' ? 'bg-amber-100 text-yellow-800' :
                      'bg-green-100 text-agri-green'
                    }`}>
                      {f.riskLevel} Risk • {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {f.description}
                  </p>
                  <p className="text-[11px] text-deep-green font-semibold">
                    💡 Action: {f.recommendation}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className={`text-base font-black flex items-center justify-end gap-1 ${
                      isNegative ? 'text-danger-red' : 'text-agri-green'
                    }`}>
                      {isNegative ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      {f.impactTonnes > 0 ? `+${f.impactTonnes}` : f.impactTonnes} Tonnes
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      {isNegative ? 'Potential Loss' : 'Favorable Gain'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Yield & Seasonal Comparison Chart */}
      <div className="bg-white rounded-2xl border border-[#E6F0EB] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-deep-green uppercase tracking-wide">
              Multi-Season Harvest Benchmark (Historical vs Current Forecast)
            </h3>
            <p className="text-xs text-gray-500">
              Comparison with Kuruvai & Samba cycles across Thanjavur pilot acreage
            </p>
          </div>
          <span className="text-xs font-bold text-agri-green bg-green-50 px-2.5 py-1 rounded-full">
            Target: 5.0t
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_HISTORICAL_YIELDS} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
              <XAxis dataKey="season" tick={{ fontSize: 11, fill: '#718096' }} />
              <YAxis domain={[3, 6]} tick={{ fontSize: 11, fill: '#718096' }} label={{ value: 'Tonnes', angle: -90, position: 'insideLeft', fill: '#718096', fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="actualTonnes" name="Actual / Projected Harvest (t)" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              <Bar dataKey="targetTonnes" name="Regional Potential Target (t)" fill="#A8D5BA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Methodology & AI Model Disclaimer Banner */}
      <div className="bg-cream/70 rounded-2xl border border-amber-200/80 p-5 text-xs text-dark-forest space-y-2">
        <div className="flex items-center gap-2 text-warning-amber font-bold">
          <HelpCircle className="h-4 w-4" />
          <span>PROTOTYPE DEMONSTRATION DISCLAIMER</span>
        </div>
        <p className="text-gray-600 leading-relaxed">
          The yield forecast presented above is a <strong>Demo Forecast</strong> utilizing simulated edge telemetry and synthetic feature weightings for the Smart India Hackathon prototype. It does not guarantee commercial field harvest weights. Always verify soil health and regional agronomic advisories with local Krishi Vigyan Kendra (KVK) and State Department of Agriculture authorities.
        </p>
      </div>
    </div>
  );
};

export default YieldForecast;
