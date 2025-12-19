import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { Code as CodeIcon } from "@mui/icons-material";

export function Documentation() {
  const CodeBlock = ({
    children,
    language = "tsx",
  }: {
    children: string;
    language?: string;
  }) => (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#1e1e1e",
        color: "#d4d4d4",
        p: 2,
        borderRadius: 2,
        overflow: "auto",
        fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        my: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "#2d2d2d",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: "0.75rem",
          color: "#858585",
        }}
      >
        {language}
      </Box>
      <pre style={{ margin: 0 }}>
        <code>{children}</code>
      </pre>
    </Paper>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Documentation
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Complete guide to using React Avatar Maker
          </Typography>
        </Box>

        {/* Installation */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CodeIcon color="primary" />
            Installation
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            Install the package using npm or yarn:
          </Typography>

          <CodeBlock language="bash">
            {`npm install react-avatar-maker

# or

yarn add react-avatar-maker`}
          </CodeBlock>
        </Paper>

        {/* Quick Start */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Quick Start
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            Here's a minimal example to get you started:
          </Typography>

          <CodeBlock>
            {`import { AvatarRenderer } from "react-avatar-maker";
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

function MyAvatar() {
  const [selection, setSelection] = useState({ head: 0 });
  
  return (
    <AvatarRenderer 
      config={config} 
      selection={selection} 
    />
  );
}`}
          </CodeBlock>
        </Paper>

        {/* Configuration */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Configuration
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Sprite Sheet Configuration
          </Typography>
          <Typography variant="body1" paragraph>
            Configure how sprites are extracted from your sprite sheet:
          </Typography>

          <CodeBlock>
            {`{
  category: "head",
  spriteSheet: {
    url: "/sprites/heads.png",
    spriteWidth: 100,        // Width of each sprite
    spriteHeight: 100,       // Height of each sprite
    columns: 5,              // Number of columns
    rows: 5,                 // Number of rows
    spacingX: 5,            // Horizontal spacing between sprites
    spacingY: 5,            // Vertical spacing between sprites
    trim: {                 // Remove transparent padding
      top: 10,
      bottom: 10,
      left: 5,
      right: 5,
    },
  },
}`}
          </CodeBlock>

          <Alert severity="info" sx={{ my: 2 }}>
            <Typography variant="body2">
              <strong>Tip:</strong> Use the <code>trim</code> property to remove
              transparent padding from sprites for accurate positioning.
            </Typography>
          </Alert>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Auto-Positioning
          </Typography>
          <Typography variant="body1" paragraph>
            Position parts relative to each other automatically:
          </Typography>

          <CodeBlock>
            {`{
  category: "body",
  autoPosition: {
    relativeTo: "head",
    position: "below",  // "above" | "below" | "left" | "right" | "center"
    gap: 0,            // Gap in pixels
  },
}`}
          </CodeBlock>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Multiple Sprite Sheets
          </Typography>
          <Typography variant="body1" paragraph>
            Support multiple sprite sheets per category:
          </Typography>

          <CodeBlock>
            {`{
  category: "head",
  spriteSheets: [
    { url: "/sprites/heads1.png", /* ... */ },
    { url: "/sprites/heads2.png", /* ... */ },
  ],
}

// Selection format for multiple sheets
const selection = {
  head: { sheetIndex: 0, spriteIndex: 5 }
};`}
          </CodeBlock>
        </Paper>

        {/* Pixel Art Configuration */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Pixel Art Configuration
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            For pixel art characters, use the <code>pixelScale</code> property
            to scale up sprites without losing quality:
          </Typography>

          <CodeBlock>
            {`const pixelArtConfig = {
  width: 128,
  height: 128,
  pixelScale: 3, // Scale up 3x for better visibility (1-8x supported)
  parts: [
    {
      category: "body",
      label: "Skin",
      zIndex: 1,
      spriteSheet: {
        url: "/rpg/skin.png",
        spriteWidth: 128,
        spriteHeight: 128,
        columns: 1,
        rows: 1,
      },
    },
    {
      category: "head",
      label: "Hair",
      zIndex: 2,
      optional: true,
      spriteSheet: {
        url: "/rpg/hair.png",
        spriteWidth: 128,
        spriteHeight: 128,
        columns: 1,
        rows: 1,
      },
    },
  ],
};

function PixelArtCharacter() {
  const [selection, setSelection] = useState({
    body: 0,
    head: 0,
  });

  return (
    <AvatarRenderer
      config={pixelArtConfig}
      selection={selection}
      style={{ imageRendering: "pixelated" }}
    />
  );
}`}
          </CodeBlock>

          <Alert severity="info" sx={{ my: 2 }}>
            <Typography variant="body2">
              <strong>Pixel Scale Options:</strong>
              <br />• <code>pixelScale: 1</code> - Original size (default)
              <br />• <code>pixelScale: 2</code> - 2x size (200%)
              <br />• <code>pixelScale: 3</code> - 3x size (300%)
              <br />• <code>pixelScale: 4</code> - 4x size (400%)
              <br />• Up to <code>pixelScale: 8</code> for maximum scaling
            </Typography>
          </Alert>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Why Use Pixel Scale?
          </Typography>
          <Typography variant="body1" paragraph>
            The <code>pixelScale</code> property scales the canvas content
            internally while maintaining crisp pixel art quality. This is
            perfect for small pixel art sprites (like 16x16, 32x32, or 128x128)
            that need to be displayed larger without blur.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Without pixelScale:</strong> Small sprites appear tiny and
            hard to see.
            <br />
            <strong>With pixelScale:</strong> Sprites are scaled up perfectly
            with crisp, sharp pixels.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            CSS for Pixel-Perfect Rendering
          </Typography>
          <Typography variant="body1" paragraph>
            Always use <code>imageRendering: "pixelated"</code> in your styles
            for crisp pixel art:
          </Typography>

          <CodeBlock language="css">
            {`.pixel-art-canvas {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}`}
          </CodeBlock>
        </Paper>

        {/* Presets */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Presets
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            Choose from built-in presets for common use cases:
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 3 }}>
            <Box>
              <Chip label="profile-editor" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" component="span">
                Simple profile picture editor (head, face, border)
              </Typography>
            </Box>
            <Box>
              <Chip label="character-maker" color="secondary" sx={{ mr: 1 }} />
              <Typography variant="body2" component="span">
                Full character customization (all parts)
              </Typography>
            </Box>
            <Box>
              <Chip label="rpg-avatar" color="success" sx={{ mr: 1 }} />
              <Typography variant="body2" component="span">
                RPG-style avatar (head, body, cosmetics)
              </Typography>
            </Box>
          </Box>

          <CodeBlock>
            {`const config = {
  preset: "character-maker",
  // ... other config
};`}
          </CodeBlock>
        </Paper>

        {/* Feature Flags */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Feature Flags
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            Enable or disable features based on your needs:
          </Typography>

          <CodeBlock>
            {`const config = {
  features: {
    allowToggle: true,        // Allow parts to be toggled on/off
    multipleSheets: true,     // Enable multiple sprite sheets
    showLabels: true,         // Show part labels in UI
    allowConfigExport: true,  // Allow exporting configuration
    autoPositioning: true,    // Enable auto-positioning
  },
  // ... other config
};`}
          </CodeBlock>
        </Paper>

        {/* Export Options */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Export Options
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Download as Image
          </Typography>

          <CodeBlock>
            {`import { useAvatarExport } from "react-avatar-maker";

function MyComponent() {
  const canvasRef = useRef(null);
  const { download } = useAvatarExport(canvasRef);
  
  return (
    <>
      <AvatarRenderer ref={canvasRef} config={config} selection={selection} />
      <button onClick={() => download("avatar.png")}>Download</button>
    </>
  );
}`}
          </CodeBlock>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Export as Data URL
          </Typography>

          <CodeBlock>
            {`const { exportAsDataURL } = useAvatarExport(canvasRef);
const dataURL = exportAsDataURL({ 
  format: "png", 
  quality: 1 
});`}
          </CodeBlock>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Upload to Server
          </Typography>

          <CodeBlock>
            {`const { upload } = useAvatarExport(canvasRef);

await upload({
  endpoint: "https://api.example.com/avatars",
  method: "POST",
  fieldName: "avatar",
  additionalData: { userId: "123" },
});`}
          </CodeBlock>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Export Configuration
          </Typography>

          <CodeBlock>
            {`import { downloadConfig, copyConfigToClipboard } from "react-avatar-maker";

// Download as JSON file
downloadConfig(config, "my-avatar-config.json");

// Copy to clipboard
await copyConfigToClipboard(config);`}
          </CodeBlock>
        </Paper>

        {/* API Reference */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            API Reference
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Components
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              {"<AvatarRenderer />"}
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Main component for rendering avatars.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="config: AvatarMakerConfig"
                  secondary="Avatar configuration"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="selection: AvatarSelection"
                  secondary="Selected parts"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="className?: string"
                  secondary="CSS class name"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="style?: React.CSSProperties"
                  secondary="Inline styles"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="onReady?: () => void"
                  secondary="Callback when avatar is ready"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
            </List>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Hooks
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              useAvatarExport(canvasRef)
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Hook for exporting avatars.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Returns:</strong>
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="download(filename, config?)"
                  secondary="Download avatar as file"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="exportAsDataURL(config?)"
                  secondary="Export as data URL"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="upload(config)"
                  secondary="Upload to server"
                  primaryTypographyProps={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Paper>

        {/* Support */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Support & Resources
          </Typography>
          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem>
              <ListItemText
                primary="GitHub Repository"
                secondary={
                  <MuiLink
                    href="https://github.com/yourusername/react-avatar-maker"
                    target="_blank"
                  >
                    https://github.com/yourusername/react-avatar-maker
                  </MuiLink>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Report Issues"
                secondary={
                  <MuiLink
                    href="https://github.com/yourusername/react-avatar-maker/issues"
                    target="_blank"
                  >
                    GitHub Issues
                  </MuiLink>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Discussions"
                secondary={
                  <MuiLink
                    href="https://github.com/yourusername/react-avatar-maker/discussions"
                    target="_blank"
                  >
                    GitHub Discussions
                  </MuiLink>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
