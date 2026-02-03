import React, { useState } from 'react';
import { getAdminDashboard } from '@/api/functions/admin.api';
import { Card, Chip, CircularProgress, Container, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack } from '@mui/system';
import AdminDashboardGraph from './AdminDashboardBarGraph';
import Loader from '../Loader';
import Error from '../Error';
import AdminDashboardHeatMap from './AdminDashboardHeatmap';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Cockpit = () => {
  // const [filterByShiftGraph, setFilterByShiftGraph] = useState("yearly");
  const router = useRouter();
  const today = new Date();
  // const date = `${today.getFullYear()}-${today.getMonth() + 1}`;
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;


  const { data, isLoading, isError } = useQuery({
    enabled: !!date,
    queryKey: ['admin_dashboard', date],
    queryFn: () => getAdminDashboard(date)
  });

  console.log("Dashboard data===================>", data)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error error={""} />
  }

  const formatRoleName = (role: string) => {
    return role
      .replace(/^ROLE_/, "")              // remove ROLE_
      .toLowerCase()                      // admin → admin
      .replace(/_/g, " ")                 // OFFICE_SUPPORT
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Office Support
  };

  const formatLabel = (key: string) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase());

  const extrasArray = data?.extras
    ? Object.entries(data.extras)
    : [];


  const getRedirectPath = (index: number) => {
    switch (index) {
      case 0:
        return "/staff/list";
      case 1:
        return "/clients/list";
      case 2:
        return "/home";
      default:
        return "/";
    }
  };
  return (
    <Container>
      <Typography variant='h5' mb={2} style={{ color: '#1D2A33' }}>Dashboard</Typography>

      <Typography variant='h6' mb={2} style={{ color: '#5A7A8C' }}>KPIS</Typography>

      {/* <Grid container spacing={2.5} mb={5}>
        {data?.kpis?.map((item: any, i: number) => {
          const label =
            i === 0
              ? "Employee with shift this month"
              : i === 1
                ? "Client with shift this month"
                : item?.label;

          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper
                elevation={2}
                onClick={() => router.push(getRedirectPath(i))}
                sx={{
                  p: 3,
                  backgroundColor: "#F7FAFC",
                  cursor: "pointer",
                  height: "100%",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Typography
                  variant="h6"
                  mb={2}
                  sx={{ color: "#5A7A8C", fontWeight: 400 }}
                >
                  {label}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      {item?.current}
                    </Typography>
                  </Box>

                  {item?.trend !== 2 && (
                    <Typography sx={{ color: "#5A7A8C", fontSize: 12, fontWeight: 500 }}>
                      ↑ {item?.trend === 0 ? "increase" : "decrease"}{" "}
                      {Math.round(item?.percentChange)}%
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid> */}

      <Grid container spacing={2.5} mb={5}>
        {data?.kpis?.map((item: any, i: number) => {
          const label =
            i === 0
              ? "Employee with shift this month"
              : i === 1
                ? "Client with shift this month"
                : item?.label;

          // Optional icons for medical theme
          const icon = i === 0 ? "👩‍⚕️" : i === 1 ? "🧑‍🦽" : "📊";

          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper
                elevation={2}
                onClick={() => router.push(getRedirectPath(i))}
                sx={{
                  p: 3,
                  backgroundColor: "#F7FAFC", // Background Bright
                  borderLeft: `6px solid ${item?.trend === 0 ? "#67D085" : item?.trend === 1 ? "#D84F67" : "#5A7A8C"}`, // trend border
                  cursor: "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Header with icon and label */}
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#D8EFFE", // Calm Accent
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#1D2A33", fontWeight: 500 }} // Primary Dark
                  >
                    {label}
                  </Typography>
                </Stack>

                {/* KPI Number and Trend */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#D8EFFE", // Calm Accent
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#67D085" }} // Primary Accent
                    >
                      {item?.current}
                    </Typography>
                  </Box>

                  {item?.trend !== 2 && (
                    <Typography
                      sx={{
                        color: item?.trend === 0 ? "#67D085" : "#D84F67", // green/red trend
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {item?.trend === 0 ? "↑ Increase" : "↓ Decrease"}{" "}
                      {Math.round(item?.percentChange)}%
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>


      {/* =========================== */}
      {/* <Accordion defaultExpanded sx={{ mt: 0 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "#5A7A8C" }}>
            SHIFT
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            gap={2.5}
            flexWrap="wrap"
          >
            <TableContainer component={Paper} elevation={2}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                    <TableCell><b>Employee</b></TableCell>
                    <TableCell><b>Client</b></TableCell>
                    <TableCell><b>Role</b></TableCell>
                    <TableCell><b>Start Time</b></TableCell>
                    <TableCell><b>End Time</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data?.todayShifts?.length > 0 ? (
                    data.todayShifts.map((shift: any) => (
                      <TableRow key={shift.shiftId} hover>
                        <TableCell>{shift.employeeName}</TableCell>
                        <TableCell>{shift.clientName}</TableCell>
                        <TableCell>{formatRoleName(shift.roleName)}</TableCell>
                        <TableCell>{shift.startTime}</TableCell>
                        <TableCell>{shift.endTime}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No shifts available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      <Accordion defaultExpanded sx={{ mt: 0, boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent for header
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
            SHIFT
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Grid item xs={12} display="flex" gap={2.5} flexWrap="wrap">
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{ borderRadius: 2, overflow: "hidden" }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#5A7A8C" }}>
                    <TableCell sx={{ color: "#F7FAFC", fontWeight: 600 }}>
                      Employee
                    </TableCell>
                    <TableCell sx={{ color: "#F7FAFC", fontWeight: 600 }}>
                      Client
                    </TableCell>
                    <TableCell sx={{ color: "#F7FAFC", fontWeight: 600 }}>
                      Role
                    </TableCell>
                    <TableCell sx={{ color: "#F7FAFC", fontWeight: 600 }}>
                      Start Time
                    </TableCell>
                    <TableCell sx={{ color: "#F7FAFC", fontWeight: 600 }}>
                      End Time
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data?.todayShifts?.length > 0 ? (
                    data.todayShifts.map((shift: any) => (
                      <TableRow
                        key={shift.shiftId}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "#D8EFFE", // calm hover
                          },
                        }}
                      >
                        <TableCell sx={{ color: "#1D2A33" }}>{shift.employeeName}</TableCell>
                        <TableCell sx={{ color: "#1D2A33" }}>{shift.clientName}</TableCell>
                        <TableCell sx={{ color: "#1D2A33" }}>
                          {formatRoleName(shift.roleName)}
                        </TableCell>
                        <TableCell sx={{ color: "#1D2A33" }}>{shift.startTime}</TableCell>
                        <TableCell sx={{ color: "#1D2A33" }}>{shift.endTime}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: "#5A7A8C" }}>
                        No shifts available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </AccordionDetails>
      </Accordion>



      {/* ======================== */}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "#5A7A8C" }}>
            ROLES
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2.5}>
            {data?.roles?.map((item: any, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper elevation={2} sx={{ p: 3, backgroundColor: "#F7FAFC" }}>
                  <Typography variant="h6" mb={2} sx={{ color: "#5A7A8C", fontWeight: 400 }}>
                    Role {formatRoleName(item?.roleName)}
                  </Typography>

                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      {item?.count}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      <Accordion sx={{ boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
            ROLES
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Grid container spacing={2.5}>
            {data?.roles?.map((item: any, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    backgroundColor: "#F7FAFC",
                    borderLeft: `6px solid #67D085`, // Primary Accent highlight
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    mb={2}
                    sx={{ color: "#5A7A8C", fontWeight: 500 }}
                  >
                    Role {formatRoleName(item?.roleName)}
                  </Typography>

                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#D8EFFE", // Calm Accent circle
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#67D085" }} // Primary Accent
                    >
                      {item?.count}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>




      {/* =========================== */}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "#5A7A8C" }}>
            EXTRA
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2.5}>
            {extrasArray.map(([key, value]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Paper elevation={2} sx={{ p: 3, backgroundColor: "#F7FAFC" }}>
                  <Typography variant="h6" mb={2} sx={{ color: "#5A7A8C", fontWeight: 400 }}>
                    {formatLabel(key)}
                  </Typography>

                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      {value != null ? Math.round(Number(value)) : 0}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      <Accordion sx={{ boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
            EXTRA
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Grid container spacing={2.5}>
            {extrasArray.map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    backgroundColor: "#F7FAFC",
                    borderLeft: `6px solid #67D085`, // Primary Accent highlight
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    mb={2}
                    sx={{ color: "#5A7A8C", fontWeight: 500 }}
                  >
                    {formatLabel(key)}
                  </Typography>

                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#D8EFFE", // Calm Accent
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#67D085" }} // Primary Accent
                    >
                      {value != null ? Math.round(Number(value)) : 0}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>



      {/* =========================== */}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "#5A7A8C" }}>
            TOP EMPLOYEE OF THE MONTH
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2.5}>
            {data?.topEmployeesThisMonth?.map((item: any, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    backgroundColor: "#F7FAFC",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" mb={2} sx={{ color: "#5A7A8C", fontWeight: 400 }}>
                    {item?.employeeName}
                  </Typography>

                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      {item?.count}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      <Accordion sx={{ boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
            TOP EMPLOYEE OF THE MONTH
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Grid container spacing={2.5}>
            {data?.topEmployeesThisMonth?.map((item: any, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    backgroundColor: "#F7FAFC",
                    height: "100%",
                    borderLeft: `6px solid #67D085`, // Primary Accent highlight
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    mb={2}
                    sx={{ color: "#5A7A8C", fontWeight: 500 }}
                  >
                    {item?.employeeName}
                  </Typography>

                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#D8EFFE", // Calm Accent
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#67D085" }} // Primary Accent
                    >
                      {item?.count}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>



      {/* ============================= */}

      <Box mb={0} mt={2} pl={2}>
        <Typography variant="h6" mb={2} sx={{ color: "#5A7A8C" }}>
          ANALYTICS
        </Typography>
      </Box>

      {/* YEARLY SHIFTS */}
      {/* <Accordion sx={{ mb: 2, boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="h6">Shifts by Yearly</Typography>
            <Typography variant="body2" color="text.secondary">
              {today.getFullYear()}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            sx={{
              p: 1,
              py: 2,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 0 10px 0 #eee"
            }}
          >
            <AdminDashboardGraph data={data?.shiftsByMonth} />
          </Box>
        </AccordionDetails>
      </Accordion> */}

      <Accordion sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
              Shifts by Yearly
            </Typography>
            <Typography variant="body2" sx={{ color: "#5A7A8C" }}>
              {today.getFullYear()}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Box
            sx={{
              p: 2,
              width: "100%",
              backgroundColor: "#FFFFFF", // white card for chart
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // subtle shadow
            }}
          >
            <AdminDashboardGraph data={data?.shiftsByMonth} />
          </Box>
        </AccordionDetails>
      </Accordion>


      {/* MONTHLY SHIFTS */}
      {/* <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="h6">Shifts by Monthly</Typography>
            <Typography variant="body2" color="text.secondary">
              {today.toLocaleString("default", { month: "long" })}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            sx={{
              p: 1,
              py: 2,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 0 10px 0 #eee"
            }}
          >
            <AdminDashboardHeatMap
              data={data?.shiftsByDayCurrentMonth}
            />
          </Box>
        </AccordionDetails>
      </Accordion> */}

      <Accordion sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#D8EFFE", // Calm Accent
            borderRadius: "8px",
            "& .MuiAccordionSummary-content": { alignItems: "center" },
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: "#1D2A33", fontWeight: 600 }}>
              Shifts by Monthly
            </Typography>
            <Typography variant="body2" sx={{ color: "#5A7A8C" }}>
              {today.toLocaleString("default", { month: "long" })}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#F7FAFC", p: 2 }}>
          <Box
            sx={{
              p: 2,
              width: "100%",
              backgroundColor: "#FFFFFF", // white card for heatmap
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // subtle shadow
            }}
          >
            <AdminDashboardHeatMap data={data?.shiftsByDayCurrentMonth} />
          </Box>
        </AccordionDetails>
      </Accordion>


    </Container>
  )
}

export default Cockpit
