import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, LayoutDashboard, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="relative">
        <div className="h-24 w-24 rounded-3xl bg-soft-green/30 border border-agri-green/30 flex items-center justify-center text-agri-green shadow-inner">
          <Sprout className="h-12 w-12 text-agri-green" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-danger-red text-white shadow-md">
          <HelpCircle className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-black uppercase tracking-wider text-agri-green bg-green-50 px-3 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-deep-green tracking-tight">
          {t('page_not_found', 'Page Not Found')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          {t('page_not_found_desc', 'The requested agricultural telemetry or diagnostic route does not exist.')}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button
            variant="primary"
            size="md"
            icon={<LayoutDashboard className="h-4 w-4" />}
            className="bg-agri-green text-xs font-bold"
          >
            {t('back_to_dashboard', 'Back to Dashboard')}
          </Button>
        </Link>
        <Link to="/field-monitoring">
          <Button
            variant="outline"
            size="md"
            icon={<ArrowLeft className="h-4 w-4" />}
            className="text-xs font-semibold"
          >
            {t('nav_field_monitoring', 'Field Monitoring')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
