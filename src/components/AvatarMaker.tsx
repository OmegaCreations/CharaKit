import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { AvatarMakerProps } from "../types";
import { AvatarRenderer } from "./AvatarRenderer";
import { useAvatarExport } from "../hooks/useAvatarExport";

export interface AvatarMakerRef {
  exportAsDataURL: (exportConfig?: any) => string | null;
  exportAsBlob: (exportConfig?: any) => Promise<Blob | null>;
  download: (filename: string, exportConfig?: any) => Promise<void>;
  upload: (uploadConfig?: any) => Promise<Response>;
}

/**
 * AvatarMaker component - Main component that combines rendering and export functionality
 */
export const AvatarMaker = forwardRef<AvatarMakerRef, AvatarMakerProps>(
  ({ config, selection, onSelectionChange, className, style }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { exportAsDataURL, exportAsBlob, download, upload } =
      useAvatarExport(canvasRef);

    // Expose export methods through ref
    useImperativeHandle(ref, () => ({
      exportAsDataURL: (exportConfig = config.exportConfig) =>
        exportAsDataURL(exportConfig),
      exportAsBlob: (exportConfig = config.exportConfig) =>
        exportAsBlob(exportConfig),
      download: (filename: string, exportConfig = config.exportConfig) =>
        download(filename, exportConfig),
      upload: (uploadConfig = config.uploadConfig) => {
        if (!uploadConfig) {
          throw new Error("Upload config not provided");
        }
        return upload(uploadConfig);
      },
    }));

    return (
      <div className={className} style={style}>
        <AvatarRenderer config={config} selection={selection} ref={canvasRef} />
      </div>
    );
  }
);

AvatarMaker.displayName = "AvatarMaker";

// Export hook for direct use
export { useAvatarExport };
