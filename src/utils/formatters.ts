import { SeverityLevel } from '../types';

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatTemperature(celsius: number): string {
  return `${celsius.toFixed(1)}°C`;
}

export function formatMoisture(percentage: number): string {
  return `${Math.round(percentage)}%`;
}

export function formatRainfall(mm: number): string {
  return `${mm} mm`;
}

export function getSeverityBgColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'CRITICAL':
      return 'bg-danger-red text-white border-danger-red';
    case 'HIGH':
      return 'bg-danger-red/15 text-danger-red border-danger-red/30';
    case 'MEDIUM':
      return 'bg-warning-amber/15 text-yellow-800 border-warning-amber/40';
    case 'LOW':
      return 'bg-agri-green/15 text-agri-green border-agri-green/30';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function getStatusColor(status: string): { bg: string; text: string; dot: string } {
  switch (status) {
    case 'Healthy':
    case 'Online':
    case 'Active':
      return { bg: 'bg-green-50', text: 'text-agri-green', dot: 'bg-agri-green' };
    case 'Water Stress':
    case 'Warning':
      return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-warning-amber' };
    case 'Disease Risk':
    case 'Pest Infestation':
    case 'Fault':
      return { bg: 'bg-red-50', text: 'text-danger-red', dot: 'bg-danger-red' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' };
  }
}
