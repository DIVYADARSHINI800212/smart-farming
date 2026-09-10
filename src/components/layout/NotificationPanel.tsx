import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, ExternalLink, AlertTriangle, ShieldAlert, Droplets, SunMedium, BatteryCharging } from 'lucide-react';
import { AppNotification } from '../../hooks/useFarmData';
import { useTranslation } from '../../i18n';

interface NotificationPanelProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSeverityStyle = (severity: AppNotification['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-danger-red border-red-200';
      case 'HIGH':
        return 'bg-amber-100 text-yellow-900 border-amber-200';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('disease')) return <ShieldAlert className="h-4 w-4 text-danger-red" />;
    if (title.toLowerCase().includes('irrigation')) return <Droplets className="h-4 w-4 text-blue-500" />;
    if (title.toLowerCase().includes('weather')) return <SunMedium className="h-4 w-4 text-warning-amber" />;
    if (title.toLowerCase().includes('battery')) return <BatteryCharging className="h-4 w-4 text-green-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const handleNotificationClick = (notif: AppNotification) => {
    onMarkAsRead(notif.id);
    setIsOpen(false);
    navigate(notif.link);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-9 w-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-deep-green hover:bg-gray-100 border border-gray-200 transition-colors shrink-0"
        title={t('telemetry_notifications', 'Field Notifications & Alerts')}
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-danger-red text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-deep-green">{t('telemetry_notifications', 'Telemetry Notifications')}</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-danger-red/10 text-danger-red font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} {t('new_badge', 'New')}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] text-agri-green hover:underline flex items-center gap-1 font-semibold"
              >
                <CheckCheck className="h-3 w-3" /> {t('mark_all_read', 'Mark all read')}
              </button>
            )}
          </div>

          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto mt-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`py-3 px-2 rounded-xl cursor-pointer transition-colors space-y-1.5 ${
                  n.read ? 'opacity-70 hover:opacity-100 hover:bg-gray-50' : 'bg-green-50/40 hover:bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {getIcon(n.title)}
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border ${getSeverityStyle(n.severity)}`}>
                      {t(`badge_${n.severity.toLowerCase()}`, n.severity)} • {n.zone}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{n.timestamp}</span>
                </div>

                <p className={`text-xs font-bold leading-tight ${n.read ? 'text-gray-700' : 'text-dark-forest'}`}>
                  {n.title}
                </p>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>

                <div className="pt-0.5 flex items-center justify-between text-[10px]">
                  <span className="text-agri-green font-semibold flex items-center gap-1">
                    {t('take_action', 'Take Action')} <ExternalLink className="h-2.5 w-2.5" />
                  </span>
                  {!n.read && (
                    <span className="h-1.5 w-1.5 rounded-full bg-agri-green"></span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 mt-2 flex items-center justify-between">
            <Link
              to="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-xs text-agri-green font-bold hover:underline flex items-center gap-1"
            >
              {t('view_all_alerts_logs', 'View All Alerts & Logs')} <ExternalLink className="h-3 w-3" />
            </Link>
            <span className="text-[10px] text-gray-400">{t('sih_edge_gateway', 'SIH Edge Gateway')}</span>
          </div>
        </div>
      )}
    </div>
  );
};
