import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Droplets, 
  ShieldAlert, 
  Bug, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Percent,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  ANALYTICS_DATA_7D, 
  ANALYTICS_DATA_30D, 
  ANALYTICS_DATA_90D, 
  ANALYTICS_DATA_SEASON,
  AnalyticsMetricPoint 
} from '../data/analyticsData';

type DateFilterRange = '7D' | '30D' | '90D' | 'Season';

export const FarmAnalytics: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<DateFilterRange>('30D');

  const getDataset = (): AnalyticsMetricPoint[] => {
    switch (selectedRange) {
      case '7D': return ANALYTICS_DATA_7D;
      case '30D': return ANALYTICS_DATA_30D;
      case '90D': return ANALYTICS_DATA_90D;
      case 'Season': return ANALYTICS_DATA_SEASON;
    }
  };

  const currentData = getDataset();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-50 text-agri-green">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                Farm Analytics & Longitudinal Intelligence
              </h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                Temporal Trends
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Historical multi-sensor telemetry curves, disease epidemiology, water conservation, and treatment outcomes
            </p>
          </div>
        </div>

        {/* Date Filters: 7D, 30D, 90D, Season */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold shrink-0">
          {(['7D', '30D', '90D', 'Season'] as const).map((rng) => (
            <button
              key={rng}
              onClick={() => setSelectedRange(rng)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedRange === rng
                  ? 'bg-deep-green text-white shadow-xs'
                  : 'text-gray-600 hover:text-dark-forest'
              }`}
            >
              {rng === '7D' ? '7 Days' : rng === '30D' ? '30 Days' : rng === '90D' ? '90 Days' : 'Full Season'}
            </button>
          ))}
        </div>
      </div>

      {/* Farm Performance Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Crop Health Impv.</span>
          <div className="text-xl font-black text-agri-green flex items-center gap-1">
            +4.2% <ArrowUpRight className="h-4 w-4 text-agri-green" />
          </div>
          <span className="text-[10px] text-gray-500 block">NDVI vegetative gain</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Water Saved</span>
          <div className="text-xl font-black text-blue-600 flex items-center gap-1">
            18.4% <Droplets className="h-4 w-4 text-blue-500" />
          </div>
          <span className="text-[10px] text-gray-500 block">32,400 Litres saved</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Disease Incidents</span>
          <div className="text-xl font-black text-danger-red flex items-center gap-1">
            3 Detected
          </div>
          <span className="text-[10px] text-gray-500 block">2 Resolved, 1 Active (Z2)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Pest Incidents</span>
          <div className="text-xl font-black text-warning-amber flex items-center gap-1">
            1 Active
          </div>
          <span className="text-[10px] text-gray-500 block">Leaf Folder in Z2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Treatment Effect.</span>
          <div className="text-xl font-black text-deep-green flex items-center gap-1">
            89% <Percent className="h-4 w-4 text-agri-green" />
          </div>
          <span className="text-[10px] text-gray-500 block">Canopy recovery rate</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-xs space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Estimated Yield Risk</span>
          <div className="text-xl font-black text-yellow-700 flex items-center gap-1">
            Low-Medium
          </div>
          <span className="text-[10px] text-gray-500 block">Projected 4.8 Tonnes</span>
        </div>
      </div>

      {/* Row 1: Crop Health & Disease vs Pest Occurrence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Crop Health Index Curve */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Crop Health & Foliar Vigor Index</h3>
              <p className="text-[11px] text-gray-500">Multi-spectral chlorophyll and vegetative growth trend</p>
            </div>
            <span className="text-xs font-bold text-agri-green bg-green-50 px-2 py-0.5 rounded-full">
              Target &gt; 80%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="cropHealthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Area type="monotone" dataKey="cropHealth" name="Health Score (%)" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#cropHealthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Disease vs Pest Activity */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Disease vs Pest Risk Probability Trend</h3>
              <p className="text-[11px] text-gray-500">Rice Blast (fungal) vs Leaf Folder (insect) likelihood</p>
            </div>
            <span className="text-xs font-bold text-danger-red bg-red-50 px-2 py-0.5 rounded-full">
              Blast Spike
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="blastRisk" name="Blast Risk (%)" stroke="#D9534F" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="leafFolderRisk" name="Leaf Folder Risk (%)" stroke="#F4B942" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Soil Moisture & Environmental Microclimate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Zone 1 vs Zone 2 Soil Moisture */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Soil Moisture Dynamics: Zone 1 vs Zone 2</h3>
              <p className="text-[11px] text-gray-500">Zone 1 deficit (32%) compared to Zone 2 balanced status (45%)</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Optimal (45-65%)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis domain={[10, 80]} tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="soilMoistureZ1" name="Zone 1 Moisture (%)" stroke="#F4B942" strokeWidth={2.5} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="soilMoistureZ2" name="Zone 2 Moisture (%)" stroke="#2E7D32" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Temperature, Humidity & Rainfall */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Environmental Canopy Microclimate</h3>
              <p className="text-[11px] text-gray-500">Relative humidity, canopy heat, and rainfall volume</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              85% Max Humidity
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#3B82F6" fill="#BFDBFE" fillOpacity={0.4} />
                <Area type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#EF4444" fill="#FECACA" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Water Savings & Treatment Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 5: Water Usage & Savings */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Water Consumption vs Smart Savings</h3>
              <p className="text-[11px] text-gray-500">Sensor-guided furrow delivery vs traditional flood baseline (Liters)</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              +18.4% Efficiency
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="waterUsageLiters" name="Water Used (L)" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="waterSavedLiters" name="Water Saved (L)" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Treatment Effectiveness Curve */}
        <div className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-deep-green">Treatment Effectiveness & Recovery Progression</h3>
              <p className="text-[11px] text-gray-500">Post-spray blast lesion arrest and healthy canopy regeneration</p>
            </div>
            <span className="text-xs font-bold text-agri-green bg-green-50 px-2 py-0.5 rounded-full">
              89% Current Recovery
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#718096' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#718096' }} />
                <Tooltip />
                <Line type="monotone" dataKey="treatmentEffectiveness" name="Canopy Healing (%)" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmAnalytics;
