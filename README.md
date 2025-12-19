# React Character Maker

A flexible, customizable character creation library for React applications. Build profile pictures, character creators, RPG avatars, pixel art characters, and more with ease.

## ✨ Features

- 🎨 **Fully Customizable** - Complete control over sprite sheets, positioning, and styling
- 🎮 **Pixel Art Support** - Perfect pixel-art rendering with crisp scaling and `image-rendering: pixelated`
- ⚡ **High Performance** - Efficient canvas rendering with image caching and smooth scaling
- 🔍 **Pixel Scale** - Scale up pixel art without losing quality (1x to 8x)
- 🔧 **Flexible Configuration** - Multiple presets and feature flags for different use cases
- 📦 **TypeScript Support** - Full TypeScript support with comprehensive type definitions
- 🎯 **Auto-Positioning** - Smart positioning system with content-aware trimming
- 🖼️ **Multiple Sprite Sheets** - Support for multiple sprite sheets per body part
- 🔀 **Body Part Toggling** - Enable/disable character parts dynamically
- 💾 **Export Options** - Export as PNG, JPEG, WebP, or upload to server
- ⚙️ **Config Export** - Export and share your character configurations

## 📦 Installation

```bash
npm install react-avatar-maker
```

## 🚀 Quick Start

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
  pixelScale: 3, // Scale up 3x for better visibility without losing quality
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

## 🎯 Presets

Choose from built-in presets for common use cases:

### Profile Editor

Simple profile picture editor with head, face, and border customization.

```tsx
const config = {
  preset: "profile-editor",
  width: 200,
  height: 200,
  // ... other config
};
```

### Character Maker

Full character customization with all body parts and toggling support.

```tsx
const config = {
  preset: "character-maker",
  width: 300,
  height: 400,
  features: {
    allowToggle: true,
    showLabels: true,
  },
  // ... other config
};
```

### RPG Avatar

RPG-style pixel art character with layered sprites.

```tsx
const config = {
  preset: "rpg-avatar",
  width: 128,
  height: 128,
  features: {
    allowToggle: true,
    multipleSheets: true,
  },
  // ... other config
};
```

## 🔧 Configuration

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
    spacingX: 5,  // Horizontal spacing between sprites
    spacingY: 5,  // Vertical spacing between sprites
    trim: {       // Remove transparent padding for accurate positioning
      top: 10,
      bottom: 10,
      left: 5,
      right: 5,
    },
  },
}
```

### Pixel Art Configuration

For pixel art characters, ensure crisp rendering without blur:

```tsx
const pixelArtConfig = {
  width: 128,
  height: 128,
  pixelScale: 4, // Scale up 4x without losing quality (1-8x supported)
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

// Render with pixel-perfect styling
<AvatarRenderer
  config={pixelArtConfig}
  selection={selection}
  style={{ imageRendering: "pixelated" }}
/>;
```

**Pixel Scale Options:**

- `pixelScale: 1` - Original size (default)
- `pixelScale: 2` - 2x size (200%)
- `pixelScale: 3` - 3x size (300%)
- `pixelScale: 4` - 4x size (400%)
- Up to `pixelScale: 8` for maximum scaling

The `pixelScale` property scales the canvas content internally while maintaining crisp pixel art quality. This is perfect for small pixel art sprites that need to be displayed larger without blur.

### Body Part Toggling

Enable/disable character parts dynamically:

```tsx
const config = {
  parts: [
    {
      category: "head",
      label: "Hair",
      optional: true, // Allows toggling on/off
      enabled: true, // Initial state
      spriteSheet: {
        /* ... */
      },
    },
    {
      category: "cosmetic",
      label: "Hat",
      optional: true,
      enabled: false, // Initially disabled
      spriteSheet: {
        /* ... */
      },
    },
  ],
};

// Toggle a part programmatically
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

Position parts relative to each other:

```tsx
{
  category: "body",
  autoPosition: {
    relativeTo: "head",
    position: "below",  // "above" | "below" | "left" | "right" | "center"
    gap: 0, // Gap in pixels
  },
}
```

### Multiple Sprite Sheets

Support multiple sprite sheets per category:

```tsx
{
  category: "head",
  spriteSheets: [
    { url: "/sprites/heads1.png", /* ... */ },
    { url: "/sprites/heads2.png", /* ... */ },
  ],
}

// Selection format for multiple sheets
const selection = {
  head: { sheetIndex: 0, spriteIndex: 5 }
};
```

### Feature Flags

Enable/disable features based on your needs:

```tsx
const config = {
  features: {
    allowToggle: true, // Allow parts to be toggled on/off
    multipleSheets: true, // Enable multiple sprite sheets
    showLabels: true, // Show part labels in UI
    allowConfigExport: true, // Allow exporting configuration
    autoPositioning: true, // Enable auto-positioning
  },
  // ... other config
};
```

## 📤 Export Options

### Download as Image

```tsx
import { useAvatarExport } from "react-avatar-maker";

function MyComponent() {
  const canvasRef = useRef(null);
  const { download } = useAvatarExport(canvasRef);

  return (
    <>
      <AvatarRenderer ref={canvasRef} config={config} selection={selection} />
      <button onClick={() => download("avatar.png")}>Download</button>
    </>
  );
}
```

### Export as Data URL

```tsx
const { exportAsDataURL } = useAvatarExport(canvasRef);
const dataURL = exportAsDataURL({ format: "png", quality: 1 });
```

### Upload to Server

```tsx
const { upload } = useAvatarExport(canvasRef);

await upload({
  endpoint: "https://api.example.com/avatars",
  method: "POST",
  fieldName: "avatar",
  additionalData: { userId: "123" },
});
```

### Export Configuration

```tsx
import { downloadConfig, copyConfigToClipboard } from "react-avatar-maker";

// Download as JSON file
downloadConfig(config, "my-avatar-config.json");

// Copy to clipboard
await copyConfigToClipboard(config);
```

## 🎨 Styling

The library provides minimal styling by default. Customize the appearance using CSS:

### Standard Styling

```css
.character-canvas {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Pixel Art Styling

For pixel-perfect rendering without blur:

```css
.pixel-art-canvas {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;

  /* Scale up while maintaining crisp pixels */
  width: 256px;
  height: 256px;
}
```

### Responsive Scaling

```css
.character-canvas {
  max-width: 100%;
  height: auto;
  image-rendering: pixelated; /* For pixel art */
}

@media (max-width: 768px) {
  .character-canvas {
    width: 100%;
  }
}
```

## 📚 API Reference

### Components

#### `<AvatarRenderer />`

Main component for rendering avatars.

**Props:**

- `config: AvatarMakerConfig` - Avatar configuration
- `selection: AvatarSelection` - Selected parts
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles
- `onReady?: () => void` - Callback when avatar is ready

#### `<AvatarMaker />`

Full avatar maker component with UI controls (coming soon).

### Hooks

#### `useAvatarExport(canvasRef)`

Hook for exporting avatars.

**Returns:**

- `download(filename, config?)` - Download avatar as file
- `exportAsDataURL(config?)` - Export as data URL
- `upload(config)` - Upload to server

### Utilities

#### Preset Utilities

- `getPresetFeatures(preset)` - Get default features for a preset
- `applyPreset(config, preset)` - Apply preset to configuration
- `filterPartsByPreset(config)` - Filter parts based on preset

#### Config Export Utilities

- `exportConfigAsJSON(config)` - Export config as JSON string
- `downloadConfig(config, filename)` - Download config as file
- `importConfigFromJSON(json)` - Import config from JSON
- `exportConfigAsTypeScript(config)` - Export as TypeScript code
- `copyConfigToClipboard(config)` - Copy config to clipboard

## 🎮 Interactive Demo

Check out the interactive demo and configurator:

```bash
cd example
npm install
npm run dev
```

Visit:

- `/` - Demo page with examples
- `/configurator` - Interactive configurator

## 📖 Examples

### Basic Character

```tsx
import { AvatarRenderer } from "react-avatar-maker";
import { useState } from "react";

const config = {
  width: 200,
  height: 200,
  parts: [
    {
      category: "head",
      label: "Face",
      spriteSheet: {
        url: "/heads.png",
        spriteWidth: 64,
        spriteHeight: 64,
        columns: 4,
        rows: 4,
      },
    },
  ],
};

function Character() {
  const [selection, setSelection] = useState({ head: 0 });

  return (
    <div>
      <AvatarRenderer config={config} selection={selection} />
      <button onClick={() => setSelection({ head: (selection.head + 1) % 16 })}>
        Next Face
      </button>
    </div>
  );
}
```

### RPG Pixel Art Character

```tsx
import { AvatarRenderer } from "react-avatar-maker";
import { useState } from "react";

const rpgConfig = {
  width: 128,
  height: 128,
  pixelScale: 3, // Scale up 3x for better visibility
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
          url: "/rpg/skin-medium.png",
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
      category: "face",
      label: "Eyes",
      zIndex: 2,
      spriteSheets: [
        {
          url: "/rpg/eyes-blue.png",
          spriteWidth: 128,
          spriteHeight: 128,
          columns: 1,
          rows: 1,
        },
        {
          url: "/rpg/eyes-brown.png",
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
      zIndex: 3,
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

function RPGCharacter() {
  const [selection, setSelection] = useState({
    body: { sheetIndex: 0, spriteIndex: 0 },
    face: { sheetIndex: 0, spriteIndex: 0 },
    head: { sheetIndex: 0, spriteIndex: 0 },
  });

  return (
    <AvatarRenderer
      config={rpgConfig}
      selection={selection}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
```

### Full Character with Auto-Positioning

```tsx
const config = {
  width: 300,
  height: 400,
  parts: [
    {
      category: "body",
      label: "Body",
      zIndex: 1,
      spriteSheet: {
        url: "/bodies.png",
        spriteWidth: 95,
        spriteHeight: 95,
        columns: 5,
        rows: 5,
      },
      autoPosition: {
        relativeTo: "head",
        position: "below",
        gap: 0,
      },
    },
    {
      category: "head",
      label: "Head",
      zIndex: 2,
      spriteSheet: {
        url: "/heads.png",
        spriteWidth: 95,
        spriteHeight: 95,
        columns: 5,
        rows: 5,
      },
    },
  ],
};
```

### With Sprite Trimming

```tsx
const config = {
  parts: [
    {
      category: "head",
      label: "Head",
      spriteSheet: {
        url: "/heads.png",
        spriteWidth: 100,
        spriteHeight: 100,
        columns: 5,
        rows: 5,
        trim: {
          top: 15,
          bottom: 15,
          left: 10,
          right: 10,
        },
      },
    },
  ],
};
```

### Character with Toggleable Parts

```tsx
import { AvatarRenderer } from "react-avatar-maker";
import { useState } from "react";

function CharacterWithToggles() {
  const [enabledParts, setEnabledParts] = useState({
    body: true,
    head: true,
    hat: true,
  });

  const config = {
    width: 300,
    height: 400,
    parts: [
      {
        category: "body",
        enabled: enabledParts.body,
        spriteSheet: {
          /* ... */
        },
      },
      {
        category: "head",
        enabled: enabledParts.head,
        spriteSheet: {
          /* ... */
        },
      },
      {
        category: "cosmetic",
        label: "Hat",
        optional: true,
        enabled: enabledParts.hat,
        spriteSheet: {
          /* ... */
        },
      },
    ],
  };

  return (
    <div>
      <AvatarRenderer
        config={config}
        selection={{ body: 0, head: 0, cosmetic: 0 }}
      />
      <label>
        <input
          type="checkbox"
          checked={enabledParts.hat}
          onChange={(e) =>
            setEnabledParts({ ...enabledParts, hat: e.target.checked })
          }
        />
        Show Hat
      </label>
    </div>
  );
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Maksymilian Walicki]

## 🙏 Acknowledgments

- Inspired by various avatar creation systems
- Built with React and TypeScript
- Canvas rendering for optimal performance
