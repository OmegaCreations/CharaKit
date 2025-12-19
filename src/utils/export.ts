import { ExportConfig } from "../types";

/**
 * Export a canvas as a data URL
 */
export function exportCanvasAsDataURL(
  canvas: HTMLCanvasElement,
  config?: ExportConfig
): string {
  const format = config?.format || "png";
  const quality = config?.quality || 0.92;

  let mimeType: string;
  switch (format) {
    case "jpeg":
      mimeType = "image/jpeg";
      break;
    case "webp":
      mimeType = "image/webp";
      break;
    case "png":
    default:
      mimeType = "image/png";
      break;
  }

  return canvas.toDataURL(mimeType, quality);
}

/**
 * Export a canvas as a Blob
 */
export function exportCanvasAsBlob(
  canvas: HTMLCanvasElement,
  config?: ExportConfig
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const format = config?.format || "png";
    const quality = config?.quality || 0.92;

    let mimeType: string;
    switch (format) {
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "webp":
        mimeType = "image/webp";
        break;
      case "png":
      default:
        mimeType = "image/png";
        break;
    }

    canvas.toBlob(resolve, mimeType, quality);
  });
}

/**
 * Download a canvas as an image file
 */
export async function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  config?: ExportConfig
): Promise<void> {
  const dataURL = exportCanvasAsDataURL(canvas, config);
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  link.click();
}

/**
 * Create a scaled canvas from an existing canvas
 */
export function scaleCanvas(
  sourceCanvas: HTMLCanvasElement,
  scale: number
): HTMLCanvasElement {
  const scaledCanvas = document.createElement("canvas");
  scaledCanvas.width = sourceCanvas.width * scale;
  scaledCanvas.height = sourceCanvas.height * scale;

  const ctx = scaledCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D context");
  }

  ctx.imageSmoothingEnabled = false;
  ctx.scale(scale, scale);
  ctx.drawImage(sourceCanvas, 0, 0);

  return scaledCanvas;
}
