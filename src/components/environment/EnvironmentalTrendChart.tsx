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

interface EnvironmentalTrendChartProps {
  data: Array<{ time: string; airTemp: number; soilTemp: number; humidity: number; vpd: number; rain: number }>;
}

export const EnvironmentalTrendChart: React.FC<EnvironmentalTrendChartProps> = ({ data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title="24-Hour Microclimate Diurnal Dynamics"
        subtitle="Hourly atmospheric temperature, humidity, soil temperature & vapor pressure deficit"
        icon={<TrendingUp className="h-5 w-5 text-agri-green" />}
      />

      <div className="h-72 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6F0EB" />
            <XAxis dataKey="time" stroke="#888888" fontSize={11} tickLine={false} />
            <YAxis yAxisId="temp" stroke="#888888" fontSize={11} domain={[15, 40]} tickLine={false} />
            <YAxis yAxisId="humid" orientation="right" stroke="#888888" fontSize={11} domain={[40, 100]} tickLine={false} />
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
              yAxisId="temp"
              type="monotone"
              dataKey="airTemp"
              name="Air Temp (°C)"
              stroke="#D9534F"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="soilTemp"
              name="Soil Temp (°C)"
              stroke="#8C5832"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              yAxisId="humid"
              type="monotone"
              dataKey="humidity"
              name="Rel. Humidity (%)"
              stroke="#2E7D32"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Sampling interval: <strong>10 minutes via LoRa node</strong></span>
        <span className="text-deep-green font-semibold">Diurnal temperature oscillation: 7.8°C</span>
      </div>
    </Card>
  );
};
