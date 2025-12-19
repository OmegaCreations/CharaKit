import { useState, useRef } from "react";
import {
  AvatarRenderer,
  useAvatarExport,
  downloadConfig,
  copyConfigToClipboard,
  exportConfigAsTypeScript,
} from "react-avatar-maker";
import type { AvatarMakerConfig, AvatarSelection } from "react-avatar-maker";
import {
  rpgConfig,
  defaultRpgSelection,
  rpgPartLabels,
} from "../configs/rpgConfig";
import "../styles/Configurator.css";

export function Configurator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selection, setSelection] =
    useState<AvatarSelection>(defaultRpgSelection);
  const [canvasWidth, setCanvasWidth] = useState(128);
  const [canvasHeight, setCanvasHeight] = useState(128);
  const [pixelScale, setPixelScale] = useState(3);

  const [enabledParts, setEnabledParts] = useState<Record<string, boolean>>({
    body: true,
    head: true,
    face: true,
    cosmetic: true,
    custom: true,
  });

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configFormat, setConfigFormat] = useState<"json" | "typescript">(
    "json"
  );

  // Export configuration
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "webp">(
    "png"
  );
  const [exportQuality, setExportQuality] = useState(1);
  const [exportScale, setExportScale] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("");

  const { download } = useAvatarExport(canvasRef);

  // Generate config
  const config: AvatarMakerConfig = {
    ...rpgConfig,
    width: canvasWidth,
    height: canvasHeight,
    pixelScale: pixelScale,
    exportConfig: {
      format: exportFormat,
      quality: exportQuality,
      scale: exportScale,
      backgroundColor: backgroundColor || undefined,
    },
    parts: rpgConfig.parts.map((part) => ({
      ...part,
      enabled: enabledParts[part.category] ?? true,
    })),
  };

  const handlePartChange = (category: string, index: number | null) => {
    setSelection((prev) => ({
      ...prev,
      [category]: index,
    }));
  };

  const handleRpgPartChange = (
    category: string,
    sheetIndex: number,
    spriteIndex: number
  ) => {
    setSelection((prev) => ({
      ...prev,
      [category]: { sheetIndex, spriteIndex },
    }));
  };

  const togglePartEnabled = (category: string) => {
    setEnabledParts((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleDownload = () => {
    download("my-avatar.png", config.exportConfig);
  };

  const handleCopyConfig = async () => {
    try {
      await copyConfigToClipboard(config);
      alert("Configuration copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy configuration");
    }
  };

  const handleDownloadConfig = () => {
    downloadConfig(config, "avatar-config.json");
  };

  const getConfigString = () => {
    if (configFormat === "typescript") {
      return exportConfigAsTypeScript(config);
    }
    return JSON.stringify(config, null, 2);
  };

  const renderRpgPartSelector = (category: string) => {
    const part = config.parts.find((p) => p.category === category);
    if (!part || !part.spriteSheets) return null;

    const currentSel = selection[category];

    return (
      <div className="part-selector" key={category}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>{part.label || category}</h3>
          {part.optional && (
            <label style={{ fontSize: "0.9rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={enabledParts[category] ?? true}
                onChange={() => togglePartEnabled(category)}
                style={{ marginRight: "0.5rem" }}
              />
              Enable
            </label>
          )}
        </div>
        {enabledParts[category] && (
          <div className="button-group">
            {part.optional && (
              <button
                className={currentSel === null ? "active" : ""}
                onClick={() => handlePartChange(category, null)}
              >
                None
              </button>
            )}
            {part.spriteSheets.map((_, idx) => {
              const labels =
                rpgPartLabels[category as keyof typeof rpgPartLabels];
              const label = labels?.[idx] || `Option ${idx + 1}`;
              const isActive =
                currentSel &&
                typeof currentSel === "object" &&
                "sheetIndex" in currentSel
                  ? currentSel.sheetIndex === idx
                  : false;

              return (
                <button
                  key={idx}
                  className={isActive ? "active" : ""}
                  onClick={() => handleRpgPartChange(category, idx, 0)}
                  title={label}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="configurator-page">
      <header className="configurator-header">
        <h1>Character Creator Configurator</h1>
        <p>Customize and export your character configuration</p>
      </header>

      <div className="configurator-container">
        <div className="preview-panel">
          <h2>Preview</h2>
          <div className="canvas-wrapper">
            <AvatarRenderer
              config={config}
              selection={selection}
              ref={canvasRef}
              className="avatar-canvas"
            />
          </div>

          <div className="export-buttons">
            <button onClick={handleDownload} className="btn btn-primary">
              Download Character
            </button>
            <button
              onClick={() => setShowConfigModal(true)}
              className="btn btn-secondary"
            >
              View Config
            </button>
          </div>
        </div>

        <div className="config-panel">
          <div className="config-section">
            <h2>Canvas Size</h2>
            <div className="size-inputs">
              <label>
                Width:
                <input
                  type="number"
                  value={canvasWidth}
                  onChange={(e) => setCanvasWidth(Number(e.target.value))}
                  min="100"
                  max="1000"
                />
              </label>
              <label>
                Height:
                <input
                  type="number"
                  value={canvasHeight}
                  onChange={(e) => setCanvasHeight(Number(e.target.value))}
                  min="100"
                  max="1000"
                />
              </label>
            </div>
          </div>

          <div className="config-section">
            <h2>Pixel Scale</h2>
            <div className="size-inputs">
              <label>
                Scale Factor:
                <input
                  type="number"
                  value={pixelScale}
                  onChange={(e) => setPixelScale(Number(e.target.value))}
                  min="1"
                  max="8"
                  step="1"
                />
              </label>
              <small
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  color: "#666",
                }}
              >
                Scale up pixel art without losing quality (1-8x)
              </small>
            </div>
          </div>

          <div className="config-section">
            <h2>Export Configuration</h2>
            <div className="size-inputs">
              <label>
                Format:
                <select
                  value={exportFormat}
                  onChange={(e) =>
                    setExportFormat(e.target.value as "png" | "jpeg" | "webp")
                  }
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WebP</option>
                </select>
              </label>
              {(exportFormat === "jpeg" || exportFormat === "webp") && (
                <label>
                  Quality:
                  <input
                    type="number"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(Number(e.target.value))}
                    min="0"
                    max="1"
                    step="0.1"
                  />
                </label>
              )}
              <label>
                Export Scale:
                <input
                  type="number"
                  value={exportScale}
                  onChange={(e) => setExportScale(Number(e.target.value))}
                  min="1"
                  max="4"
                  step="1"
                />
              </label>
              <label>
                Background Color:
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
                <button
                  onClick={() => setBackgroundColor("")}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Clear
                </button>
              </label>
              <small
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  color: "#666",
                }}
              >
                Export scale multiplies the final image size
              </small>
            </div>
          </div>

          <div className="config-section">
            <h2>Customize Character</h2>
            {renderRpgPartSelector("body")}
            {renderRpgPartSelector("face")}
            {renderRpgPartSelector("cosmetic")}
            {renderRpgPartSelector("custom")}
            {renderRpgPartSelector("head")}
          </div>
        </div>
      </div>

      {showConfigModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowConfigModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Configuration</h2>
              <button
                onClick={() => setShowConfigModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="format-selector">
                <button
                  className={configFormat === "json" ? "active" : ""}
                  onClick={() => setConfigFormat("json")}
                >
                  JSON
                </button>
                <button
                  className={configFormat === "typescript" ? "active" : ""}
                  onClick={() => setConfigFormat("typescript")}
                >
                  TypeScript
                </button>
              </div>
              <pre className="config-code">
                <code>{getConfigString()}</code>
              </pre>
            </div>
            <div className="modal-footer">
              <button onClick={handleCopyConfig} className="btn btn-primary">
                Copy to Clipboard
              </button>
              <button
                onClick={handleDownloadConfig}
                className="btn btn-secondary"
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
