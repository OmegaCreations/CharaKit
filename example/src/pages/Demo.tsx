import { useRef, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
  Build as BuildIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { AvatarRenderer, useAvatarExport } from "react-avatar-maker";
import type { AvatarMakerConfig, AvatarSelection } from "react-avatar-maker";
import bodies from "../assets/bodies1.png";
import heads from "../assets/heads1.png";
import { rpgConfig } from "../configs/rpgConfig";

interface DemoConfig {
  name: string;
  description: string;
  preset: string;
  config: AvatarMakerConfig;
  examples: Array<{ name: string; selection: AvatarSelection }>;
}

export function Demo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { download } = useAvatarExport(canvasRef);
  const [selectedDemo, setSelectedDemo] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  const demoConfigs: DemoConfig[] = [
    {
      name: "Character Maker",
      description: "Full character customization with body and head",
      preset: "character-maker",
      config: {
        width: 250,
        height: 250,
        mode: "full",
        preset: "character-maker",
        parts: [
          {
            category: "body",
            zIndex: 1,
            label: "Body",
            optional: true,
            spriteSheet: {
              url: bodies,
              spriteWidth: 95,
              spriteHeight: 95,
              columns: 5,
              rows: 5,
              spacingX: 5,
              spacingY: 5,
              trim: { top: 0, bottom: 0, left: 0, right: 0 },
            },
            autoPosition: {
              relativeTo: "head",
              position: "below",
              gap: 0,
            },
          },
          {
            category: "head",
            zIndex: 2,
            label: "Head",
            spriteSheet: {
              url: heads,
              spriteWidth: 95,
              spriteHeight: 95,
              columns: 5,
              rows: 5,
              spacingX: 5,
              spacingY: 5,
              trim: { top: 0, bottom: 35, left: 0, right: 0 },
            },
            position: {
              y: 40,
            },
          },
        ],
      },
      examples: [
        { name: "Character 1", selection: { body: 0, head: 0 } },
        { name: "Character 2", selection: { body: 5, head: 3 } },
        { name: "Character 3", selection: { body: 10, head: 7 } },
        { name: "Character 4", selection: { body: 2, head: 9 } },
      ],
    },
    {
      name: "RPG Avatar",
      description: "RPG-style pixel art character with layered sprites",
      preset: "rpg-avatar",
      config: {
        ...rpgConfig,
        width: 256,
        height: 256,
      },
      examples: [
        {
          name: "Light Skin",
          selection: {
            body: { sheetIndex: 0, spriteIndex: 0 },
            face: { sheetIndex: 0, spriteIndex: 0 },
            cosmetic: { sheetIndex: 0, spriteIndex: 0 },
            custom: { sheetIndex: 0, spriteIndex: 0 },
            head: { sheetIndex: 0, spriteIndex: 0 },
          },
        },
        {
          name: "Medium Skin",
          selection: {
            body: { sheetIndex: 1, spriteIndex: 0 },
            face: { sheetIndex: 1, spriteIndex: 0 },
            cosmetic: { sheetIndex: 1, spriteIndex: 0 },
            custom: { sheetIndex: 1, spriteIndex: 0 },
            head: { sheetIndex: 1, spriteIndex: 0 },
          },
        },
        {
          name: "Dark Skin",
          selection: {
            body: { sheetIndex: 2, spriteIndex: 0 },
            face: { sheetIndex: 2, spriteIndex: 0 },
            cosmetic: { sheetIndex: 2, spriteIndex: 0 },
            custom: { sheetIndex: 0, spriteIndex: 0 },
            head: { sheetIndex: 2, spriteIndex: 0 },
          },
        },
        {
          name: "Grayscale",
          selection: {
            body: { sheetIndex: 3, spriteIndex: 0 },
            face: { sheetIndex: 0, spriteIndex: 0 },
            cosmetic: { sheetIndex: 3, spriteIndex: 0 },
            custom: { sheetIndex: 1, spriteIndex: 0 },
            head: { sheetIndex: 3, spriteIndex: 0 },
          },
        },
      ],
    },
  ];

  const currentDemo = demoConfigs[selectedDemo];
  const currentExample = currentDemo.examples[selectedExample];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            CharaKit
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 500 }}>
            The React library for Avatar/Character Maker
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
            A flexible, customizable avatar/character creation open-source
            library for React.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              size="large"
              href="/CharaKit/#/configurator"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              Try Configurator
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/CharaKit/#/docs"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Documentation
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Features
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box sx={{ flex: "1 1 250px", maxWidth: 300 }}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <PaletteIcon
                  sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Customizable
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full control over sprite sheets, positioning, and styling
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: "1 1 250px", maxWidth: 300 }}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <SpeedIcon
                  sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Performant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Efficient canvas rendering with image caching
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: "1 1 250px", maxWidth: 300 }}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <BuildIcon
                  sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Flexible
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Multiple presets and feature flags for different use cases
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: "1 1 250px", maxWidth: 300 }}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <CodeIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  TypeScript
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full TypeScript support with comprehensive types
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>

      {/* Demo Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Interactive Demos
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Explore different preset configurations
          </Typography>

          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={selectedDemo}
              onChange={(_, newValue) => {
                setSelectedDemo(newValue);
                setSelectedExample(0);
              }}
              variant="fullWidth"
              style={{ backgroundColor: "1e1e1e" }}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              {demoConfigs.map((demo, index) => (
                <Tab key={index} label={demo.name} />
              ))}
            </Tabs>
          </Paper>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 4, height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {currentDemo.name}
                  </Typography>
                  <Chip
                    label={currentDemo.preset}
                    size="small"
                    color="primary"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {currentDemo.description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                  <AvatarRenderer
                    config={currentDemo.config}
                    selection={currentExample.selection}
                    ref={canvasRef}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      backgroundColor: "black",
                    }}
                  />
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={() =>
                    download(
                      `${currentDemo.name.toLowerCase().replace(" ", "-")}.png`
                    )
                  }
                >
                  Download Avatar
                </Button>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 4, height: "100%" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Example Variations
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click on an example to preview
                </Typography>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {currentDemo.examples.map((example, index) => (
                    <Box
                      key={index}
                      sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 150 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          border: 2,
                          borderColor:
                            selectedExample === index
                              ? "primary.main"
                              : "transparent",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "primary.light",
                            transform: "translateY(-4px)",
                          },
                        }}
                        onClick={() => setSelectedExample(index)}
                      >
                        <CardContent sx={{ textAlign: "center", p: 2 }}>
                          <AvatarRenderer
                            config={currentDemo.config}
                            selection={example.selection}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, fontWeight: 500 }}
                          >
                            {example.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Where Can You Use This?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Perfect for a wide range of applications and use cases
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🎮 Gaming Applications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create character creators for browser-based RPG games, MMORPGs.
                Perfect for player profile customization, NPC generation, and
                avatar systems.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                👤 Social Platforms & Forums
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build custom avatar creators for social networks, community
                forums, chat applications, and messaging platforms. Let users
                express themselves with unique profile pictures.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🎓 Educational Platforms
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create engaging avatar systems for e-learning platforms, virtual
                classrooms, educational games, and student profile systems. Make
                learning more interactive and fun.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💼 Business & Enterprise
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Implement professional avatar systems for employee directories,
                team collaboration tools, HR platforms, and corporate intranets.
                Personalize the workplace experience.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🎨 Creative Tools & Apps
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build character design tools, pixel art editors, sprite
                generators, and creative applications. Perfect for artists, game
                developers, and content creators.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🌐 Web3 & NFT Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create generative avatar systems for NFT collections, metaverse
                platforms, blockchain games, and decentralized social networks.
                Export as unique digital assets.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🎭 Entertainment & Media
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build character creators for streaming platforms, content
                creation tools, virtual events, and interactive storytelling
                applications.
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      {/* Installation Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Get Started
          </Typography>
          <Paper sx={{ p: 4, bgcolor: "#1e1e1e", color: "#d4d4d4" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
              Installation
            </Typography>
            <Box component="pre" sx={{ m: 0, overflow: "auto" }}>
              <code>npm install react-avatar-maker</code>
            </Box>
          </Paper>

          <Paper sx={{ p: 4, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Start
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: "#1e1e1e",
                color: "#d4d4d4",
                p: 2,
                borderRadius: 2,
                overflow: "auto",
                fontSize: "0.875rem",
              }}
            >
              <code>{`import { AvatarRenderer } from "react-avatar-maker";

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
  
  return <AvatarRenderer config={config} selection={selection} />;
}`}</code>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
