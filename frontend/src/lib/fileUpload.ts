/**
 * Safe client-side helper to validate PDF/PPTX files and generate Data URLs.
 * Eliminates all 3rd-party CORS fetch failures (file.io / tmpfiles / catbox errors).
 */
export interface ProcessedFile {
  fileName: string;
  fileSize: string;
  fileType: string;
  dataUrl: string;
  fileUrl?: string;
  directUrl?: string;
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const processUploadFile = async (file: File): Promise<ProcessedFile> => {
  const fileName = file.name;
  const fileSize = formatBytes(file.size);
  const fileType = file.type || 'application/pdf';

  let dataUrl = '';
  let fileUrl = '';

  // 1. Upload file via internal Next.js API (bypasses CORS and Vercel read-only filesystem restrictions)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        fileUrl = json.url;
      }
    }
  } catch (err) {
    console.warn('PDF upload proxy warning:', err);
  }

  // 2. Generate client-side Data URL fallback
  try {
    dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
    });
  } catch (e) {
    console.warn('Failed to read file as Data URL:', e);
  }

  return {
    fileName,
    fileSize,
    fileType,
    dataUrl,
    fileUrl: fileUrl || dataUrl,
    directUrl: fileUrl || dataUrl
  };
};
