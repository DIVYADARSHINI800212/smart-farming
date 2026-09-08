import React from 'react';
import { Cpu, CheckCircle2, Zap, Database, Activity } from 'lucide-react';

interface AIStatusProps {
  compact?: boolean;
  className?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/70 rounded-full text-xs text-deep-green ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-agri-green"></span>
        </span>
        <span className="font-semibold">Edge AI:</span>
        <span className="text-agri-green font-bold">Online</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500 text-[11px]">140ms INT8 • Demo Mode</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#E6F0EB] p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-soft-green/30 text-agri-green">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-deep-green uppercase tracking-wide">
              Edge AI Telemetry Status
            </h4>
            <p className="text-[10px] text-gray-500">
              Local on-device inference pipeline (ESP32 + RPi4)
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
          <CheckCircle2 className="h-3 w-3 text-agri-green" />
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Edge AI</span>
          <span className="text-xs font-bold text-agri-green flex items-center gap-1 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-agri-green"></span>
            Online
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Image Processing</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            Ready (320px)
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Disease Model</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            Loaded (INT8)
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Pest Model</span>
          <span className="text-xs font-bold text-dark-forest flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-agri-green" />
            Loaded (YOLOv8)
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Inference Mode</span>
          <span className="text-xs font-bold text-deep-green flex items-center gap-1 mt-0.5">
            <Activity className="h-3 w-3 text-agri-green" />
            Local / Edge
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-2.5">
          <span className="text-[10px] text-gray-400 font-medium block">Average Latency</span>
          <span className="text-xs font-bold text-deep-green flex items-center gap-1 mt-0.5">
            <Zap className="h-3 w-3 text-warning-amber" />
            140 ms
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
        <span>Data Mode: <strong className="text-gray-600">Simulated / Demo</strong></span>
        <span>Local Database: <strong className="text-gray-600">SQLite Active (0 sync lag)</strong></span>
      </div>
    </div>
  );
};
