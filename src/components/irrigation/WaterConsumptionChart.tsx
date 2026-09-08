import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Droplets } from 'lucide-react';

interface WaterConsumptionChartProps {
  data: Array<{ week: string; dripVolumeLiters: number; floodBaselineLiters: number; waterSavedPct: number }>;
}

export const WaterConsumptionChart: React.FC<WaterConsumptionChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Weekly Water Consumption & Conservation Index"
        subtitle="Precision Drip vs Conventional Flood Irrigation Baseline"
        icon={<Droplets className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold text-agri-green bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
            Avg 18.2% Water Saved
          </span>
        }
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="week" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={10}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k L`}
              tickLine={false}
            />
            <Tooltip
              formatter={(val: number) => [`${val.toLocaleString()} Liters`, '']}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="floodBaselineLiters" name="Flood Baseline (Liters)" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="dripVolumeLiters" name="Precision Drip Applied (Liters)" fill="#2E7D32" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Cumulative Water Saved this Season: <strong>228,000 Liters</strong></span>
        <span className="text-agri-green font-semibold">Exceeds &ge;15% PRD Requirement</span>
      </div>
    </Card>
  );
};
