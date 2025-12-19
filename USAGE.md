# React Avatar Maker - Usage Guide

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Configuration](#configuration)
4. [Sprite Sheet Preparation](#sprite-sheet-preparation)
5. [Advanced Features](#advanced-features)
6. [API Reference](#api-reference)

## Installation

```bash
npm install react-avatar-maker
```

## Basic Setup

### 1. Prepare Your Sprite Sheets

Create PNG files with your character parts arranged in a grid. For example:

```
sprites/
  ├── bodies.png    (4 columns × 3 rows)
  ├── heads.png     (5 columns × 2 rows)
  ├── faces.png     (6 columns × 2 rows)
  └── cosmetics.png (4 columns × 2 rows)
```

### 2. Create Configuration

```tsx
import { AvatarMakerConfig } from "react-avatar-maker";

const config: AvatarMakerConfig = {
  width: 300,
  height: 400,
  mode: "full", // or 'torso'
  parts: [
    {
      category: "body",
      zIndex: 1,
      spriteSheet: {
        url: "/sprites/bodies.png",
        spriteWidth: 300,
        spriteHeight: 400,
        columns: 4,
        rows: 3,
        spacingX: 0, // spacing between sprites
        spacingY: 0,
      },
    },
    {
      category: "head",
      zIndex: 2,
      spriteSheet: {
        url: "/sprites/heads.png",
        spriteWidth: 300,
        spriteHeight: 200,
        columns: 5,
        rows: 2,
      },
    },
  ],
};
```

### 3. Use the Component

```tsx
import React, { useState } from "react";
import { AvatarRenderer, AvatarSelection } from "react-avatar-maker";

function MyAvatarMaker() {
  const [selection, setSelection] = useState<AvatarSelection>({
    body: 0,
    head: 0,
  });

  return <AvatarRenderer config={config} selection={selection} />;
}
```

## Configuration

### Sprite Sheet Configuration

```typescript
interface SpriteSheetConfig {
  url: string; // Path to sprite sheet image
  spriteWidth: number; // Width of each sprite
  spriteHeight: number; // Height of each sprite
  columns: number; // Number of columns
  rows: number; // Number of rows
  spacingX?: number; // Horizontal spacing (default: 0)
  spacingY?: number; // Vertical spacing (default: 0)
}
```

### Part Categories

Available categories:

- `'head'` - Head/hair parts
- `'body'` - Body/clothing
- `'face'` - Facial features
- `'cosmetic'` - Accessories
- `'border'` - Frames/borders
- `'custom'` - Custom category

### Z-Index Layering

Control the rendering order with `zIndex`:

```typescript
parts: [
  { category: "body", zIndex: 1 }, // Bottom layer
  { category: "head", zIndex: 2 }, // Middle layer
  { category: "cosmetic", zIndex: 3 }, // Top layer
];
```

## Sprite Sheet Preparation

### Guidelines

1. **Consistent Dimensions**: All sprites in a sheet should have the same dimensions
2. **Grid Layout**: Arrange sprites in a regular grid
3. **Transparent Background**: Use PNG with transparency
4. **Spacing**: Add spacing between sprites if needed (configure with `spacingX`/`spacingY`)

### Example Layout

```
+-------+-------+-------+-------+
| Spr 0 | Spr 1 | Spr 2 | Spr 3 |
+-------+-------+-------+-------+
| Spr 4 | Spr 5 | Spr 6 | Spr 7 |
+-------+-------+-------+-------+
| Spr 8 | Spr 9 | Spr10 | Spr11 |
+-------+-------+-------+-------+
```

### With Spacing

```
+-------+ +-------+ +-------+
| Spr 0 | | Spr 1 | | Spr 2 |
+-------+ +-------+ +-------+
  (spacingX = 10px)

+-------+
| Spr 0 |
+-------+
  (spacingY = 10px)
+-------+
| Spr 3 |
+-------+
```

## Advanced Features

### Export as PNG

```tsx
import { useAvatarExport } from "react-avatar-maker";

function MyComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { download } = useAvatarExport(canvasRef);

  const handleDownload = () => {
    download("avatar.png", {
      format: "png",
      scale: 2, // Export at 2x resolution
    });
  };

  return (
    <>
      <AvatarRenderer ref={canvasRef} config={config} selection={selection} />
      <button onClick={handleDownload}>Download</button>
    </>
  );
}
```

### Export as Data URL

```tsx
const { exportAsDataURL } = useAvatarExport(canvasRef);

const dataURL = exportAsDataURL({
  format: "png",
  quality: 0.95,
});
```

### Upload to Server

```tsx
const { upload } = useAvatarExport(canvasRef);

const handleUpload = async () => {
  const response = await upload({
    endpoint: "https://api.example.com/avatars",
    method: "POST",
    fieldName: "avatar",
    headers: {
      Authorization: "Bearer token",
    },
    additionalData: {
      userId: "123",
    },
  });
};
```

### Torso Mode

For half-body avatars:

```typescript
const config: AvatarMakerConfig = {
  mode: "torso",
  width: 300,
  height: 200, // Smaller height
  // ...
};
```

### Background Color

Add a background color for non-transparent exports:

```typescript
exportConfig: {
  backgroundColor: '#ffffff',
  format: 'jpeg',
}
```

## API Reference

### Components

#### `<AvatarRenderer />`

Renders the avatar on a canvas.

**Props:**

- `config: AvatarMakerConfig` - Configuration
- `selection: AvatarSelection` - Selected parts
- `className?: string` - CSS class
- `style?: React.CSSProperties` - Inline styles
- `onReady?: () => void` - Called when ready

#### `<AvatarMaker />`

Complete avatar maker with built-in export functionality.

**Props:**

- Same as `AvatarRenderer`
- `onSelectionChange?: (selection: AvatarSelection) => void` - Selection callback

### Hooks

#### `useAvatarExport(canvasRef)`

**Returns:**

- `exportAsDataURL(config?: ExportConfig): string | null`
- `exportAsBlob(config?: ExportConfig): Promise<Blob | null>`
- `download(filename: string, config?: ExportConfig): Promise<void>`
- `upload(uploadConfig: UploadConfig): Promise<Response>`
- `isExporting: boolean`

### Utilities

#### `parseSpriteSheet(config: SpriteSheetConfig): Sprite[]`

Parse sprite positions from configuration.

#### `loadImage(url: string): Promise<HTMLImageElement>`

Load an image asynchronously.

#### `drawSprite(ctx, image, sprite, x, y, width?, height?)`

Draw a sprite on a canvas context.

## Examples

### Complete Example

```tsx
import React, { useState, useRef } from "react";
import {
  AvatarRenderer,
  AvatarMakerConfig,
  AvatarSelection,
  useAvatarExport,
} from "react-avatar-maker";

function AvatarCreator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selection, setSelection] = useState<AvatarSelection>({
    body: 0,
    head: 0,
    face: 0,
  });

  const { download } = useAvatarExport(canvasRef);

  const config: AvatarMakerConfig = {
    width: 300,
    height: 400,
    mode: "full",
    parts: [
      {
        category: "body",
        zIndex: 1,
        spriteSheet: {
          url: "/sprites/bodies.png",
          spriteWidth: 300,
          spriteHeight: 400,
          columns: 4,
          rows: 3,
        },
      },
      {
        category: "head",
        zIndex: 2,
        spriteSheet: {
          url: "/sprites/heads.png",
          spriteWidth: 300,
          spriteHeight: 200,
          columns: 5,
          rows: 2,
        },
      },
    ],
  };

  return (
    <div>
      <AvatarRenderer ref={canvasRef} config={config} selection={selection} />

      <div>
        <button onClick={() => setSelection({ ...selection, body: 0 })}>
          Body 1
        </button>
        <button onClick={() => setSelection({ ...selection, body: 1 })}>
          Body 2
        </button>
      </div>

      <button onClick={() => download("my-avatar.png")}>Download</button>
    </div>
  );
}
```

## Troubleshooting

### Images Not Loading

- Check CORS settings if loading from external URLs
- Verify file paths are correct
- Ensure images are accessible

### Sprites Not Aligned

- Verify `spriteWidth` and `spriteHeight` match actual sprite dimensions
- Check `spacingX` and `spacingY` values
- Ensure `columns` and `rows` are correct

### Export Issues

- Canvas must be fully rendered before export
- Use `onReady` callback to ensure images are loaded
- Check browser console for errors

## Best Practices

1. **Optimize Sprite Sheets**: Use appropriate image sizes and compression
2. **Consistent Sizing**: Keep sprite dimensions consistent within categories
3. **Layer Order**: Use z-index to control rendering order
4. **Error Handling**: Wrap export/upload calls in try-catch blocks
5. **Loading States**: Show loading indicators while images load
6. **Responsive Design**: Scale canvas appropriately for different screen sizes

## License

MIT
