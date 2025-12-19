# Demo

https://omegacreations.github.io/CharaKit/#/

# React Character Maker

A flexible, customizable character creation library for React applications. Build profile pictures, character creators, RPG avatars, pixel art characters, and more with ease.

## Features

- **Fully Customizable** – Complete control over sprite sheets, positioning, and styling
- **Pixel Art Support** – Perfect pixel-art rendering with crisp scaling and `image-rendering: pixelated`
- **High Performance** – Efficient canvas rendering with image caching and smooth scaling
- **Pixel Scale** – Scale up pixel art without losing quality (1x to 8x)
- **Flexible Configuration** – Multiple presets and feature flags for different use cases
- **TypeScript Support** – Full TypeScript support with comprehensive type definitions
- **Auto-Positioning** – Smart positioning system with content-aware trimming
- **Multiple Sprite Sheets** – Support for multiple sprite sheets per body part
- **Body Part Toggling** – Enable/disable character parts dynamically
- **Export Options** – Export as PNG, JPEG, WebP, or upload to server
- **Config Export** – Export and share your character configurations

## Installation

```bash
npm install react-avatar-maker
```

## Quick Start

### Basic Character Creator

```tsx
import { AvatarRenderer } from "react-avatar-maker";
import { useState } from "react";

const config = {
  width: 300,
  height: 400,
  parts: [
    {
      category: "head",
      spriteSheet: {
        url: "/sprites/heads.png",
        spriteWidth: 100,
        spriteHeight: 100,
        columns: 5,
        rows: 5,
      },
    },
  ],
};

function MyCharacter() {
  const [selection, setSelection] = useState({ head: 0 });

  return <AvatarRenderer config={config} selection={selection} />;
}
```

### Pixel Art Character (RPG Style)

```tsx
import { AvatarRenderer } from "react-avatar-maker";
import { useState } from "react";

const pixelArtConfig = {
  width: 128,
  height: 128,
  pixelScale: 3,
  parts: [
    {
      category: "body",
      label: "Skin",
      zIndex: 1,
      spriteSheets: [
        {
          url: "/rpg/skin-light.png",
          spriteWidth: 128,
          spriteHeight: 128,
          columns: 1,
          rows: 1,
        },
        {
          url: "/rpg/skin-dark.png",
          spriteWidth: 128,
          spriteHeight: 128,
          columns: 1,
          rows: 1,
        },
      ],
    },
    {
      category: "head",
      label: "Hair",
      zIndex: 2,
      optional: true,
      spriteSheets: [
        {
          url: "/rpg/hair-short.png",
          spriteWidth: 128,
          spriteHeight: 128,
          columns: 1,
          rows: 1,
        },
        {
          url: "/rpg/hair-long.png",
          spriteWidth: 128,
          spriteHeight: 128,
          columns: 1,
          rows: 1,
        },
      ],
    },
  ],
};

function PixelCharacter() {
  const [selection, setSelection] = useState({
    body: { sheetIndex: 0, spriteIndex: 0 },
    head: { sheetIndex: 0, spriteIndex: 0 },
  });

  return (
    <AvatarRenderer
      config={pixelArtConfig}
      selection={selection}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
```

## Presets

Choose from built-in presets for common use cases.

### Profile Editor

```tsx
const config = {
  preset: "profile-editor",
  width: 200,
  height: 200,
};
```

### Character Maker

```tsx
const config = {
  preset: "character-maker",
  width: 300,
  height: 400,
  features: {
    allowToggle: true,
    showLabels: true,
  },
};
```

### RPG Avatar

```tsx
const config = {
  preset: "rpg-avatar",
  width: 128,
  height: 128,
  features: {
    allowToggle: true,
    multipleSheets: true,
  },
};
```

## Configuration

### Sprite Sheet Configuration

```tsx
{
  category: "head",
  label: "Hairstyle",
  zIndex: 2,
  optional: false,
  enabled: true,
  spriteSheet: {
    url: "/sprites/heads.png",
    spriteWidth: 100,
    spriteHeight: 100,
    columns: 5,
    rows: 5,
    spacingX: 5,
    spacingY: 5,
    trim: {
      top: 10,
      bottom: 10,
      left: 5,
      right: 5,
    },
  },
}
```

### Pixel Art Configuration

```tsx
const pixelArtConfig = {
  width: 128,
  height: 128,
  pixelScale: 4,
  parts: [
    {
      category: "body",
      spriteSheet: {
        url: "/pixel-art/body.png",
        spriteWidth: 128,
        spriteHeight: 128,
        columns: 1,
        rows: 1,
      },
    },
  ],
};
```

### Body Part Toggling

```tsx
const togglePart = (category: string) => {
  setConfig((prev) => ({
    ...prev,
    parts: prev.parts.map((part) =>
      part.category === category ? { ...part, enabled: !part.enabled } : part
    ),
  }));
};
```

### Auto-Positioning

```tsx
{
  category: "body",
  autoPosition: {
    relativeTo: "head",
    position: "below",
    gap: 0,
  },
}
```

### Multiple Sprite Sheets

```tsx
const selection = {
  head: { sheetIndex: 0, spriteIndex: 5 },
};
```

### Feature Flags

```tsx
const config = {
  features: {
    allowToggle: true,
    multipleSheets: true,
    showLabels: true,
    allowConfigExport: true,
    autoPositioning: true,
  },
};
```

## Export Options

### Download as Image

```tsx
const { download } = useAvatarExport(canvasRef);
download("avatar.png");
```

### Export Configuration

```tsx
downloadConfig(config, "my-avatar-config.json");
await copyConfigToClipboard(config);
```

## Styling

### Standard Styling

```css
.character-canvas {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Pixel Art Styling

```css
.pixel-art-canvas {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

## API Reference

### Components

#### <AvatarRenderer />

Main component for rendering avatars.

### Hooks

#### useAvatarExport

Hook for exporting avatars.

## Contributing

Contributions are welcome. Please submit a Pull Request.

## License

MIT © Maksymilian Walicki

## Acknowledgments

- Inspired by various avatar creation systems
- Built with React and TypeScript
- Canvas rendering for optimal performance
