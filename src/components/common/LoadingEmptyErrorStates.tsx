import React from 'react';
import { Loader2, Inbox, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  subtext,
}) => {
  const { t } = useTranslation();
  const displayMessage = message || t('loading_telemetry_inference', 'Loading telemetry & AI model inference...');
  const displaySubtext = subtext || t('sync_lora_packets', 'Synchronizing LoRa packets and edge processor cache');

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
      <div className="p-3 bg-soft-green/20 rounded-full text-agri-green mb-3">
        <Loader2 className="h-7 w-7 animate-spin text-agri-green" />
      </div>
      <h3 className="text-sm font-bold text-deep-green">{displayMessage}</h3>
      <p className="text-xs text-gray-500 mt-1 max-w-sm">{displaySubtext}</p>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('no_data_available', 'No Data Available');
  const displayDescription = description || t('no_matching_records', 'There are no active records matching the selected parameters or time window.');

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-gray-200 text-center">
      <div className="p-3 bg-gray-50 rounded-full text-gray-400 mb-3">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h4 className="text-sm font-bold text-dark-forest">{displayTitle}</h4>
      <p className="text-xs text-gray-500 mt-1 max-w-xs">{displayDescription}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-4">
          {actionText}
        </Button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  error?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  error,
  onRetry,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('sensor_telemetry_offline', 'Sensor Telemetry Offline');
  const displayError = error || t('lora_handshake_failed', 'Unable to establish LoRa handshake with Field Node. Using cached edge telemetry.');

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50/50 rounded-2xl border border-red-100 text-center">
      <div className="p-3 bg-red-100 rounded-full text-danger-red mb-3">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h4 className="text-sm font-bold text-danger-red">{displayTitle}</h4>
      <p className="text-xs text-gray-600 mt-1 max-w-sm">{displayError}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="h-3.5 w-3.5" />}
          className="mt-4 border-red-200 text-red-700 hover:bg-red-50"
        >
          {t('retry_connection', 'Retry Connection')}
        </Button>
      )}
    </div>
  );
};

interface NoDataProps {
  label?: string;
}

export const NoData: React.FC<NoDataProps> = ({
  label,
}) => {
  const { t } = useTranslation();
  const displayLabel = label || t('no_records_for_zone', 'No records found for this zone');

  return (
    <div className="py-6 text-center text-xs text-gray-400 italic flex items-center justify-center gap-1.5">
      <HelpCircle className="h-3.5 w-3.5" />
      <span>{displayLabel}</span>
    </div>
  );
};

