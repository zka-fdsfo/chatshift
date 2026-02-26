import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment, { Moment } from "moment";
import React, { SetStateAction, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import AddShift from "../add-shift/add-shift";
import { getRole } from "@/lib/functions/_helpers.lib";

const StyledStack = styled(Stack)`
  margin-bottom: 20px;
  h5 {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledButton = styled(Button)`
  background-color: #fff;
  color: #555;
  box-shadow: none;
  border: 1px solid #ccc;
  padding-block: 10px;
  &:hover {
    background-color: #ececec;
    box-shadow: none;
  }
`;

export default function CalendarToolbar({
  date,
  setDate
}: {
  date: Moment;
  setDate: React.Dispatch<SetStateAction<Moment>>;
}) {
  const [shiftModal, setShiftModal] = useState(false);
  const role = getRole();

  return (
    // <StyledStack direction="row" alignItems="center" gap={2}>
    //   <Typography variant="h5">{moment(date).format("MMMM YYYY")}</Typography>
    //   <Stack direction="row" gap={1}>
    //     <StyledButton
    //       onClick={() => setDate((prev) => moment(prev).subtract(1, "month"))}
    //     >
    //       <ArrowBackIosNewIcon />
    //     </StyledButton>
    //     <StyledButton onClick={() => setDate(moment())}>
    //       <Typography>This Month</Typography>
    //     </StyledButton>
    //     <StyledButton
    //       onClick={() => setDate((prev) => moment(prev).add(1, "month"))}
    //     >
    //       <ArrowForwardIosIcon />
    //     </StyledButton>
    //   </Stack>
    //   {role === "ROLE_ADMIN" && (
    //     <Button
    //       variant="contained"
    //       size="large"
    //       sx={{
    //         minHeight: 45
    //       }}
    //       startIcon={<AddIcon />}
    //       onClick={() => setShiftModal(true)}
    //     >
    //       Shift
    //     </Button>
    //   )}
    //   <AddShift open={shiftModal} onClose={() => setShiftModal(false)} />
    // </StyledStack>

<Stack
  direction="row"
  alignItems="center"
  justifyContent="flex-start"
  spacing={1}
  sx={{
    mt: 4,
    flexWrap: "nowrap", // 🔒 keep everything on one line
    whiteSpace: "nowrap",
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      color: "#1D2A33",
      lineHeight: "28px", 
      display: "flex",
      alignItems: "center",
    }}
  >
    {moment(date).format("MMMM YYYY")}
  </Typography>

  {/* <Button
    variant="outlined"
    size="small"
    sx={{
      borderRadius: "20px",
      minWidth: 35,
      height: 28,
      p: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5A7A8C",
      border: "1px solid #D8EFFE",
      "&:hover": {
        backgroundColor: "#D8EFFE",
        color: "#1D2A33",
      },
    }}
    onClick={() => setDate(prev => moment(prev).subtract(1, "month"))}
  >
    <ArrowBackIosNewIcon fontSize="small" />
  </Button>

  <Button
    variant="contained"
    size="small"
    sx={{
      backgroundColor: "#D8EFFE",
      color: "#1D2A33",
      fontWeight: 600,
      borderRadius: "20px",
      minWidth: 90,
      height: 28,
      textTransform: "none",
      lineHeight: "28px",
      "&:hover": {
        backgroundColor: "#BEE6FC",
      },
    }}
    onClick={() => setDate(moment())}
  >
    This Month
  </Button>

  <Button
    variant="outlined"
    size="small"
    sx={{
      borderRadius: "20px",
      minWidth: 35,
      height: 28,
      p: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5A7A8C",
      border: "1px solid #D8EFFE",
      "&:hover": {
        backgroundColor: "#D8EFFE",
        color: "#1D2A33",
      },
    }}
    onClick={() => setDate(prev => moment(prev).add(1, "month"))}
  >
    <ArrowForwardIosIcon fontSize="small" />
  </Button> */}

<Button
  variant="outlined"
  size="small"
  sx={{
    backgroundColor: "#D8EFFE",
    color: "#1D2A33",
    fontWeight: 600,
    borderRadius: "22px",
    minWidth: 70,
    height: 34,
    textTransform: "none",
    fontSize: 13,
    "&:hover": {
      backgroundColor: "#BEE6FC",
    },
  }}
  onClick={() => setDate(prev => moment(prev).subtract(1, "month"))}
>
  <ArrowBackIosNewIcon fontSize="small" />
</Button>

<Button
  variant="contained"
  size="small"
  sx={{
    backgroundColor: "#D8EFFE",
    color: "#1D2A33",
    fontWeight: 600,
    borderRadius: "22px",
    minWidth: 110,
    height: 34,
    textTransform: "none",
    fontSize: 13,
    "&:hover": {
      backgroundColor: "#BEE6FC",
    },
  }}
  onClick={() => setDate(moment())}
>
  This Month
</Button>

<Button
  variant="outlined"
  size="small"
  sx={{
    backgroundColor: "#D8EFFE",
    color: "#1D2A33",
    fontWeight: 600,
    borderRadius: "22px",
    minWidth: 70,
    height: 34,
    textTransform: "none",
    fontSize: 13,
    "&:hover": {
      backgroundColor: "#BEE6FC",
    },
  }}
  onClick={() => setDate(prev => moment(prev).add(1, "month"))}
>
  <ArrowForwardIosIcon fontSize="small" />
</Button>
  

  {role === "ROLE_ADMIN" && (
    <Button
      variant="contained"
      size="small"
      startIcon={<AddIcon fontSize="small" />}
      sx={{
        height: 28,
        borderRadius: "20px",
        textTransform: "none",
        fontWeight: 600,
        ml: 1,
      }}
      onClick={() => setShiftModal(true)}
    >
      Shift
    </Button>
  )}

  <AddShift open={shiftModal} onClose={() => setShiftModal(false)} />
</Stack>


  );
}
