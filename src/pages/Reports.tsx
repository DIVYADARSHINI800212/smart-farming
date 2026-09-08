import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileText, Eye, Sparkles, Filter, Download, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MOCK_REPORTS_LIST, FarmReportCard } from '../data/reportsData';
import { ReportPreviewModal } from '../components/reports/ReportPreviewModal';
import { useFarmData } from '../hooks/useFarmData';

type FarmDataContext = ReturnType<typeof useFarmData>;

export const Reports: React.FC = () => {
  const farmData = useOutletContext<FarmDataContext>();
  const [selectedReport, setSelectedReport] = useState<FarmReportCard | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);

  const categories = ['All', 'Executive Summary', 'Agronomy', 'Pathology', 'Water Resource', 'Crop Protection', 'Forecasting'];

  const filteredReports = filterCategory === 'All' 
    ? MOCK_REPORTS_LIST 
    : MOCK_REPORTS_LIST.filter(r => r.category === filterCategory);

  const handleView = (report: FarmReportCard) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  const handleGenerate = (report: FarmReportCard) => {
    setGeneratingReportId(report.id);
    setTimeout(() => {
      setGeneratingReportId(null);
      setSelectedReport(report);
      setIsPreviewOpen(true);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E6F0EB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-deep-green tracking-tight">
                Farm Reports & Agronomic Auditing
              </h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-soft-green/30 text-deep-green">
                12 Report Types
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Automated compilation of field sensor telemetry, edge AI classifications, irrigation logs, and treatment records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGenerate(MOCK_REPORTS_LIST[0])}
            icon={<Sparkles className="h-3.5 w-3.5 text-purple-600" />}
            className="text-xs"
          >
            Generate Comprehensive Audit
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0 pl-1 mr-1">
          <Filter className="h-3.5 w-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              filterCategory === cat
                ? 'bg-deep-green text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 12 Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((rep) => {
          const isGenerating = generatingReportId === rep.id;

          return (
            <div
              key={rep.id}
              className="bg-white rounded-2xl border border-[#E6F0EB] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-agri-green">
                    {rep.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rep.badgeColor}`}>
                    {rep.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-deep-green leading-snug group-hover:text-agri-green transition-colors">
                  {rep.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {rep.description}
                </p>
              </div>

              {/* Meta & Actions */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {rep.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {rep.lastGenerated}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(rep)}
                    icon={<Eye className="h-3.5 w-3.5 text-gray-500" />}
                    className="w-full text-xs font-semibold text-gray-700 hover:text-deep-green"
                  >
                    View
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleGenerate(rep)}
                    disabled={isGenerating}
                    icon={<Sparkles className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />}
                    className="w-full text-xs font-bold bg-agri-green"
                  >
                    {isGenerating ? 'Compiling...' : 'Generate'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        report={selectedReport}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        farmData={farmData}
      />
    </div>
  );
};

export default Reports;
