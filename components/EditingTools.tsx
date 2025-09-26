
import React from 'react';
import { FilterButtons } from './FilterButtons';

interface EditingToolsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onApply: () => void;
  onApplyFilter: (prompt: string) => void;
  onReset: () => void;
  onDownload: () => void;
  isImageLoaded: boolean;
  isEdited: boolean;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.41 7.41L15 3l-2.12 2.12 4.41 4.41zM2.83 18.17l4.24-4.24 1.41 1.41-4.24 4.24zM13.59 3.59l-8.16 8.16c-.78.78-.78 2.05 0 2.83l1.41 1.41c.78.78 2.05.78 2.83 0l8.16-8.16L13.59 3.59zM18 14v3h-3v2h3v3h2v-3h3v-2h-3v-3z"/>
    </svg>
);

const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
);

export const EditingTools: React.FC<EditingToolsProps> = ({ 
  prompt, 
  setPrompt, 
  onApply,
  onApplyFilter,
  onReset,
  onDownload, 
  isImageLoaded, 
  isEdited, 
  isLoading 
}) => {
  return (
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-50'}`}>
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold mb-4 text-cyan-400">2. فلاتر سريعة</h2>
                <FilterButtons onSelectFilter={onApplyFilter} disabled={!isImageLoaded || isLoading} />
            </div>

            <div>
                <h2 className="text-lg font-bold mb-4 text-cyan-400">3. تعديل مخصص</h2>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="أو صف تعديلك الخاص هنا. مثال: أضف قبعة قرصان على القطة"
                    rows={3}
                    disabled={!isImageLoaded || isLoading}
                    className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:cursor-not-allowed"
                />
            </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
            <button
                onClick={onApply}
                disabled={!isImageLoaded || !prompt || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
                <MagicWandIcon className="w-5 h-5"/>
                <span>{isLoading ? 'جاري المعالجة...' : 'تطبيق التعديل المخصص'}</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
                 <button
                    onClick={onReset}
                    disabled={!isEdited || isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    <ResetIcon className="w-5 h-5"/>
                    <span>إعادة تعيين</span>
                </button>
                 <button
                    onClick={onDownload}
                    disabled={!isEdited || isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    <DownloadIcon className="w-5 h-5"/>
                    <span>تحميل</span>
                </button>
            </div>
        </div>
    </div>
  );
};
