import { AvatarMakerConfig, AvatarPreset, FeatureFlags } from "../types";

/**
 * Get default feature flags for a preset
 */
export function getPresetFeatures(preset: AvatarPreset): FeatureFlags {
  switch (preset) {
    case "profile-editor":
      return {
        allowToggle: true,
        multipleSheets: false,
        showLabels: true,
        allowConfigExport: false,
        autoPositioning: true,
      };

    case "character-maker":
      return {
        allowToggle: true,
        multipleSheets: true,
        showLabels: true,
        allowConfigExport: true,
        autoPositioning: true,
      };

    case "rpg-avatar":
      return {
        allowToggle: true,
        multipleSheets: true,
        showLabels: false,
        allowConfigExport: false,
        autoPositioning: true,
      };

    case "custom":
    default:
      return {
        allowToggle: true,
        multipleSheets: true,
        showLabels: true,
        allowConfigExport: true,
        autoPositioning: true,
      };
  }
}

/**
 * Apply preset configuration to a config object
 */
export function applyPreset(
  config: AvatarMakerConfig,
  preset: AvatarPreset
): AvatarMakerConfig {
  const features = getPresetFeatures(preset);

  return {
    ...config,
    preset,
    features: {
      ...features,
      ...config.features, // Allow overrides
    },
  };
}

/**
 * Filter parts based on preset
 */
export function filterPartsByPreset(
  config: AvatarMakerConfig
): AvatarMakerConfig {
  if (!config.preset || config.preset === "custom") {
    return config;
  }

  let enabledCategories: string[] = [];

  switch (config.preset) {
    case "profile-editor":
      enabledCategories = ["head", "face", "border"];
      break;

    case "character-maker":
      enabledCategories = ["head", "body", "face", "cosmetic", "border"];
      break;

    case "rpg-avatar":
      enabledCategories = ["head", "body", "cosmetic"];
      break;
  }

  return {
    ...config,
    parts: config.parts.map((part) => ({
      ...part,
      enabled: enabledCategories.includes(part.category),
    })),
  };
}
