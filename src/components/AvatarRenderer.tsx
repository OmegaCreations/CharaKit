import React, { useEffect, useRef, useState, forwardRef } from "react";
import { AvatarRendererProps, SpriteSheetConfig } from "../types";
import { parseSpriteSheet, loadImage, drawSprite } from "../utils/spriteSheet";
import { buildPositionMap } from "../utils/positioning";

/**
 * AvatarRenderer component - Renders the avatar on a canvas
 */
export const AvatarRenderer = forwardRef<
  HTMLCanvasElement,
  AvatarRendererProps
>(({ config, selection, className, style, onReady }, ref) => {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = (ref as React.RefObject<HTMLCanvasElement>) || internalRef;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Load all images (including multiple sprite sheets per part)
  useEffect(() => {
    const loadAllImages = async () => {
      const imagePromises: Promise<void>[] = [];

      config.parts
        .filter((part) => part.enabled !== false) // Skip disabled parts
        .forEach((part) => {
          // Handle single sprite sheet
          if (part.spriteSheet) {
            const sheetUrl = part.spriteSheet.url;
            if (!imagesCache.current.has(sheetUrl)) {
              imagePromises.push(
                loadImage(sheetUrl).then((img) => {
                  imagesCache.current.set(sheetUrl, img);
                })
              );
            }
          }

          // Handle multiple sprite sheets
          if (part.spriteSheets) {
            part.spriteSheets.forEach((sheet) => {
              if (!imagesCache.current.has(sheet.url)) {
                imagePromises.push(
                  loadImage(sheet.url).then((img) => {
                    imagesCache.current.set(sheet.url, img);
                  })
                );
              }
            });
          }
        });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
      onReady?.();
    };

    loadAllImages().catch(console.error);
  }, [config.parts, onReady]);

  // Render avatar
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Disable image smoothing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false;

    // Get pixel scale factor (default to 1 if not specified)
    const pixelScale = config.pixelScale || 1;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply background color if specified
    if (config.exportConfig?.backgroundColor) {
      ctx.fillStyle = config.exportConfig.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Apply scaling transformation for pixel art
    if (pixelScale !== 1) {
      ctx.save();
      ctx.scale(pixelScale, pixelScale);
    }

    // Sort parts by z-index
    const sortedParts = [...config.parts].sort((a, b) => {
      const zIndexA = a.zIndex ?? 0;
      const zIndexB = b.zIndex ?? 0;
      return zIndexA - zIndexB;
    });

    // Build sprite map for selected parts
    const spriteMap = new Map();
    const sheetUrlMap = new Map<string, string>(); // Track which sheet URL to use for each part

    sortedParts
      .filter((part) => part.enabled !== false)
      .forEach((part) => {
        const selected = selection[part.category];
        if (selected === null || selected === undefined) return;

        let spriteSheet: SpriteSheetConfig | undefined;
        let spriteIndex: number | undefined;

        // Handle multi-sheet selection format
        if (typeof selected === "object" && "sheetIndex" in selected) {
          if (part.spriteSheets && part.spriteSheets[selected.sheetIndex]) {
            spriteSheet = part.spriteSheets[selected.sheetIndex];
            spriteIndex = selected.spriteIndex;
          }
        } else {
          // Handle single sheet or simple index
          spriteSheet = part.spriteSheet || part.spriteSheets?.[0];
          spriteIndex = selected as number;
        }

        if (!spriteSheet || spriteIndex === undefined) return;

        const sprites = parseSpriteSheet(spriteSheet);
        const sprite = sprites[spriteIndex];
        if (sprite) {
          spriteMap.set(part.category, sprite);
          sheetUrlMap.set(part.category, spriteSheet.url);
        }
      });

    // Calculate positions for all parts (use unscaled dimensions for positioning)
    const positionMap = buildPositionMap(
      sortedParts.filter((part) => spriteMap.has(part.category)),
      spriteMap,
      canvas.width / pixelScale,
      canvas.height / pixelScale
    );

    // Draw each selected part with calculated positions
    sortedParts
      .filter((part) => part.enabled !== false)
      .forEach((part) => {
        const sprite = spriteMap.get(part.category);
        if (!sprite) return;

        const sheetUrl = sheetUrlMap.get(part.category);
        if (!sheetUrl) return;

        const image = imagesCache.current.get(sheetUrl);
        if (!image) return;

        const position = positionMap.get(part.category);
        if (!position) return;

        drawSprite(ctx, image, sprite, position.x, position.y);
      });

    // Restore canvas context if scaling was applied
    if (pixelScale !== 1) {
      ctx.restore();
    }
  }, [imagesLoaded, selection, config, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={config.width}
      height={config.height}
      className={className}
      style={
        {
          imageRendering: "pixelated",
          ...style,
        } as React.CSSProperties
      }
    />
  );
});

AvatarRenderer.displayName = "AvatarRenderer";
