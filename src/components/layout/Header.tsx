import React, { useState } from 'react';
import { 
  Menu, 
  RefreshCw, 
  CloudSun, 
  Radio, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FarmOverview, Alert } from '../../types';
import { Button } from '../ui/Button';
import { useLanguage, SupportedLanguage } from '../../context/LanguageContext';
import { GlobalSearch } from './GlobalSearch';
import { NotificationPanel } from './NotificationPanel';
import { AppNotification } from '../../hooks/useFarmData';

interface HeaderProps {
  onMobileOpen: () => void;
  farmOverview: FarmOverview;
  alerts: Alert[];
  onRefresh: () => void;
  lastRefreshed: string;
  notifications?: AppNotification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onOpenJuryDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMobileOpen,
  farmOverview,
  alerts,
  onRefresh,
  lastRefreshed,
  notifications = [],
  onMarkNotificationAsRead = () => {},
  onMarkAllNotificationsAsRead = () => {},
  onOpenJuryDemo = () => {},
}) => {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage, t } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="relative h-16 bg-white border-b border-[#E6F0EB] px-3 sm:px-5 lg:px-6 flex items-center justify-between shadow-xs min-w-0 w-full overflow-hidden shrink-0 z-20">
      {/* 1. LEFT SECTION: Hamburger + Farm Selector */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
        <button
          onClick={onMobileOpen}
          className="p-2 -ml-1 rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden shrink-0 transition-colors"
          title={t('open_menu', 'Open menu')}
          aria-label={t('open_navigation_menu', 'Open navigation menu')}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="h-8 w-1 bg-agri-green rounded-full hidden sm:block shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm font-bold text-deep-green tracking-tight truncate max-w-[110px] sm:max-w-[150px] lg:max-w-[180px]">
                {farmOverview.name}
              </h1>
              <span className="hidden md:inline-flex text-[10px] font-bold bg-soft-green/40 text-deep-green px-2 py-0.5 rounded-full shrink-0">
                {t('pilot_unit')}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block truncate max-w-[140px] lg:max-w-[200px]">
              {farmOverview.location} • {farmOverview.totalAcres} {t('acres')}
            </p>
          </div>
        </div>
      </div>

      {/* 2. CENTER / FLEXIBLE SECTION: Global Search Input */}
      <div className="hidden md:flex items-center flex-1 min-w-[130px] max-w-xs xl:max-w-sm mx-2 lg:mx-3">
        <GlobalSearch />
      </div>

      {/* RIGHT SIDE: Action/Status Group + Utility Group */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* 3. ACTION & STATUS SECTION: Start Demo, LoRa, Temperature */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Global Demo Mode Indicator */}
          <div className="hidden 2xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream border border-amber-200/60 text-[10px] font-bold text-amber-900 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-warning-amber"></span>
            <span>{t('demo_mode_badge')}</span>
          </div>

          {/* Start Demo Button for SIH Jury */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenJuryDemo}
            icon={<Sparkles className="h-3.5 w-3.5 text-soft-green animate-pulse" />}
            className="bg-deep-green hover:bg-black text-white text-[11px] font-black shadow-xs px-2.5 sm:px-3 py-1.5 shrink-0 whitespace-nowrap"
          >
            <span>{t('btn_start_demo')}</span>
          </Button>

          {/* Edge AI Gateway Live Status Indicator: full label on 2xl, icon badge on smaller viewports */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 border border-green-200/60 rounded-xl text-xs font-medium text-agri-green shrink-0 cursor-default"
            title={t('lora_mesh_status', 'LoRa Mesh Active')}
          >
            <Radio className="h-3.5 w-3.5 animate-pulse text-agri-green shrink-0" />
            <span className="hidden 2xl:inline text-[11px] font-bold text-deep-green whitespace-nowrap">
              {t('lora_mesh_status')}
            </span>
          </div>

          {/* Quick Weather Telemetry */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cream rounded-xl border border-gray-200/70 text-xs text-dark-forest shrink-0 cursor-default"
            title={`${t('weather_intelligence', 'Weather')}: ${farmOverview.weatherSummary.temperature}°C`}
          >
            <CloudSun className="h-3.5 w-3.5 text-warning-amber shrink-0" />
            <span className="font-bold text-[11px] whitespace-nowrap">
              {farmOverview.weatherSummary.temperature}°C
            </span>
          </div>
        </div>

        {/* Section Divider between Action/Status and Utilities */}
        <div className="h-6 w-px bg-gray-200 shrink-0 hidden sm:block" />

        {/* 4. UTILITY SECTION: Refresh, Language, Notifications, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Live Refresh telemetry button */}
          <button
            onClick={handleRefreshClick}
            className={`h-9 w-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-agri-green hover:bg-green-50 border border-gray-200 transition-all shrink-0 ${
              isRefreshing ? 'animate-spin text-agri-green' : ''
            }`}
            title={`${t('btn_refresh')} (${lastRefreshed})`}
            aria-label={t('poll_sensor_data', 'Poll sensor data')}
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {/* Language Selector Toggle */}
          <div className="relative hidden sm:block shrink-0">
            <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50 text-[11px] font-bold">
              {(['EN', 'TA', 'HI'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap ${
                    selectedLanguage.toUpperCase() === lang
                      ? 'bg-agri-green text-white shadow-xs'
                      : 'text-gray-600 hover:text-dark-forest'
                  }`}
                  title={lang === 'EN' ? 'English' : lang === 'TA' ? 'தமிழ்' : 'हिन्दी'}
                >
                  {lang === 'EN' ? 'EN' : lang === 'TA' ? 'தமிழ்' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Dropdown Panel */}
          <div className="shrink-0">
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={onMarkNotificationAsRead}
              onMarkAllAsRead={onMarkAllNotificationsAsRead}
            />
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-gray-200 shrink-0">
            <div className="h-8 w-8 rounded-full bg-agri-green text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              RK
            </div>
            <div className="hidden 2xl:block text-left leading-tight">
              <span className="text-xs font-bold text-dark-forest block truncate max-w-[90px]">{t('farmer_name')}</span>
              <span className="text-[10px] text-gray-500 block truncate max-w-[90px]">{t('lead_farmer')}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
