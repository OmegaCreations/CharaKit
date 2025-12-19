# Avatar Part Positioning Guide

This guide explains how to configure positioning for avatar parts in the React Avatar Maker library.

## Overview

The positioning system allows you to:

- **Manually position** parts at specific coordinates
- **Auto-position** parts relative to other parts (e.g., head above body)
- **Add offsets** for fine-tuning positions
- **Use anchors** for flexible alignment

## Position Configuration

### Basic Position Properties

```typescript
interface PartPosition {
  x?: number; // Explicit X position in pixels
  y?: number; // Explicit Y position in pixels
  offsetX?: number; // Horizontal offset from calculated position
  offsetY?: number; // Vertical offset from calculated position
  anchorY?: "top" | "center" | "bottom"; // Vertical anchor point
  anchorX?: "left" | "center" | "right"; // Horizontal anchor point
}
```

### Auto-Position Configuration

```typescript
interface AutoPositionConfig {
  relativeTo?: AvatarPartCategory; // Part to position relative to
  position?: "above" | "below" | "left" | "right" | "center";
  gap?: number; // Gap between parts in pixels
}
```

## Usage Examples

### Example 1: Head Sticking to Body

The most common use case - position the head directly above the body:

```typescript
const config: AvatarMakerConfig = {
  width: 300,
  height: 400,
  parts: [
    {
      category: "body",
      zIndex: 1,
      spriteSheet: {
        /* ... */
      },
      position: {
        anchorY: "center", // Center vertically
        anchorX: "center", // Center horizontally
      },
    },
    {
      category: "head",
      zIndex: 2,
      spriteSheet: {
        /* ... */
      },
      autoPosition: {
        relativeTo: "body",
        position: "above",
        gap: 0, // No gap - head sticks directly to body
      },
    },
  ],
};
```

### Example 2: Head with Gap

Add spacing between head and body:

```typescript
{
  category: "head",
  autoPosition: {
    relativeTo: "body",
    position: "above",
    gap: 10,  // 10px gap between head and body
  },
}
```

### Example 3: Manual Positioning with Offsets

Position a part manually and add fine-tuning offsets:

```typescript
{
  category: "cosmetic",
  position: {
    x: 100,      // Position at x=100
    y: 50,       // Position at y=50
    offsetX: 5,  // Shift 5px right
    offsetY: -3, // Shift 3px up
  },
}
```

### Example 4: Centered with Offset

Center a part but adjust its position:

```typescript
{
  category: "face",
  position: {
    anchorX: "center",  // Center horizontally
    anchorY: "center",  // Center vertically
    offsetY: -20,       // Move 20px up from center
  },
}
```

### Example 5: Complex Multi-Part Layout

Build a complete avatar with multiple positioned parts:

```typescript
const config: AvatarMakerConfig = {
  width: 400,
  height: 600,
  parts: [
    // Body - centered
    {
      category: "body",
      zIndex: 1,
      spriteSheet: {
        /* ... */
      },
      position: {
        anchorX: "center",
        anchorY: "center",
      },
    },
    // Head - above body
    {
      category: "head",
      zIndex: 2,
      spriteSheet: {
        /* ... */
      },
      autoPosition: {
        relativeTo: "body",
        position: "above",
        gap: 0,
      },
    },
    // Face - centered on head
    {
      category: "face",
      zIndex: 3,
      spriteSheet: {
        /* ... */
      },
      autoPosition: {
        relativeTo: "head",
        position: "center",
      },
    },
    // Cosmetic (hat) - above head with gap
    {
      category: "cosmetic",
      zIndex: 4,
      spriteSheet: {
        /* ... */
      },
      autoPosition: {
        relativeTo: "head",
        position: "above",
        gap: 5,
      },
    },
    // Border - manual positioning
    {
      category: "border",
      zIndex: 5,
      spriteSheet: {
        /* ... */
      },
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
};
```

## Positioning Modes

### 1. Manual Positioning

Specify exact coordinates:

```typescript
position: {
  x: 150,  // Exact X coordinate
  y: 200,  // Exact Y coordinate
}
```

### 2. Anchor-Based Positioning

Use anchors for flexible positioning:

```typescript
position: {
  anchorX: "center",  // left, center, right
  anchorY: "top",     // top, center, bottom
}
```

**Anchor Behavior:**

- `anchorX: "left"` - Align to left edge (x=0)
- `anchorX: "center"` - Center horizontally
- `anchorX: "right"` - Align to right edge
- `anchorY: "top"` - Align to top edge (y=0)
- `anchorY: "center"` - Center vertically
- `anchorY: "bottom"` - Align to bottom edge

### 3. Auto-Positioning

Position relative to another part:

```typescript
autoPosition: {
  relativeTo: "body",
  position: "above",  // above, below, left, right, center
  gap: 0,
}
```

**Position Options:**

- `"above"` - Place above the relative part
- `"below"` - Place below the relative part
- `"left"` - Place to the left of the relative part
- `"right"` - Place to the right of the relative part
- `"center"` - Center on the relative part

### 4. Combined Positioning

Mix manual, anchor, and auto-positioning:

```typescript
{
  category: "head",
  autoPosition: {
    relativeTo: "body",
    position: "above",
    gap: 0,
  },
  position: {
    offsetX: 5,  // Fine-tune with offset
  },
}
```

## Best Practices

### 1. Use Auto-Positioning for Related Parts

For parts that should stick together (like head and body), use auto-positioning:

```typescript
// ✅ Good - head automatically follows body
{
  category: "head",
  autoPosition: {
    relativeTo: "body",
    position: "above",
    gap: 0,
  },
}

// ❌ Avoid - manual positioning requires recalculation
{
  category: "head",
  position: { x: 110, y: 50 },
}
```

### 2. Set Base Parts First

Position foundational parts (like body) first, then position other parts relative to them:

```typescript
parts: [
  // 1. Base part with anchor
  { category: "body", position: { anchorY: "center" } },

  // 2. Parts relative to base
  { category: "head", autoPosition: { relativeTo: "body", position: "above" } },
  { category: "legs", autoPosition: { relativeTo: "body", position: "below" } },
];
```

### 3. Use Offsets for Fine-Tuning

Use offsets instead of recalculating exact positions:

```typescript
{
  category: "face",
  autoPosition: {
    relativeTo: "head",
    position: "center",
  },
  position: {
    offsetY: -5,  // Adjust slightly upward
  },
}
```

### 4. Consider Z-Index with Positioning

Ensure z-index matches your visual hierarchy:

```typescript
parts: [
  { category: "body", zIndex: 1 /* ... */ },
  { category: "head", zIndex: 2 /* ... */ },
  { category: "face", zIndex: 3 /* ... */ },
  { category: "cosmetic", zIndex: 4 /* ... */ },
];
```

## Common Patterns

### Pattern 1: Stacked Vertical Layout

```typescript
// Body at center, head above, legs below
parts: [
  {
    category: "body",
    position: { anchorY: "center", anchorX: "center" },
  },
  {
    category: "head",
    autoPosition: { relativeTo: "body", position: "above", gap: 0 },
  },
  {
    category: "legs",
    autoPosition: { relativeTo: "body", position: "below", gap: 0 },
  },
];
```

### Pattern 2: Layered Overlay

```typescript
// Multiple parts centered on top of each other
parts: [
  {
    category: "body",
    position: { anchorY: "center", anchorX: "center" },
  },
  {
    category: "clothing",
    autoPosition: { relativeTo: "body", position: "center" },
  },
  {
    category: "accessory",
    autoPosition: { relativeTo: "body", position: "center" },
  },
];
```

### Pattern 3: Side-by-Side

```typescript
// Parts positioned horizontally
parts: [
  {
    category: "leftItem",
    position: { anchorX: "left", anchorY: "center" },
  },
  {
    category: "rightItem",
    autoPosition: { relativeTo: "leftItem", position: "right", gap: 20 },
  },
];
```

## Troubleshooting

### Parts Not Aligning Correctly

**Problem:** Head doesn't stick to body properly.

**Solution:** Ensure the body is positioned first and use `gap: 0`:

```typescript
{
  category: "head",
  autoPosition: {
    relativeTo: "body",
    position: "above",
    gap: 0,  // No gap
  },
}
```

### Parts Overlapping

**Problem:** Parts are rendering on top of each other.

**Solution:** Check z-index values and positioning:

```typescript
// Ensure proper z-index order
{ category: "body", zIndex: 1 },
{ category: "head", zIndex: 2 },
```

### Parts Off-Canvas

**Problem:** Parts are positioned outside the visible canvas.

**Solution:** Use anchors or check manual coordinates:

```typescript
// Use anchors to keep parts within canvas
position: {
  anchorX: "center",
  anchorY: "center",
}
```

### Dependency Issues

**Problem:** Auto-positioning doesn't work.

**Solution:** Ensure the `relativeTo` part exists and is selected:

```typescript
// Make sure "body" is in the parts array and selected
autoPosition: {
  relativeTo: "body",  // This part must exist
  position: "above",
}
```

## API Reference

### calculatePartPosition

Calculate position for a single part:

```typescript
import { calculatePartPosition } from "react-avatar-maker";

const position = calculatePartPosition(
  partConfig,
  sprite,
  canvasWidth,
  canvasHeight,
  relativePartPosition,
  relativePartSprite
);
```

### buildPositionMap

Calculate positions for all parts:

```typescript
import { buildPositionMap } from "react-avatar-maker";

const positionMap = buildPositionMap(
  parts,
  spriteMap,
  canvasWidth,
  canvasHeight
);
```

## Migration Guide

### From Simple Centering to Positioning

**Before:**

```typescript
// Parts were always centered
{
  category: "head",
  spriteSheet: { /* ... */ },
}
```

**After:**

```typescript
// Explicit positioning control
{
  category: "head",
  spriteSheet: { /* ... */ },
  autoPosition: {
    relativeTo: "body",
    position: "above",
    gap: 0,
  },
}
```

The library maintains backward compatibility - parts without positioning config will be centered by default.

## Examples Repository

Check the `/example` directory for a complete working example with positioning configuration.
