import { SpriteSheetConfig, Sprite } from "../types";

/**
 * Parse a sprite sheet configuration and return an array of sprite positions
 * Note: spacingX and spacingY represent the gap BETWEEN sprites, not padding around them.
 * The spacing is added after each sprite to calculate the next sprite's position.
 */
export function parseSpriteSheet(config: SpriteSheetConfig): Sprite[] {
  const sprites: Sprite[] = [];
  const spacingX = config.spacingX || 0;
  const spacingY = config.spacingY || 0;
  const trim = config.trim;

  let index = 0;
  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.columns; col++) {
      // Calculate position: each sprite is offset by (spriteWidth + spacing) from the previous one
      // This correctly handles spacing as the gap between sprites
      const sprite: Sprite = {
        index,
        x: col * (config.spriteWidth + spacingX),
        y: row * (config.spriteHeight + spacingY),
        width: config.spriteWidth,
        height: config.spriteHeight,
      };

      // Calculate content bounds if trim is specified
      if (trim) {
        const trimTop = trim.top || 0;
        const trimBottom = trim.bottom || 0;
        const trimLeft = trim.left || 0;
        const trimRight = trim.right || 0;

        sprite.contentWidth = config.spriteWidth - trimLeft - trimRight;
        sprite.contentHeight = config.spriteHeight - trimTop - trimBottom;
        sprite.contentOffsetX = trimLeft;
        sprite.contentOffsetY = trimTop;
      }

      sprites.push(sprite);
      index++;
    }
  }

  return sprites;
}

/**
 * Load an image from a URL
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Draw a sprite from a sprite sheet onto a canvas
 */
export function drawSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sprite: Sprite,
  destX: number,
  destY: number,
  destWidth?: number,
  destHeight?: number
): void {
  const dw = destWidth || sprite.width;
  const dh = destHeight || sprite.height;

  ctx.drawImage(
    image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    destX,
    destY,
    dw,
    dh
  );
}
