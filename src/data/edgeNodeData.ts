import { EdgeGatewayDiagnostics, NodeHardwareDetail } from '../types';

export const mockGatewayDiagnostics: EdgeGatewayDiagnostics = {
  gatewayId: 'GW-EDGE-01',
  name: 'Edge AI Gateway Hub #1 (Raspberry Pi 4 + ESP32 Coprocessor)',
  status: 'ONLINE',
  processingLatencyMs: 140,
  cpuLoadPercentage: 22,
  cpuTemperature: 42.5,
  memoryUsageMb: 890,
  totalMemoryMb: 4096,
  emmcStorageUsedGb: 14.2,
  emmcStorageTotalGb: 32.0,
  sqliteBufferedPackets: 1420,
  sqliteCachedImages: 28,
  uptimeHours: 336, // 14 days
  connectedNodesCount: 2,
  offlineNodesCount: 0,
};

export const mockNodeHardwareDetails: NodeHardwareDetail[] = [
  {
    nodeId: 'node-01',
    name: 'Field Node 01 (Zone 1 — North)',
    zoneName: 'Zone 1 — North Paddy Field',
    status: 'Connected',
    batteryPercentage: 86,
    solarCharging: true,
    signalStrengthDbm: -68,
    packetDeliveryRate: 99.6,
    lastSyncAgo: '12 sec ago',
    firmwareVersion: 'ESP-IDF v4.4.2-lora',
    loraFrequency: '868.1 MHz / SF7 / BW 125kHz',
    sensorHealth: {
      capacitiveMoisture: 'Active',
      dht22TempHumid: 'Active',
      tippingRain: 'Active',
      loraModule: 'Active',
    },
  },
  {
    nodeId: 'node-02',
    name: 'Field Node 02 (Zone 2 — South)',
    zoneName: 'Zone 2 — South Paddy Field',
    status: 'Connected',
    batteryPercentage: 74,
    solarCharging: true,
    signalStrengthDbm: -72,
    packetDeliveryRate: 98.9,
    lastSyncAgo: '18 sec ago',
    firmwareVersion: 'ESP-IDF v4.4.2-lora',
    loraFrequency: '868.3 MHz / SF7 / BW 125kHz',
    sensorHealth: {
      capacitiveMoisture: 'Active',
      dht22TempHumid: 'Active',
      tippingRain: 'Active',
      loraModule: 'Active',
    },
  },
];

export const mockEdgeModelBenchmarks = [
  {
    modelName: 'MobileNetV2 Foliar Disease CNN',
    format: 'TensorFlow Lite (INT8 Quantized)',
    modelSizeMb: 3.4,
    inferenceTimeMs: 142,
    accuracyPct: 87.6,
    inputShape: '320 × 320 × 3',
    acceleration: 'CPU NEON Vectorized',
  },
  {
    modelName: 'YOLOv8-Nano Pest Detection',
    format: 'ONNX Runtime (INT8)',
    modelSizeMb: 6.2,
    inferenceTimeMs: 118,
    accuracyPct: 84.2,
    inputShape: '320 × 320 × 3',
    acceleration: 'CPU NEON Vectorized',
  },
  {
    modelName: 'Sensor + Vision Risk Fusion Engine',
    format: 'C++ Lightweight Decision Rules',
    modelSizeMb: 0.1,
    inferenceTimeMs: 4,
    accuracyPct: 92.0,
    inputShape: '12 Environmental Features',
    acceleration: 'Direct Memory Cache',
  },
];
