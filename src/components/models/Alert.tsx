"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MouseEvent, useEffect, useRef } from "react";

interface AlertProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Alert({
  title,
  description,
  children,
  isOpen,
  onClose,
}: AlertProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle dir="rtl" className="text-start mt-6">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription dir="rtl" className="text-start mt-4">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
