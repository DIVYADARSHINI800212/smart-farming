import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  Microscope,
  Thermometer,
  Droplets,
  CloudSun,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ZoneSelector } from '../components/ui/ZoneSelector';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { getAdvisoryData } from '../data/advisoryData';
import { useTranslation } from '../i18n';

export const FarmerAdvisory: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('zone-1');
  const advisory = getAdvisoryData(selectedZone);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Cross-Module Pipeline Stepper */}
      <TreatmentWorkflowStepper
        currentStep={1}
        nextStepTitle={t('btn_view_advisory', 'Review Treatment Protocol')}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner type="general" />

      {/* 3. Header & Zone Selector */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className="p-3 rounded-xl bg-green-50 text-agri-green shrink-0">
            <UserCheck className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-deep-green tracking-tight break-words">
                {t('farmer_advisory_title', 'Farmer Agronomic Advisory Hub')}
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-soft-green/30 text-deep-green shrink-0">
                {t('precision_crop_soil', 'AI-Assisted Decision Support')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed break-words">
              {t('farmer_advisory_subtitle', 'Synthesized actionable recommendations derived from leaf vision, field sensors, and weather forecasting')}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                {advisory.lastAnalysisTime}
              </span>
              <span className="font-semibold text-deep-green">
                {advisory.crop}
              </span>
              <span className="text-gray-500">
                {advisory.growthStage}
              </span>
            </div>
          </div>
        </div>

        {/* ZoneSelector Component with adaptable width */}
        <div className="w-full xl:w-[440px] shrink-0">
          <ZoneSelector
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />
        </div>
      </div>

      {/* 4. Overall Farm Situation Cards (6 Cards) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          {t('farm_at_a_glance', 'Overall Farm & Zone Situation')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* Crop Health */}
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 leading-tight">{t('crop_health_index', 'Crop Health')}</span>
            <div className="my-1.5 flex items-baseline gap-1">
              <span className="text-2xl font-black text-deep-green">{advisory.situation.cropHealth}</span>
              <span className="text-[10px] text-gray-400">/ 100</span>
            </div>
            <span className="text-[10px] font-bold text-agri-green bg-green-50 px-2 py-0.5 rounded-md inline-block w-fit">
              {t('badge_good', 'Vigorous')}
            </span>
          </div>

          {/* Disease Risk */}
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 leading-tight">{t('disease_risk_gauge_title', 'Disease Risk')}</span>
            <div className="my-1.5">
              <span className="text-lg font-black text-danger-red">{advisory.situation.diseaseRisk}</span>
            </div>
            <span className="text-[10px] font-bold text-danger-red bg-red-50 px-2 py-0.5 rounded-md inline-block w-fit">
              {t('badge_blast_82', 'Blast 82%')}
            </span>
          </div>

          {/* Pest Risk */}
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 leading-tight">{t('pest_risk_gauge_title', 'Pest Risk')}</span>
            <div className="my-1.5">
              <span className="text-lg font-black text-yellow-800">{advisory.situation.pestRisk.split(' ')[0]}</span>
            </div>
            <span className="text-[10px] font-bold text-yellow-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block w-fit">
              {t('badge_folder_78', 'Folder 78%')}
            </span>
          </div>

          {/* Water Stress */}
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 leading-tight">{t('water_stress', 'Water Stress')}</span>
            <div className="my-1.5">
              <span className="text-lg font-black text-amber-700">{advisory.situation.waterStress.split(' ')[0]}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block w-fit">
              32% {t('soil_moisture', 'Moist')}
            </span>
          </div>

          {/* Weather Risk */}
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 leading-tight">{t('weather_risk_index', 'Weather Risk')}</span>
            <div className="my-1.5">
              <span className="text-lg font-black text-agri-green">{advisory.situation.weatherRisk}</span>
            </div>
            <span className="text-[10px] font-bold text-agri-green bg-green-50 px-2 py-0.5 rounded-md inline-block w-fit">
              {t('badge_optimal', 'Clear 24h')}
            </span>
          </div>

          {/* Overall Risk */}
          <div className="p-3.5 bg-white rounded-xl border border-red-200 bg-red-50/20 shadow-xs flex flex-col justify-between min-w-0">
            <span className="text-[11px] font-semibold text-danger-red leading-tight">{t('overall_farm_risk', 'Overall Risk')}</span>
            <div className="my-1.5">
              <span className="text-lg font-black text-danger-red">{advisory.situation.overallRisk}</span>
            </div>
            <span className="text-[10px] font-bold text-white bg-danger-red px-2 py-0.5 rounded-md inline-block w-fit">
              {t('priority_action_required', 'Action Req.')}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Farmer-Friendly Summary Highlight Card */}
      <div className="bg-gradient-to-r from-deep-green to-[#1b4332] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-soft-green/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-radial from-soft-green/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-soft-green animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-soft-green">
                {t('priority_action_required', 'Agronomic Priority Alert')} • {advisory.zoneName.includes('Zone 1') ? t('zone_1_north_paddy', advisory.zoneName) : t('zone_2_south_paddy', advisory.zoneName)}
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold leading-snug">
              "{advisory.farmerFriendlySummary}"
            </p>
            <p className="text-xs text-white/70">
              {t('recommended_protocol_text', 'Immediate inspection recommended before applying treatment. Follow the decision pathway below to configure targeted treatment and check dealer availability.')}
            </p>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2">
            <Button
              variant="secondary"
              size="md"
              className="bg-white text-deep-green hover:bg-cream font-bold shadow-md"
              onClick={() => navigate('/treatment-recommendation')}
            >
              <span>{t('btn_view_advisory', 'Review Treatment Protocol')}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Link to="/disease-detection">
              <button className="text-xs text-soft-green hover:underline font-semibold text-center w-full block py-1">
                {t('btn_inspect', 'View Raw Vision Diagnostics')}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Two-Column Grid: AI Diagnosis & Sensor Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Diagnosis Card (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title={t('edge_ai_diagnostic_synthesis', 'Edge AI Diagnostic Synthesis')}
              subtitle={t('leaf_image_analysis_sub', 'Leaf image analysis from MobileNetV2 quantized CNN model')}
              icon={<Microscope className="h-5 w-5 text-danger-red" />}
              action={
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-danger-red">
                  {advisory.diagnosis.confidence}% Confidence
                </span>
              }
            />

            <div className="space-y-4 pt-1">
              <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {t('primary_detected_pathogen', 'Primary Detected Pathogen')}
                  </span>
                  <Badge severity={advisory.diagnosis.severity as any}>
                    {advisory.diagnosis.severity} SEVERITY
                  </Badge>
                </div>
                <h4 className="text-base font-black text-deep-green mt-1">
                  {advisory.diagnosis.primaryIssue}
                </h4>
                <p className="text-xs italic text-gray-600">
                  {advisory.diagnosis.scientificName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">{t('affected_field_zone', 'Affected Field Zone')}</span>
                  <span className="font-bold text-dark-forest">{advisory.zoneName}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">{t('estimated_area', 'Estimated Area')}</span>
                  <span className="font-bold text-danger-red">{advisory.diagnosis.affectedArea}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  {t('observed_foliar_symptoms', 'Observed Foliar Symptoms')}
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {advisory.diagnosis.symptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger-red mt-1.5 shrink-0" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Sensor Evidence Card (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader
              title={t('supporting_telemetry_evidence', 'Supporting Telemetry Evidence')}
              subtitle={t('realtime_sensor_lora_sub', 'Real-time environmental sensor measurements from LoRa Node')}
              icon={<Layers className="h-5 w-5 text-agri-green" />}
            />

            <div className="space-y-3.5 pt-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
                <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-center">
                  <Thermometer className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                  <span className="text-base font-bold text-orange-950 block">
                    {advisory.sensorEvidence.temperature}°C
                  </span>
                  <span className="text-[10px] text-gray-500">{t('air_temp_label', 'Air Temp')}</span>
                </div>

                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
                  <Droplets className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-base font-bold text-blue-950 block">
                    {advisory.sensorEvidence.humidity}%
                  </span>
                  <span className="text-[10px] text-gray-500">{t('rel_humidity_label', 'Rel Humidity')}</span>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
                  <Droplets className="h-4 w-4 text-amber-600 mx-auto mb-1" />
                  <span className="text-base font-bold text-amber-950 block">
                    {advisory.sensorEvidence.soilMoisture}%
                  </span>
                  <span className="text-[10px] text-gray-500">{t('soil_moisture_label', 'Soil Moisture')}</span>
                </div>

                <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-center">
                  <CloudSun className="h-4 w-4 text-teal-600 mx-auto mb-1" />
                  <span className="text-base font-bold text-teal-950 block">
                    {advisory.sensorEvidence.rainfall} mm
                  </span>
                  <span className="text-[10px] text-gray-500">{t('rain_24h_label', '24h Rain')}</span>
                </div>
              </div>

              {/* Explanations of why readings matter */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <span className="p-1 rounded bg-orange-100 text-orange-800 shrink-0 text-[10px] font-bold">TEMP</span>
                  <p className="text-gray-600">{advisory.sensorEvidence.explanation.temperatureNote}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <span className="p-1 rounded bg-blue-100 text-blue-800 shrink-0 text-[10px] font-bold">HUM</span>
                  <p className="text-gray-600">{advisory.sensorEvidence.explanation.humidityNote}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <span className="p-1 rounded bg-amber-100 text-amber-800 shrink-0 text-[10px] font-bold">SOIL</span>
                  <p className="text-gray-600">{advisory.sensorEvidence.explanation.moistureNote}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <span className="p-1 rounded bg-teal-100 text-teal-800 shrink-0 text-[10px] font-bold">RAIN</span>
                  <p className="text-gray-600">{advisory.sensorEvidence.explanation.rainfallNote}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 7. AI + Sensor Fusion Visual Engine */}
      <Card>
        <CardHeader
          title={t('multimodal_sensor_vision_fusion', 'Multi-Modal Sensor + Vision Fusion Architecture')}
          subtitle={t('multimodal_fusion_sub', 'How four distinct telemetry channels synthesize into calibrated farmer guidance')}
          icon={<Sparkles className="h-5 w-5 text-agri-green" />}
          action={
            <span className="text-xs font-bold text-deep-green bg-soft-green/30 px-2.5 py-1 rounded-full">
              Edge INT8 Pipeline
            </span>
          }
        />

        <div className="space-y-4 pt-2">
          {/* Formula Pipeline Diagram */}
          <div className="p-4 bg-cream/70 rounded-2xl border border-[#E6F0EB]">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-deep-green text-center">
              <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-xs">
                <span className="text-[10px] text-gray-400 block font-medium">{t('fusion_model_1', 'Model 1')}</span>
                <span>{t('image_ai_label', 'IMAGE AI')} ({advisory.fusionWeights.imageAiPercent}%)</span>
              </div>
              <span className="text-gray-400 text-base">+</span>
              <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-xs">
                <span className="text-[10px] text-gray-400 block font-medium">{t('fusion_telemetry', 'Telemetry')}</span>
                <span>{t('sensor_data_label', 'SENSOR DATA')} ({advisory.fusionWeights.sensorDataPercent}%)</span>
              </div>
              <span className="text-gray-400 text-base">+</span>
              <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-xs">
                <span className="text-[10px] text-gray-400 block font-medium">{t('fusion_forecast', 'Forecast')}</span>
                <span>{t('weather_data_label', 'WEATHER DATA')} ({advisory.fusionWeights.weatherDataPercent}%)</span>
              </div>
              <span className="text-gray-400 text-base">+</span>
              <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-xs">
                <span className="text-[10px] text-gray-400 block font-medium">{t('fusion_agronomic', 'Agronomic')}</span>
                <span>{t('risk_engine_label', 'RISK ENGINE')} ({advisory.fusionWeights.riskEnginePercent}%)</span>
              </div>
              <span className="text-agri-green text-lg font-black">=</span>
              <div className="px-4 py-2 bg-agri-green text-white rounded-xl shadow-md">
                <span className="text-[10px] text-soft-green block font-bold">{t('fusion_result', 'Result')}</span>
                <span>{t('final_advisory_label', 'FINAL ADVISORY')}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 text-center mt-3 max-w-2xl mx-auto">
              {advisory.fusionWeights.fusionSummary}
            </p>
          </div>

          {/* Fusion Contributing Weight Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{t('vision_cnn_weight', 'Vision CNN Weight')}</span>
                <span className="font-bold text-deep-green">{advisory.fusionWeights.imageAiPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-danger-red h-2 rounded-full" style={{ width: `${advisory.fusionWeights.imageAiPercent}%` }} />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{t('sensor_node_weight', 'Sensor Node Weight')}</span>
                <span className="font-bold text-deep-green">{advisory.fusionWeights.sensorDataPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${advisory.fusionWeights.sensorDataPercent}%` }} />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{t('weather_intelligence', 'Weather Intelligence')}</span>
                <span className="font-bold text-deep-green">{advisory.fusionWeights.weatherDataPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${advisory.fusionWeights.weatherDataPercent}%` }} />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{t('agronomic_risk_rules', 'Agronomic Risk Rules')}</span>
                <span className="font-bold text-deep-green">{advisory.fusionWeights.riskEnginePercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-agri-green h-2 rounded-full" style={{ width: `${advisory.fusionWeights.riskEnginePercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 8. Actionable Recommendation Cards with Priority Levels */}
      <Card>
        <CardHeader
          title={t('step_by_step_treatment', 'Recommended Action Workflow')}
          subtitle={t('actionable_guidance', 'Prioritized, agronomic field steps tailored to current infection severity')}
          icon={<CheckCircle2 className="h-5 w-5 text-agri-green" />}
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {advisory.actions.length} {t('inferences_logged', 'Action Items')}
            </span>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-1">
          {advisory.actions.map((act) => {
            const getPriorityStyle = (p: string) => {
              switch (p) {
                case 'Critical':
                  return 'bg-red-100 text-danger-red border-red-200';
                case 'High':
                  return 'bg-amber-100 text-yellow-800 border-amber-200';
                case 'Medium':
                  return 'bg-blue-100 text-blue-800 border-blue-200';
                case 'Low':
                  return 'bg-green-100 text-agri-green border-green-200';
                default:
                  return 'bg-gray-100 text-gray-700 border-gray-200';
              }
            };

            return (
              <div
                key={act.id}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityStyle(act.priority)}`}>
                      {t(`badge_${act.priority.toLowerCase()}`, act.priority).toUpperCase()} {t('priority_action_required', 'PRIORITY')}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">{act.timeframe}</span>
                  </div>
                  <h4 className="text-sm font-bold text-dark-forest leading-snug mb-1">
                    {act.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">#{act.id.slice(-1)}</span>
                  <button
                    onClick={() => navigate('/treatment-recommendation')}
                    className="text-xs font-bold text-agri-green hover:text-deep-green flex items-center gap-1"
                  >
                    <span>{t('btn_view_details', 'Configure')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 9. Advisory Timeline (Detection -> Follow-up) */}
      <Card>
        <CardHeader
          title={t('symptom_progression', 'End-to-End Decision Lifecycle Timeline')}
          subtitle={t('step_by_step_treatment', 'Sequential agronomic management progression for this incident')}
          icon={<Calendar className="h-5 w-5 text-gray-500" />}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 pt-2">
          {advisory.timelineStages.map((stage, sIdx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={sIdx}
                className={`p-3.5 rounded-xl border text-center flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-green-50 border-agri-green ring-2 ring-agri-green/20'
                    : isCompleted
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50/70 border-gray-200 opacity-75'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block">{t('step_label', 'Step')} {sIdx + 1}</span>
                  <span className={`text-xs font-bold block my-1 ${
                    isCurrent ? 'text-agri-green' : isCompleted ? 'text-deep-green' : 'text-gray-600'
                  }`}>
                    {stage.stage}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500 block mb-2">{stage.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                  {stage.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Workflow Action Bar */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            {t('nav_treatment', 'Next')}: <strong>{t('treatment_title', 'Treatment Recommendation & Formulation Protocol')}</strong>
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/treatment-recommendation')}
            className="flex items-center gap-2"
          >
            <span>{t('btn_next', 'Proceed to Treatment Protocol')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
