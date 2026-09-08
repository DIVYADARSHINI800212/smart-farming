import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useFarmData } from '../../hooks/useFarmData';

export const AppLayout: React.FC = () => {
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
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet context={farmData} />
        </main>

        {/* Global Footer */}
        <footer className="py-4 px-6 border-t border-[#E6F0EB] bg-white/60 text-center text-xs text-gray-500">
          <p>
            Smart Farming Assistant • Smart India Hackathon (SIH) Prototype • Edge AI-Powered Precision Agriculture
          </p>
        </footer>
      </div>
    </div>
  );
};
