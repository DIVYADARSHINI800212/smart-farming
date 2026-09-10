import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { JuryDemoModal } from '../demo/JuryDemoModal';
import { useFarmData } from '../../hooks/useFarmData';
import { useTranslation } from '../../i18n';

export const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const farmData = useFarmData();

  return (
    <div className="min-h-screen bg-cream text-dark-forest flex">
      {/* Collapsible Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
          ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <Header
          onMobileOpen={() => setMobileOpen(true)}
          farmOverview={farmData.farmOverview}
          alerts={farmData.alerts}
          onRefresh={farmData.refreshSensorData}
          lastRefreshed={farmData.lastRefreshed}
          notifications={farmData.notifications}
          onMarkNotificationAsRead={farmData.markNotificationAsRead}
          onMarkAllNotificationsAsRead={farmData.markAllNotificationsAsRead}
          onOpenJuryDemo={() => farmData.setIsJuryDemoOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-7 max-w-7xl w-full mx-auto space-y-6">
          <Outlet context={farmData} />
        </main>

        {/* Global Footer (Section 34) */}
        <footer className="py-4 px-6 border-t border-[#E6F0EB] bg-white/80 backdrop-blur-xs text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              <p className="font-semibold text-deep-green">
                {t('app_title', 'Smart Farming')} {t('app_subtitle', 'Assistant • SIH')}
              </p>
              <p className="text-[11px] text-gray-500">
                {t('footer_tagline', 'AI-powered edge intelligence for smarter agriculture • Sense smarter. Farm better.')}
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-agri-green font-bold border border-green-200">
                {t('system_status_operational', 'System Status: Operational')}
              </span>
              <span className="text-gray-400">{t('footer_sub', 'Demo Prototype • SIH')}</span>
            </div>
          </div>
        </footer>
      </div>

      {/* 11-Step Interactive Jury Demo Guided Walkthrough Modal */}
      <JuryDemoModal
        isOpen={farmData.isJuryDemoOpen}
        onClose={() => farmData.setIsJuryDemoOpen(false)}
      />
    </div>
  );
};
