import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertTriangle, Droplets, Bell, FileText, ChevronRight, Zap } from 'lucide-react';

interface QuickActionsProps {
  className?: string;
  horizontal?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className = '', horizontal = false }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Capture Crop Image',
      description: 'Upload leaf photo for edge CNN disease & pest inference',
      icon: <Camera className="h-5 w-5 text-agri-green" />,
      path: '/ai-vision',
      color: 'bg-green-50 border-green-100 hover:border-agri-green/50',
    },
    {
      title: 'Check Farm Risk',
      description: 'View calibrated sensor + image fusion risk matrix',
      icon: <AlertTriangle className="h-5 w-5 text-warning-amber" />,
      path: '/risk-assessment',
      color: 'bg-amber-50/60 border-amber-100 hover:border-warning-amber/50',
    },
    {
      title: 'View Irrigation',
      description: 'Inspect soil water tension & smart pumping window',
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      path: '/smart-irrigation',
      color: 'bg-blue-50/60 border-blue-100 hover:border-blue-300',
    },
    {
      title: 'View Alerts',
      description: 'Review 2 active prioritized field notifications',
      icon: <Bell className="h-5 w-5 text-danger-red" />,
      path: '/alerts',
      color: 'bg-red-50/50 border-red-100 hover:border-danger-red/50',
    },
    {
      title: 'Generate Report',
      description: 'Compile crop health, telemetry & treatment audit',
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      path: '/reports',
      color: 'bg-purple-50/50 border-purple-100 hover:border-purple-300',
    },
  ];

  if (horizontal) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 ${className}`}>
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={() => navigate(act.path)}
            className={`p-3 rounded-2xl border text-left transition-all group flex flex-col justify-between hover:shadow-md bg-white ${act.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-white shadow-xs">{act.icon}</div>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-agri-green transition-transform group-hover:translate-x-0.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-deep-green group-hover:text-agri-green transition-colors leading-snug">
                {act.title}
              </h5>
              <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">
                {act.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-soft-green/30 text-agri-green">
            <Zap className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-deep-green">Global Quick Actions</h4>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">1-Click Fast Navigation</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={() => navigate(act.path)}
            className={`p-3.5 rounded-xl border text-left transition-all group hover:shadow-sm ${act.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-white shadow-xs">{act.icon}</div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-agri-green transition-transform group-hover:translate-x-0.5" />
            </div>
            <h5 className="text-xs font-bold text-deep-green group-hover:text-agri-green transition-colors">
              {act.title}
            </h5>
            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
              {act.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
