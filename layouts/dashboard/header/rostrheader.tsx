import NewLogo from "@/components/logo/new-logo";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RostrHeader() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        <Typography sx={{ flexGrow: 1 }}>
          <NewLogo />
        </Typography>

        <Button sx={{ color: "#1D2A33" }} onClick={() => router.push("/about")}>
          About
        </Button>

        <Button sx={{ color: "#1D2A33" }} onClick={() => router.push("/contact")}>
          Contact
        </Button>

        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            ml: 2,
            borderColor: "#5A7A8C",
            color: "#5A7A8C",
            "&:hover": {
              borderColor: "#1D2A33",
              backgroundColor: "rgba(90,122,140,0.08)"
            }
          }}
        >
          Sign in
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => router.push("/auth/employee/signin")}>
            Employee Sign in
          </MenuItem>
          <MenuItem onClick={() => router.push("/auth/client/signin")}>
            Participant Sign in
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
