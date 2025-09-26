
import React from 'react';

interface EditorCanvasProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
);

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ originalImageUrl, editedImageUrl, isLoading, error }) => {
  const displayUrl = editedImageUrl || originalImageUrl;

  return (
    <div className="w-full h-full bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center p-4 relative overflow-hidden aspect-square">
        {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <LoadingSpinner />
                <p className="mt-4 text-lg font-semibold text-gray-300">...الذكاء الاصطناعي يعمل بسحره</p>
            </div>
        )}

        {error && (
            <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center z-10 text-center p-4">
                <p className="text-lg font-semibold text-white">{error}</p>
            </div>
        )}

        {displayUrl ? (
            <img 
                src={displayUrl} 
                alt="Image preview" 
                className="max-w-full max-h-full object-contain"
            />
        ) : (
            <div className="text-center text-gray-500">
                <ImageIcon className="w-24 h-24 mx-auto" />
                <h3 className="mt-4 text-xl font-semibold">منطقة عرض الصور</h3>
                <p className="mt-1">قم بتحميل صورة للبدء في التعديل</p>
            </div>
        )}
    </div>
  );
};
