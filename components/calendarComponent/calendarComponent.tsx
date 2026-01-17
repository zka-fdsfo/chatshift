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
      <TableContainer>
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
                        {/* Day Number */}
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

                        {/* Shifts */}
                        {/* {role === "ROLE_CLIENT" ? (
                          <ShiftBoxParticipant
                            shifts={filteredShifts}
                            isMonthly
                          />
                        ) : (
                          <ShiftBox
                            shifts={filteredShifts}
                            isMonthly
                          />
                        )} */}


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
