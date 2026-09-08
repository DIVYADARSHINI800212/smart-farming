import React, { createContext, useContext, useState } from 'react';

export type SupportedLanguage = 'EN' | 'HI' | 'TA';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    // Nav items
    nav_dashboard: 'Dashboard',
    nav_field_monitoring: 'Field Monitoring',
    nav_crop_health: 'Crop Health',
    nav_ai_vision: 'AI Vision',
    nav_disease_detection: 'Disease Detection',
    nav_pest_detection: 'Pest Detection',
    nav_risk_assessment: 'Risk Assessment',
    nav_smart_irrigation: 'Smart Irrigation',
    nav_env_monitoring: 'Environmental Monitoring',
    nav_weather: 'Weather Intelligence',
    nav_edge_nodes: 'Edge AI & Nodes',
    nav_farmer_advisory: 'Farmer Advisory',
    nav_treatment: 'Treatment Recommendation',
    nav_inputs: 'Agricultural Inputs',
    nav_availability: 'Product Availability',
    nav_timing: 'Treatment Timing',
    nav_cost: 'Treatment Cost',
    nav_followup: 'Treatment Follow-Up',
    nav_alerts: 'Alerts',
    nav_farm_analytics: 'Farm Analytics',
    nav_yield_forecast: 'Yield Forecast',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    btn_start_demo: 'Start Demo',

    // Phase 4 Common Actions
    action_review_treatment: 'Review Treatment Options',
    action_view_inputs: 'View Agricultural Inputs',
    action_check_availability: 'Check Product Availability',
    action_check_timing: 'Check Application Timing',
    action_estimate_cost: 'Estimate Treatment Cost',
    action_start_followup: 'Start Follow-up & Tracking',
    action_inspect_zone: 'Inspect Field Zone',
    action_calculate: 'Recalculate Expenses',
    action_back: 'Previous Step',
    action_next: 'Next Step',

    // Badges & Disclaimers
    badge_demo_data: 'DEMO / PROTOTYPE DATA',
    badge_in_stock: 'In Stock',
    badge_limited_stock: 'Limited Stock',
    badge_out_of_stock: 'Out of Stock',
    badge_suitable: 'Suitable',
    badge_caution: 'Caution',
    badge_not_suitable: 'Not Suitable',
    badge_critical: 'Critical',
    badge_high: 'High',
    badge_medium: 'Medium',
    badge_low: 'Low',

    // Banner Text
    disclaimer_general: 'PROTOTYPE DEMONSTRATION ONLY — Verify with local agricultural university extension, Krishi Vigyan Kendra (KVK), and approved product label before field application.',
    disclaimer_cost: 'Demo cost estimates — actual product, dealer, and labour rates vary by regional market.',
    disclaimer_weather: 'Demo weather intelligence — verify local meteorological advisories prior to spraying.',
  },
  TA: {
    // Nav items in Tamil
    nav_dashboard: 'முகப்பு பலகை',
    nav_field_monitoring: 'வயல் கண்காணிப்பு',
    nav_crop_health: 'பயிர் ஆரோக்கியம்',
    nav_ai_vision: 'AI பார்வை ஆய்வு',
    nav_disease_detection: 'நோய் கண்டறிதல்',
    nav_pest_detection: 'பூச்சி கண்டறிதல்',
    nav_risk_assessment: 'ஆபத்து மதிப்பீடு',
    nav_smart_irrigation: 'நுண்ணீர் பாசனம்',
    nav_env_monitoring: 'சுற்றுச்சூழல் கண்காணிப்பு',
    nav_weather: 'வானிலை தகவல்',
    nav_edge_nodes: 'எட்ஜ் AI & முனையங்கள்',
    nav_farmer_advisory: 'விவசாயி வழிகாட்டி',
    nav_treatment: 'சிகிச்சை பரிந்துரை',
    nav_inputs: 'வேளாண் உள்ளீடுகள்',
    nav_availability: 'பொருட்கள் இருப்பு',
    nav_timing: 'சிகிச்சை நேரம்',
    nav_cost: 'சிகிச்சை செலவு',
    nav_followup: 'சிகிச்சை பின்தொடர்தல்',
    nav_alerts: 'எச்சரிக்கைகள்',
    nav_farm_analytics: 'பண்ணை பகுப்பாய்வு',
    nav_yield_forecast: 'மகசூல் முன்னறிவிப்பு',
    nav_reports: 'அறிக்கைகள்',
    nav_settings: 'அமைப்புகள்',
    btn_start_demo: 'மாதிரி தொடங்கு',

    // Phase 4 Common Actions
    action_review_treatment: 'சிகிச்சை முறைகளை காண்க',
    action_view_inputs: 'வேளாண் உள்ளீடுகளை காண்க',
    action_check_availability: 'இருப்பு விவரங்களை சரிபார்க்கவும்',
    action_check_timing: 'தெளிக்கும் நேரத்தை காண்க',
    action_estimate_cost: 'செலவை மதிப்பிடவும்',
    action_start_followup: 'பின்தொடர்தலை தொடங்கவும்',
    action_inspect_zone: 'வயலை நேரில் ஆய்வு செய்க',
    action_calculate: 'செலவை மறுமதிப்பிடு',
    action_back: 'முந்தைய படி',
    action_next: 'அடுத்த படி',

    // Badges & Disclaimers
    badge_demo_data: 'மாதிரி / முன்னோட்ட தரவு',
    badge_in_stock: 'இருப்பில் உள்ளது',
    badge_limited_stock: 'குறைந்த இருப்பு',
    badge_out_of_stock: 'இருப்பில் இல்லை',
    badge_suitable: 'பொருத்தமானது',
    badge_caution: 'கவனம் தேவை',
    badge_not_suitable: 'பொருத்தமற்றது',
    badge_critical: 'மிக அவசரம்',
    badge_high: 'அதிகம்',
    badge_medium: 'நடுத்தரம்',
    badge_low: 'குறைவு',

    // Banner Text
    disclaimer_general: 'மாதிரி செயல்முறை மட்டுமே — களப்பயன்பாட்டிற்கு முன் அங்கீகரிக்கப்பட்ட வேளாண் அதிகாரிகள் மற்றும் தயாரிப்பு லேபிளை சரிபார்க்கவும்.',
    disclaimer_cost: 'மாதிரி மதிப்பீடுகள் — உண்மையான விலை சந்தை மற்றும் உழைப்பாளர் கூலியைப் பொறுத்து மாறுபடும்.',
    disclaimer_weather: 'மாதிரி வானிலை தகவல் — மருந்து தெளிப்பதற்கு முன் உள்ளூர் வானிலை எச்சரிக்கையை கவனிக்கவும்.',
  },
  HI: {
    // Nav items in Hindi
    nav_dashboard: 'डैशबोर्ड',
    nav_field_monitoring: 'खेत निगरानी',
    nav_crop_health: 'फसल स्वास्थ्य',
    nav_ai_vision: 'एआई विज़न जांच',
    nav_disease_detection: 'रोग पहचान',
    nav_pest_detection: 'कीट पहचान',
    nav_risk_assessment: 'जोखिम मूल्यांकन',
    nav_smart_irrigation: 'स्मार्ट सिंचाई',
    nav_env_monitoring: 'पर्यावरण निगरानी',
    nav_weather: 'मौसम पूर्वानुमान',
    nav_edge_nodes: 'एज एआई नोड्स',
    nav_farmer_advisory: 'किसान सलाह (एडवाइजरी)',
    nav_treatment: 'उपचार सिफारिश',
    nav_inputs: 'कृषि उत्पाद व इनपुट',
    nav_availability: 'उत्पाद उपलब्धता',
    nav_timing: 'छिड़काव का सही समय',
    nav_cost: 'उपचार लागत अनुमान',
    nav_followup: 'उपचार निगरानी (फॉलो-अप)',
    nav_alerts: 'अलर्ट व चेतावनियां',
    nav_farm_analytics: 'खेत विश्लेषिकी',
    nav_yield_forecast: 'उपज पूर्वानुमान',
    nav_reports: 'कृषि रिपोर्टें',
    nav_settings: 'सिस्टम सेटिंग्स',
    btn_start_demo: 'डेमो शुरू करें',

    // Phase 4 Common Actions
    action_review_treatment: 'उपचार विकल्प देखें',
    action_view_inputs: 'कृषि इनपुट देखें',
    action_check_availability: 'दुकान में उपलब्धता जांचें',
    action_check_timing: 'छिड़काव समय जांचें',
    action_estimate_cost: 'लागत का अनुमान लगाएं',
    action_start_followup: 'फॉलो-अप शुरू करें',
    action_inspect_zone: 'खेत का निरीक्षण करें',
    action_calculate: 'लागत पुनर्गणना',
    action_back: 'पिछला चरण',
    action_next: 'अगला चरण',

    // Badges & Disclaimers
    badge_demo_data: 'डेमो / प्रोटोटाइप डेटा',
    badge_in_stock: 'उपलब्ध है',
    badge_limited_stock: 'सीमित स्टॉक',
    badge_out_of_stock: 'स्टॉक समाप्त',
    badge_suitable: 'अनुकूल',
    badge_caution: 'सावधानी बरतें',
    badge_not_suitable: 'अनुपयुक्त',
    badge_critical: 'अति गंभीर',
    badge_high: 'उच्च',
    badge_medium: 'मध्यम',
    badge_low: 'निम्न',

    // Banner Text
    disclaimer_general: 'केवल डेमो / प्रोटोटाइप प्रदर्शन — वास्तविक छिड़काव से पहले कृषि विज्ञान केंद्र और उत्पाद लेबल से पुष्टि करें।',
    disclaimer_cost: 'डेमो अनुमान — वास्तविक दरें स्थानीय बाजार और मजदूरी के आधार पर भिन्न हो सकती हैं।',
    disclaimer_weather: 'डेमो मौसम डेटा — छिड़काव से पहले स्थानीय मौसम पूर्वानुमान अवश्य जांचें।',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('EN');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['EN']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
