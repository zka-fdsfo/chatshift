import { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type Resolver = (value: boolean) => void;

const SessionConfirmContext = createContext<{
  confirm: () => Promise<boolean>;
} | null>(null);

export function SessionConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState<Resolver | null>(null);

  const confirm = () => {
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);

      // ⏱ auto-cancel after 10s
      setTimeout(() => {
        resolve(false);
        setOpen(false);
      }, 10000);
    });
  };

  const handleClose = (value: boolean) => {
    resolver?.(value);
    setResolver(null);
    setOpen(false);
  };

  return (
    <SessionConfirmContext.Provider value={{ confirm }}>
      {children}

      <Dialog open={open}>
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          Your session has expired. Do you want to continue?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="error">
            No
          </Button>
          <Button onClick={() => handleClose(true)} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </SessionConfirmContext.Provider>
  );
}

export const useSessionConfirm = () => {
  const ctx = useContext(SessionConfirmContext);
  if (!ctx) throw new Error("useSessionConfirm must be used inside provider");
  return ctx;
};
