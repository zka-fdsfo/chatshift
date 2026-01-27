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
  <Stack direction="row" gap={0.5} flexWrap="wrap" alignItems="center">
    {/* Today Button */}
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#D8EFFE", // Calm Accent
        color: "#1D2A33",
        fontWeight: 600,
        borderRadius: "20px", // Pill-shaped
        minWidth: 55,
        height: 28,
        textTransform: "none",
        "&:hover": { backgroundColor: "#BEE6FC" },
      }}
      onClick={() => setDate(moment())}
    >
      Today
    </Button>

    {/* Previous */}
    <Button
      variant="outlined"
      size="small"
      sx={{
        borderRadius: "20px",
        minWidth: 35,
        height: 28,
        px: 0.5,
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

    {/* Next */}
    <Button
      variant="outlined"
      size="small"
      sx={{
        borderRadius: "20px",
        minWidth: 35,
        height: 28,
        px: 0.5,
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

    {/* Calendar Picker */}
    <Button
      variant="outlined"
      size="small"
      sx={{
        borderRadius: "20px",
        minWidth: 35,
        height: 28,
        px: 0.5,
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
      <Paper sx={{ p: 1, borderRadius: 2 }}>
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
      mx: 1,
      fontSize: 13,
    }}
  >
    {type === "weekly"
      ? week[0].format("M") === week[1].format("M")
        ? week[0].format("MMMM YYYY")
        : `${week[0].format("MMMM")} - ${week[1].format("MMMM YYYY")}`
      : date.format("DD MMMM, YYYY")}
  </Typography>

  {/* Right Controls */}
  <Stack direction="row" gap={0.5} flexWrap="wrap" alignItems="center">
    {/* View Selector */}
    <Select
      size="small"
      value={view}
      onChange={(e) => setView(e.target.value)}
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D8EFFE",
        borderRadius: "20px",
        color: "#1D2A33",
        minWidth: 90,
        height: 28,
        fontSize: 13,
      }}
    >
      <MenuItem value="staff">Staff</MenuItem>
      <MenuItem value="client">Client</MenuItem>
    </Select>

    {/* Type Selector */}
    <Select
      size="small"
      value={type}
      onChange={(e) => setType(e.target.value)}
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D8EFFE",
        borderRadius: "20px",
        color: "#1D2A33",
        minWidth: 90,
        height: 28,
        fontSize: 13,
      }}
    >
      <MenuItem value="weekly">Weekly</MenuItem>
      <MenuItem value="daily">Daily</MenuItem>
    </Select>

    {/* Add Shift Button */}
    <Button
      variant="contained"
      size="small"
      startIcon={<AddIcon />}
      onClick={() => setShiftModal(true)}
      sx={{
        backgroundColor: "#67D085", // Primary Accent
        color: "#FFFFFF",
        fontWeight: 600,
        minWidth: 60,
        height: 28,
        borderRadius: "20px",
        fontSize: 13,
        "&:hover": { backgroundColor: "#57C174" },
      }}
    >
      Shift
    </Button>

    {/* Zoom Buttons */}
    <IconButton
      size="small"
      onClick={onZoomIn}
      sx={{
        backgroundColor: "#D8EFFE",
        color: "#1D2A33",
        "&:hover": { backgroundColor: "#BEE6FC" },
        p: 0.5,
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
        p: 0.5,
      }}
    >
      <ZoomOutIcon fontSize="small" />
    </IconButton>
  </Stack>

  <AddShift open={shiftModal} onClose={() => setShiftModal(false)} />
</Stack>
  );
}
