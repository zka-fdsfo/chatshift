// AboutPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";


export default function NdisguidelinesPage() {
  return (
    <>
      <RostrHeader />

      <Box
        sx={{
          minHeight: "80vh", // fill most of the page
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: `linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 100%)`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.1),
              rgba(255,255,255,0.1) 1px,
              transparent 1px,
              transparent 8px
            )`,
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: 700,
            color: "#555",
          }}
        >
          Ndis guidelines page is coming soon.
        </Typography>
      </Box>

      <RostrFooter />
    </>
  );
}
