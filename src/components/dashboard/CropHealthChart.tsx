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
import { TrendingUp } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface CropHealthChartProps {
  data: Array<{ day: string; health: number; moistureAvg: number; riskScore: number }>;
}

export const CropHealthChart: React.FC<CropHealthChartProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        title={t('chart_crop_health_title', 'Crop Health Trend (30 Days)')}
        subtitle={t('chart_crop_health_sub', 'Vegetation growth index & health progression')}
        icon={<TrendingUp className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold text-agri-green bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
            {t('normal_veg_growth', 'Stable Tillering')}
          </span>
        }
      />

      <div className="h-64 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D9534F" stopOpacity={0.3} />
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
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Area
              type="monotone"
              dataKey="health"
              name={`${t('crop_health_index', 'Crop Health Index')} (%)`}
              stroke="#2E7D32"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#healthGrad)"
            />
            <Area
              type="monotone"
              dataKey="riskScore"
              name={`${t('overall_farm_risk', 'Composite Risk Score')} (%)`}
              stroke="#D9534F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#riskGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>{t('target_moisture', 'Target')}: &gt;80%</span>
        <span>{t('confidence', 'Latest')}: <strong>84% {t('crop_health_index', 'Health Index')}</strong></span>
      </div>
    </Card>
  );
};
