import React from "react";

/**
 * Trim/padding configuration for sprites
 * Defines the actual content area within a sprite, excluding transparent padding
 */
export interface SpriteTrim {
  /** Padding from the top edge in pixels */
  top?: number;
  /** Padding from the bottom edge in pixels */
  bottom?: number;
  /** Padding from the left edge in pixels */
  left?: number;
  /** Padding from the right edge in pixels */
  right?: number;
}

/**
 * Configuration for a sprite sheet
 */
export interface SpriteSheetConfig {
  /** URL or path to the sprite sheet image */
  url: string;
  /** Width of each sprite in pixels */
  spriteWidth: number;
  /** Height of each sprite in pixels */
  spriteHeight: number;
  /** Horizontal spacing between sprites in pixels */
  spacingX?: number;
  /** Vertical spacing between sprites in pixels */
  spacingY?: number;
  /** Number of columns in the sprite sheet */
  columns: number;
  /** Number of rows in the sprite sheet */
  rows: number;
  /**
   * Trim/padding configuration - defines transparent padding around the actual sprite content
   * Used for accurate positioning when sprites have internal padding
   */
  trim?: SpriteTrim;
}

/**
 * A single sprite extracted from a sprite sheet
 */
export interface Sprite {
  /** Index of the sprite in the sheet */
  index: number;
  /** X position in the sprite sheet */
  x: number;
  /** Y position in the sprite sheet */
  y: number;
  /** Width of the sprite */
  width: number;
  /** Height of the sprite */
  height: number;
  /** Content bounds (actual visible area excluding transparent padding) */
  contentWidth?: number;
  /** Content height (actual visible area excluding transparent padding) */
  contentHeight?: number;
  /** Content offset from top */
  contentOffsetY?: number;
  /** Content offset from left */
  contentOffsetX?: number;
}

/**
 * Category of avatar parts
 */
export type AvatarPartCategory =
  | "head"
  | "body"
  | "face"
  | "cosmetic"
  | "border"
  | "custom";

/**
 * Position configuration for avatar parts
 */
export interface PartPosition {
  /** X position in pixels (if not specified, will be centered) */
  x?: number;
  /** Y position in pixels (if not specified, will be auto-positioned) */
  y?: number;
  /** Horizontal offset from calculated position */
  offsetX?: number;
  /** Vertical offset from calculated position */
  offsetY?: number;
  /** Anchor point for positioning: 'top', 'center', 'bottom' */
  anchorY?: "top" | "center" | "bottom";
  /** Horizontal anchor: 'left', 'center', 'right' */
  anchorX?: "left" | "center" | "right";
}

/**
 * Auto-positioning configuration
 */
export interface AutoPositionConfig {
  /** Category to position relative to (e.g., 'head' for body) */
  relativeTo?: AvatarPartCategory;
  /** Position relative to the anchor part: 'above', 'below', 'left', 'right', 'center' */
  position?: "above" | "below" | "left" | "right" | "center";
  /** Gap between this part and the relative part in pixels */
  gap?: number;
}

/**
 * Configuration for a category of avatar parts
 */
export interface AvatarPartConfig {
  /** Category name */
  category: AvatarPartCategory;
  /** Sprite sheet configuration (single sheet) */
  spriteSheet?: SpriteSheetConfig;
  /** Multiple sprite sheets for this category (alternative to spriteSheet) */
  spriteSheets?: SpriteSheetConfig[];
  /** Z-index for layering (higher = on top) */
  zIndex?: number;
  /** Position configuration */
  position?: PartPosition;
  /** Auto-positioning relative to another part */
  autoPosition?: AutoPositionConfig;
  /** Whether this part can be toggled on/off (null selection allowed) */
  optional?: boolean;
  /** Label for this part category (for UI display) */
  label?: string;
  /** Whether this part is enabled (can be used to disable features) */
  enabled?: boolean;
}

/**
 * Selected parts for the avatar
 * Can be a sprite index, or an object with sheet and sprite index for multi-sheet support
 */
export interface AvatarSelection {
  [category: string]:
    | number
    | null
    | { sheetIndex: number; spriteIndex: number };
}

/**
 * Avatar rendering mode
 */
export type AvatarMode = "full" | "torso";

/**
 * Preset style configurations for different use cases
 */
export type AvatarPreset =
  | "profile-editor" // Simple profile picture editor (head, face, border)
  | "character-maker" // Full character customization (all parts)
  | "rpg-avatar" // RPG-style avatar (head, body, cosmetics)
  | "custom"; // Custom configuration

/**
 * Feature flags for enabling/disabling library features
 */
export interface FeatureFlags {
  /** Allow toggling parts on/off */
  allowToggle?: boolean;
  /** Allow multiple sprite sheets per category */
  multipleSheets?: boolean;
  /** Show part labels in UI */
  showLabels?: boolean;
  /** Allow exporting configuration */
  allowConfigExport?: boolean;
  /** Enable auto-positioning */
  autoPositioning?: boolean;
}

/**
 * Export configuration
 */
export interface ExportConfig {
  /** Format for export */
  format?: "png" | "jpeg" | "webp";
  /** Quality for JPEG/WebP (0-1) */
  quality?: number;
  /** Background color (transparent by default for PNG) */
  backgroundColor?: string;
  /** Scale factor for export (1 = original size) */
  scale?: number;
}

/**
 * Upload configuration
 */
export interface UploadConfig {
  /** Endpoint URL to upload the avatar */
  endpoint: string;
  /** HTTP method */
  method?: "POST" | "PUT";
  /** Additional headers */
  headers?: Record<string, string>;
  /** Field name for the file in FormData */
  fieldName?: string;
  /** Additional form data fields */
  additionalData?: Record<string, string>;
}

/**
 * Main configuration for the Avatar Maker
 */
export interface AvatarMakerConfig {
  /** Array of avatar part configurations */
  parts: AvatarPartConfig[];
  /** Rendering mode */
  mode?: AvatarMode;
  /** Width of the canvas */
  width: number;
  /** Height of the canvas */
  height: number;
  /** Export configuration */
  exportConfig?: ExportConfig;
  /** Upload configuration */
  uploadConfig?: UploadConfig;
  /** Preset style to use */
  preset?: AvatarPreset;
  /** Feature flags */
  features?: FeatureFlags;
  /** Scale factor for pixel art rendering (e.g., 2 = 2x size, 4 = 4x size). Maintains crisp pixel art quality. */
  pixelScale?: number;
}

/**
 * Props for the AvatarMaker component
 */
export interface AvatarMakerProps {
  /** Configuration for the avatar maker */
  config: AvatarMakerConfig;
  /** Selected parts */
  selection: AvatarSelection;
  /** Callback when selection changes */
  onSelectionChange?: (selection: AvatarSelection) => void;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for the AvatarRenderer component
 */
export interface AvatarRendererProps {
  /** Configuration for the avatar maker */
  config: AvatarMakerConfig;
  /** Selected parts */
  selection: AvatarSelection;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Callback when avatar is ready */
  onReady?: () => void;
}
