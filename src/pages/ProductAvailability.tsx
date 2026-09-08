import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Search,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Navigation,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { DealerMapCard } from '../components/advisory/DealerMapCard';
import { mockNearbyDealers } from '../data/availabilityData';
import { StockStatus } from '../types/phase4';
import { useLanguage } from '../context/LanguageContext';

export const ProductAvailability: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'All' | StockStatus>('All');
  const [selectedDealerId, setSelectedDealerId] = useState<string>(mockNearbyDealers[0].id);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredDealers = useMemo(() => {
    return mockNearbyDealers.filter((dealer) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dealer.dealerName.toLowerCase().includes(q) ||
        dealer.location.toLowerCase().includes(q) ||
        dealer.stockedProducts.some(
          (p) =>
            p.inputName.toLowerCase().includes(q) ||
            p.activeIngredient.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );

      const matchesStock =
        selectedStockFilter === 'All' ||
        dealer.stockedProducts.some((p) => p.status === selectedStockFilter);

      return matchesSearch && matchesStock;
    });
  }, [searchQuery, selectedStockFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 4) */}
      <TreatmentWorkflowStepper
        currentStep={4}
        nextStepTitle={t('action_check_timing')}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner type="availability" />

      {/* 3. Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-800 shrink-0">
            <Store className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_availability')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                Dealer Stock Locator (Demo)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Locate agro-input dealers, cooperative PACS godowns, and authorized distributors within delivery proximity
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/treatment-timing')}
          className="self-start md:self-auto shrink-0"
        >
          <span>{t('action_check_timing')}</span>
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>

      {/* 4. Search and Stock Filters */}
      <Card>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, active ingredient, dealer name, or town..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs text-dark-forest bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-green/30 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {(['All', 'In Stock', 'Limited Stock', 'Out of Stock'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStockFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStockFilter === status
                    ? 'bg-deep-green text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 5. Map-Style Section (Farm -> Dealer -> Distance Visual) */}
      <DealerMapCard
        dealers={filteredDealers}
        selectedDealerId={selectedDealerId}
        onSelectDealer={setSelectedDealerId}
      />

      {/* 6. Bottom Navigation Bar */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/agricultural-inputs')}
          >
            Back to Agricultural Inputs
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/treatment-timing')}
            className="flex items-center gap-2"
          >
            <span>{t('action_check_timing')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
