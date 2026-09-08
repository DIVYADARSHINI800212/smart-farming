import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { ArchitectureFlowDiagram } from '../components/edge/ArchitectureFlowDiagram';
import { GatewayMetricsCard } from '../components/edge/GatewayMetricsCard';
import { NodeHardwareGrid } from '../components/edge/NodeHardwareGrid';
import { ModelPerformanceCard } from '../components/edge/ModelPerformanceCard';
import {
  mockGatewayDiagnostics,
  mockNodeHardwareDetails,
  mockEdgeModelBenchmarks,
} from '../data/edgeNodeData';
import { Cpu, Server, Radio, Zap } from 'lucide-react';

export const EdgeNodes: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-purple-500 animate-pulse" />
              Distributed LoRaWAN Mesh & On-Device ML
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-agri-dark tracking-tight">
            Edge Computing & Nodes
          </h1>
          <p className="text-sm text-agri-muted">
            Solar-harvested field microcontrollers, low-latency base station diagnostics, and quantized neural inference
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SX1302 Concentrator Online</span>
          </div>
        </div>
      </div>

      {/* Edge KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Field Nodes"
          value="2 / 2"
          unit=""
          icon={<Cpu className="w-5 h-5 text-teal-600" />}
          highlightColor="agri-green"
          subtitle="100% packet transmission integrity"
        />
        <MetricCard
          title="LoRaWAN Gateway"
          value="ONLINE"
          unit=""
          icon={<Server className="w-5 h-5 text-blue-600" />}
          highlightColor="deep-green"
          subtitle="140ms round-trip latency"
        />
        <MetricCard
          title="Edge Neural Latency"
          value="118"
          unit="ms"
          icon={<Zap className="w-5 h-5 text-amber-600" />}
          highlightColor="warning-amber"
          subtitle="YOLOv8 Nano INT8 on RPi4"
        />
        <MetricCard
          title="Solar Harvesting"
          value="100%"
          unit=""
          icon={<Radio className="w-5 h-5 text-purple-600" />}
          highlightColor="agri-green"
          subtitle="Continuous diurnal charge"
        />
      </div>

      {/* End-to-End Architecture Flow Diagram */}
      <ArchitectureFlowDiagram />

      {/* Base Station Gateway Diagnostics */}
      <GatewayMetricsCard gateway={mockGatewayDiagnostics} />

      {/* Microcontroller Field Nodes */}
      <NodeHardwareGrid nodes={mockNodeHardwareDetails} />

      {/* Edge AI Neural Benchmarks */}
      <ModelPerformanceCard models={mockEdgeModelBenchmarks} />
    </div>
  );
};

export default EdgeNodes;
