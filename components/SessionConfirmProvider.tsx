import { 
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";


import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";



type Resolver = (value: boolean) => void;

const SessionConfirmContext = createContext<{
  confirm: (timeoutMs?: number) => Promise<boolean>;
} | null>(null);

export function SessionConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState<number>(0); // store timeout for display
  const resolverRef = useRef<Resolver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // const confirm = (timeoutMs: number = 10_000) => {
  //   setOpen(true);
  //   setCountdown(timeoutMs / 1000); // set countdown in seconds

  //   // live countdown interval
  //   intervalRef.current = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(intervalRef.current!);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return new Promise<boolean>((resolve) => {
  //     resolverRef.current = resolve;

  //     // Auto-close after timeoutMs
  //     timeoutRef.current = setTimeout(() => {
  //       clearInterval(intervalRef.current!);
  //       resolve(false);      // treat as "No"
  //       setOpen(false);
  //       resolverRef.current = null;
  //     }, timeoutMs);
  //   });
  // };

  const confirm = (timeoutMs = 10_000) => {
    setOpen(true);
    setCountdown(timeoutMs / 1000); // set countdown in seconds

    // live countdown interval
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;

      // Auto-close after timeoutMs
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current!);
        resolve(false);      // treat as "No"
        setOpen(false);
        resolverRef.current = null;
      }, timeoutMs);
    });
};



  const close = (value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    resolverRef.current?.(value);
    resolverRef.current = null;
    setOpen(false);
  };

  return (
    <SessionConfirmContext.Provider value={{ confirm }}>
      {children}

      {/* <Dialog open={open} disableEscapeKeyDown onClose={() => {}}> */}
      <Dialog open={open} disableEscapeKeyDown>
        <DialogTitle>Session Expired</DialogTitle>

        <DialogContent>
          <Typography>
            Your session has expired. Do you want to continue?
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, opacity: 0.7 }}
          >
            You will be logged out automatically in {countdown} seconds.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => close(false)}>
            No
          </Button>
          <Button variant="contained" onClick={() => close(true)}>
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
