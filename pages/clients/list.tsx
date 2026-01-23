import { Box, styled } from "@mui/system";
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { getStaffList } from "@/api/functions/staff.api";
import { IStaff } from "@/interface/staff.interfaces";
import DataGridTable from "@/components/Table/DataGridTable";
import SimpleBar from "simplebar-react";
import DataTable from "@/components/Table/DataTable";
import UserTableRow from "pages/staff/staff-table-row";
// import Loader from "@/ui/Loader/Loder";
import { getAllClients } from "@/api/functions/client.api";
import { IClient } from "@/interface/client.interface";
import ClientTableRow from "./client-table.row";
import CloseIcon from "@mui/icons-material/Close";
import AddNewClient from "./addnewclient";
import { NextRequest, NextResponse } from "next/server";
import Loader from "@/components/Loader";

const StyledClientPage = styled(Box)`
  padding: 20px 10px;
  h4 {
    margin-bottom: 40px;
  }
`;

export default function List(request: NextRequest) {
  const [openModal, setModal] = useState(false);

  // -------- Role fetching start here ---------
  let role: string | null = null;
  if (typeof window !== "undefined") {
    role = localStorage.getItem("user_role");
  }
  useEffect(()=>{
    console.log("------- ROLE -------",role)
  },[role])
  // -------- Role fetching end here ---------
     
  const handleModal = () => {
    setModal(true);
    };
  
     
    const handleCloseModal = () => {
    setModal(false);
  };


  const { data = [], isLoading } = useQuery({
    queryKey: ["client_list"],
    queryFn: getAllClients
  });

  const columns = [
    {
      id: "displayName",
      label: "Name"
    },
    {
      id: "gender",
      label: "Gender"
    },
    {
      id: "age",
      label: "Age"
    },
    {
      id: "ndis",
      label: "NDIS"
    },
    // {
    //   id: "recipient_id",
    //   label: "Recipient ID"
    // },
    {
      id: "mobileNo",
      label: "Mobile"
    },
    {
      id: "phoneNo",
      label: "Phone"
    },
    {
      id: "email",
      label: "Email"
    },
    {
      id: "address",
      label: "Address"
    },
    {
      id: "type",
      label: "Type"
    },
    // {
    //   id: "pricebook",
    //   label: "Pricebook"
    // },
    // {
    //   id: "review",
    //   label: "Review"
    // }
  ];

  const rows =
    data?.map((_item: IClient) => ({
      ..._item
    })) || [];

  if (isLoading) return <Loader />;

  return (
    <DashboardLayout>
      <StyledClientPage>
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
    Participants List
  </Typography>

{role==="ROLE_ADMIN" && ( <Button
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
    Add New Participants
  </Button>)}
 
</Box>
        {/* <SimpleBar scrollableNodeProps={{ ref: ref }}> */}
        {/* <Paper>
          <DataGridTable
            rows={rows}
            columns={columns}
            checkboxSelection
            loading={isLoading}
          />
        </Paper> */}
        <DataTable
          columns={columns}
          RowComponent={ClientTableRow}
          data={data}
          noCheckbox
        />
        {/* </SimpleBar> */}
      </StyledClientPage>
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
    Add New Participants

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
    <AddNewClient closeModal={handleCloseModal} />
  </DialogContent>
</Dialog>
    </DashboardLayout>
  );
}
