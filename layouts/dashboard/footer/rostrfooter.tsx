import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Button
} from "@mui/material";
import { useRouter } from "next/router";

export default function RostrFooter() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: "#1D2A33", color: "#F7FAFC", mt: 0 }}>
      {/* ================= MAIN FOOTER ================= */}
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ py: 8 }}>
          
          {/* ===== Brand / About ===== */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight={700} mb={2} style={{color:'#D8EFFE'}}>
              ROSTR
            </Typography>
            <Typography variant="body2" sx={{ color: "#F7FAFC", lineHeight: 1.8 }}>
              ROSTR is a modern NDIS support platform designed to simplify care,
              empower providers, and improve participant outcomes across
              Australia.
            </Typography>
          </Grid>

          {/* ===== Platform ===== */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} style={{color:'#D8EFFE'}}>
              Platform
            </Typography>
            <Stack spacing={1.5}>
              {["Features", "How It Works", "Security", "Pricing"].map(
                (item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      color: "#F7FAFC",
                      cursor: "pointer",
                      "&:hover": { color: "#67D085" }
                    }}
                  >
                    {item}
                  </Typography>
                )
              )}
            </Stack>
          </Grid>

          {/* ===== Resources ===== */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} style={{color:'#D8EFFE'}}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {["Help Centre", "NDIS Guidelines", "Blog", "FAQs"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "#F7FAFC",
                    cursor: "pointer",
                    "&:hover": { color: "#67D085" }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* ===== Contact / CTA ===== */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} style={{color:'#D8EFFE'}}>
              Get Started
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#F7FAFC", mb: 3 }}
            >
              Ready to transform NDIS care with a smarter platform?
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#67D085",
                color: "#F7FAFC",
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#5BBE78"
                }
              }}
              onClick={() => router.push("/signup")}
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
            sx={{ color: "#F7FAFC" }}
          >
            © {new Date().getFullYear()} ROSTR • NDIS Support Platform • Australia
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
