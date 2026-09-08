import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { AlertOctagon } from 'lucide-react';

interface RiskDistributionChartProps {
  data: Array<{ subject: string; Zone1: number; Zone2: number; fullMark: number }>;
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Multi-Criteria Risk Distribution"
        subtitle="Zone 1 vs Zone 2 risk vectors"
        icon={<AlertOctagon className="h-5 w-5 text-danger-red" />}
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E6F0EB" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888888" fontSize={9} />
            <Radar
              name="Zone 1 (North)"
              dataKey="Zone1"
              stroke="#F4B942"
              fill="#F4B942"
              fillOpacity={0.4}
            />
            <Radar
              name="Zone 2 (South)"
              dataKey="Zone2"
              stroke="#D9534F"
              fill="#D9534F"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Dominant Z1 Risk: <strong>Leaf Folder (78%)</strong></span>
        <span>Dominant Z2 Risk: <strong>Blast Fungal (88%)</strong></span>
      </div>
    </Card>
  );
};
