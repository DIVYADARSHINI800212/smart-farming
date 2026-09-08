import { DailyForecastItem, HourlyForecastItem, SprayWindowSuitability } from '../types';

export const mockCurrentWeather = {
  temperature: 28.0,
  feelsLike: 29.5,
  condition: 'Partly Cloudy',
  humidity: 78,
  windSpeedKmh: 12,
  windDirection: 'SSE (155°)',
  pressureHpa: 1012,
  uvIndex: 5,
  dewPoint: 23.8,
  rainProbability: 25,
  rainfallTodayMm: 0.0,
};

export const mockHourlyForecast: HourlyForecastItem[] = [
  { time: '06:00', temp: 24, humidity: 88, rainProb: 5, condition: 'Clear Dawn', icon: 'Sun' },
  { time: '08:00', temp: 26, humidity: 82, rainProb: 10, condition: 'Sunny', icon: 'Sun' },
  { time: '10:00', temp: 28, humidity: 76, rainProb: 15, condition: 'Partly Cloudy', icon: 'CloudSun' },
  { time: '12:00', temp: 31, humidity: 68, rainProb: 20, condition: 'Partly Cloudy', icon: 'CloudSun' },
  { time: '14:00', temp: 32, humidity: 64, rainProb: 25, condition: 'Scattered Clouds', icon: 'Cloud' },
  { time: '16:00', temp: 30, humidity: 70, rainProb: 30, condition: 'Cloudy', icon: 'Cloud' },
  { time: '18:00', temp: 28, humidity: 78, rainProb: 40, condition: 'Light Drizzle Risk', icon: 'CloudDrizzle' },
  { time: '20:00', temp: 26, humidity: 85, rainProb: 35, condition: 'Overcast', icon: 'Cloud' },
  { time: '22:00', temp: 25, humidity: 89, rainProb: 20, condition: 'Clear Night', icon: 'Moon' },
];

export const mock7DayForecast: DailyForecastItem[] = [
  { day: 'Today', date: 'Sep 08', minTemp: 23, maxTemp: 32, condition: 'Partly Cloudy', rainProb: 25, expectedRainMm: 0.5, windSpeed: 12 },
  { day: 'Wed', date: 'Sep 09', minTemp: 24, maxTemp: 31, condition: 'Afternoon Drizzle', rainProb: 65, expectedRainMm: 3.2, windSpeed: 14 },
  { day: 'Thu', date: 'Sep 10', minTemp: 23, maxTemp: 30, condition: 'Light Rain Showers', rainProb: 50, expectedRainMm: 2.0, windSpeed: 10 },
  { day: 'Fri', date: 'Sep 11', minTemp: 22, maxTemp: 32, condition: 'Mostly Sunny', rainProb: 15, expectedRainMm: 0.0, windSpeed: 9 },
  { day: 'Sat', date: 'Sep 12', minTemp: 23, maxTemp: 33, condition: 'Sunny & Warm', rainProb: 10, expectedRainMm: 0.0, windSpeed: 8 },
  { day: 'Sun', date: 'Sep 13', minTemp: 24, maxTemp: 33, condition: 'Clear Skies', rainProb: 5, expectedRainMm: 0.0, windSpeed: 7 },
  { day: 'Mon', date: 'Sep 14', minTemp: 24, maxTemp: 32, condition: 'Partly Cloudy', rainProb: 20, expectedRainMm: 0.2, windSpeed: 11 },
];

export const mockSprayWindowSuitability: SprayWindowSuitability[] = [
  {
    date: 'Today (Sep 08)',
    timeWindow: '06:00 AM – 08:30 AM',
    temperatureStatus: 'Suitable',
    tempValue: '24°C – 26°C',
    windStatus: 'Low',
    windValue: '6 km/h (Minimal Drift)',
    rainfallRisk: 'Low',
    rainProbValue: '5% (Zero Rain)',
    humidityStatus: 'Suitable',
    humidityValue: '78% (Good Adherence)',
    overallStatus: 'GOOD APPLICATION WINDOW',
    notes: 'Optimal meteorological conditions for foliar bio-fungicide (*Pseudomonas*) or protective spray.',
  },
  {
    date: 'Today (Sep 08)',
    timeWindow: '12:00 PM – 03:30 PM',
    temperatureStatus: 'Marginal',
    tempValue: '31°C – 32°C (High)',
    windStatus: 'Moderate',
    windValue: '15 km/h',
    rainfallRisk: 'Low',
    rainProbValue: '20%',
    humidityStatus: 'Marginal',
    humidityValue: '64% (Rapid Evaporation)',
    overallStatus: 'NO-SPRAY WINDOW',
    notes: 'High ambient temperature induces rapid droplet evaporation and spray drift. Avoid spraying.',
  },
  {
    date: 'Tomorrow (Sep 09)',
    timeWindow: '06:00 AM – 08:00 AM',
    temperatureStatus: 'Suitable',
    tempValue: '24°C',
    windStatus: 'Low',
    windValue: '7 km/h',
    rainfallRisk: 'Moderate',
    rainProbValue: '45% by afternoon',
    humidityStatus: 'Suitable',
    humidityValue: '82%',
    overallStatus: 'MARGINAL WINDOW',
    notes: 'Morning spray possible only if rain-fast adjuvant is added (rain showers expected after 14:00).',
  },
];
