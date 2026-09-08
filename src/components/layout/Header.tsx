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
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E6F0EB] px-3 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger + Farm Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          title="Open menu"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-1 bg-agri-green rounded-full hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold text-deep-green tracking-tight truncate max-w-[130px] sm:max-w-none">
                {farmOverview.name}
              </h1>
              <span className="hidden md:inline-flex text-[10px] font-bold bg-soft-green/40 text-deep-green px-2 py-0.5 rounded-full">
                SIH Pilot Unit 1
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block">
              {farmOverview.location} • {farmOverview.totalAcres} Acres
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search Input */}
      <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-3">
        <GlobalSearch />
      </div>

      {/* Right side: Demo badge, Start Demo, Refresh, Language, Notifications, User */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Global Demo Mode Indicator (Section 19) */}
        <div className="hidden 2xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream border border-amber-200/60 text-[10px] font-bold text-amber-900">
          <span className="w-1.5 h-1.5 rounded-full bg-warning-amber"></span>
          <span>Demo Mode • Simulated Farm Data</span>
        </div>

        {/* Start Demo Button for SIH Jury (Section 23) */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenJuryDemo}
          icon={<Sparkles className="h-3.5 w-3.5 text-soft-green animate-pulse" />}
          className="bg-deep-green hover:bg-black text-white text-[11px] font-black shadow-xs px-2.5 sm:px-3 py-1.5"
        >
          <span>{t('btn_start_demo')}</span>
        </Button>

        {/* Edge AI Gateway Live Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-green-50 border border-green-200/60 rounded-full text-xs font-medium text-agri-green">
          <Radio className="h-3 w-3 animate-pulse text-agri-green" />
          <span className="text-[11px] font-bold text-deep-green">LoRa Mesh (2 Nodes)</span>
        </div>

        {/* Quick Weather Telemetry */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-cream rounded-full border border-gray-200/60 text-xs text-dark-forest">
          <CloudSun className="h-3.5 w-3.5 text-warning-amber shrink-0" />
          <span className="font-bold text-[11px]">{farmOverview.weatherSummary.temperature}°C</span>
        </div>

        {/* Live Refresh telemetry button */}
        <button
          onClick={handleRefreshClick}
          className={`p-2 rounded-xl text-gray-600 hover:text-agri-green hover:bg-green-50 border border-gray-200 transition-all ${
            isRefreshing ? 'animate-spin text-agri-green' : ''
          }`}
          title={`Poll latest sensor packet (Last: ${lastRefreshed})`}
          aria-label="Poll sensor data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Language Selector Toggle */}
        <div className="relative hidden sm:block">
          <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50 text-[11px] font-bold">
            {(['EN', 'TA', 'HI'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  selectedLanguage === lang
                    ? 'bg-agri-green text-white shadow-xs'
                    : 'text-gray-600 hover:text-dark-forest'
                }`}
                title={lang === 'EN' ? 'English' : lang === 'TA' ? 'தமிழ்' : 'हिन्दी'}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Dropdown Panel (Section 9) */}
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={onMarkNotificationAsRead}
          onMarkAllAsRead={onMarkAllNotificationsAsRead}
        />

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-gray-200">
          <div className="h-8 w-8 rounded-full bg-agri-green text-white flex items-center justify-center font-bold text-xs shadow-xs">
            RK
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <span className="text-xs font-bold text-dark-forest block">Ramesh Kumar</span>
            <span className="text-[10px] text-gray-500 block">Lead Farmer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
