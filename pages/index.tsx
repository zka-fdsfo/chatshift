import RostrFooter from "@/layout/dashboard/footer/rostrfooter";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
  Stack
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const trustSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <RostrHeader />

      {/* ================= HERO ================= */}
     {/* ================= HERO ================= */}
     <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(rgba(29,42,51,0.7), rgba(29,42,51,0.7)), url('/assets/background/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Typography variant="h2" fontWeight={700} color="#F7FAFC" mb={2}>
                Empowering NDIS Care Across Australia
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "rgba(247,250,252,0.85)" }}
                mb={4}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum id ligula porta felis euismod semper.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    bgcolor: "#67D085",
                    color: "#1D2A33",
                    "&:hover": { bgcolor: "#5BC47A" }
                  }}
                  onClick={() => router.push("/auth/signup")}
                >
                  Get Started
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    borderColor: "#F7FAFC",
                    color: "#F7FAFC",
                    "&:hover": { backgroundColor: "rgba(247,250,252,0.1)" }
                  }}
                  onClick={() =>
                    trustSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    })
                  }
                >
                  Learn More
                </Button>

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= TRUST ================= */}
      <Box  ref={trustSectionRef} sx={{ py: 10, bgcolor: "#F7FAFC" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              "NDIS Compliant Services",
              "Secure & Confidential Data",
              "Supporting Australians Nationwide"
            ].map((title, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "white",
                    border: "1px solid rgba(90,122,140,0.15)"
                  }}
                >
                  <Typography variant="h6" fontWeight={600} color="#1D2A33" mb={1}>
                    {title}
                  </Typography>
                  <Typography color="#5A7A8C">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas sed diam eget risus varius blandit.
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= PORTALS ================= */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} color="#1D2A33" textAlign="center" mb={6}>
            Access Your Portal
          </Typography>

          <Grid container spacing={4}>
            {[
              { title: "Participants", path: "/auth/client/signin" },
              { title: "Employees", path: "/auth/employee/signin" },
              { title: "Administrators", path: "/auth/signup" }
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "#F7FAFC",
                    border: "1px solid rgba(90,122,140,0.2)"
                  }}
                >
                  <CardActionArea sx={{ p: 4 }} onClick={() => router.push(item.path)}>
                    <Typography variant="h6" fontWeight={600} color="#1D2A33" mb={1}>
                      {item.title}
                    </Typography>
                    <Typography color="#5A7A8C">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
   {/* ================= CTA ================= */}
   <Box
        sx={{
          py: 10,
          bgcolor: "#D8EFFE",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} color="#1D2A33" mb={2}>
            Ready to Transform NDIS Care?
          </Typography>

          <Typography color="#5A7A8C" mb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer posuere erat a ante venenatis dapibus.
          </Typography>

          <Button
            size="large"
            variant="contained"
            sx={{
              bgcolor: "#67D085",
              color: "#1D2A33",
              px: 5,
              "&:hover": { bgcolor: "#5BC47A" }
            }}
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </Button>
        </Container>
      </Box>
      <RostrFooter />
    </>
  );
}
