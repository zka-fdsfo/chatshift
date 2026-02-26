import {
  getPendingProfile,
  pendingProfileApproveReject,
} from "@/api/functions/client.api";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { queryClient } from "pages/_app";
import { useState } from "react";
import { toast } from "sonner";

export default function PendingProfile({
  clientId,
  onClickClose,
}: {
  clientId: any;
  onClickClose: () => void;
}) {
  /* ================= FETCH ================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pending_profile", clientId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getPendingProfile(id as string);
    },
    enabled: !!clientId,
  });

  const request = data?.data;
  const fields = request?.fields || [];

  /* ================= MUTATION ================= */
  const { mutate, isPending } = useMutation({
    mutationFn: pendingProfileApproveReject,
    onSuccess: (result) => {
      onClickClose()
      toast.success(result.message);
      // queryClient.invalidateQueries({
      //   queryKey: ["pending_profile", clientId],
      // });
    },
  });

  const [remarks, setRemarks] = useState<string>("");

  const approveChanges = () => {
    mutate({
      requestId: request.requestId,
      approved: true,
      adminRemarks: remarks,
    });
  };

  const rejectChanges = () => {
    mutate({
      requestId: request.requestId,
      approved: false,
      adminRemarks: remarks,
    });
  };

  /* ================= HELPERS ================= */

  const getField = (name: string) =>
    fields.find((f: any) => f.fieldName === name);

  const formatValue = (value: any, label?: string) => {
    if (!value) return "-";

    if (label === "Date Of Birth")
      return dayjs(value).format("DD/MM/YYYY");

    if (Array.isArray(value)) return value.join(", ");

    return value;
  };

  /* ================= FIELD ROW ================= */

  const Field = ({ label }: { label: string }) => {
    const field = getField(label);

    if (!field) return null;

    return (
      <Grid container sx={{ py: 1 }}>
        <Grid item xs={4}>
          <Typography color="text.secondary" fontSize={14}>
            {label}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{
              textDecoration: field.changed ? "line-through" : "none",
              color: field.changed ? "text.secondary" : "text.primary",
            }}
          >
            {formatValue(field.oldValue, label)}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            fontWeight={600}
            color={field.changed ? "success.main" : "text.primary"}
          >
            {formatValue(field.newValue, label)}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  /* ================= STATES ================= */

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );

  if (!data.hasPendingRequest)
    return (
      <Typography color="error">
        {data.message}
      </Typography>
    );

  /* ================= UI ================= */

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
          Pending Profile Changes
        </Typography>

        <Chip label="Pending Approval" color="warning" />
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* TABLE HEADER */}
      <Grid container sx={{ pb: 1 }}>
        <Grid item xs={4}>
          <Typography fontWeight={600}>Field</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600}>Old Value</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600}>New Value</Typography>
        </Grid>
      </Grid>

      <Divider />

      {/* PERSONAL */}
      <Field label="Salutation" />
      <Field label="First Name" />
      <Field label="Middle Name" />
      <Field label="Last Name" />
      <Field label="Gender" />
      <Field label="Date Of Birth" />

      <Divider sx={{ my: 3 }} />

      {/* CONTACT */}
      <Field label="Apartment Number" />
      <Field label="Address" />
      <Field label="Contact Number" />
      <Field label="Mobile Number" />

      <Divider sx={{ my: 3 }} />

      {/* OTHER */}
      <Field label="Religion" />
      <Field label="Marital Status" />
      <Field label="Nationality" />
      <Field label="Language" />

      <textarea
        placeholder="Write your notes here..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          fontSize: "14px",
        }}
      />

      <Divider sx={{ my: 4 }} />

      {/* ACTION BUTTONS */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="outlined"
          size="small"
          onClick={onClickClose}
        >
          Close
        </Button>

        <Button
          variant="contained"
          size="small"
          color="success"
          disabled={isPending}
          onClick={approveChanges}
        >
          Approve
        </Button>

        <Button
          variant="contained"
          size="small"
          color="error"
          disabled={isPending}
          onClick={rejectChanges}
        >
          Reject
        </Button>
      </Stack>
    </Paper>
  );
}