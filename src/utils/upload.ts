import { UploadConfig } from "../types";
import { exportCanvasAsBlob } from "./export";

/**
 * Upload a canvas to a specified endpoint
 */
export async function uploadCanvas(
  canvas: HTMLCanvasElement,
  config: UploadConfig
): Promise<Response> {
  const blob = await exportCanvasAsBlob(canvas);

  if (!blob) {
    throw new Error("Failed to create blob from canvas");
  }

  const formData = new FormData();
  const fieldName = config.fieldName || "avatar";
  const filename = `avatar.${blob.type.split("/")[1]}`;

  formData.append(fieldName, blob, filename);

  // Add additional form data if provided
  if (config.additionalData) {
    Object.keys(config.additionalData).forEach((key: string) => {
      formData.append(key, config.additionalData![key]);
    });
  }

  const method = config.method || "POST";
  const headers = config.headers || {};

  const response = await fetch(config.endpoint, {
    method,
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response;
}
