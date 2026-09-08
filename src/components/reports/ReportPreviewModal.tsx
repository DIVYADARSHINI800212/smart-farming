import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Droplets, 
  CloudSun, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { FarmReportCard } from '../../data/reportsData';
import { useFarmData } from '../../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

interface ReportPreviewModalProps {
  report: FarmReportCard | null;
  isOpen: boolean;
  onClose: () => void;
  farmData: FarmDataContext;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  report,
  isOpen,
  onClose,
  farmData,
}) => {
  if (!isOpen || !report) return null;

  const { farmOverview, zones } = farmData;
  const z1 = zones.find(z => z.zoneId === 'zone-1') || zones[0];
  const z2 = zones.find(z => z.zoneId === 'zone-2') || zones[1] || zones[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-forest/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Controls Header */}
        <div className="bg-deep-green text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-soft-green/20 text-soft-green">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-soft-green">
                  Report Preview Document
                </span>
                <span className="text-[10px] bg-warning-amber text-dark-forest font-black px-2 py-0.2 rounded-full uppercase">
                  Demo Report — Prototype Data
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {report.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="h-4 w-4" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs hidden sm:flex"
            >
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Demo prototype: Report PDF download simulated.')}
              icon={<Download className="h-4 w-4" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
            >
              Export PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet Container */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FAFAF8] text-dark-forest">
          {/* Document Masthead */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-deep-green tracking-tight">
                  SMART FARMING ASSISTANT
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-green-100 text-agri-green font-bold">
                  SIH AGRI-AUDIT
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Edge AI-Powered Precision Agriculture Platform • Sensor + Vision Fusion
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 font-medium">
                <span>Farm: <strong>{farmOverview.name}</strong></span>
                <span>•</span>
                <span>Location: <strong>{farmOverview.location}</strong></span>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 text-xs text-gray-500 space-y-0.5">
              <p>Generated: <strong>{report.lastGenerated}</strong></p>
              <p>Report Period: <strong>{report.period}</strong></p>
              <p>Document ID: <strong className="text-gray-700">SFA-{report.id.toUpperCase()}-2026</strong></p>
            </div>
          </div>

          {/* Section 1: Farm Summary */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-agri-green flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-green"></span>
              1. Farm Executive Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-center">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Farm Health Score</span>
                <span className="text-xl font-black text-deep-green mt-0.5 block">{farmOverview.healthScore} / 100</span>
                <span className="text-[10px] text-agri-green font-semibold">{farmOverview.cropHealthStatus}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Acreage</span>
                <span className="text-xl font-black text-deep-green mt-0.5 block">{farmOverview.totalAcres} Acres</span>
                <span className="text-[10px] text-gray-500">2 Monitored Zones</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">IoT Sensor Nodes</span>
                <span className="text-xl font-black text-agri-green mt-0.5 block">2 Online</span>
                <span className="text-[10px] text-gray-500">LoRa 868.1 MHz</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Water Deficit / Risk</span>
                <span className="text-xl font-black text-danger-red mt-0.5 block">18% Area</span>
                <span className="text-[10px] text-gray-500">Blast in Zone 2</span>
              </div>
            </div>
          </div>

          {/* Section 2: Zone Telemetry Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-agri-green flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-green"></span>
              2. Field Zone Telemetry Comparison
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Zone</th>
                    <th className="py-2.5 px-3">Crop Variety</th>
                    <th className="py-2.5 px-3">Soil Moisture</th>
                    <th className="py-2.5 px-3">Canopy Temp</th>
                    <th className="py-2.5 px-3">Humidity</th>
                    <th className="py-2.5 px-3">Recent Rain</th>
                    <th className="py-2.5 px-3">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  <tr>
                    <td className="py-3 px-3 font-bold text-deep-green">{z1.name}</td>
                    <td className="py-3 px-3">{z1.cropType}</td>
                    <td className="py-3 px-3 font-bold text-warning-amber">{z1.currentReading.soilMoisture}% (Low)</td>
                    <td className="py-3 px-3">{z1.currentReading.temperature}°C</td>
                    <td className="py-3 px-3">{z1.currentReading.humidity}%</td>
                    <td className="py-3 px-3">{z1.currentReading.rainfall} mm</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-yellow-800">
                        {z1.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-deep-green">{z2.name}</td>
                    <td className="py-3 px-3">{z2.cropType}</td>
                    <td className="py-3 px-3 font-bold">{z2.currentReading.soilMoisture}% (Optimal)</td>
                    <td className="py-3 px-3">{z2.currentReading.temperature}°C</td>
                    <td className="py-3 px-3 font-bold text-danger-red">{z2.currentReading.humidity}% (High)</td>
                    <td className="py-3 px-3">{z2.currentReading.rainfall} mm</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-danger-red">
                        {z2.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: AI Vision, Disease & Pest Findings */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-agri-green flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-green"></span>
              3. AI Vision, Disease & Pest Diagnostic Findings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-danger-red flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" /> Rice Blast (Magnaporthe oryzae)
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-danger-red text-white">
                    82% Confidence
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Spindle-shaped necrotic lesions with greyish center observed in lower foliage quad. Affected area is currently 18% of Zone 2.
                </p>
                <div className="text-[11px] text-gray-500 pt-1 border-t border-red-100">
                  Alternative matches: Brown Spot (8%), Healthy Tissue (6%), Others (4%).
                </div>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-yellow-800 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> Rice Leaf Folder (Cnaphalocrocis medinalis)
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    78% Confidence
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Longitudinal leaf rolling larvae activity detected. Population is medium severity with &gt;1 fold per 5 hills threshold.
                </p>
                <div className="text-[11px] text-gray-500 pt-1 border-t border-amber-100">
                  Alternative matches: Stem Borer (6%), Planthopper (5%), No Pest (11%).
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Smart Irrigation & Weather Summary */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-agri-green flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-green"></span>
              4. Smart Irrigation & Meteorological Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
              <div className="space-y-1.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-bold text-deep-green flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5 text-blue-500" /> Irrigation Advisory
                </span>
                <p className="text-gray-600">
                  Zone 1 requires a <strong>45-minute scheduled irrigation</strong> cycle to bring soil moisture from 32% back to 55%. Zone 2 pump should remain OFF to prevent worsening blast foliar humidity.
                </p>
                <p className="text-[11px] text-agri-green font-semibold">
                  Cumulative Water Saved this season: 18.4% (~32,400 Litres).
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-bold text-deep-green flex items-center gap-1">
                  <CloudSun className="h-3.5 w-3.5 text-warning-amber" /> Weather Spray Window
                </span>
                <p className="text-gray-600">
                  Ambient wind is 11 km/h (within 15 km/h safety limit). No convective rainfall expected for 14 hours. <strong>Optimal spray window: 4:00 PM – 6:30 PM today</strong>.
                </p>
                <p className="text-[11px] text-blue-600 font-semibold">
                  Rainfast safety: 4 hours dry post-spray is guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Treatment Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-agri-green flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-green"></span>
              5. Final Actionable Agronomic Recommendations
            </h4>
            <div className="bg-green-50/60 p-4 rounded-xl border border-green-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-deep-green">Prescribed Treatment: Tricyclazole 75% WP</span>
                <span className="text-[11px] font-bold text-agri-green">Estimated Cost: ₹1,480 total</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Dosage: <strong>0.6 g per Litre</strong> (120 g per 200L knapsack tank for 2.5 acres).</li>
                <li>Method: High-volume foliar spray with hollow-cone nozzle directed at lower third of canopy.</li>
                <li>Product Availability: Stock verified at <em>Thanjavur Agro Centre (2.4 km)</em>.</li>
                <li>Follow-Up Audit: Re-inspect foliage on Day +3 and Day +7 to log recovery percentage.</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer Footer */}
          <div className="text-center text-[10px] text-gray-400 pt-4 border-t border-gray-200">
            Smart Farming Assistant Prototype • Smart India Hackathon 2026 • Demo Report — Generated using Simulated Sensor & Vision Data.
          </div>
        </div>
      </div>
    </div>
  );
};
