import { getAllActiveShifts } from "@/api/functions/client.api";
import CalendarComponent from "@/components/calendarComponent/calendarComponent";
import CalendarToolbar from "@/components/calendarComponent/calendarToolbar";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import router from "next/router";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import useUser from "@/hooks/react-query/useUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { useResponsive } from "@/hooks/utils/use-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsPopover from "@/components/notification/NotificationsPopover";
import AccountPopover from "@/components/common/account-popover";
import { padding } from "@mui/system";
import DescriptionIcon from '@mui/icons-material/Description';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { getCookie, setCookieClient } from "@/lib/functions/storage.lib";
import ClientSignDocumentPending from "./clients/client-document-pending";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";
import NewLogo from "@/components/logo/new-logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ParticipantProfile from "./clients/profile";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  onOpenNav: () => void;
}

export default function StaffRoster({ onOpenNav }: HeaderProps) {
  const [date, setDate] = useState(moment());
  const [open, setOpen] = useState<HTMLElement | null>(null);
  // const user = useUser();
  const userDataString = getCookie("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isModalPending, setIsModalPending] = useState(false);
  const handleCloseModalPending = () => setIsModalPending(false);

  const userCookie = getCookie("client");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const id = Number(user?.id) ? Number(user?.id) : user?.id;

  const [openModal, setModal] = useState(false);


  const handleModal = () => {
    setModal(true);
  };


  const handleCloseModal = () => {
    setModal(false);
  };



  const { data, isLoading } = useQuery({
    queryKey: [
      "get_all_active_shifts_carer",
      date.startOf("month").format("X"),
      date.endOf("month").format("X")
    ],
    queryFn: () =>
      getAllActiveShifts({
        startDate: date.startOf("month").format("X"),
        endDate: date.endOf("month").format("X")
      })
  });

  // useEffect(() => {
  //   console.log("----------- Carer List ------------", data);
  // }, [data]);

  const dispatch = useAppDispatch();

  const handleClose = (e?: any, r?: any, path?: string) => {
    if (path) {
      router.push(path);
    }
    setOpen(null);
  };

  const lgUp = useResponsive("up", "lg");

  const renderLogout = (
    <>
      <Tooltip title="Logout">
        <IconButton
          color="primary"
          onClick={() => {
            dispatch(logout());
            setOpen(null);
            // router.push("/");
            // router.push("/auth/client-signin");
          }}
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderContent = (
    <>
      {!lgUp && (
        <Tooltip title="Notification">
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Notifications">
          <Box>
            <NotificationsPopover />
          </Box>
        </Tooltip>
      </Stack>
    </>
  );


  const renderDocument = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Documents">
          <IconButton
            color="primary"
            onClick={() => { setIsModalPending(true) }}
          >
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );


  const renderProfile = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Profile">
          <IconButton
            color="primary"
            onClick={() => {
              handleModal()
              // router.push(`/clients/profile`);
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );

  setCookieClient("firstLoad", "false");
  const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false);
  // console.log("-------------- First Load --------------");
  useEffect(() => {
    // window.location.href = "https://your-new-page-url.com";
    const isFirstLoad = getCookie("firstLoad");

    if (!isFirstLoad) {
      setCookieClient("firstLoad", "true");
      setIsFirstLoadComplete(true); // Update state to trigger a re-render
      console.log("-------------- Second Load --------------");
      window.location.reload();
    } else {
      setIsFirstLoadComplete(true);
    }
  }, []);

  // Prevent rendering the content before the first load is complete
  if (!isFirstLoadComplete) {
    return null;
  }


  return (
    <>
      {/* <RostrHeader></RostrHeader> */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        {/* ================= LEFT : LOGO ================= */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NewLogo />
        </Box>

        {/* ================= CENTER : CALENDAR ================= */}
        <Box
          sx={{
            pt: 2,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CalendarToolbar date={date} setDate={setDate} />
        </Box>

        {/* ================= RIGHT : ACTIONS ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >

          {renderContent}
          {renderDocument}
          {renderProfile}
          {renderLogout}
        </Box>
      </Box>

      <Box sx={{ padding: 2 }}>
        <CalendarComponent date={date} shifts={data} />
      </Box>

      {userData?.id !== "" && (
        <ClientSignDocumentPending clientId={userData?.id} open={isModalPending} onClose={handleCloseModalPending}></ClientSignDocumentPending>
      )}
      {/* <RostrFooter></RostrFooter> */}
      {/* <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Profile</DialogTitle>
        <Divider />
        <DialogContent>
         <ParticipantProfile handleCloseModal={handleCloseModal}></ParticipantProfile>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="contained"  
              color="error"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        {/* Title with Close Icon */}
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Profile

          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
              transition: "transform 1.0s ease, color 0.3s ease",
            
              "&:hover": {
                color: "error.main",
                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <ParticipantProfile handleCloseModal={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
