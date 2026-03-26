import {
  Button,
  MenuItem,
  Paper,
  Popover,
  Select,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import moment, { Moment } from "moment";
import React, { SetStateAction, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styled from "@emotion/styled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AddIcon from "@mui/icons-material/Add";
import AddShift from "../add-shift/add-shift";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import SelectAllIcon from "@mui/icons-material/SelectAll"; // Import SelectAllIcon

const StyledButton = styled(Button)`
  background-color: #fff;
  color: #555;
  box-shadow: none;
  border: 1px solid #ccc;
  &:hover {
    background-color: #ececec;
    box-shadow: none;
  }

  .mui-style-13n8tc6-MuiStack-root {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    gap: 16px;
    -webkit-box-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }
`;

interface ToolbarProps {
  week: Moment[];
  date: Moment;
  setDate: React.Dispatch<SetStateAction<Moment>>;
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
  view: string;
  setView: React.Dispatch<SetStateAction<string>>;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function Toolbar({
  week,
  date,
  setDate,
  type,
  setType,
  view,
  setView,
  onZoomIn,
  onZoomOut
}: ToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [shiftModal, setShiftModal] = useState(false);
  const open = Boolean(anchorEl);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      sx={{
        p: 1,
        backgroundColor: "#F7FAFC", // Background Bright
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        flexWrap: "wrap",
      }}
    >

      {/* Left Controls */}
      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#D8EFFE",
            color: "#1D2A33",
            fontWeight: 600,
            borderRadius: "22px",
            minWidth: 80,
            height: 38,
            fontSize: 15,
            px: 2,
            textTransform: "none",
            "&:hover": { backgroundColor: "#BEE6FC" },
          }}
          onClick={() => setDate(moment())}
        >
          Today
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "22px",
            minWidth: 46,
            height: 38,
            px: 1.2,
            fontSize: 15,
            color: "#5A7A8C",
            border: "1px solid #D8EFFE",
            "&:hover": { backgroundColor: "#D8EFFE", color: "#1D2A33" },
          }}
          onClick={() =>
            setDate((prev) =>
              type === "daily"
                ? moment(prev.subtract(1, "day"))
                : moment(prev.subtract(1, "week"))
            )
          }
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "22px",
            minWidth: 46,
            height: 38,
            px: 1.2,
            fontSize: 15,
            color: "#5A7A8C",
            border: "1px solid #D8EFFE",
            "&:hover": { backgroundColor: "#D8EFFE", color: "#1D2A33" },
          }}
          onClick={() =>
            setDate((prev) =>
              type === "daily"
                ? moment(prev.add(1, "day"))
                : moment(prev.add(1, "week"))
            )
          }
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "22px",
            minWidth: 46,
            height: 38,
            px: 1.2,
            fontSize: 15,
            color: "#5A7A8C",
            border: "1px solid #D8EFFE",
            "&:hover": { backgroundColor: "#D8EFFE", color: "#1D2A33" },
          }}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(event.currentTarget)
          }
        >
          <CalendarMonthIcon fontSize="small" />
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Paper sx={{ p: 1.5, borderRadius: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setAnchorEl(null);
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Popover>
      </Stack>

      {/* Date Display */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "#1D2A33",
          fontWeight: 600,
          mx: 1.5,
          fontSize: 15,
        }}
      >
        {type === "weekly"
          ? week[0].format("M") === week[1].format("M")
            ? week[0].format("MMMM YYYY")
            : `${week[0].format("MMMM")} - ${week[1].format("MMMM YYYY")}`
          : date.format("DD MMMM, YYYY")}
      </Typography>

      {/* Right Controls */}
      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
        <Select
          size="small"
          value={view}
          onChange={(e) => setView(e.target.value)}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D8EFFE",
            borderRadius: "22px",
            color: "#1D2A33",
            minWidth: 130,
            height: 38,
            fontSize: 15,
            px: 1,
          }}
        >
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="client">Client</MenuItem>
        </Select>

        <Select
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D8EFFE",
            borderRadius: "22px",
            color: "#1D2A33",
            minWidth: 130,
            height: 38,
            fontSize: 15,
            px: 1,
          }}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
        </Select>

        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setShiftModal(true)}
          sx={{
            backgroundColor: "#67D085",
            color: "#FFFFFF",
            fontWeight: 600, 
            minWidth: 95,     
            height: 38,
            borderRadius: "22px",
            fontSize: 15,
            px: 2,
            "&:hover": { backgroundColor: "#57C174" },
          }}
        >
          Shift
        </Button>

        <IconButton
          size="small"
          onClick={onZoomIn}
          sx={{
            backgroundColor: "#D8EFFE",
            color: "#1D2A33",
            "&:hover": { backgroundColor: "#BEE6FC" },
            p: 1,
          }}
        >
          <ZoomInIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={onZoomOut}
          sx={{
            backgroundColor: "#D8EFFE",
            color: "#1D2A33",
            "&:hover": { backgroundColor: "#BEE6FC" },
            p: 1,
          }}
        >
          <ZoomOutIcon fontSize="small" />
        </IconButton>
      </Stack>

      <AddShift open={shiftModal} onClose={() => setShiftModal(false)} />
    </Stack>
  );
}
