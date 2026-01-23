"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onContinue: () => void;
  onLogout: () => void;
  timeout?: number;
};

export default function SessionExpiredDialog({
  open,
  onContinue,
  onLogout,
  timeout = 10000,
}: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) return;

    timerRef.current = setTimeout(() => {
      onLogout();
    }, timeout);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, timeout, onLogout]);

  return (
    <Dialog open={open}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        Your session has expired. Do you want to continue?
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onLogout}>
          Logout
        </Button>
        <Button variant="contained" onClick={onContinue}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
