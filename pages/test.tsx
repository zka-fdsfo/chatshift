  import { getStaffAvailableSlots } from "@/api/functions/staff.api";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
  import { Container, Typography } from "@mui/material";
  import { useQuery } from "@tanstack/react-query";
  import { useParams } from "next/navigation";
  import { useEffect } from "react";
  
  export default function ExaplePage() {

    const { data, isLoading, isError } = useQuery({
      queryKey: ["staff available slots"],
      queryFn: () => getStaffAvailableSlots("1", "2026-03-17") // pass the id as an object
    });
  
    useEffect(() => {
      console.log("---------- Staff Availability ----------", data);
    }, [data]);

    return (
      <DashboardLayout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
           Staff Availability
          </Typography>
          <Typography variant="body1">This is the Example Content.</Typography>
        </Container>
      </DashboardLayout>
    );
  }
  