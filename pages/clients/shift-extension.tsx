"use client";

import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import CustomInput from "@/ui/Inputs/CustomInput";
import {
  Button,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExtendShiftByParticipant } from "@/api/functions/shift.api";

const StyledBox = styled(Box)`
  padding: 20px 10px;
`;

const schema = yup.object().shape({
  newStartTime: yup.string().required("Start time is required"),
  newEndTime: yup.string().required("End time is required"),
  reason: yup.string().required("Reason is required")
});

interface Props {
  shiftId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShiftExtension({ shiftId, setOpen }: Props) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newStartTime: "",
      newEndTime: "",
      reason: ""
    }
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: ExtendShiftByParticipant,
    onSuccess: (data) => {
      toast.success(data.message || "Shift extended successfully");
      setOpen(false);
    }
  });

  const onSubmit = (data: any) => {
    const payload = {
      shiftId,
      ...data
    };

    mutate(payload);

    console.log("Shift Extension Payload:", payload);
  };

  return (
      <StyledBox>
        <Box className="inner-container">
          <FormProvider {...methods}>
            <Grid container spacing={2}>
              {/* Start Time */}
              <Grid item lg={4} xs={12}>
                <Typography>New Start Time:</Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <CustomInput
                  type="time"
                  name="newStartTime"
                  fullWidth
                />
              </Grid>

              {/* End Time */}
              <Grid item lg={4} xs={12}>
                <Typography>New End Time:</Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <CustomInput
                  type="time"
                  name="newEndTime"
                  fullWidth
                />
              </Grid>

              {/* Reason */}
              <Grid item lg={4} xs={12}>
                <Typography>Reason:</Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <CustomInput
                  name="reason"
                  placeholder="Enter reason"
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormProvider>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            mt={3}
          >
            <LoadingButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              loading={isPending}
            >
              Extend Shift
            </LoadingButton>
          </Stack>
        </Box>
      </StyledBox>
  );
}