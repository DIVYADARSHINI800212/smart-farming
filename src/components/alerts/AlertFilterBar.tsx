import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { AlertCategory, AlertStatus, SeverityLevel } from '../../types';

interface AlertFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSeverity: SeverityLevel | 'ALL';
  onSeverityChange: (s: SeverityLevel | 'ALL') => void;
  selectedCategory: AlertCategory | 'ALL';
  onCategoryChange: (c: AlertCategory | 'ALL') => void;
  selectedStatus: AlertStatus | 'ALL';
  onStatusChange: (s: AlertStatus | 'ALL') => void;
  onReset: () => void;
}

export const AlertFilterBar: React.FC<AlertFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSeverity,
  onSeverityChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) => {
  const severities: Array<SeverityLevel | 'ALL'> = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const categories: Array<AlertCategory | 'ALL'> = [
    'ALL',
    'Disease',
    'Pest',
    'Irrigation',
    'Weather',
    'Heat Stress',
    'Flood',
    'Drought',
  ];
  const statuses: Array<AlertStatus | 'ALL'> = ['ALL', 'Active', 'Acknowledged', 'Resolved'];

  const hasActiveFilters = searchQuery || selectedSeverity !== 'ALL' || selectedCategory !== 'ALL' || selectedStatus !== 'ALL';

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#E6F0EB] shadow-subtle space-y-3">
      {/* Top row: Search + Status Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts by keyword, zone, or diagnosis..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri-green/30"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedStatus === status
                  ? 'bg-agri-green text-white shadow-xs'
                  : 'text-gray-600 hover:text-dark-forest'
              }`}
            >
              {status === 'ALL' ? 'All Status' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Second row: Severity Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Severity:</span>
        {severities.map((sev) => (
          <button
            key={sev}
            onClick={() => onSeverityChange(sev)}
            className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all ${
              selectedSeverity === sev
                ? sev === 'CRITICAL' ? 'bg-danger-red text-white border-danger-red' :
                  sev === 'HIGH' ? 'bg-danger-red/20 text-danger-red border-danger-red' :
                  sev === 'MEDIUM' ? 'bg-amber-100 text-yellow-800 border-amber-300' :
                  sev === 'LOW' ? 'bg-green-100 text-agri-green border-green-300' :
                  'bg-deep-green text-white border-deep-green'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {sev === 'ALL' ? 'All Severities' : sev}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto text-xs font-semibold text-danger-red hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Third row: Category Badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-gray-100">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-agri-green/15 text-agri-green border border-agri-green/40 font-bold'
                : 'text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
