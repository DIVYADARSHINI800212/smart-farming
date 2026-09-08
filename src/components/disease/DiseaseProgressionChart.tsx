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
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { TrendingUp } from 'lucide-react';

interface DiseaseProgressionChartProps {
  data: Array<{ day: string; untreatedProgression: number; withIntervention: number; blastRiskIndex: number }>;
}

export const DiseaseProgressionChart: React.FC<DiseaseProgressionChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="Epidemic Progression Projection (Untreated vs Controlled)"
        subtitle="Canopy lesion area expansion dynamics over 14 days"
        icon={<TrendingUp className="h-5 w-5 text-danger-red" />}
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis stroke="#888888" fontSize={11} domain={[0, 80]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Line
              type="monotone"
              dataKey="untreatedProgression"
              name="Untreated Foliar Spread (% Area)"
              stroke="#D9534F"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#D9534F' }}
            />
            <Line
              type="monotone"
              dataKey="withIntervention"
              name="With Prescribed Treatment (% Area)"
              stroke="#2E7D32"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#2E7D32' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Model: <strong>SEIR Epidemiological Simulator</strong></span>
        <span className="text-agri-green font-semibold">Intervention saves ~78% canopy surface</span>
      </div>
    </Card>
  );
};
