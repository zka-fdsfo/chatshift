import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityIcon from "@mui/icons-material/Security";

import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";

export default function AboutPage() {
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
          Contact
        </Typography>
      </Box>

      {/* Contact Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Intro */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Get in touch
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 700, mx: "auto" }}
            >
              Have a question, need support, or want to learn more about RostR?
              We’re happy to help.
            </Typography>
          </Box>

          {/* Contact Cards */}
          <Grid container >
            {/* Support Email */}
            <Grid item xs={12} md={6} >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  marginRight:2
                }}
                
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <SupportAgentIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Support
                    </Typography>
                    <Typography color="text.secondary">
                      Technical help and platform support
                    </Typography>
                  </Box>
                </Stack>

                <Typography sx={{ mt: 3, fontWeight: 500 }}>
                  support@rostr.com
                </Typography>
              </Paper>
            </Grid>

            {/* General Email */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  marginLeft:2
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <EmailIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      General Enquiries
                    </Typography>
                    <Typography color="text.secondary">
                      Partnerships, onboarding and general questions
                    </Typography>
                  </Box>
                </Stack>

                <Typography sx={{ mt: 3, fontWeight: 500 }}>
                  hello@rostr.com
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* What To Expect */}
          <Paper
            elevation={2}
            sx={{
              p: 5,
              borderRadius: 3,
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <HelpOutlineIcon color="primary" />
                <Typography variant="h5" fontWeight={700}>
                  What to expect
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography>• Product and onboarding questions</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>• Technical support</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>• General enquiries</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>

          {/* Security Note */}
          <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(0,0,0,0.02)",
            }}
          >
            <Stack direction="row" spacing={2}>
              <SecurityIcon color="action" />
              <Typography color="text.secondary">
                For privacy and security reasons, RostR does not provide advice
                on NDIS claims or compliance decisions.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      <RostrFooter />
    </>
  );
}