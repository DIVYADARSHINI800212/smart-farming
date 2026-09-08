import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  RefreshCw, 
  CloudSun, 
  Radio, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  User,
  Globe,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, FarmOverview } from '../../types';
import { Button } from '../ui/Button';
import { useLanguage, SupportedLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onMobileOpen: () => void;
  farmOverview: FarmOverview;
  alerts: Alert[];
  onRefresh: () => void;
  lastRefreshed: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMobileOpen,
  farmOverview,
  alerts,
  onRefresh,
  lastRefreshed,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'Active');

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E6F0EB] px-4 lg:px-6 flex items-center justify-between shadow-sm">
      {/* Left side: Hamburger + Farm Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          title="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-agri-green rounded-full hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-deep-green tracking-tight">
                {farmOverview.name}
              </h1>
              <span className="hidden md:inline-flex text-[11px] font-semibold bg-soft-green/30 text-deep-green px-2 py-0.5 rounded-full">
                SIH Unit 1
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block">
              {farmOverview.location} • {farmOverview.totalAcres} Acres
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Edge status, Weather, Refresh, Language, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Edge AI Gateway Live Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/60 rounded-full text-xs font-medium text-agri-green">
          <Radio className="h-3.5 w-3.5 animate-pulse text-agri-green" />
          <span>Edge LoRa Gateway:</span>
          <span className="font-bold text-deep-green">Online (2 Nodes)</span>
        </div>

        {/* Quick Weather Telemetry */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-cream rounded-full border border-gray-200/60 text-xs text-dark-forest">
          <CloudSun className="h-4 w-4 text-warning-amber shrink-0" />
          <span className="font-semibold">{farmOverview.weatherSummary.temperature}°C</span>
          <span className="text-gray-500">| {farmOverview.weatherSummary.condition}</span>
        </div>

        {/* Live Refresh telemetry button */}
        <button
          onClick={handleRefreshClick}
          className={`p-2 rounded-lg text-gray-600 hover:text-agri-green hover:bg-green-50 border border-gray-200 transition-all ${
            isRefreshing ? 'animate-spin text-agri-green' : ''
          }`}
          title={`Click to poll latest sensor packet (Last: ${lastRefreshed})`}
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Language Selector Toggle */}
        <div className="relative hidden sm:block">
          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50 text-xs font-semibold">
            {(['EN', 'HI', 'TA'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-1 rounded transition-all ${
                  selectedLanguage === lang
                    ? 'bg-agri-green text-white shadow-xs'
                    : 'text-gray-600 hover:text-dark-forest'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Popover Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-gray-600 hover:text-deep-green hover:bg-gray-100 border border-gray-200 transition-colors"
            title="View alerts & notifications"
          >
            <Bell className="h-4 w-4" />
            {activeAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger-red text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {activeAlerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-deep-green">Active Field Alerts</h4>
                  <span className="text-xs bg-danger-red/10 text-danger-red font-semibold px-2 py-0.5 rounded-full">
                    {activeAlerts.length} Unresolved
                  </span>
                </div>
                <Link
                  to="/alerts"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-agri-green font-semibold hover:underline flex items-center gap-1"
                >
                  View All <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto mt-2">
                {activeAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="py-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alert.severity === 'CRITICAL' ? 'bg-danger-red text-white' :
                        alert.severity === 'HIGH' ? 'bg-red-100 text-danger-red' :
                        'bg-amber-100 text-yellow-800'
                      }`}>
                        {alert.severity} • {alert.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs font-semibold text-dark-forest leading-snug">{alert.title}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{alert.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 mt-2">
                <Link
                  to="/alerts"
                  onClick={() => setShowNotifications(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Manage All Alerts & History
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="h-8 w-8 rounded-full bg-agri-green text-white flex items-center justify-center font-bold text-xs shadow-sm">
            RK
          </div>
          <div className="hidden md:block text-left leading-tight">
            <span className="text-xs font-bold text-dark-forest block">Ramesh Kumar</span>
            <span className="text-[10px] text-gray-500 block">Smallholder Farmer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
