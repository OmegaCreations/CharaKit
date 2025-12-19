import { AvatarPartConfig, PartPosition, Sprite } from "../types";

/**
 * Calculated position for a part
 */
export interface CalculatedPosition {
  x: number;
  y: number;
}

/**
 * Calculate the position for a part based on its configuration
 */
export function calculatePartPosition(
  part: AvatarPartConfig,
  sprite: Sprite,
  canvasWidth: number,
  canvasHeight: number,
  relativePartPosition?: CalculatedPosition,
  relativePartSprite?: Sprite
): CalculatedPosition {
  const position = part.position || {};
  const autoPosition = part.autoPosition;

  let x: number;
  let y: number;

  // Calculate X position
  if (position.x !== undefined) {
    // Explicit X position
    x = position.x;
  } else {
    // Default: center horizontally
    const anchorX = position.anchorX || "center";
    switch (anchorX) {
      case "left":
        x = 0;
        break;
      case "right":
        x = canvasWidth - sprite.width;
        break;
      case "center":
      default:
        x = (canvasWidth - sprite.width) / 2;
        break;
    }
  }

  // Calculate Y position
  if (position.y !== undefined) {
    // Explicit Y position
    y = position.y;
  } else if (autoPosition && relativePartPosition && relativePartSprite) {
    // Auto-position relative to another part
    y = calculateAutoY(
      autoPosition.position || "below",
      relativePartPosition,
      relativePartSprite,
      sprite,
      autoPosition.gap || 0
    );
  } else {
    // Default: center vertically or top
    const anchorY = position.anchorY || "top";
    switch (anchorY) {
      case "top":
        y = 0;
        break;
      case "bottom":
        y = canvasHeight - sprite.height;
        break;
      case "center":
      default:
        y = (canvasHeight - sprite.height) / 2;
        break;
    }
  }

  // Apply offsets
  x += position.offsetX || 0;
  y += position.offsetY || 0;

  return { x, y };
}

/**
 * Calculate Y position for auto-positioning
 * Uses content bounds if available for more accurate positioning
 */
function calculateAutoY(
  position: "above" | "below" | "left" | "right" | "center",
  relativePos: CalculatedPosition,
  relativeSprite: Sprite,
  currentSprite: Sprite,
  gap: number
): number {
  // Use content height if available, otherwise use full sprite height
  const relativeHeight = relativeSprite.contentHeight ?? relativeSprite.height;
  const relativeOffsetY = relativeSprite.contentOffsetY ?? 0;
  const currentHeight = currentSprite.contentHeight ?? currentSprite.height;
  const currentOffsetY = currentSprite.contentOffsetY ?? 0;

  switch (position) {
    case "above":
      // Position above: align bottom of current sprite's content with top of relative sprite's content
      return (
        relativePos.y + relativeOffsetY - currentHeight - currentOffsetY - gap
      );
    case "below":
      // Position below: align top of current sprite's content with bottom of relative sprite's content
      return (
        relativePos.y + relativeOffsetY + relativeHeight - currentOffsetY + gap
      );
    case "center":
      // Center vertically based on content bounds
      return (
        relativePos.y +
        relativeOffsetY +
        (relativeHeight - currentHeight) / 2 -
        currentOffsetY
      );
    case "left":
    case "right":
      // For left/right, align vertically with the relative part's content
      return relativePos.y + relativeOffsetY - currentOffsetY;
    default:
      return (
        relativePos.y + relativeOffsetY + relativeHeight - currentOffsetY + gap
      );
  }
}

/**
 * Calculate X position for auto-positioning (when needed)
 * Uses content bounds if available for more accurate positioning
 */
export function calculateAutoX(
  position: "above" | "below" | "left" | "right" | "center",
  relativePos: CalculatedPosition,
  relativeSprite: Sprite,
  currentSprite: Sprite,
  gap: number,
  canvasWidth: number
): number {
  // Use content width if available, otherwise use full sprite width
  const relativeWidth = relativeSprite.contentWidth ?? relativeSprite.width;
  const relativeOffsetX = relativeSprite.contentOffsetX ?? 0;
  const currentWidth = currentSprite.contentWidth ?? currentSprite.width;
  const currentOffsetX = currentSprite.contentOffsetX ?? 0;

  switch (position) {
    case "left":
      // Position to the left: align right edge of current content with left edge of relative content
      return (
        relativePos.x + relativeOffsetX - currentWidth - currentOffsetX - gap
      );
    case "right":
      // Position to the right: align left edge of current content with right edge of relative content
      return (
        relativePos.x + relativeOffsetX + relativeWidth - currentOffsetX + gap
      );
    case "center":
      // Center horizontally based on content bounds
      return (
        relativePos.x +
        relativeOffsetX +
        (relativeWidth - currentWidth) / 2 -
        currentOffsetX
      );
    case "above":
    case "below":
      // For above/below, center horizontally with the relative part's content
      return (
        relativePos.x +
        relativeOffsetX +
        (relativeWidth - currentWidth) / 2 -
        currentOffsetX
      );
    default:
      return (canvasWidth - currentSprite.width) / 2;
  }
}

/**
 * Build a position map for all parts considering dependencies
 */
export function buildPositionMap(
  parts: AvatarPartConfig[],
  sprites: Map<string, Sprite>,
  canvasWidth: number,
  canvasHeight: number
): Map<string, CalculatedPosition> {
  const positionMap = new Map<string, CalculatedPosition>();
  const processed = new Set<string>();
  const processing = new Set<string>(); // Track parts currently being processed

  // Sort parts by dependencies (parts without autoPosition first)
  const sortedParts = [...parts].sort((a, b) => {
    const aHasDep = !!a.autoPosition?.relativeTo;
    const bHasDep = !!b.autoPosition?.relativeTo;
    if (aHasDep === bHasDep) return 0;
    return aHasDep ? 1 : -1;
  });

  function processpart(part: AvatarPartConfig): void {
    if (processed.has(part.category)) return;

    // Detect circular dependency
    if (processing.has(part.category)) {
      console.warn(
        `Circular dependency detected for part "${part.category}". Skipping auto-positioning for this part.`
      );
      // Process without relative positioning to break the cycle
      const sprite = sprites.get(part.category);
      if (!sprite) return;

      const position = calculatePartPosition(
        part,
        sprite,
        canvasWidth,
        canvasHeight
      );
      positionMap.set(part.category, position);
      processed.add(part.category);
      return;
    }

    processing.add(part.category);

    const sprite = sprites.get(part.category);
    if (!sprite) {
      processing.delete(part.category);
      return;
    }

    let relativePos: CalculatedPosition | undefined;
    let relativeSprite: Sprite | undefined;

    // If this part has auto-positioning, process the relative part first
    if (part.autoPosition?.relativeTo) {
      const relativePart = sortedParts.find(
        (p) => p.category === part.autoPosition!.relativeTo
      );
      if (relativePart && !processed.has(relativePart.category)) {
        processpart(relativePart);
      }
      relativePos = positionMap.get(part.autoPosition.relativeTo);
      relativeSprite = sprites.get(part.autoPosition.relativeTo);
    }

    const position = calculatePartPosition(
      part,
      sprite,
      canvasWidth,
      canvasHeight,
      relativePos,
      relativeSprite
    );

    // Handle horizontal auto-positioning if needed
    if (
      part.autoPosition?.relativeTo &&
      relativePos &&
      relativeSprite &&
      part.position?.x === undefined
    ) {
      const autoPos = part.autoPosition.position || "below";
      if (autoPos === "left" || autoPos === "right") {
        position.x = calculateAutoX(
          autoPos,
          relativePos,
          relativeSprite,
          sprite,
          part.autoPosition.gap || 0,
          canvasWidth
        );
      }
    }

    positionMap.set(part.category, position);
    processed.add(part.category);
    processing.delete(part.category);
  }

  sortedParts.forEach(processpart);

  return positionMap;
}
