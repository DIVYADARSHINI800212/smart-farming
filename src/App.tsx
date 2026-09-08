import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LanguageProvider } from './context/LanguageContext';

// Core Pages
import { Dashboard } from './pages/Dashboard';
import { FieldMonitoring } from './pages/FieldMonitoring';
import { Alerts } from './pages/Alerts';

// AI & Crop Health
import { CropHealth } from './pages/CropHealth';
import { AIVision } from './pages/AIVision';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { PestDetection } from './pages/PestDetection';
import { RiskAssessment } from './pages/RiskAssessment';

// Precision Farm Management
import SmartIrrigation from './pages/SmartIrrigation';
import EnvironmentalMonitoring from './pages/EnvironmentalMonitoring';
import WeatherIntelligence from './pages/WeatherIntelligence';
import EdgeNodes from './pages/EdgeNodes';

// Farmer Advisory & Treatment Intelligence
import { FarmerAdvisory } from './pages/FarmerAdvisory';
import { TreatmentRecommendation } from './pages/TreatmentRecommendation';
import { AgriculturalInputs } from './pages/AgriculturalInputs';
import { ProductAvailability } from './pages/ProductAvailability';
import { TreatmentTiming } from './pages/TreatmentTiming';
import { TreatmentCost } from './pages/TreatmentCost';
import { TreatmentFollowUp } from './pages/TreatmentFollowUp';

// Insights & Analytics (Phase 5)
import { FarmAnalytics } from './pages/FarmAnalytics';
import { YieldForecast } from './pages/YieldForecast';
import { Reports } from './pages/Reports';

// System & Demo Settings (Phase 5)
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* MAIN */}
            <Route index element={<Dashboard />} />
            <Route path="field-monitoring" element={<FieldMonitoring />} />
            <Route path="crop-health" element={<CropHealth />} />

            {/* AI & DETECTION */}
            <Route path="ai-vision" element={<AIVision />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="pest-detection" element={<PestDetection />} />
            <Route path="risk-assessment" element={<RiskAssessment />} />

            {/* FARM MANAGEMENT */}
            <Route path="smart-irrigation" element={<SmartIrrigation />} />
            <Route path="environmental-monitoring" element={<EnvironmentalMonitoring />} />
            <Route path="weather-intelligence" element={<WeatherIntelligence />} />
            <Route path="farmer-advisory" element={<FarmerAdvisory />} />

            {/* TREATMENT */}
            <Route path="treatment-recommendation" element={<TreatmentRecommendation />} />
            <Route path="agricultural-inputs" element={<AgriculturalInputs />} />
            <Route path="product-availability" element={<ProductAvailability />} />
            <Route path="treatment-timing" element={<TreatmentTiming />} />
            <Route path="treatment-cost" element={<TreatmentCost />} />
            <Route path="treatment-follow-up" element={<TreatmentFollowUp />} />

            {/* INSIGHTS */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="farm-analytics" element={<FarmAnalytics />} />
            <Route path="yield-forecast" element={<YieldForecast />} />
            <Route path="reports" element={<Reports />} />

            {/* SYSTEM */}
            <Route path="edge-nodes" element={<EdgeNodes />} />
            <Route path="edge-ai-nodes" element={<EdgeNodes />} />
            <Route path="edge-ai" element={<Navigate to="/edge-nodes" replace />} />
            <Route path="settings" element={<Settings />} />

            {/* Catch-all 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
