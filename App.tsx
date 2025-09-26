
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { EditingTools } from './components/EditingTools';
import { EditorCanvas } from './components/EditorCanvas';
import { ImageUploader } from './components/ImageUploader';
import { fileToBase64 } from './utils/imageUtils';
import { editImageWithGemini } from './services/geminiService';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function to revoke the object URL when the component unmounts
    // or when the originalImage state changes, preventing memory leaks.
    return () => {
      if (originalImage) {
        URL.revokeObjectURL(originalImage.url);
      }
    };
  }, [originalImage]);

  const handleImageUpload = (file: File) => {
    // If there's an existing image, revoke its object URL before creating a new one.
    if (originalImage) {
      URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage({
      file: file,
      url: URL.createObjectURL(file),
    });
    setEditedImage(null);
    setError(null);
    setPrompt('');
  };

  const handleApplyEdit = useCallback(async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage.file);
      const newImageBase64 = await editImageWithGemini(base64, mimeType, prompt);
      
      if (newImageBase64) {
        setEditedImage(`data:${mimeType};base64,${newImageBase64}`);
      } else {
        setError('لم يتمكن الذكاء الاصطناعي من تعديل الصورة. حاول مرة أخرى بوصف مختلف.');
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error && err.message.includes('API_KEY') 
        ? 'خطأ في الإعداد: مفتاح API غير موجود أو غير صالح.'
        : 'حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const handleApplyFilter = useCallback(async (filterPrompt: string) => {
    if (!originalImage) return;

    setPrompt(filterPrompt);
    setIsLoading(true);
    setError(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage.file);
      const newImageBase64 = await editImageWithGemini(base64, mimeType, filterPrompt);

      if (newImageBase64) {
        setEditedImage(`data:${mimeType};base64,${newImageBase64}`);
      } else {
         setError('لم يتمكن الذكاء الاصطناعي من تطبيق الفلتر. حاول مرة أخرى.');
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error && err.message.includes('API_KEY')
        ? 'خطأ في الإعداد: مفتاح API غير موجود أو غير صالح.'
        : 'حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);


  const handleReset = () => {
    setEditedImage(null);
    setPrompt('');
    setError(null);
  };
  
  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `edited-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-6">
           <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
           <EditingTools 
              prompt={prompt}
              setPrompt={setPrompt}
              onApply={handleApplyEdit}
              onApplyFilter={handleApplyFilter}
              onReset={handleReset}
              onDownload={handleDownload}
              isImageLoaded={!!originalImage}
              isEdited={!!editedImage}
              isLoading={isLoading}
           />
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4 flex-grow">
          <EditorCanvas 
            originalImageUrl={originalImage?.url || null}
            editedImageUrl={editedImage}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
