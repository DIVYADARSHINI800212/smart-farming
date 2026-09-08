import { useState, useCallback } from 'react';
import { 
  mockFarmOverview, 
  mockZones, 
  mockNodes, 
  mockAlerts, 
  mockAIRecommendations,
  mockTrendData,
  mock30DayCropHealthTrend,
  mockRiskDistribution
} from '../data/mockData';
import { Alert, AlertStatus, Zone } from '../types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  zone: string;
  read: boolean;
  link: string;
}

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Disease risk increased in Zone 2',
    message: 'Blast sporulation probability reached 82% due to 85% humidity and recent 2mm rain.',
    severity: 'HIGH',
    timestamp: '5m ago',
    zone: 'Zone 2',
    read: false,
    link: '/farmer-advisory',
  },
  {
    id: 'notif-2',
    title: 'Irrigation recommended for Zone 1',
    message: 'Moisture dropped to 32%. 45-minute scheduled irrigation cycle recommended.',
    severity: 'MEDIUM',
    timestamp: '18m ago',
    zone: 'Zone 1',
    read: false,
    link: '/smart-irrigation',
  },
  {
    id: 'notif-3',
    title: 'Weather window suitable for application',
    message: 'Calm wind (<12 km/h) and no heavy rain projected for the next 18 hours.',
    severity: 'LOW',
    timestamp: '42m ago',
    zone: 'Farm-wide',
    read: false,
    link: '/treatment-timing',
  },
  {
    id: 'notif-4',
    title: 'Leaf Folder activity detected',
    message: '78% confidence identification in Zone 2. Early biological or targeted treatment advised.',
    severity: 'HIGH',
    timestamp: '1h ago',
    zone: 'Zone 2',
    read: true,
    link: '/pest-detection',
  },
  {
    id: 'notif-5',
    title: 'Node 02 battery low alert resolved',
    message: 'Solar charge cycle nominal. Battery back to 89% with -72 dBm LoRa RSSI.',
    severity: 'LOW',
    timestamp: '3h ago',
    zone: 'Zone 2',
    read: true,
    link: '/edge-nodes',
  },
];

export type DemoPreset = 'normal' | 'water_stress' | 'disease_risk' | 'heavy_rain' | 'pest_outbreak';

export function useFarmData() {
  const [farmOverview, setFarmOverview] = useState(mockFarmOverview);
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [nodes, setNodes] = useState(mockNodes);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [recommendations] = useState(mockAIRecommendations);
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [activePreset, setActivePreset] = useState<DemoPreset>('disease_risk');
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isJuryDemoOpen, setIsJuryDemoOpen] = useState(false);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' as AlertStatus } : a));
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' as AlertStatus } : a));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const refreshSensorData = useCallback(() => {
    setZones(prev => prev.map(z => {
      const deltaMoisture = (Math.random() - 0.5) * 1.5;
      const deltaTemp = (Math.random() - 0.5) * 0.4;
      const newMoisture = Math.max(10, Math.min(90, +(z.currentReading.soilMoisture + deltaMoisture).toFixed(1)));
      const newTemp = +(z.currentReading.temperature + deltaTemp).toFixed(1);

      return {
        ...z,
        currentReading: {
          ...z.currentReading,
          soilMoisture: newMoisture,
          temperature: newTemp,
          timestamp: 'Just now (live LoRa packet)',
        }
      };
    }));

    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const applyPreset = useCallback((preset: DemoPreset) => {
    setActivePreset(preset);
    setZones(prev => {
      if (preset === 'normal') {
        return prev.map(z => ({
          ...z,
          status: 'Optimal',
          currentReading: {
            ...z.currentReading,
            soilMoisture: z.zoneId === 'zone-1' ? 52 : 54,
            temperature: 26,
            humidity: 65,
            rainfall: 0,
          },
          riskScore: 28,
          affectedAreaPercentage: 4,
          diseaseDistribution: [
            { label: 'Healthy', percentage: 92 },
            { label: 'Brown Spot', percentage: 4 },
            { label: 'Blast', percentage: 2 },
            { label: 'Others', percentage: 2 },
          ],
          pestDistribution: [
            { label: 'No Pest', percentage: 90 },
            { label: 'Leaf Folder', percentage: 5 },
            { label: 'Stem Borer', percentage: 3 },
            { label: 'Planthopper', percentage: 2 },
          ],
        }));
      } else if (preset === 'water_stress') {
        return prev.map(z => ({
          ...z,
          status: 'Water Stress',
          currentReading: {
            ...z.currentReading,
            soilMoisture: z.zoneId === 'zone-1' ? 22 : 28,
            temperature: 33,
            humidity: 50,
            rainfall: 0,
          },
          riskScore: 78,
          affectedAreaPercentage: 25,
        }));
      } else if (preset === 'disease_risk') {
        // Global Demo Primary Scenario
        return mockZones;
      } else if (preset === 'heavy_rain') {
        return prev.map(z => ({
          ...z,
          status: 'Flooding Risk',
          currentReading: {
            ...z.currentReading,
            soilMoisture: 88,
            temperature: 24,
            humidity: 95,
            rainfall: 42,
          },
          riskScore: 84,
          affectedAreaPercentage: 30,
        }));
      } else if (preset === 'pest_outbreak') {
        return prev.map(z => ({
          ...z,
          status: 'Pest Infested',
          currentReading: {
            ...z.currentReading,
            soilMoisture: 42,
            temperature: 29,
            humidity: 78,
            rainfall: 0,
          },
          riskScore: 92,
          affectedAreaPercentage: 38,
          pestDistribution: [
            { label: 'Leaf Folder', percentage: 88 },
            { label: 'Stem Borer', percentage: 8 },
            { label: 'Planthopper', percentage: 2 },
            { label: 'No Pest', percentage: 2 },
          ],
        }));
      }
      return prev;
    });

    setFarmOverview(prev => ({
      ...prev,
      healthScore: preset === 'normal' ? 94 : preset === 'disease_risk' ? 84 : preset === 'water_stress' ? 68 : 62,
      cropHealthStatus: preset === 'normal' ? 'Optimal' : preset === 'disease_risk' ? 'Good' : 'Needs Attention',
    }));
  }, []);

  const updateZoneReading = useCallback((zoneId: string, updates: Partial<Zone['currentReading']>) => {
    setZones(prev => prev.map(z => z.zoneId === zoneId ? {
      ...z,
      currentReading: { ...z.currentReading, ...updates }
    } : z));
  }, []);

  return {
    farmOverview,
    zones,
    nodes,
    alerts,
    recommendations,
    trendData: mockTrendData,
    healthTrend30Days: mock30DayCropHealthTrend,
    riskDistribution: mockRiskDistribution,
    isSimulating,
    setIsSimulating,
    lastRefreshed,
    activePreset,
    notifications,
    isJuryDemoOpen,
    setIsJuryDemoOpen,
    acknowledgeAlert,
    resolveAlert,
    refreshSensorData,
    applyPreset,
    updateZoneReading,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
}
