import React from 'react';
import { CheckCircle2, Filter } from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { useTranslation } from '../../i18n';

interface PreprocessingPipelineProps {
  isProcessing: boolean;
  hasImage: boolean;
}

export const PreprocessingPipeline: React.FC<PreprocessingPipelineProps> = ({
  isProcessing,
  hasImage,
}) => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('preproc_step1_title', 'Resolution & Aspect Ratio'),
      desc: t('preproc_step1_desc', 'Validates minimum 640x480 resolution for macro-foliar pathology analysis.'),
      metric: t('preproc_step1_metric', 'Passed (1920×1080 Native)'),
    },
    {
      title: t('preproc_step2_title', 'Sharpness & Blur Rejection'),
      desc: t('preproc_step2_desc', 'Applies discrete Laplacian filter to reject motion-blurred field captures.'),
      metric: t('preproc_step2_metric', 'Variance: 148 (Threshold > 80)'),
    },
    {
      title: t('preproc_step3_title', 'Color & Exposure Normalization'),
      desc: t('preproc_step3_desc', 'Corrects ambient sunlight variations using standardized gray-world white balance.'),
      metric: t('preproc_step3_metric', 'Gamma Adjusted (1.02)'),
    },
    {
      title: t('preproc_step4_title', 'Region of Interest (ROI) Crop'),
      desc: t('preproc_step4_desc', 'Locates lesion/pest cluster and crops to 320×320 tensor input for Edge CNN.'),
      metric: t('preproc_step4_metric', 'Extracted (320×320 INT8)'),
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader
        title={t('step_4_preproc', 'Automated Edge Preprocessing Pipeline')}
        subtitle="Gateway OpenCV preprocessing before neural network inference"
        icon={<Filter className="h-5 w-5 text-agri-green" />}
        action={
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            Edge OpenCV 4.8
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition-all ${
              hasImage
                ? 'bg-white border-green-200 shadow-xs'
                : 'bg-gray-50 border-gray-100 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {t('step_label', 'Step')} 0{idx + 1}
              </span>
              {hasImage ? (
                <CheckCircle2 className="h-4 w-4 text-agri-green" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-300" />
              )}
            </div>
            <h5 className="text-xs font-bold text-dark-forest">{step.title}</h5>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">{step.desc}</p>
            {hasImage && (
              <span className="mt-2 text-[10px] font-semibold text-agri-green bg-green-50 px-2 py-0.5 rounded inline-block">
                {step.metric}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
