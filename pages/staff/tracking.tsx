'use client';

import { getSummaryRoute, getTrackingRoute } from '@/api/functions/staff.api';
import RouteMap from '@/components/RouteMap';
import DashboardLayout from '@/layout/dashboard/DashboardLayout';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Tracking({
  employeeId,
  shiftId,
  clockIn,
  clockOut
}: {
  employeeId: number;
  shiftId: number;
  clockIn: boolean;
  clockOut: boolean;
}) {

  useEffect(() => {
    if (clockIn && clockOut) {
      console.log("**********: Clocked In: **********", clockIn);
      console.log("**********: Clocked Out: **********", clockOut);
    }
  }, [clockIn,clockOut]);

// Tracking Route: call only when IN but not OUT
const { data, isLoading, error } = useQuery({
  queryKey: ["tracking_route", employeeId, shiftId],
  queryFn: () => getTrackingRoute({ employeeId, shiftId }),
  enabled: !!employeeId && !!shiftId && clockIn === true && clockOut === false,
});

// Summary Route: call only when IN and OUT both are true
const { data: route_summary, isLoading: isLoadingMap, error: errorMap } = useQuery({
  queryKey: ["summary_route", employeeId, shiftId],
  queryFn: () => getSummaryRoute({ employeeId, shiftId }),
  enabled: !!employeeId && !!shiftId && clockIn === true && clockOut === true,
});
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading route</p>;

  if (isLoadingMap) return <p>Loading...</p>;
  if (errorMap) return <p>Error loading route</p>;
  
  return (
    <Box
      sx={{
        width: '99%',
        height: 'auto',
        bgcolor: 'background.paper', // gives paper-like background
        boxShadow: 3, // adds a subtle shadow like Paper
        borderRadius: 2, // rounded corners
        p: 2, // padding inside the box
        ml:0.8,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Staff Route Tracking
      </Typography>


      {clockIn && !clockOut && (
  data?.route && data.route.length > 0 ? (
    <RouteMap route={data.route} />
  ) : (
    <Typography color="text.secondary">
      Sorry, there is no route available.
    </Typography>
  )
)}

{clockIn && clockOut && (
  route_summary?.route && route_summary.route.length > 0 ? (
    <RouteMap route={route_summary.route} />
  ) : (
    <Typography color="text.secondary">
      Sorry, there is no route available.
    </Typography>
  )
)}
    </Box>
  );
}
