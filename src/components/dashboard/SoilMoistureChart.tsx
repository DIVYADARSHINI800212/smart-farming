import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Droplets } from 'lucide-react';
import { TrendDataPoint } from '../../types';

interface SoilMoistureChartProps {
  data: TrendDataPoint[];
}

export const SoilMoistureChart: React.FC<SoilMoistureChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Soil Moisture Dynamics (24 Hours)"
        subtitle="Zone 1 vs Zone 2 vs Optimal Agronomic Threshold"
        icon={<Droplets className="h-5 w-5 text-warning-amber" />}
        action={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Z1 Deficit: 32%
            </span>
          </div>
        }
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="time" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis stroke="#888888" fontSize={11} domain={[20, 80]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            
            {/* Optimal Moisture Band Background Area */}
            <ReferenceArea y1={40} y2={60} fill="#A8D5BA" fillOpacity={0.15} />

            <Line
              type="monotone"
              dataKey="zone1Moisture"
              name="Zone 1 Moisture (%)"
              stroke="#F4B942"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#F4B942' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="zone2Moisture"
              name="Zone 2 Moisture (%)"
              stroke="#2E7D32"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#2E7D32' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-2 bg-soft-green/40 border border-soft-green rounded"></span>
          Green Band = Optimal Root Permittivity (40% - 60%)
        </span>
        <span className="text-amber-700 font-semibold">Zone 1 Requires Irrigation</span>
      </div>
    </Card>
  );
};
