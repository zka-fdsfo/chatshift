import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

import { useResponsive } from "@/hooks/utils/use-responsive";

import AccountPopover from "@/components/common/account-popover";
// import NotificationsPopover from "@/components/notification/NotificationsPopover";
import { HEADER, NAV } from "@/config/constants";
import { bgBlur } from "@/themes/css";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsPopover from "@/components/notification/NotificationsPopover";

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenNav: () => void;
}

export default function Header({ onOpenNav }: HeaderProps) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
<AppBar
  elevation={2}
  sx={{
    height: 63,
    minHeight: 63, // important for MUI AppBar
    zIndex: theme.zIndex.appBar + 1,

    backgroundColor: "rgba(247, 250, 252, 0.55)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",

    boxShadow: `
      0 1px 0 rgba(0, 0, 0, 0.04),
      0 8px 24px rgba(0, 0, 0, 0.06)
    `,

    ...(lgUp && {
      width: `calc(100% - ${NAV.WIDTH + 1}px)`,
      height: 63,
      minHeight: 63
    })
  }}
>




  
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 }
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
