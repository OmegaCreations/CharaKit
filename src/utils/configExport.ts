import { AvatarMakerConfig } from "../types";

/**
 * Export configuration as JSON string
 */
export function exportConfigAsJSON(config: AvatarMakerConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Export configuration as downloadable JSON file
 */
export function downloadConfig(
  config: AvatarMakerConfig,
  filename = "avatar-config.json"
): void {
  const json = exportConfigAsJSON(config);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import configuration from JSON string
 */
export function importConfigFromJSON(json: string): AvatarMakerConfig {
  try {
    return JSON.parse(json) as AvatarMakerConfig;
  } catch (error) {
    throw new Error("Invalid configuration JSON");
  }
}

/**
 * Export configuration as TypeScript code
 */
export function exportConfigAsTypeScript(config: AvatarMakerConfig): string {
  return `import { AvatarMakerConfig } from "react-avatar-maker";

export const avatarConfig: AvatarMakerConfig = ${JSON.stringify(
    config,
    null,
    2
  )};
`;
}

/**
 * Copy configuration to clipboard
 */
export async function copyConfigToClipboard(
  config: AvatarMakerConfig
): Promise<void> {
  const json = exportConfigAsJSON(config);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(json);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = json;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}
