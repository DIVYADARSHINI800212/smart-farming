import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Sprout,
  ScanEye,
  Microscope,
  Bug,
  Droplets,
  CloudSun,
  CloudLightning,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  Boxes,
  Store,
  CalendarClock,
  CircleDollarSign,
  ClipboardCheck,
  Bell,
  BarChart3,
  TrendingUp,
  Cpu,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { RoadmapModal } from './RoadmapModal';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  isFunctional?: boolean;
  badge?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const location = useLocation();
  const [selectedRoadmapModule, setSelectedRoadmapModule] = useState<string | null>(null);
  const { t } = useLanguage();

  const navGroups: NavGroup[] = [
    {
      groupName: t('nav_group_main', 'MAIN'),
      items: [
        { label: t('nav_dashboard'), path: '/', icon: <LayoutDashboard className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_field_monitoring'), path: '/field-monitoring', icon: <MapPin className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_crop_health'), path: '/crop-health', icon: <Sprout className="h-5 w-5" />, isFunctional: true },
      ],
    },
    {
      groupName: t('nav_group_ai', 'AI & DETECTION'),
      items: [
        { label: t('nav_ai_vision'), path: '/ai-vision', icon: <ScanEye className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_disease_detection'), path: '/disease-detection', icon: <Microscope className="h-5 w-5" />, isFunctional: true, badge: t('badge_blast_82', 'Blast 82%') },
        { label: t('nav_pest_detection'), path: '/pest-detection', icon: <Bug className="h-5 w-5" />, isFunctional: true, badge: t('badge_folder_78', 'Folder 78%') },
        { label: t('nav_risk_assessment'), path: '/risk-assessment', icon: <AlertTriangle className="h-5 w-5" />, isFunctional: true },
      ],
    },
    {
      groupName: t('nav_group_farm_management', 'FARM MANAGEMENT'),
      items: [
        { label: t('nav_smart_irrigation'), path: '/smart-irrigation', icon: <Droplets className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_env_monitoring'), path: '/environmental-monitoring', icon: <CloudSun className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_weather'), path: '/weather-intelligence', icon: <CloudLightning className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_farmer_advisory'), path: '/farmer-advisory', icon: <UserCheck className="h-5 w-5" />, isFunctional: true, badge: t('badge_advisory', 'Advisory') },
      ],
    },
    {
      groupName: t('nav_group_treatment', 'TREATMENT'),
      items: [
        { label: t('nav_treatment'), path: '/treatment-recommendation', icon: <ShieldAlert className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_inputs'), path: '/agricultural-inputs', icon: <Boxes className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_availability'), path: '/product-availability', icon: <Store className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_timing'), path: '/treatment-timing', icon: <CalendarClock className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_cost'), path: '/treatment-cost', icon: <CircleDollarSign className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_followup'), path: '/treatment-follow-up', icon: <ClipboardCheck className="h-5 w-5" />, isFunctional: true },
      ],
    },
    {
      groupName: t('nav_group_insights', 'INSIGHTS'),
      items: [
        { label: t('nav_alerts'), path: '/alerts', icon: <Bell className="h-5 w-5" />, isFunctional: true, badge: t('badge_2_active', '2 Active') },
        { label: t('nav_farm_analytics'), path: '/farm-analytics', icon: <BarChart3 className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_yield_forecast'), path: '/yield-forecast', icon: <TrendingUp className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_reports'), path: '/reports', icon: <FileText className="h-5 w-5" />, isFunctional: true },
      ],
    },
    {
      groupName: t('nav_group_system', 'SYSTEM'),
      items: [
        { label: t('nav_edge_nodes'), path: '/edge-nodes', icon: <Cpu className="h-5 w-5" />, isFunctional: true },
        { label: t('nav_settings'), path: '/settings', icon: <Settings className="h-5 w-5" />, isFunctional: true },
      ],
    },
  ];

  const handleItemClick = (item: NavItem) => {
    if (!item.isFunctional) {
      setSelectedRoadmapModule(item.label);
    }
    if (mobileOpen) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-dark-forest/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-deep-green text-white transition-all duration-300 ease-in-out flex flex-col border-r border-deep-green/60 shadow-xl shrink-0 lg:static lg:h-full lg:translate-x-0
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-agri-green/40 border border-soft-green/30 flex items-center justify-center text-soft-green shrink-0 shadow-inner">
              <Sprout className="h-6 w-6 text-soft-green animate-pulse" />
            </div>
            {!collapsed && (
              <div className="leading-tight truncate">
                <span className="font-bold text-sm text-white tracking-wide block truncate">
                  {t('app_title', 'Smart Farming')}
                </span>
                <span className="text-[11px] text-soft-green font-medium tracking-wider uppercase block">
                  {t('app_subtitle', 'Assistant • SIH')}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-soft-green/60">
                  {group.groupName}
                </div>
              )}
              {collapsed && (
                <div className="w-6 h-0.5 bg-white/10 mx-auto my-2 rounded-full" />
              )}

              {group.items.map((item, itemIdx) => {
                if (item.isFunctional && item.path) {
                  return (
                    <NavLink
                      key={itemIdx}
                      to={item.path}
                      onClick={() => handleItemClick(item)}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                        ${isActive 
                          ? 'bg-agri-green text-white shadow-md shadow-agri-green/30 font-semibold' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                              item.badge.includes('Blast') || item.badge.includes('குலை') || item.badge.includes('ब्लास्ट') ? 'bg-danger-red text-white' : 'bg-danger-red text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  );
                }

                // Future Phase items
                return (
                  <button
                    key={itemIdx}
                    onClick={() => handleItemClick(item)}
                    title={collapsed ? `${item.label} (Roadmap)` : undefined}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all text-left group
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <span className="shrink-0 text-white/50 group-hover:text-soft-green transition-colors">
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between truncate">
                        <span className="truncate">{item.label}</span>
                        <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white/10 text-soft-green/70 group-hover:bg-soft-green/20 group-hover:text-soft-green transition-colors">
                          P3
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Edge Gateway Status Box in Sidebar footer */}
        {!collapsed && (
          <div className="p-3 mx-3 mb-3 bg-dark-forest/60 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-agri-green"></span>
              </span>
              <span className="font-semibold text-soft-green text-[11px] uppercase tracking-wide">
                {t('edge_ai_pipeline_title', 'Edge AI Pipeline')}
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-tight">
              {t('edge_ai_pipeline_desc', 'MobileNetV2 + YOLOv8 inference ready. LoRa nodes streaming.')}
            </p>
          </div>
        )}
      </aside>

      {/* Roadmap Modal for upcoming modules */}
      <RoadmapModal
        isOpen={!!selectedRoadmapModule}
        onClose={() => setSelectedRoadmapModule(null)}
        moduleName={selectedRoadmapModule || ''}
      />
    </>
  );
};
