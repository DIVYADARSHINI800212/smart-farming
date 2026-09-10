import React from 'react';
import { MapPin, Navigation, Phone, Clock, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { DealerProductItem } from '../../types/phase4';
import { useLanguage } from '../../context/LanguageContext';

interface DealerMapCardProps {
  dealers: DealerProductItem[];
  selectedDealerId?: string;
  onSelectDealer: (id: string) => void;
}

export const DealerMapCard: React.FC<DealerMapCardProps> = ({
  dealers,
  selectedDealerId,
  onSelectDealer,
}) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader
        title={t('dealer_network_title', 'Farm-to-Dealer Proximity Network')}
        subtitle={t('dealer_network_sub', 'Frontend schematic visualization of agro-input centers relative to Green Valley Unit 1')}
        icon={<Navigation className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-agri-green border border-green-200">
            {t('within_15km', 'Within 15 km Radius')}
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Side: Visual Schematic Diagram (5 Cols) */}
        <div className="lg:col-span-5 bg-cream/70 rounded-2xl p-4 border border-[#E6F0EB] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-xs">
              <span className="font-bold text-deep-green uppercase tracking-wider text-[10px]">
                {t('regional_logistics_map', 'Regional Logistics Map (Schematic)')}
              </span>
              <span className="text-gray-500 font-medium">{t('demo_gps_routing', 'Demo GPS Routing')}</span>
            </div>

            {/* Farm Origin Hub */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-agri-green shadow-xs flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-agri-green text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-agri-green uppercase tracking-wider block">
                  {t('origin_hub_zero_km', 'Origin Hub (Zero km)')}
                </span>
                <h4 className="text-xs font-bold text-deep-green">Green Valley Precision Agro Unit</h4>
                <p className="text-[11px] text-gray-500">Thanjavur Pilot Farm • Coordinates: 10.78°N, 79.13°E</p>
              </div>
            </div>

            {/* Connecting Route Trunk */}
            <div className="relative pl-6 py-2">
              <div className="absolute left-[26px] top-0 bottom-0 w-0.5 bg-dashed border-l-2 border-agri-green/40" />

              <div className="space-y-3.5 my-2">
                {dealers.map((dealer) => {
                  const isSelected = selectedDealerId === dealer.id;
                  return (
                    <div
                      key={dealer.id}
                      onClick={() => onSelectDealer(dealer.id)}
                      className={`relative flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-deep-green text-white border-deep-green shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-soft-green'
                      }`}
                    >
                      <div
                        className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-deep-green'
                        }`}
                      >
                        <Store className="h-3.5 w-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-dark-forest'}`}>
                            {dealer.dealerName}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected ? 'bg-white/20 text-soft-green' : 'bg-green-50 text-agri-green'
                          }`}>
                            {dealer.distanceKm} km
                          </span>
                        </div>
                        <span className={`text-[10px] block truncate ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                          {dealer.location}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
            <span className="font-bold text-deep-green block">{t('dispatch_notice', 'Dispatch Notice:')}</span>
            <p>
              {t('dispatch_notice_desc', 'Average travel time to closest dealer (Kaveri Delta PACS) is ~12 minutes via rural arterial road.')}
            </p>
          </div>
        </div>

        {/* Right Side: Selected / Filtered Dealer Quick Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {t('dealer_directory_stocked', 'Dealer Directory & Stocked Formulations')}
          </h4>

          <div className="space-y-3">
            {dealers.map((dealer) => {
              const isSelected = selectedDealerId === dealer.id;
              return (
                <div
                  key={dealer.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-agri-green bg-green-50/30 ring-2 ring-agri-green/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-deep-green">{dealer.dealerName}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {dealer.dealerType}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{dealer.address}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-black text-agri-green bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
                        {dealer.distanceKm} km {t('distance_away', 'away')}
                      </span>
                    </div>
                  </div>

                  {/* Dealer meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span>{dealer.operatingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span className="font-semibold text-deep-green">{dealer.contactNumber}</span>
                    </div>
                  </div>

                  {/* Available Stocked Products in this Dealer */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      {t('target_inventory_status', 'Target Inventory Status')}
                    </span>
                    <div className="divide-y divide-gray-50">
                      {dealer.stockedProducts.map((p, pIdx) => (
                        <div key={pIdx} className="py-1.5 flex items-center justify-between text-xs">
                          <div className="min-w-0 pr-2">
                            <span className="font-semibold text-dark-forest block truncate">{p.inputName}</span>
                            <span className="text-[10px] text-gray-500">{p.packSize}</span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-bold text-deep-green text-xs">
                              ₹{p.estimatedPriceInr}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              p.status === 'In Stock'
                                ? 'bg-green-100 text-agri-green'
                                : p.status === 'Limited Stock'
                                ? 'bg-amber-100 text-yellow-800'
                                : 'bg-red-100 text-danger-red'
                            }`}>
                              {p.status === 'In Stock' ? t('badge_in_stock', 'In Stock')
                                : p.status === 'Limited Stock' ? t('badge_limited_stock', 'Limited Stock')
                                : t('badge_out_of_stock', 'Out of Stock')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
