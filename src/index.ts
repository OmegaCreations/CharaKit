// Main exports
export { AvatarMaker } from "./components/AvatarMaker";
export { AvatarRenderer } from "./components/AvatarRenderer";

// Hooks
export { useAvatarExport } from "./hooks/useAvatarExport";

// Types
export type {
  SpriteSheetConfig,
  SpriteTrim,
  Sprite,
  AvatarPartCategory,
  AvatarPartConfig,
  AvatarSelection,
  AvatarMode,
  AvatarPreset,
  FeatureFlags,
  ExportConfig,
  UploadConfig,
  AvatarMakerConfig,
  AvatarMakerProps,
  AvatarRendererProps,
  PartPosition,
  AutoPositionConfig,
} from "./types";

// Utilities
export { parseSpriteSheet, loadImage, drawSprite } from "./utils/spriteSheet";

export {
  exportCanvasAsDataURL,
  exportCanvasAsBlob,
  downloadCanvas,
  scaleCanvas,
} from "./utils/export";

export { uploadCanvas } from "./utils/upload";

export {
  calculatePartPosition,
  buildPositionMap,
  calculateAutoX,
} from "./utils/positioning";

export type { CalculatedPosition } from "./utils/positioning";

// Preset utilities
export {
  getPresetFeatures,
  applyPreset,
  filterPartsByPreset,
} from "./utils/presets";

// Config export utilities
export {
  exportConfigAsJSON,
  downloadConfig,
  importConfigFromJSON,
  exportConfigAsTypeScript,
  copyConfigToClipboard,
} from "./utils/configExport";
