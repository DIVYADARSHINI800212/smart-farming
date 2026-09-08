import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Calendar } from 'lucide-react';

interface RiskForecastTimelineProps {
  data: Array<{ day: string; overallRisk: number; diseaseRisk: number; pestRisk: number; waterStress: number }>;
}

export const RiskForecastTimeline: React.FC<RiskForecastTimelineProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="7-Day Predictive Risk Trajectory"
        subtitle="Forecasting risk decline following prescribed agronomic interventions"
        icon={<Calendar className="h-5 w-5 text-agri-green" />}
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskOverallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D9534F" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D9534F" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                border: '1px solid #C8E2D3',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Area
              type="monotone"
              dataKey="overallRisk"
              name="Composite Farm Risk (%)"
              stroke="#D9534F"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#riskOverallGrad)"
            />
            <Area
              type="monotone"
              dataKey="diseaseRisk"
              name="Disease Probability (%)"
              stroke="#F4B942"
              strokeWidth={2}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="waterStress"
              name="Water Deficit (%)"
              stroke="#2E7D32"
              strokeWidth={2}
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Projection: <strong>Target Risk &lt; 30% by Day 7</strong></span>
        <span className="text-agri-green font-semibold">Assuming recommended spray & irrigation</span>
      </div>
    </Card>
  );
};
