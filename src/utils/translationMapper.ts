/**
 * Mapping utility for translating data labels to translation keys
 * This allows data files to remain static while UI adapts to language changes
 */

export const statusLabelMap: Record<string, string> = {
  'Water Stress': 'status_water_stress',
  'Disease Risk': 'status_disease_risk',
  'Online': 'status_online',
  'Offline': 'status_offline',
  'Good': 'status_good',
  'Critical': 'status_critical',
  'Active': 'status_active',
  'Resolved': 'status_resolved',
};

export const growthStageLabelMap: Record<string, string> = {
  'Tillering Stage': 'growth_stage_tillering',
  'Active Tillering': 'growth_stage_active_tillering',
  'Panicle Initiation': 'growth_stage_panicle_initiation',
  'Heading & Flowering': 'growth_stage_heading_flowering',
  'Ripening & Harvest': 'growth_stage_ripening_harvest',
  'Vegetative': 'growth_stage_vegetative',
  'Reproductive': 'growth_stage_reproductive',
};

export const riskLevelMap: Record<string, string> = {
  'Low': 'risk_low',
  'Medium': 'risk_medium',
  'Medium-High': 'risk_medium_high',
  'High': 'risk_high',
  'Critical': 'risk_critical',
};

export const cropVarietyMap: Record<string, string> = {
  'Paddy (ADT 43 Rice)': 'crop_paddy_adt43',
  'Paddy (BPT 5204 Samba Masuri)': 'crop_paddy_bpt5204',
};

export const weatherConditionMap: Record<string, string> = {
  'Partly Cloudy': 'weather_partly_cloudy',
  'Clear Dawn': 'weather_clear_dawn',
  'Sunny': 'weather_sunny',
  'Scattered Clouds': 'weather_scattered_clouds',
  'Light Drizzle Risk': 'weather_light_drizzle_risk',
  'Moderate Rain': 'weather_moderate_rain',
  'Heavy Rain': 'weather_heavy_rain',
};

export const diseaseNameMap: Record<string, string> = {
  'Blast': 'disease_blast',
  'Brown Spot': 'disease_brown_spot',
  'Sheath Blight': 'disease_sheath_blight',
  'Leaf Scald': 'disease_leaf_scald',
  'Healthy': 'dist_healthy',
  'Others': 'dist_others',
};

export const pestNameMap: Record<string, string> = {
  'Leaf Folder': 'pest_leaf_folder',
  'Stem Borer': 'pest_stem_borer',
  'Planthopper': 'pest_planthopper',
  'No Pest': 'pest_none',
};

export const zoneNameMap: Record<string, string> = {
  'Zone 1 — North Paddy Field': 'zone_1_north_paddy_short',
  'Zone 2 — South Paddy Field': 'zone_2_south_paddy_short',
};

export const distributionLabelMap: Record<string, string> = {
  'Healthy': 'dist_healthy',
  'Affected': 'dist_affected',
  'Others': 'dist_others',
};

/**
 * Get translation key for a data label
 * Falls back to the original label if no mapping exists
 */
export function getLabelTranslationKey(label: string, mapType: 'status' | 'growth' | 'risk' | 'crop' | 'weather' | 'disease' | 'pest' | 'zone' | 'distribution'): string {
  const maps = {
    status: statusLabelMap,
    growth: growthStageLabelMap,
    risk: riskLevelMap,
    crop: cropVarietyMap,
    weather: weatherConditionMap,
    disease: diseaseNameMap,
    pest: pestNameMap,
    zone: zoneNameMap,
    distribution: distributionLabelMap,
  };
  
  return maps[mapType][label] || label;
}

/**
 * Utility to translate a label using the mapping
 * Usage: translateLabel('Water Stress', 'status', t)
 */
export function translateLabel(
  label: string, 
  mapType: 'status' | 'growth' | 'risk' | 'crop' | 'weather' | 'disease' | 'pest' | 'zone' | 'distribution',
  t: (key: string, fallback?: string) => string
): string {
  const key = getLabelTranslationKey(label, mapType);
  return t(key, label);
}

/**
 * Extract and translate growth stage from concatenated string like "Tillering Stage (Day 42)"
 * Returns translated stage with day info preserved
 */
export function translateGrowthStage(
  growthStageStr: string,
  t: (key: string, fallback?: string) => string
): string {
  if (!growthStageStr) return growthStageStr;
  
  // Extract the stage name and day info
  // Format: "Stage Name (Day XX)" or just "Stage Name"
  const match = growthStageStr.match(/^(.*?)(\s*\(.*\))?$/);
  if (!match) return growthStageStr;
  
  const stageName = match[1]?.trim() || '';
  const dayInfo = match[2] || '';
  
  // Translate the stage name
  const translatedStage = translateLabel(stageName, 'growth', t);
  
  // Preserve the day info if it existed
  return dayInfo ? `${translatedStage} ${dayInfo}` : translatedStage;
}

/**
 * Translate crop variety name
 */
export function translateCropVariety(
  cropType: string,
  t: (key: string, fallback?: string) => string
): string {
  return translateLabel(cropType, 'crop', t);
}

/**
 * Translate zone name
 */
export function translateZoneName(
  zoneName: string,
  t: (key: string, fallback?: string) => string
): string {
  return translateLabel(zoneName, 'zone', t);
}

/**
 * Translate risk level (Low, Medium, Medium-High, High, Critical)
 */
export function translateRiskLevel(
  riskLevel: string,
  t: (key: string, fallback?: string) => string
): string {
  return translateLabel(riskLevel, 'risk', t);
}

/**
 * Translate status (Online, Offline, Good, Critical, Active, Resolved, etc.)
 */
export function translateStatus(
  status: string,
  t: (key: string, fallback?: string) => string
): string {
  return translateLabel(status, 'status', t);
}

export const reportTypeMap: Record<string, string> = {
  'Farm Health Report': 'rep_type_farm_health',
  'Crop Health Report': 'rep_type_crop_health',
  'Disease Report': 'rep_type_disease',
  'Pest Report': 'rep_type_pest',
  'Irrigation Report': 'rep_type_irrigation',
  'Environmental Report': 'rep_type_environmental',
  'Treatment Report': 'rep_type_treatment',
  'Weather Report': 'rep_type_weather',
  'Water Usage Report': 'rep_type_water_usage',
  'Yield Risk Report': 'rep_type_yield_risk',
  'Alert Report': 'rep_type_alert',
  'Historical Report': 'rep_type_historical',
};

export const reportCategoryMap: Record<string, string> = {
  'Executive Summary': 'category_exec_summary',
  'Agronomy': 'category_agronomy',
  'Pathology': 'category_pathology',
  'Entomology': 'category_entomology',
  'Water Resource': 'category_water_resource',
  'Environmental': 'category_environmental',
  'Crop Protection': 'category_crop_protection',
  'Meteorology': 'category_meteorology',
  'Sustainability': 'category_sustainability',
  'Forecasting': 'category_forecasting',
  'Compliance': 'category_compliance',
  'Longitudinal': 'category_longitudinal',
  'All': 'filter_all',
};

/**
 * Translate an entire FarmReportCard object reactively
 */
export function translateReport<T extends { id: string; type: string; title: string; description: string; period: string; lastGenerated: string; status: string; category: string }>(
  report: T,
  t: (key: string, fallback?: string) => string
): T {
  const normId = report.id.replace('-', '_');
  const typeKey = reportTypeMap[report.type] || `rep_type_${normId}`;
  const catKey = reportCategoryMap[report.category] || `cat_${report.category.toLowerCase().replace(/\s+/g, '_')}`;

  return {
    ...report,
    type: t(typeKey, report.type),
    title: t(`rep_${normId}_title`, report.title),
    description: t(`rep_${normId}_desc`, report.description),
    period: t(`rep_${normId}_period`, report.period),
    lastGenerated: t(`rep_${normId}_last_gen`, report.lastGenerated),
    status: (t(`status_${report.status.toLowerCase()}`, report.status) as any),
    category: t(catKey, report.category),
  };
}

/**
 * Translate an entire Alert object reactively
 */
export function translateAlert<T extends { id: string; title: string; message: string; recommendedAction?: string; zoneName?: string }>(
  alert: T,
  t: (key: string, fallback?: string) => string
): T {
  const normId = alert.id.replace('-', '_');
  return {
    ...alert,
    title: t(`alt_${normId}_title`, alert.title),
    message: t(`alt_${normId}_msg`, alert.message),
    recommendedAction: alert.recommendedAction ? t(`alt_${normId}_action`, alert.recommendedAction) : alert.recommendedAction,
    zoneName: alert.zoneName ? translateZoneName(alert.zoneName, t) : alert.zoneName,
  };
}



