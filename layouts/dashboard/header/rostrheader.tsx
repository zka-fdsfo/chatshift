// components/RostrHeader.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import Link from "next/link";
import NewLogo from "@/components/logo/new-logo";

export default function RostrHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(247,250,252,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(90,122,140,0.25)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            <NewLogo />
          </Box>

          {/* ===== DESKTOP MENU ===== */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.text}
                  href={item.href}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: isActive ? "#2EC4B6" : "#1D2A33",
                      fontWeight: isActive ? 700 : 500,
                      borderBottom: isActive
                        ? "2px solid #2EC4B6"
                        : "none",
                      borderRadius: 0,
                      "&:hover": {
                        color: "#2EC4B6",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              );
            })}

            {/* Sign in */}
            <Button
              variant="outlined"
              sx={{
                ml: 2,
                borderColor: "#5A7A8C",
                color: "#5A7A8C",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#1D2A33",
                  backgroundColor: "rgba(90,122,140,0.08)",
                },
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
              <MenuItem
                onClick={() => router.push("/auth/employee/signin")}
              >
                Employee Sign in
              </MenuItem>
              <MenuItem
                onClick={() => router.push("/auth/client/signin")}
              >
                Participant Sign in
              </MenuItem>
            </Menu>
          </Box>

          {/* ===== MOBILE HAMBURGER ===== */}
          <IconButton
            edge="end"
            sx={{ display: { xs: "flex", md: "none" }, color: "#1D2A33" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.text}
                  href={item.href}
                  passHref
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    button
                    sx={{
                      bgcolor: isActive ? "#E0F7F5" : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? "#2EC4B6" : "#1D2A33",
                      }}
                    />
                  </ListItem>
                </Link>
              );
            })}

            <ListItem
              button
              onClick={() => router.push("/auth/employee/signin")}
            >
              <ListItemText primary="Employee Sign in" />
            </ListItem>

            <ListItem
              button
              onClick={() => router.push("/auth/client/signin")}
            >
              <ListItemText primary="Participant Sign in" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
