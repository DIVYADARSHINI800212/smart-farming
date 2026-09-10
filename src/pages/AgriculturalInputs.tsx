import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TreatmentWorkflowStepper } from '../components/advisory/TreatmentWorkflowStepper';
import { DemoDisclaimerBanner } from '../components/advisory/DemoDisclaimerBanner';
import { mockAgriculturalInputs } from '../data/inputData';
import { InputCategory } from '../types/phase4';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES: Array<'All' | InputCategory> = [
  'All',
  'Fungicides',
  'Insecticides',
  'Biological Inputs',
  'Fertilizers',
  'Biofertilizers',
  'Soil Amendments',
  'Plant Growth Inputs',
];

export const AgriculturalInputs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | InputCategory>('All');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredInputs = useMemo(() => {
    return mockAgriculturalInputs.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.activeIngredient.toLowerCase().includes(query) ||
        item.targetCrop.toLowerCase().includes(query) ||
        item.targetDiseaseOrPest.toLowerCase().includes(query);

      return matchesCat && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Workflow Stepper (Step 3) */}
      <TreatmentWorkflowStepper
        currentStep={3}
        nextStepTitle={t('action_check_availability', 'Check Product Availability')}
      />

      {/* 2. Banner Disclaimer */}
      <DemoDisclaimerBanner
        type="chemical"
        customMessage={t('inputs_disclaimer', 'Prototype agricultural input database — not a substitute for an approved commercial product label. All dosages and technical specifications are demonstration references.')}
      />

      {/* 3. Header */}
      <div className="bg-white p-5 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-800 shrink-0">
            <Boxes className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                {t('nav_inputs', 'Agricultural Inputs')}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {t('agronomic_input_directory', 'Agronomic Input Directory')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('inputs_subtitle', 'Searchable catalog of plant protection formulations, biological controls, bio-fertilizers, and soil conditioning inputs')}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/product-availability')}
          className="self-start md:self-auto shrink-0"
        >
          <span>{t('action_check_availability', 'Check Product Availability')}</span>
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>

      {/* 4. Search and Category Filter Controls */}
      <Card>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('search_inputs_placeholder', 'Search by product name, active ingredient, crop, or target disease/pest...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs text-dark-forest bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-green/30 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-gray-500">
              {t('showing_items', 'Showing')} {filteredInputs.length} {t('of_items', 'of')} {mockAgriculturalInputs.length} {t('items_label', 'Items')}
            </span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-2 border-t border-gray-100 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const catKey = 'cat_' + cat.toLowerCase().replace(/\s+/g, '_');
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-deep-green text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-dark-forest'
                }`}
              >
                {t(catKey, cat)}
              </button>
            );
          })}
        </div>
      </Card>

      {/* 5. Filtered Input Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInputs.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-agri-green hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  item.category === 'Fungicides'
                    ? 'bg-blue-100 text-blue-800'
                    : item.category === 'Insecticides'
                    ? 'bg-red-100 text-danger-red'
                    : item.category === 'Biological Inputs' || item.category === 'Biofertilizers'
                    ? 'bg-green-100 text-agri-green'
                    : 'bg-amber-100 text-yellow-800'
                }`}>
                  {t('cat_' + item.category.toLowerCase().replace(/\s+/g, '_'), item.category)}
                </span>

                {item.organicCertified && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> {t('bio_certified', 'Bio Certified')}
                  </span>
                )}
              </div>

              {/* Title & Active Ingredient */}
              <h3 className="text-sm font-black text-deep-green leading-snug">
                {item.name}
              </h3>
              <p className="text-xs text-agri-green font-semibold mt-0.5">
                {t('active_label', 'Active')}: {item.activeIngredient}
              </p>

              {/* Details List */}
              <div className="space-y-1.5 my-3.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400 font-medium">{t('formulation_label', 'Formulation')}: </span>
                  <span className="font-semibold text-dark-forest">{item.formulation}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">{t('target_crop_label', 'Target Crop')}: </span>
                  <span className="font-semibold text-dark-forest">{item.targetCrop}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">{t('target_pest_disease_label', 'Target Pest/Disease')}: </span>
                  <span className="font-bold text-danger-red">{item.targetDiseaseOrPest}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">{t('application_method_label', 'Application Method')}: </span>
                  <span className="text-gray-800">{item.applicationMethod}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">{t('label_dosage_label', 'Label Dosage')}: </span>
                  <span className="font-bold text-deep-green">{item.labelDosage}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">{t('usage_restrictions_label', 'Usage Restrictions')}: </span>
                  <span className="text-gray-700">{item.usageRestrictions}</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">{t('demo_ref_price', 'Demo Ref Price')}</span>
                <span className="text-xs font-bold text-deep-green">
                  ₹{item.referencePrice} / {item.packSize}
                </span>
              </div>

              <button
                onClick={() => navigate('/product-availability')}
                className="inline-flex items-center gap-1 text-xs font-bold text-agri-green hover:text-deep-green"
              >
                <span>{t('btn_check_availability', 'Check Availability')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInputs.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
          <p className="text-sm font-semibold">{t('no_inputs_match', 'No agricultural inputs match your filter criteria.')}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-agri-green font-bold mt-2 hover:underline"
          >
            {t('btn_clear_filters', 'Clear Search & Filters')}
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/treatment-recommendation')}
          >
            {t('btn_back_to_treatment', 'Back to Treatment Strategy')}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/product-availability')}
            className="flex items-center gap-2"
          >
            <span>{t('action_check_availability', 'Check Product Availability')}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
