import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, Filter, RefreshCw } from 'lucide-react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertFilterBar } from '../components/alerts/AlertFilterBar';
import { AlertHistoryLog } from '../components/alerts/AlertHistoryLog';
import { AlertCategory, AlertStatus, SeverityLevel } from '../types';
import { useFarmData } from '../hooks/useFarmData';
import { useLanguage } from '../context/LanguageContext';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const Alerts: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert } = useOutletContext<FarmDataContext>();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<AlertCategory | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus | 'ALL'>('ALL');

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches = 
        alert.title.toLowerCase().includes(q) ||
        alert.message.toLowerCase().includes(q) ||
        alert.zoneName.toLowerCase().includes(q) ||
        alert.recommendedAction.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Severity
    if (selectedSeverity !== 'ALL' && alert.severity !== selectedSeverity) {
      return false;
    }

    // Category
    if (selectedCategory !== 'ALL' && alert.category !== selectedCategory) {
      return false;
    }

    // Status
    if (selectedStatus !== 'ALL' && alert.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const activeCount = alerts.filter(a => a.status === 'Active').length;
  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'Resolved').length;
  const highCount = alerts.filter(a => a.severity === 'HIGH' && a.status !== 'Resolved').length;
  const resolvedList = alerts.filter(a => a.status === 'Resolved');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSeverity('ALL');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-50 text-danger-red">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-deep-green tracking-tight">
              {t('alerts_title', 'Alerts & Incident Notifications')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('alerts_subtitle', 'Consolidated, severity-ranked real-time alerts across disease, pest, irrigation & climate')}
            </p>
          </div>
        </div>

        {/* Status Metrics Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-danger-red/10 text-danger-red border border-danger-red/20">
            {criticalCount} {t('badge_critical', 'Critical')}
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 text-yellow-800 border border-amber-200">
            {highCount} {t('high_priority', 'High Priority')}
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-green-100 text-agri-green border border-green-200">
            {activeCount} {t('active_total', 'Active Total')}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <AlertFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSeverity={selectedSeverity}
        onSeverityChange={setSelectedSeverity}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
      />

      {/* Alert Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            {t('filtered_alerts', 'Filtered Alerts')} ({filteredAlerts.length})
          </h2>
          <span className="text-xs text-gray-400">
            {t('realtime_sync_edge', 'Real-time synchronization with Edge AI Gateway')}
          </span>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
            <CheckCircle2 className="h-12 w-12 text-agri-green mx-auto mb-3 opacity-80" />
            <h3 className="text-base font-bold text-deep-green">{t('no_alerts_found', 'No Alerts Found')}</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {t('no_alerts_desc', 'There are no alerts matching the selected severity, category, or search criteria.')}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-xs font-semibold text-agri-green hover:underline"
            >
              {t('btn_clear_all_filters', 'Clear All Filters')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledgeAlert}
                onResolve={resolveAlert}
              />
            ))}
          </div>
        )}
      </div>

      {/* Permanent Historical Log */}
      <div className="pt-4">
        <AlertHistoryLog resolvedAlerts={resolvedList} />
      </div>
    </div>
  );
};
