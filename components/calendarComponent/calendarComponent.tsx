import { Shift } from "@/interface/shift.interface";
import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import moment, { Moment } from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { ShiftBox } from "../Timesheet/TimeSheetTable";
import { ShiftBoxParticipant } from "../Timesheet/TimeSheetTableParticipant";

const StyledContainer = styled(Box)`
  table {
    border: 1px solid #ddd;

    thead {
      th {
        border-bottom-color: #ddd;
        width: 150px;

        &:not(:last-child) {
          border-right: 1px solid #ddd;
        }
      }
    }
  }

  tbody {
    td {
      height: 150px;
      vertical-align: top;
      border-bottom-color: #ddd;

      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }

      p {
        font-size: 14px;
      }
    }
  }
`;

export default function CalendarComponent({
  date,
  shifts
}: {
  date: Moment;
  shifts: Shift[];
}) {
  const [role, setRole] = useState("");

  /* ------------------------------------------------
     SAFE calendar range (works for December + years)
  ------------------------------------------------- */
  const startOfCalendar = useMemo(
    () => moment(date).startOf("month").startOf("week"),
    [date]
  );

  const endOfCalendar = useMemo(
    () => moment(date).endOf("month").endOf("week"),
    [date]
  );

  const totalWeeks = useMemo(
    () => endOfCalendar.diff(startOfCalendar, "weeks") + 1,
    [startOfCalendar, endOfCalendar]
  );

  /* ------------------------------------------------
     Get user role (client / staff)
  ------------------------------------------------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(sessionStorage.getItem("user_role") || "");
    }
  }, []);

  return (
    <StyledContainer>
      {/* <TableContainer sx={{backgroundColor:'#ffffff'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sunday</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>Tuesday</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>Thursday</TableCell>
              <TableCell>Friday</TableCell>
              <TableCell>Saturday</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: totalWeeks }).map((_, weekIndex) => {
              const startOfWeek = startOfCalendar
                .clone()
                .add(weekIndex, "week");

              return (
                <TableRow key={weekIndex}>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const day = startOfWeek.clone().add(dayIndex, "days");
                    const dayUnix = day.startOf("day").valueOf();

                    const filteredShifts = shifts?.filter(
                      (shift) =>
                        moment(shift.startDate)
                          .startOf("day")
                          .valueOf() === dayUnix
                    );

                    return (
                      <TableCell key={day.format("YYYY-MM-DD")}>
                        <Typography
                          sx={{
                            color:
                              day.month() === moment(date).month()
                                ? "#333"
                                : "#ccc"
                          }}
                        >
                          {day.format("DD")}
                        </Typography>

                        {role === "ROLE_CLIENT" ? (
                          <ShiftBoxParticipant
                            shifts={filteredShifts}
                            isMonthly
                          />
                        ) : (
                          <ShiftBox
                            shifts={filteredShifts}
                            isMonthly
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}

      <TableContainer
        sx={{
          background: "#F7FAFC",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Table
          sx={{
            minHeight: "100vh",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          {/* ================= HEADER ================= */}
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <TableRow>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day) => (
                  <TableCell
                    key={day}
                    align="center"
                    sx={{
                      background: "rgba(29,42,51,0.55)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                      }}
                    >
                      {day}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          {/* ================= BODY ================= */}
          <TableBody>
            {Array.from({ length: totalWeeks }).map((_, weekIndex) => {
              const startOfWeek = startOfCalendar
                .clone()
                .add(weekIndex, "week");

              return (
                <TableRow key={weekIndex}>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const day = startOfWeek.clone().add(dayIndex, "days");
                    const isToday =
                      day.format("DD/MM/YYYY") ===
                      moment().format("DD/MM/YYYY");

                    const dayUnix = day.startOf("day").valueOf();
                    const filteredShifts = shifts?.filter(
                      (shift) =>
                        moment(shift.startDate)
                          .startOf("day")
                          .valueOf() === dayUnix
                    );

                    return (
                      <TableCell
                        key={day.format("YYYY-MM-DD")}
                        sx={{
                          verticalAlign: "top",
                          background: isToday
                            ? "linear-gradient(135deg, rgba(103,208,165,0.18), rgba(90,122,140,0.15))"
                            : "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          borderRight: "1px solid rgba(29,42,51,0.08)",
                          borderBottom: "1px solid rgba(29,42,51,0.08)",
                          boxShadow: isToday
                            ? "inset 0 0 0 1px rgba(103,208,165,0.35)"
                            : "none",
                          minHeight: 120,
                        }}
                      >
                        {/* Day Number */}
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color:
                              day.month() === moment(date).month()
                                ? "#1F2937"
                                : "#9CA3AF",
                            textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            mb: 0.5,
                          }}
                        >
                          {day.format("DD")}
                        </Typography>

                        {/* Shifts */}
                        {role === "ROLE_CLIENT" ? (
                          <ShiftBoxParticipant
                            shifts={filteredShifts}
                            isMonthly
                          />
                        ) : (
                          <ShiftBox
                            shifts={filteredShifts}
                            isMonthly
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </StyledContainer>
  );
}
