export const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [mimeTypePart, base64Part] = result.split(';base64,');
      const mimeType = mimeTypePart.split(':')[1];
      if (base64Part && mimeType) {
        resolve({ base64: base64Part, mimeType });
      } else {
        reject(new Error("Failed to parse data URL."));
      }
    };
    reader.onerror = () => reject(new Error("An error occurred while reading the file."));
  });
};
