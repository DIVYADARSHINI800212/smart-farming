import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';

interface HealthAreaComparisonProps {
  healthyPct: number;
  affectedPct: number;
  healthyAcres: number;
  affectedAcres: number;
  totalAcres: number;
}

export const HealthAreaComparison: React.FC<HealthAreaComparisonProps> = ({
  healthyPct,
  affectedPct,
  healthyAcres,
  affectedAcres,
  totalAcres,
}) => {
  const chartData = [
    { name: 'Healthy Canopy Area', value: healthyPct, color: '#2E7D32' },
    { name: 'Affected / Stressed Area', value: affectedPct, color: '#F4B942' },
  ];

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Canopy Area Partitioning (Healthy vs Affected)"
        subtitle={`Total Monitored Area: ${totalAcres} Acres (Zones 1 & 2)`}
        icon={<ShieldCheck className="h-5 w-5 text-agri-green" />}
      />

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
        {/* Donut Chart */}
        <div className="h-44 w-44 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black text-dark-forest">{healthyPct}%</span>
            <span className="text-[10px] uppercase font-bold text-gray-400">Healthy</span>
          </div>
        </div>

        {/* Legend / Metrics */}
        <div className="space-y-4 w-full sm:w-auto">
          <div className="p-3.5 bg-green-50 rounded-xl border border-green-200 min-w-[200px]">
            <div className="flex items-center gap-2 text-agri-green font-bold text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-agri-green"></span>
              Healthy Canopy Area
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-dark-forest">{healthyPct}%</span>
              <span className="text-xs text-gray-500 font-semibold">({healthyAcres} Acres)</span>
            </div>
            <span className="text-[11px] text-gray-500 block mt-0.5">
              Normal chlorophyll vigor & tillering
            </span>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 min-w-[200px]">
            <div className="flex items-center gap-2 text-yellow-800 font-bold text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-warning-amber"></span>
              Affected / Water-Stressed Area
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-700">{affectedPct}%</span>
              <span className="text-xs text-gray-500 font-semibold">({affectedAcres} Acres)</span>
            </div>
            <span className="text-[11px] text-gray-500 block mt-0.5">
              Zone 1 moisture deficit & foliar symptoms
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
