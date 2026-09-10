import React, { useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { SampleImageOption } from '../../data/aiVisionData';
import { useTranslation } from '../../i18n';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageSelected: (imgUrl: string, sampleMeta?: SampleImageOption) => void;
  sampleOptions: SampleImageOption[];
  onTriggerCamera: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageSelected,
  sampleOptions,
  onTriggerCamera,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 hover:border-agri-green/80 rounded-2xl p-6 text-center bg-gray-50/60 hover:bg-green-50/20 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-gray-200 flex items-center justify-center text-agri-green mb-3">
          <UploadCloud className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-bold text-deep-green">
          {t('upload_drag_drop', 'Drag and drop crop leaf photograph here')}
        </h4>
        <p className="text-xs text-gray-500 mt-1 max-w-sm">
          {t('supported_formats', 'Supports JPG, PNG, WEBP from smartphone camera or mobile browser.')}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            icon={<ImageIcon className="h-4 w-4" />}
          >
            {t('btn_upload_image', 'Browse Gallery')}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerCamera();
            }}
            icon={<Camera className="h-4 w-4" />}
          >
            {t('btn_capture_image', 'Simulate Camera Capture')}
          </Button>
        </div>
      </div>

      {/* Preset Quick Test Samples */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-agri-green" /> {t('or_select_sample', 'Or Select an Agricultural Test Sample:')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleOptions.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onImageSelected(sample.thumbnailUrl, sample)}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-agri-green hover:shadow-card transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img
                src={sample.thumbnailUrl}
                alt={sample.title}
                className="h-12 w-12 rounded-lg object-cover border border-gray-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-dark-forest block truncate group-hover:text-agri-green transition-colors">
                  {sample.title}
                </span>
                <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                  {sample.simulatedClass}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
