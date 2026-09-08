import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LanguageProvider } from './context/LanguageContext';
import { Dashboard } from './pages/Dashboard';
import { FieldMonitoring } from './pages/FieldMonitoring';
import { Alerts } from './pages/Alerts';
import { CropHealth } from './pages/CropHealth';
import { AIVision } from './pages/AIVision';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { PestDetection } from './pages/PestDetection';
import { RiskAssessment } from './pages/RiskAssessment';
import SmartIrrigation from './pages/SmartIrrigation';
import EnvironmentalMonitoring from './pages/EnvironmentalMonitoring';
import WeatherIntelligence from './pages/WeatherIntelligence';
import EdgeNodes from './pages/EdgeNodes';
import { FarmerAdvisory } from './pages/FarmerAdvisory';
import { TreatmentRecommendation } from './pages/TreatmentRecommendation';
import { AgriculturalInputs } from './pages/AgriculturalInputs';
import { ProductAvailability } from './pages/ProductAvailability';
import { TreatmentTiming } from './pages/TreatmentTiming';
import { TreatmentCost } from './pages/TreatmentCost';
import { TreatmentFollowUp } from './pages/TreatmentFollowUp';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Phase 1 Core Routes */}
            <Route index element={<Dashboard />} />
            <Route path="field-monitoring" element={<FieldMonitoring />} />
            <Route path="alerts" element={<Alerts />} />

            {/* Phase 2 AI & Crop Intelligence Routes */}
            <Route path="crop-health" element={<CropHealth />} />
            <Route path="ai-vision" element={<AIVision />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="pest-detection" element={<PestDetection />} />
            <Route path="risk-assessment" element={<RiskAssessment />} />

            {/* Phase 3 Smart Irrigation, Environment, Weather & Edge AI */}
            <Route path="smart-irrigation" element={<SmartIrrigation />} />
            <Route path="environmental-monitoring" element={<EnvironmentalMonitoring />} />
            <Route path="weather-intelligence" element={<WeatherIntelligence />} />
            <Route path="edge-nodes" element={<EdgeNodes />} />
            <Route path="edge-ai" element={<Navigate to="/edge-nodes" replace />} />

            {/* Phase 4 Farmer Advisory + Treatment & Input Intelligence */}
            <Route path="farmer-advisory" element={<FarmerAdvisory />} />
            <Route path="treatment-recommendation" element={<TreatmentRecommendation />} />
            <Route path="agricultural-inputs" element={<AgriculturalInputs />} />
            <Route path="product-availability" element={<ProductAvailability />} />
            <Route path="treatment-timing" element={<TreatmentTiming />} />
            <Route path="treatment-cost" element={<TreatmentCost />} />
            <Route path="treatment-follow-up" element={<TreatmentFollowUp />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
