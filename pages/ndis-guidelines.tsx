import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GavelIcon from "@mui/icons-material/Gavel";

import ComputerIcon from "@mui/icons-material/Computer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PolicyIcon from "@mui/icons-material/Policy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ForumIcon from "@mui/icons-material/Forum";

import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";

export default function NdisguidelinesPage() {
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
            background: `radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 60%)`,
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
          NDIS Guidelines
        </Typography>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Intro */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              RostR and the NDIS
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 750, mx: "auto" }}
            >
              RostR is designed with an understanding of the NDIS environment and
              provider responsibilities. The platform supports scheduling,
              record-keeping, and workforce coordination aligned with common NDIS
              practices.
            </Typography>
          </Box>

          {/* Important Clarification */}
          <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <InfoOutlinedIcon color="primary" />
                <Typography variant="h5" fontWeight={700}>
                  Important Clarification
                </Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ComputerIcon color="primary" />
                    <Typography>RostR is a software platform only</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <HandshakeIcon color="primary" />
                    <Typography>RostR does not deliver supports</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <FactCheckIcon color="primary" />
                    <Typography>RostR does not approve claims</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PolicyIcon color="primary" />
                    <Typography>RostR does not guarantee NDIS compliance</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AssignmentTurnedInIcon color="primary" />
                    <Typography>
                      RostR does not replace provider obligations under the NDIS
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Typography color="text.secondary">
                All responsibility for compliance, decision-making, and service
                delivery remains with the provider.
              </Typography>
            </Stack>
          </Paper>

          {/* Supporting Good Practice */}
          <Paper elevation={2} sx={{ p: 5, borderRadius: 3 }}>
            <Stack spacing={4}>

              {/* Section Header */}
              <Stack direction="row" spacing={2} alignItems="center">
                <VerifiedUserIcon color="primary" />
                <Typography variant="h5" fontWeight={700}>
                  Supporting Good Practice
                </Typography>
              </Stack>

              {/* Intro Text */}
              <Typography sx={{ ml: { md: 5 }, color: "text.secondary" }}>
                RostR aims to support providers by:
              </Typography>

              {/* Points List */}
              <Stack spacing={3} sx={{ ml: { md: 5 } }}>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <VisibilityIcon color="primary" sx={{ mt: "2px" }} />
                  <Typography>
                    Improving visibility across shifts and records
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <DescriptionIcon color="primary" sx={{ mt: "2px" }} />
                  <Typography>
                    Assisting with consistent documentation
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <ForumIcon color="primary" sx={{ mt: "2px" }} />
                  <Typography>
                    Supporting clearer communication between admins, workers, and participants
                  </Typography>
                </Stack>

              </Stack>

              {/* Footer Note */}
              <Typography color="text.secondary" sx={{ pt: 1 }}>
                Providers should always refer to current NDIA guidance and seek
                professional advice where required.
              </Typography>

            </Stack>
          </Paper>

          {/* Compliance Note */}
          {/* <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(0,0,0,0.02)",
            }}
          >
            <Stack direction="row" spacing={2}>
              <GavelIcon color="action" />
              <Typography color="text.secondary">
                RostR supports operational workflows but does not replace legal,
                compliance, or regulatory responsibilities required under the
                NDIS framework.
              </Typography>
            </Stack>
          </Paper> */}
        </Stack>
      </Container>
      <RostrFooter />
    </>
  );
}