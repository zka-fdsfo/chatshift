import { Box, styled } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { getStaffList } from "@/api/functions/staff.api";
import { IStaff } from "@/interface/staff.interfaces";
import DataGridTable from "@/components/Table/DataGridTable";
import SimpleBar from "simplebar-react";
import DataTable from "@/components/Table/DataTable";
import UserTableRow from "pages/staff/staff-table-row";
import Loader from "@/ui/Loader/Loder";
import AddNewStaff from "./addnewstaff";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const StyledUserPage = styled(Box)`
  padding: 20px 10px;
  h4 {
    margin-bottom: 40px;
  }
  /* .MuiPaper-root {
    overflow: hidden;
    position: relative;
    box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
      rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
    border-radius: 16px;
    z-index: 0;
    .MuiDataGrid-columnHeader {
      outline: none;
    }
  } */
`;

export default function Index() {
  const [openModal, setModal] = useState(false);
	   
	   
	const handleModal = () => {
    setModal(true);
    };
  
	   
	  const handleCloseModal = () => {
    setModal(false);
  };


  const { data = [], isLoading } = useQuery({
    queryKey: ["user_list"],
    queryFn: getStaffList
  });

  const columns = [
    {
      id: "name",
      label: "Name"
    },
    {
      id: "gender",
      label: "Gender"
    },
    {
      id: "role",
      label: "Role"
    },
    {
      id: "email",
      label: "Email"
    },
    {
      id: "mobileNo",
      label: "Mobile"
    },
    {
      id: "address",
      label: "Address"
    },
    {
      id: "employmentType",
      label: "Employment Type"
    }
  ];

  return (
    <DashboardLayout isLoading={isLoading}>
      <StyledUserPage>
      <Box
  sx={{
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    mb: 3
  }}
>
  <Typography
    variant="h4"
    sx={{
      color: "#1D2A33",
      lineHeight: 1 // 🔑 removes extra vertical space
    }}
  >
    Staff List
  </Typography>

  <Button
    variant="contained"
    sx={{
      bgcolor: "#67D085",
      color: "#F7FAFC",
      fontWeight: 600,
      height: 40,
      "&:hover": {
        bgcolor: "#67D085"
      }
    }}
    onClick={handleModal}
  >
    Add New Staff
  </Button>
</Box>


    
        <DataTable
  columns={columns}
  RowComponent={UserTableRow}
  data={data
    ?.filter((_data: IStaff) => 
      _data.name !== "OPEN SHIFT" && _data.name !== "PICKUP SHIFT"
    )
    .map((_data: IStaff, index: number) => ({
      ..._data,
      role: _data.rolesName?.[0]
        .replace("ROLE_", "")
        .replaceAll("_", " ")
        .toLowerCase(),
      index,
    }))
  }
/>

        {/* </SimpleBar> */}
      </StyledUserPage>

{/* =========== Modal Start Here =========== */}
<Dialog
  open={openModal}
  onClose={handleCloseModal}
  fullWidth
  maxWidth="md"
>
  <DialogTitle
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pr: 1
    }}
  >
    Add New Staff

    <IconButton
      onClick={handleCloseModal}
      size="small"
      sx={{
        color: "#5A7A8C"
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <Divider />

  <DialogContent>
    <AddNewStaff closeModal={handleCloseModal} />
  </DialogContent>
</Dialog>

    </DashboardLayout>
  );
}


