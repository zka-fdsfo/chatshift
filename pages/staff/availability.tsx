import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { addStaffAvailability, getAvailability } from "@/api/functions/staff.api";
import * as yup from "yup";
import { useParams } from "next/navigation";
import { getCookie } from "@/lib/functions/storage.lib";
import { useEffect } from "react";

/* ================= TYPES ================= */

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type FormValues = {
  employeeId: number;
  availabilities: {
    dayOfWeek: DayOfWeek;
    isAvailable: boolean;
    timeSlots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
};

/* ================= CONSTANT ================= */

const dayOfWeekEnum: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

/* ================= SCHEMA ================= */

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

const schema: yup.SchemaOf<FormValues> = yup.object({
  employeeId: yup.number().required(),
  availabilities: yup.array().of(
    yup.object({
      dayOfWeek: yup.mixed<DayOfWeek>().required(),
      isAvailable: yup.boolean().required(),
      timeSlots: yup.array().of(
        yup.object({
          startTime: yup.string().matches(timeRegex).required(),
          endTime: yup.string().matches(timeRegex).required()
        })
      )
    })
  )
});

/* ================= CHILD COMPONENT ================= */

function TimeSlotsFieldArray({
  control,
  dayIndex,
  isAvailable
}: {
  control: any;
  dayIndex: number;
  isAvailable: boolean;
}) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: `availabilities.${dayIndex}.timeSlots`
  });

  // Auto add first slot
  useEffect(() => {
    if (isAvailable && fields.length === 0) {
      append({ startTime: "", endTime: "" });
    }

    if (!isAvailable && fields.length > 0) {
      replace([]);
    }
  }, [isAvailable]);

  if (!isAvailable) return null;

  return (
    <>
      {fields.map((field, slotIndex) => (
        <Grid container spacing={2} key={field.id} mt={1}>
          <Grid item xs={5}>
            <Controller
              name={`availabilities.${dayIndex}.timeSlots.${slotIndex}.startTime`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Start"
                  ampm={false}
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                  onChange={(v) =>
                    field.onChange(v ? dayjs(v).format("HH:mm") : "")
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Controller
              name={`availabilities.${dayIndex}.timeSlots.${slotIndex}.endTime`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="End"
                  ampm={false}
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                  onChange={(v) =>
                    field.onChange(v ? dayjs(v).format("HH:mm") : "")
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <IconButton color="error" onClick={() => remove(slotIndex)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button
        startIcon={<Add />}
        sx={{ mt: 2 }}
        onClick={() => append({ startTime: "", endTime: "" })}
      >
        Add Time Slot
      </Button>
    </>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function Availability() {
  const userCookie = getCookie("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const { id } = useParams();
  const finalEmployeeId = Number(id) ? Number(id) : user?.id;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeId: finalEmployeeId,
      availabilities: dayOfWeekEnum.map((day) => ({
        dayOfWeek: day,
        isAvailable: false,
        timeSlots: []
      }))
    }
  });

  const { control, handleSubmit, watch, reset } = methods;

  /* ===== API ===== */

  const { mutate, isPending } = useMutation({
    mutationFn: addStaffAvailability,
    onSuccess: () => toast.success("Availability saved")
  });

  const { data } = useQuery({
    queryKey: ["read_staff_availability", finalEmployeeId],
    queryFn: () => getAvailability(finalEmployeeId!.toString()),
    enabled: !!finalEmployeeId
  });

  /* ===== Helpers ===== */

  const timeArrayToString = (time?: number[]) => {
    if (!time || time.length < 2) return "";
    return `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}`;
  };

  /* ===== Load Existing Data ===== */

  useEffect(() => {
    if (!data?.availabilities) return;

    const updated = dayOfWeekEnum.map((day) => {
      const found = data.availabilities.find((x: any) => x.dayOfWeek === day);
      const isAvailable = found?.isAvailable ?? false;

      return {
        dayOfWeek: day,
        isAvailable,
        timeSlots: isAvailable
          ? found?.timeSlots?.map((slot: any) => ({
              startTime: timeArrayToString(slot.startTime),
              endTime: timeArrayToString(slot.endTime)
            })) || []
          : []
      };
    });

    reset({
      employeeId: finalEmployeeId,
      availabilities: updated
    });
  }, [data]);

  /* ===== Submit ===== */

  const onSubmit = (formData: FormValues) => {
    mutate(formData);
  };

  /* ================= UI ================= */

  return (
    <DashboardLayout>
      <Container>
        <Typography variant="h6">Weekly Availability</Typography>

        <Box border={1} p={2} borderRadius={2} mt={2} bgcolor="#fff">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {dayOfWeekEnum.map((day, index) => {
                const isAvailable = watch(
                  `availabilities.${index}.isAvailable`
                );

                return (
                  <Box key={day} border={1} p={2} mt={2} borderRadius={2}>
                    <Typography fontWeight={600}>{day}</Typography>

                    <FormControlLabel
                      control={
                        <Controller
                          name={`availabilities.${index}.isAvailable`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label="Available"
                    />

                    <TimeSlotsFieldArray
                      control={control}
                      dayIndex={index}
                      isAvailable={isAvailable}
                    />
                  </Box>
                );
              })}

              <Box mt={3}>
                <Button type="submit" variant="contained" disabled={isPending}>
                  Submit
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </DashboardLayout>
  );
}