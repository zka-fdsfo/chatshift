// components/CommonModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function CommonModal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
}: CommonModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      {/* Header */}
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">{title}</Typography>

          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent dividers>
        <Box>{children}</Box>
      </DialogContent>

      {/* Footer Actions */}
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}