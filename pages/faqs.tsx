import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StorageIcon from "@mui/icons-material/Storage";
import BusinessIcon from "@mui/icons-material/Business";

import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";

export default function FaqsPage() {
  return (
    <>
      <RostrHeader />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          px: 2,

          background: `
            radial-gradient(circle at 50% 50%, rgba(45,196,182,0.12), transparent 70%),
            repeating-linear-gradient(
              60deg,
              rgba(45,196,182,0.18) 0px,
              rgba(45,196,182,0.18) 1px,
              transparent 1px,
              transparent 14px
            ),
            repeating-linear-gradient(
              -60deg,
              rgba(90,122,140,0.18) 0px,
              rgba(90,122,140,0.18) 1px,
              transparent 1px,
              transparent 14px
            )
          `,

          animation: "webMove 20s linear infinite",

          "@keyframes webMove": {
            "0%": { backgroundPosition: "0 0, 0 0, 0 0" },
            "100%": {
              backgroundPosition: "200px 200px, -200px 200px, 200px -200px",
            },
          },

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 60%)",
            opacity: 0.6,
            animation: "pulseGlow 6s ease-in-out infinite",
          },

          "@keyframes pulseGlow": {
            "0%,100%": { opacity: 0.4 },
            "50%": { opacity: 0.8 },
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{ zIndex: 2, fontWeight: 700, color: "#555" }}
        >
          FAQs
        </Typography>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Intro */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Frequently Asked Questions
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 700, mx: "auto" }}
            >
              Find quick answers about RostR, platform usage, and features.
            </Typography>
          </Box>

          {/* FAQ Cards */}
          <Grid container spacing={3}>
            {/* Who can use */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PeopleIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Who can use RostR?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  RostR is designed primarily for NDIS providers, their staff,
                  and participants. While it is NDIS-aware, the platform focuses
                  on rostering and workforce management more broadly.
                </Typography>
              </Paper>
            </Grid>

            {/* Compliance */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <VerifiedUserIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Does RostR ensure NDIS compliance?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  No. RostR provides tools that may assist with record-keeping
                  and operational processes, but compliance responsibility always
                  remains with the provider.
                </Typography>
              </Paper>
            </Grid>

            {/* Participant Access */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <HelpOutlineIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Can participants access RostR?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  Yes. RostR includes a participant portal where participants
                  can view relevant information and submit requests, depending
                  on provider settings.
                </Typography>
              </Paper>
            </Grid>

            {/* Mobile */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PhoneIphoneIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Is RostR available on mobile?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  RostR is designed to be accessible across devices. Additional
                  mobile functionality may be introduced to support features such
                  as shift tracking and travel recording.
                </Typography>
              </Paper>
            </Grid>

            {/* Export */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <StorageIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Can data be exported for audits?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  RostR supports access to operational data to assist providers
                  with internal reviews and external requirements such as audits.
                </Typography>
              </Paper>
            </Grid>

            {/* Small providers */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BusinessIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Is RostR suitable for small providers?
                  </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} color="text.secondary">
                  Yes. RostR is designed to scale and can be used by providers
                  of varying sizes.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <RostrFooter />
    </>
  );
}