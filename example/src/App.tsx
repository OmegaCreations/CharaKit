import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Demo } from "./pages/Demo";
import { Configurator } from "./pages/Configurator";
import { Documentation } from "./pages/Documentation";
import { theme } from "./theme";

function Navigation() {
  const location = useLocation();

  const currentPath = location.hash.split("?")[0].replace("#", "") || "/";
  const isActive = (path: string) => currentPath === path;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ bgcolor: "background.paper" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            React Avatar Maker
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to="/"
              color={isActive("/") ? "primary" : "inherit"}
              sx={{ fontWeight: isActive("/") ? 600 : 400 }}
            >
              Demo
            </Button>
            <Button
              component={Link}
              to="/configurator"
              color={isActive("/configurator") ? "primary" : "inherit"}
              sx={{ fontWeight: isActive("/configurator") ? 600 : 400 }}
            >
              Configurator
            </Button>
            <Button
              component={Link}
              to="/docs"
              color={isActive("/docs") ? "primary" : "inherit"}
              sx={{ fontWeight: isActive("/docs") ? 600 : 400 }}
            >
              Documentation
            </Button>
          </Box>

          <Button
            href="https://github.com/OmegaCreations/CharaKit"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            GitHub
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            width: "100vw",
          }}
        >
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Demo />} />
              <Route path="/configurator" element={<Configurator />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
//
