import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ScanEye, Camera, History, Sparkles, CheckCircle2 } from 'lucide-react';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { ImageUploader } from '../components/vision/ImageUploader';
import { PreprocessingPipeline } from '../components/vision/PreprocessingPipeline';
import { InferenceViewer } from '../components/vision/InferenceViewer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  mockSampleImages,
  mockDetectionHistory,
  SampleImageOption,
} from '../data/aiVisionData';
import { useFarmData } from '../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const AIVision: React.FC = () => {
  const { zones } = useOutletContext<FarmDataContext>();

  const [selectedZone, setSelectedZone] = useState<string>('zone-1');
  const [selectedImage, setSelectedImage] = useState<string | null>(mockSampleImages[0].thumbnailUrl);
  const [selectedSample, setSelectedSample] = useState<SampleImageOption | null>(mockSampleImages[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(true);
  const [history, setHistory] = useState(mockDetectionHistory);

  const handleImageSelected = (imgUrl: string, sampleMeta?: SampleImageOption) => {
    setSelectedImage(imgUrl);
    setSelectedSample(sampleMeta || null);
    setHasAnalyzed(false);
  };

  const handleTriggerCamera = () => {
    // Select the second sample (pest) as simulated camera snap
    const nextSample = mockSampleImages[1];
    setSelectedImage(nextSample.thumbnailUrl);
    setSelectedSample(nextSample);
    setHasAnalyzed(false);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);

      // Add to history if new
      if (selectedSample) {
        const newHistoryItem = {
          id: `det-${Date.now().toString().slice(-3)}`,
          zoneId: selectedZone,
          imageUrl: selectedSample.thumbnailUrl,
          timestamp: 'Just now',
          detectedClass: selectedSample.simulatedClass,
          confidence: selectedSample.simulatedConfidence,
          severity: selectedSample.simulatedSeverity,
          affectedAreaPercentage: 18,
          targetCategory: selectedSample.category,
          preprocessingStatus: {
            resolutionCheck: true,
            sharpnessPassed: true,
            contrastNormalised: true,
            roiExtracted: true,
          },
        };
        setHistory(prev => [newHistoryItem, ...prev]);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-50 text-agri-green">
            <ScanEye className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              AI Vision & Foliar Macro Inspection
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Complete edge acquisition workflow: Zone selection → Image upload → Preprocessing → CNN Inference
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            DEMO AI PIPELINE
          </span>
        </div>
      </div>

      {/* Step 1: Select Zone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Step 1: Select Target Farm Zone
          </label>
          <span className="text-xs text-gray-400">Attaches spatial GPS coordinates to sample</span>
        </div>
        <ZoneSelector
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </div>

      {/* Step 2: Upload / Capture Leaf Image */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Step 2 & 3: Upload Leaf Photo or Select Preset Sample
        </label>
        <ImageUploader
          currentImage={selectedImage}
          onImageSelected={handleImageSelected}
          sampleOptions={mockSampleImages}
          onTriggerCamera={handleTriggerCamera}
        />
      </div>

      {/* Step 4: Edge Preprocessing Verification */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Step 4: Automated Edge Image Quality Preprocessing
        </label>
        <PreprocessingPipeline
          isProcessing={isAnalyzing}
          hasImage={!!selectedImage}
        />
      </div>

      {/* Step 5 & 6: AI Inference & Results */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Step 5 & 6: Model Inference & Classification Results
        </label>
        <InferenceViewer
          image={selectedImage}
          selectedSample={selectedSample}
          isAnalyzing={isAnalyzing}
          hasAnalyzed={hasAnalyzed}
          onRunAnalysis={handleRunAnalysis}
          selectedZone={selectedZone}
        />
      </div>

      {/* Detection History Table */}
      <Card>
        <CardHeader
          title="Edge Vision Detection History Log"
          subtitle="Recent on-device inferences cached in local SQLite buffer"
          icon={<History className="h-5 w-5 text-gray-500" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {history.length} Inferences Logged
            </span>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50">
                <th className="py-2.5 px-3">Capture Preview</th>
                <th className="py-2.5 px-3">Log ID</th>
                <th className="py-2.5 px-3">Zone</th>
                <th className="py-2.5 px-3">Primary Diagnosis</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-2.5 px-3">
                    <img
                      src={item.imageUrl}
                      alt={item.detectedClass}
                      className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                    />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-gray-500">{item.id}</td>
                  <td className="py-2.5 px-3 font-bold text-dark-forest">
                    {item.zoneId === 'zone-1' ? 'Zone 1 (North)' : 'Zone 2 (South)'}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-deep-green">{item.detectedClass}</td>
                  <td className="py-2.5 px-3 font-black text-danger-red">{item.confidence}%</td>
                  <td className="py-2.5 px-3">
                    <Badge severity={item.severity}>{item.severity}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-gray-400">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
