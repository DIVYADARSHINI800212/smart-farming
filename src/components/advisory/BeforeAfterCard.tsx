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
  LineChart,
  Line,
} from 'recharts';
import { TrendingDown, CheckCircle2, AlertTriangle, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import {
  mockRecoveryProgress,
  mockRecoveryTimelineChart,
  mockSeverityComparisonData,
} from '../../data/followUpData';

export const BeforeAfterCard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Before vs After Key Metric Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Disease Severity
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
              -47% Reduction
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-3">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 block font-semibold">Pre-Spray</span>
              <span className="text-xl font-bold text-danger-red line-through">72%</span>
            </div>
            <span className="text-gray-300 font-bold text-lg">→</span>
            <div className="text-left">
              <span className="text-[10px] text-agri-green block font-bold">Post-Day 7</span>
              <span className="text-3xl font-black text-deep-green">38%</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            Ash center necrotic spots halted; margins desiccated.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Pest Leaf Folding
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
              -57% Suppression
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-3">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 block font-semibold">Pre-Spray</span>
              <span className="text-xl font-bold text-danger-red line-through">65%</span>
            </div>
            <span className="text-gray-300 font-bold text-lg">→</span>
            <div className="text-left">
              <span className="text-[10px] text-agri-green block font-bold">Post-Day 7</span>
              <span className="text-3xl font-black text-deep-green">28%</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            Larval activity suppressed below economic threshold (10/ac).
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Efficacy Index
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
              Verified
            </span>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-deep-green">74%</span>
              <span className="text-xs font-bold text-gray-500">/ 100</span>
            </div>
            <span className="text-xs font-bold text-agri-green mt-0.5 block">
              Moderately Effective Response
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Satisfactory response without need for emergency booster spray.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Canopy Greenness
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-agri-green">
              +61% Vigor
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-3">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 block font-semibold">Pre-Spray</span>
              <span className="text-xl font-bold text-amber-600">52</span>
            </div>
            <span className="text-gray-300 font-bold text-lg">→</span>
            <div className="text-left">
              <span className="text-[10px] text-agri-green block font-bold">Post-Day 7</span>
              <span className="text-3xl font-black text-deep-green">84</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            Upper flag leaf emergence completely free of lesion spots.
          </p>
        </div>
      </div>

      {/* 2. Before vs After Side-by-Side Chart Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Metric Comparison Bar Chart (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title="Foliar Severity Reduction (Pre vs Post)"
              subtitle="Comparing quantitative disease and pest pressure before vs after intervention"
              icon={<TrendingDown className="h-5 w-5 text-agri-green" />}
            />

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockSeverityComparisonData}
                  margin={{ top: 10, right: 15, left: -10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="metric"
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="before" name="Before Treatment (%)" fill="#D9534F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="after" name="Current After Spray (%)" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Full Recovery Target (%)" fill="#A8D5BA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* 14-Day Trajectory Projection (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title="14-Day Trajectory: Untreated vs Treated"
              subtitle="Projected path showing lesion arrest vs exponential untreated spread"
              icon={<Activity className="h-5 w-5 text-deep-green" />}
            />

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockRecoveryTimelineChart}
                  margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    dataKey="untreated"
                    name="Projected Untreated Spread (%)"
                    stroke="#D9534F"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="treated"
                    name="Actual Treated Curve (%)"
                    stroke="#2E7D32"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Recovery Progress Timeline (Day 0 to Day 14) */}
      <Card>
        <CardHeader
          title="14-Day Clinical Recovery Timeline"
          subtitle="Chronological milestones from initial application to full physiological resolution"
          icon={<ShieldCheck className="h-5 w-5 text-agri-green" />}
          action={
            <span className="text-xs font-bold text-agri-green bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
              Current: Day 7 Milestone
            </span>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {mockRecoveryProgress.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                step.isCurrent
                  ? 'bg-green-50/60 border-agri-green ring-2 ring-agri-green/20'
                  : step.isPassed
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                    step.isCurrent
                      ? 'bg-agri-green text-white'
                      : step.isPassed
                      ? 'bg-deep-green text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.day}
                  </span>

                  {step.isPassed && !step.isCurrent && (
                    <CheckCircle2 className="h-4 w-4 text-agri-green" />
                  )}
                  {step.isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-agri-green animate-pulse">
                      Active Stage
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-dark-forest leading-snug mb-1">
                  {step.title}
                </h4>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Physiological Status
                </span>
                <span className={`text-xs font-semibold ${
                  step.isCurrent ? 'text-agri-green font-bold' : 'text-deep-green'
                }`}>
                  {step.symptomState}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
