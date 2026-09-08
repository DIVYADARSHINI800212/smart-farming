import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, Microscope, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { ConfidenceBar } from '../ui/ConfidenceBar';
import { Badge } from '../ui/Badge';
import { SampleImageOption } from '../../data/aiVisionData';

interface InferenceViewerProps {
  image: string | null;
  selectedSample: SampleImageOption | null;
  isAnalyzing: boolean;
  hasAnalyzed: boolean;
  onRunAnalysis: () => void;
  selectedZone: string;
}

export const InferenceViewer: React.FC<InferenceViewerProps> = ({
  image,
  selectedSample,
  isAnalyzing,
  hasAnalyzed,
  onRunAnalysis,
  selectedZone,
}) => {
  if (!image) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
        <Sparkles className="h-10 w-10 text-gray-300 mb-3" />
        <h4 className="text-sm font-bold text-gray-500">No Crop Image Loaded</h4>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">
          Select a sample leaf image or upload a photograph above to trigger the edge neural pipeline.
        </p>
      </Card>
    );
  }

  const resultClass = selectedSample?.simulatedClass || 'Blast (Pyricularia oryzae)';
  const confidence = selectedSample?.simulatedConfidence || 82;
  const severity = selectedSample?.simulatedSeverity || 'HIGH';
  const probabilities = selectedSample?.probabilities || [
    { label: 'Blast', percentage: 82 },
    { label: 'Brown Spot', percentage: 8 },
    { label: 'Healthy', percentage: 6 },
    { label: 'Others', percentage: 4 },
  ];

  return (
    <Card className="border-agri-green/40 shadow-card">
      <CardHeader
        title="AI Vision Inspection & Inference Engine"
        subtitle="Edge MobileNetV2 INT8 Quantized Model (SIH Demo)"
        icon={<Sparkles className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
            DEMONSTRATION AI RESULT
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-2">
        {/* Left: Image Preview with simulated ROI overlay */}
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-black/5 flex items-center justify-center min-h-[260px]">
            <img
              src={image}
              alt="Crop Leaf Preview"
              className="w-full h-auto max-h-[320px] object-cover rounded-xl"
            />
            {/* Simulated ROI Bounding Box */}
            <div className="absolute inset-x-8 inset-y-6 border-2 border-dashed border-red-500/80 rounded-lg pointer-events-none flex items-start justify-between p-2">
              <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded shadow">
                ROI: 320x320
              </span>
              <span className="text-[10px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded shadow">
                Laplacian: 148
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Assigned to: <strong>{selectedZone === 'zone-1' ? 'Zone 1 (North Field)' : 'Zone 2 (South Field)'}</strong>
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={onRunAnalysis}
              isLoading={isAnalyzing}
              icon={<Sparkles className="h-4 w-4" />}
            >
              {hasAnalyzed ? 'Re-Run Edge Inference' : 'Run Edge AI Analysis'}
            </Button>
          </div>
        </div>

        {/* Right: Results / Loading State */}
        <div className="flex flex-col justify-between">
          {isAnalyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green" />
              <div>
                <h4 className="text-sm font-bold text-deep-green">Processing Edge Inference...</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Executing MobileNetV2 INT8 convolution layers on gateway NPU.
                </p>
              </div>
            </div>
          ) : hasAnalyzed ? (
            <div className="space-y-4">
              {/* Result Summary Box */}
              <div className="p-4 rounded-xl bg-red-50/40 border border-red-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Primary Edge Diagnosis
                    </span>
                    <h3 className="text-lg font-black text-deep-green mt-0.5">{resultClass}</h3>
                  </div>
                  <Badge severity={severity}>{severity} SEVERITY</Badge>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-danger-red">{confidence}%</span>
                  <span className="text-xs text-gray-500 font-semibold">Classification Confidence</span>
                </div>
              </div>

              {/* Probabilities Breakdown */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Class Probability Distribution
                </span>
                {probabilities.map((prob, idx) => (
                  <ConfidenceBar
                    key={idx}
                    label={prob.label}
                    percentage={prob.percentage}
                    isDominant={idx === 0}
                  />
                ))}
              </div>

              {/* Cross-module Navigation Buttons */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                <Link to="/disease-detection" className="flex-1 min-w-[140px]">
                  <Button variant="outline" size="sm" className="w-full text-xs" icon={<Microscope className="h-3.5 w-3.5 text-danger-red" />}>
                    Open Disease Page
                  </Button>
                </Link>
                <Link to="/pest-detection" className="flex-1 min-w-[140px]">
                  <Button variant="outline" size="sm" className="w-full text-xs" icon={<Bug className="h-3.5 w-3.5 text-warning-amber" />}>
                    Open Pest Page
                  </Button>
                </Link>
                <Link to="/risk-assessment" className="flex-1 min-w-[140px]">
                  <Button variant="primary" size="sm" className="w-full text-xs" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                    View Fused Risk
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-2xl border border-gray-100">
              <Sparkles className="h-8 w-8 text-agri-green/60 mb-2" />
              <h4 className="text-sm font-bold text-deep-green">Ready for Inference</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Click "Run Edge AI Analysis" to execute model inference and view class confidence distributions.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
