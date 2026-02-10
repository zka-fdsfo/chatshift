import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";

import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";
import { textAlign } from "@mui/system";

export default function HelpcenterPage() {
  return (
    <>
      <RostrHeader />

      {/* HERO */}
      <Box
        sx={{
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          px: 2,
          overflow: "hidden",

          background: `
            radial-gradient(circle at 50% 50%, rgba(45,196,182,0.12), transparent 70%),
            repeating-linear-gradient(60deg, rgba(45,196,182,0.18) 0px, rgba(45,196,182,0.18) 1px, transparent 1px, transparent 14px),
            repeating-linear-gradient(-60deg, rgba(90,122,140,0.18) 0px, rgba(90,122,140,0.18) 1px, transparent 1px, transparent 14px)
          `,
        }}
      >
        <Typography variant="h3" fontWeight={700} color="#555">
          Help Centre
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={0}>
          {/* INTRO */}
          <Box textAlign="center" maxWidth={800} mx="auto">
            <Typography variant="h4" fontWeight={700}>
              Welcome to the RostR Help Centre
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              The Help Centre is designed to support providers, support workers,
              and participants in using RostR confidently and effectively.
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              As the platform continues to develop, this space will grow to
              include detailed guides, walkthroughs, and updates.
            </Typography>
          </Box>

          {/* HELP TOPICS */}
          <Stack spacing={0} textAlign="center"  mx="auto">
            <Typography variant="h5" fontWeight={700} mb={4} mt={8}>
              Help topics
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
              {/* Getting Started */}
              <Grid item xs={12} md={6} lg={4} display="flex">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#65cb8136",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SchoolIcon color="primary" />
                      </Box>

                      <Typography fontWeight={600} fontSize={18}>
                        Getting started
                      </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{textAlign: "justify"}}>
                      <Typography variant="body2">
                        • Account setup
                      </Typography>
                      <Typography variant="body2">
                        • User roles and permissions
                      </Typography>
                      <Typography variant="body2">
                        • Navigating the platform
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              {/* Scheduling */}
              <Grid item xs={12} md={6} lg={4} display="flex">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#65cb8136",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CalendarMonthIcon color="primary" />
                      </Box>

                      <Typography fontWeight={600} fontSize={18}>
                        Scheduling and shifts
                      </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{textAlign: "justify"}}>
                      <Typography variant="body2">
                        • Creating and managing shifts
                      </Typography>
                      <Typography variant="body2">
                        • Shift approvals and tracking
                      </Typography>
                      <Typography variant="body2">
                        • Availability and notifications
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              {/* Records */}
              <Grid item xs={12} md={6} lg={4} display="flex">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#65cb8136",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DescriptionIcon color="primary" />
                      </Box>

                      <Typography fontWeight={600} fontSize={18}>
                        Records and documentation
                      </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{textAlign: "justify"}}>
                      <Typography variant="body2">
                        • Uploading and managing documents
                      </Typography>
                      <Typography variant="body2">
                        • Case notes and shift records
                      </Typography>
                      <Typography variant="body2">
                        • Data access and reporting
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              {/* Security */}
              <Grid item xs={12} md={6} lg={4} display="flex">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, flex: 1 }}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#65cb8136",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SecurityIcon color="primary" />
                      </Box>

                      <Typography fontWeight={600} fontSize={18}>
                        Security and access
                      </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{textAlign: "justify"}}>
                      <Typography variant="body2">
                        • Logging in and out
                      </Typography>
                      <Typography variant="body2">
                        • Session security
                      </Typography>
                      <Typography variant="body2">
                        • Shared device considerations
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              {/* Participants */}
              <Grid item xs={12} md={6} lg={4} display="flex">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, flex: 1 }}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#65cb8136",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PeopleIcon color="primary" />
                      </Box>

                      <Typography fontWeight={600} fontSize={18}>
                        Participants
                      </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{textAlign: "justify"}}>
                      <Typography variant="body2">
                        • Using the participant portal
                      </Typography>
                      <Typography variant="body2">
                        • Viewing schedules
                      </Typography>
                      <Typography variant="body2">
                        • Submitting requests and profile updates
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>

      <RostrFooter />
    </>
  );
}