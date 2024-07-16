"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { memo } from "react";

interface AlertProps {
  title: string;
  description?: string;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function Alert({
  title,
  description,
  className,
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
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className="text-start mt-6">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-start mt-4">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(Alert);
