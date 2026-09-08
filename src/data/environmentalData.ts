import { MicroclimateMetrics } from '../types';

export const mockMicroclimateZone1: MicroclimateMetrics = {
  airTemperature: 28.0,
  soilTemperature: 25.4,
  relativeHumidity: 70,
  rainfall24h: 0,
  windSpeedKmh: 12,
  windDirection: 'SSE (155°)',
  vpdKpa: 1.12,
  vpdStatus: 'Optimal',
  leafWetnessHours: 2.1,
  leafWetnessRisk: 'Low',
  heatStressIndex: 'Low',
  humidityStressIndex: 'Low',
};

export const mockMicroclimateZone2: MicroclimateMetrics = {
  airTemperature: 27.0,
  soilTemperature: 24.8,
  relativeHumidity: 85,
  rainfall24h: 2,
  windSpeedKmh: 9,
  windDirection: 'SSE (150°)',
  vpdKpa: 0.52,
  vpdStatus: 'Low Transpiration',
  leafWetnessHours: 6.4,
  leafWetnessRisk: 'High (Blast Sporulation Risk)',
  heatStressIndex: 'Low',
  humidityStressIndex: 'High',
};

export const mock24HourEnvironmentalTrend = [
  { time: '00:00', airTemp: 23.2, soilTemp: 24.1, humidity: 92, vpd: 0.22, rain: 0 },
  { time: '03:00', airTemp: 22.4, soilTemp: 23.8, humidity: 94, vpd: 0.16, rain: 0 },
  { time: '06:00', airTemp: 23.5, soilTemp: 23.9, humidity: 88, vpd: 0.35, rain: 0 },
  { time: '09:00', airTemp: 26.1, soilTemp: 24.5, humidity: 79, vpd: 0.72, rain: 0 },
  { time: '12:00', airTemp: 29.4, soilTemp: 26.2, humidity: 68, vpd: 1.34, rain: 0 },
  { time: '14:00', airTemp: 30.2, soilTemp: 26.8, humidity: 65, vpd: 1.48, rain: 0 },
  { time: '16:00', airTemp: 28.5, soilTemp: 26.0, humidity: 72, vpd: 1.08, rain: 0 },
  { time: '18:00', airTemp: 27.1, soilTemp: 25.4, humidity: 78, vpd: 0.78, rain: 0 },
  { time: '21:00', airTemp: 25.0, soilTemp: 24.8, humidity: 86, vpd: 0.44, rain: 0 },
];
