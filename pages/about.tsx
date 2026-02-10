// AboutPage.tsx
import React from "react";
import { Box, Container, Stack,Typography } from "@mui/material";
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
          "0%": {
            backgroundPosition: "0 0, 0 0, 0 0",
          },
          "100%": {
            backgroundPosition: "200px 200px, -200px 200px, 200px -200px",
          },
        },
      
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 60%)
          `,
          opacity: 0.6,
          animation: "pulseGlow 6s ease-in-out infinite",
        },
      
        "@keyframes pulseGlow": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
      
        /* 🔥 Hover Effect */
        "&:hover": {
          animationDuration: "6s",
          transform: "scale(1.01)",
        },
      
        "&:hover::before": {
          opacity: 1,
        },
      }}
      >
        <Typography
          variant="h3"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: 700,
            color: "#555",
          }}
        >
          About
        </Typography>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={5}>
          {/* Our Approach */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Our Approach
            </Typography>

            <Typography variant="body1" color="text.secondary">
              RostR was created to address a familiar challenge in the NDIS
              space: balancing operational requirements with the human realities
              of support work.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Providers are expected to manage complex schedules, documentation,
              and compliance requirements — often using systems that feel
              disconnected from the people involved. RostR aims to bridge that
              gap.
            </Typography>
          </Box>

          {/* Human Centred */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Human-Centred by Design
            </Typography>

            <Typography variant="body1" color="text.secondary">
              The name and identity behind RostR reflect our approach. The
              platform is designed to support efficiency and accountability while
              recognising that NDIS supports are delivered by people, to people.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ mt: 3, fontWeight: 600 }}
            >
              We focus on:
            </Typography>

            <Box component="ul" sx={{ pl: 3, mt: 1, color: "text.secondary" }}>
              <li>
                <Typography>Clarity over clutter</Typography>
              </li>
              <li>
                <Typography>Structure without rigidity</Typography>
              </li>
              <li>
                <Typography>
                  Systems that support care, not overshadow it
                </Typography>
              </li>
            </Box>
          </Box>

          {/* Built to Scale */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Built to Scale
            </Typography>

            <Typography variant="body1" color="text.secondary">
              RostR is designed to support providers at different stages of
              growth. Whether you’re a small team or a larger organisation, the
              platform is intended to scale with your needs while remaining
              intuitive and accessible.
            </Typography>
          </Box>

          {/* Our Role */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Our Role
            </Typography>

            <Typography variant="body1" color="text.secondary">
              RostR is a software platform. It does not replace provider
              responsibility or decision-making. Instead, it offers tools that
              support providers in managing their workforce, schedules, and
              records more effectively.
            </Typography>
          </Box>
          <br></br> <br></br>
        </Stack>
      </Container>

      <RostrFooter />
    </>
  );
}