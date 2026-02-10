import RostrFooter from "@/layout/dashboard/footer/rostrfooter";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

/* ===== ICONS ===== */
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessIcon from "@mui/icons-material/Business";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <RostrHeader />

      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(rgba(29,42,51,0.7), rgba(29,42,51,0.7)), url('/assets/background/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" fontWeight={700} color="#F7FAFC" mb={2}>
                Human-centred scheduling, built for NDIS realities
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "rgba(247,250,252,0.85)" }}
                mb={4}
              >
                RostR is a rostering and shift-management platform designed to
                support NDIS providers in managing their day-to-day operations
                with clarity, care, and confidence. Reduce administrative load,
                improve visibility across your team, and spend more time focused
                on what matters most — delivering quality support to participants.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#67D085",
                    color: "#1D2A33",
                    "&:hover": { bgcolor: "#5BC47A" },
                  }}
                  onClick={() => router.push("/auth/signup")}
                >
                  Request Access
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<InfoOutlinedIcon />}
                  sx={{
                    borderColor: "#F7FAFC",
                    color: "#F7FAFC",
                    "&:hover": { backgroundColor: "rgba(247,250,252,0.1)" },
                  }}
                  onClick={() => router.push("/about")}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= VALUE PROPOSITIONS ================= */}
      <Box sx={{ py: 10, bgcolor: "#F7FAFC" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1D2A33"
            textAlign="center"
            mb={6}
          >
            Why RostR
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Built with providers, for providers",
                desc: "Designed around real NDIS workflows, RostR supports operational needs without adding unnecessary complexity.",
                icon: <GroupsIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
              {
                title: "Clearer scheduling, fewer gaps",
                desc: "Manage shifts, availability, and approvals in one place, helping teams stay aligned and reducing avoidable errors.",
                icon: <AccessTimeIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
              {
                title: "Supports good compliance practices",
                desc: "RostR provides tools that assist with record-keeping, evidence capture, and documentation — while keeping responsibility where it belongs, with the provider.",
                icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
              {
                title: "Human by design",
                desc: "From language choices to user experience, RostR is designed to feel approachable and intuitive for admins, workers, and participants alike.",
                icon: <FavoriteIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
            ].map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "white",
                    border: "1px solid rgba(90,122,140,0.15)",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    {item.icon}
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="#1D2A33"
                        mb={1}
                      >
                        {item.title}
                      </Typography>
                      <Typography color="#5A7A8C">{item.desc}</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= WHO IT'S FOR ================= */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1D2A33"
            textAlign="center"
            mb={6}
          >
            Who It’s For
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "NDIS providers of all sizes",
                icon: <BusinessIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
              {
                title: "Support coordinators and admin teams",
                icon: (
                  <AdminPanelSettingsIcon
                    sx={{ fontSize: 40, color: "#67D085" }}
                  />
                ),
              },
              {
                title: "Support workers and frontline staff",
                icon: (
                  <SupportAgentIcon sx={{ fontSize: 40, color: "#67D085" }} />
                ),
              },
              {
                title: "Participants accessing their schedules and information",
                icon: <PersonIcon sx={{ fontSize: 40, color: "#67D085" }} />,
              },
            ].map((item, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "#F7FAFC",
                    border: "1px solid rgba(90,122,140,0.2)",
                  }}
                >
                  <CardActionArea sx={{ p: 4 }}>
                    <Stack spacing={2} alignItems="center">
                      {item.icon}
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="#1D2A33"
                        textAlign="center"
                      >
                        {item.title}
                      </Typography>
                    </Stack>
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
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} color="#1D2A33" mb={3}>
            RostR helps simplify the operational side of care, so providers can
            focus on delivering it.
          </Typography>

          <Button
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#67D085",
              color: "#1D2A33",
              px: 5,
              "&:hover": { bgcolor: "#5BC47A" },
            }}
            onClick={() => router.push("/auth/signup")}
          >
            Get Started with RostR
          </Button>
        </Container>
      </Box>

      <RostrFooter />
    </>
  );
}