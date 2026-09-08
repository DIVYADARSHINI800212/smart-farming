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
  ReferenceLine,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Bug } from 'lucide-react';

interface PestPopulationChartProps {
  data: Array<{ day: string; mothCountPerAcre: number; etlThreshold: number; damagedLeavesPct: number }>;
}

export const PestPopulationChart: React.FC<PestPopulationChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Pest Population Dynamics & Trap Counts"
        subtitle="14-day flight monitoring curve vs Economic Threshold Level"
        icon={<Bug className="h-5 w-5 text-warning-amber" />}
        action={
          <span className="text-xs font-semibold text-yellow-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
            Above ETL Threshold
          </span>
        }
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis stroke="#888888" fontSize={11} domain={[0, 25]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

            <ReferenceLine y={10} stroke="#D9534F" strokeDasharray="3 3" label={{ value: 'ETL (10)', fill: '#D9534F', fontSize: 10 }} />

            <Line
              type="monotone"
              dataKey="mothCountPerAcre"
              name="Adult Moth Count / Acre"
              stroke="#F4B942"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#F4B942' }}
            />
            <Line
              type="monotone"
              dataKey="damagedLeavesPct"
              name="Folded Leaves (% Damage)"
              stroke="#8C5832"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#8C5832' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Sensor: <strong>Automated Solar Light Trap (Unit 1)</strong></span>
        <span className="text-yellow-800 font-semibold">Peak flight occurred Day 0</span>
      </div>
    </Card>
  );
};
