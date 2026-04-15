import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Chat from "./Chat";

export default function ExaplePage() {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <Container>
      <Chat/>
        <Typography variant="body1">This is the Example page.</Typography>
      </Container>
    </DashboardLayout>
  );
}