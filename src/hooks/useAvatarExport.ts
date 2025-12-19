import { useCallback, useRef, RefObject } from "react";
import { ExportConfig, UploadConfig } from "../types";
import {
  exportCanvasAsDataURL,
  exportCanvasAsBlob,
  downloadCanvas,
  scaleCanvas,
} from "../utils/export";
import { uploadCanvas } from "../utils/upload";

/**
 * Hook for exporting and uploading avatars
 */
export function useAvatarExport(
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  const exportingRef = useRef(false);

  /**
   * Export avatar as data URL
   */
  const exportAsDataURL = useCallback(
    (config?: ExportConfig): string | null => {
      if (!canvasRef.current || exportingRef.current) return null;

      try {
        exportingRef.current = true;
        const canvas = canvasRef.current;
        const scale = config?.scale || 1;

        if (scale !== 1) {
          const scaledCanvas = scaleCanvas(canvas, scale);
          return exportCanvasAsDataURL(scaledCanvas, config);
        }

        return exportCanvasAsDataURL(canvas, config);
      } finally {
        exportingRef.current = false;
      }
    },
    [canvasRef]
  );

  /**
   * Export avatar as Blob
   */
  const exportAsBlob = useCallback(
    async (config?: ExportConfig): Promise<Blob | null> => {
      if (!canvasRef.current || exportingRef.current) return null;

      try {
        exportingRef.current = true;
        const canvas = canvasRef.current;
        const scale = config?.scale || 1;

        if (scale !== 1) {
          const scaledCanvas = scaleCanvas(canvas, scale);
          return await exportCanvasAsBlob(scaledCanvas, config);
        }

        return await exportCanvasAsBlob(canvas, config);
      } finally {
        exportingRef.current = false;
      }
    },
    [canvasRef]
  );

  /**
   * Download avatar as image file
   */
  const download = useCallback(
    async (filename: string, config?: ExportConfig): Promise<void> => {
      if (!canvasRef.current || exportingRef.current) return;

      try {
        exportingRef.current = true;
        const canvas = canvasRef.current;
        const scale = config?.scale || 1;

        if (scale !== 1) {
          const scaledCanvas = scaleCanvas(canvas, scale);
          await downloadCanvas(scaledCanvas, filename, config);
        } else {
          await downloadCanvas(canvas, filename, config);
        }
      } finally {
        exportingRef.current = false;
      }
    },
    [canvasRef]
  );

  /**
   * Upload avatar to endpoint
   */
  const upload = useCallback(
    async (uploadConfig: UploadConfig): Promise<Response> => {
      if (!canvasRef.current || exportingRef.current) {
        throw new Error("Canvas not ready or export in progress");
      }

      try {
        exportingRef.current = true;
        return await uploadCanvas(canvasRef.current, uploadConfig);
      } finally {
        exportingRef.current = false;
      }
    },
    [canvasRef]
  );

  return {
    exportAsDataURL,
    exportAsBlob,
    download,
    upload,
    isExporting: exportingRef.current,
  };
}
