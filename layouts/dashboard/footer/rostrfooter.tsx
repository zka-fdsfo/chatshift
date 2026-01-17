import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

export default function RostrFooter() {
  const router = useRouter();

  const platformLinks = [
    { label: "Features", path: "/features" },
    { label: "How It Works", path: "/how-it-work" },
    { label: "Security", path: "/security" },
    { label: "Pricing", path: "/pricing" },
  ];

  const resourceLinks = [
    { label: "Help Centre", path: "/help-center" },
    { label: "NDIS Guidelines", path: "/ndis-guidelines" },
    { label: "Blog", path: "/blog" },
    { label: "FAQs", path: "/faqs" },
  ];

  return (
    <Box sx={{ bgcolor: "#1D2A33", color: "#FFFFFF" }}>
      {/* ================= MAIN FOOTER ================= */}
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ py: 8 }}>
          {/* ===== Brand / About ===== */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
              sx={{ cursor: "pointer", color: "#FFFFFF" }}
              onClick={() => router.push("/")}
            >
              ROSTR
            </Typography>

            <Typography
              variant="body2"
              sx={{ lineHeight: 1.8, color: "#FFFFFF" }}
            >
              ROSTR is a modern NDIS support platform designed to simplify care,
              empower providers, and improve participant outcomes across
              Australia.
            </Typography>
          </Grid>

          {/* ===== Platform ===== */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ color: "#FFFFFF" }}
            >
              Platform
            </Typography>

            <Stack spacing={1.5}>
              {platformLinks.map((item) => (
                <Typography
                  key={item.label}
                  variant="body2"
                  onClick={() => router.push(item.path)}
                  sx={{
                    color: "#FFFFFF",
                    cursor: "pointer",
                    "&:hover": { color: "#67D085" },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* ===== Resources ===== */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ color: "#FFFFFF" }}
            >
              Resources
            </Typography>

            <Stack spacing={1.5}>
              {resourceLinks.map((item) => (
                <Typography
                  key={item.label}
                  variant="body2"
                  onClick={() => router.push(item.path)}
                  sx={{
                    color: "#FFFFFF",
                    cursor: "pointer",
                    "&:hover": { color: "#67D085" },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* ===== CTA ===== */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ color: "#FFFFFF" }}
            >
              Get Started
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 3, color: "#FFFFFF" }}
            >
              Ready to transform NDIS care with a smarter platform?
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#67D085",
                color: "#1D2A33",
                fontWeight: 700,
                py: 1.2,
                borderRadius: 2,
                "&:hover": { bgcolor: "#5BBE78" },
              }}
              onClick={() => router.push("/contact")}
            >
              Request a Demo
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
      </Container>

      {/* ================= BOTTOM BAR ================= */}
      <Box sx={{ py: 3 }}>
        <Container>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "#FFFFFF" }}
          >
            © {new Date().getFullYear()} ROSTR • NDIS Support Platform • Australia
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
