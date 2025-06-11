import { useState, useRef } from 'react';

const useImageUploader = (maxFiles = 5) => {
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const availableSlots = maxFiles - previewImages.length;
    
    if (availableSlots <= 0) return;
    
    const imageFiles = files
      .filter(file => file.type.startsWith('image/'))
      .slice(0, availableSlots);

    if (imageFiles.length === 0) return;

    const loadImages = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Date.now() + Math.random(),
            src: e.target.result,
            file
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(loadImages).then(newImages => {
      setPreviewImages(prev => [...prev, ...newImages]);
    });
  };

  const handleRemoveImage = (id) => {
    setPreviewImages(prev => prev.filter(img => img.id !== id));
    // Убрали очистку fileInputRef.current.value
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Сбрасываем значение перед открытием
      fileInputRef.current.click();
    }
  };

  return {
    previewImages,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    triggerFileInput,
    maxFiles
  };
};

export default useImageUploader;