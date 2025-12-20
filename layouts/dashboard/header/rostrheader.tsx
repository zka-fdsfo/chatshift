import NewLogo from "@/components/logo/new-logo";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export default function RostrHeader() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Mobile hamburger menu
  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);

  // Desktop sign-in menu
  const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(247,250,252,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(90,122,140,0.25)"
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography sx={{ flexGrow: 1 }}>
          <NewLogo />
        </Typography>

        {/* ===== DESKTOP VIEW ===== */}
        {!isMobile && (
          <>
            <Button sx={{ color: "#1D2A33" }} onClick={() => router.push("/about")}>
              About
            </Button>

            <Button sx={{ color: "#1D2A33" }} onClick={() => router.push("/contact")}>
              Contact
            </Button>

            <Button
              variant="outlined"
              sx={{
                ml: 2,
                borderColor: "#5A7A8C",
                color: "#5A7A8C",
                "&:hover": {
                  borderColor: "#1D2A33",
                  backgroundColor: "rgba(90,122,140,0.08)"
                }
              }}
              onClick={(e) => setLoginAnchor(e.currentTarget)}
            >
              Sign in
            </Button>

            <Menu
              anchorEl={loginAnchor}
              open={Boolean(loginAnchor)}
              onClose={() => setLoginAnchor(null)}
            >
              <MenuItem onClick={() => router.push("/auth/employee/signin")}>
                Employee Sign in
              </MenuItem>
              <MenuItem onClick={() => router.push("/auth/client/signin")}>
                Participant Sign in
              </MenuItem>
            </Menu>
          </>
        )}

        {/* ===== MOBILE VIEW ===== */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              onClick={(e) => setMobileAnchor(e.currentTarget)}
              sx={{ color: "#1D2A33" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={mobileAnchor}
              open={Boolean(mobileAnchor)}
              onClose={() => setMobileAnchor(null)}
            >
              <MenuItem onClick={() => router.push("/about")}>About</MenuItem>
              <MenuItem onClick={() => router.push("/contact")}>Contact</MenuItem>
              <MenuItem onClick={() => router.push("/auth/employee/signin")}>
                Employee Sign in
              </MenuItem>
              <MenuItem onClick={() => router.push("/auth/client/signin")}>
                Participant Sign in
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
