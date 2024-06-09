import Alert from "./Alert";
import { Button } from "../ui/button";

interface DeleteAlertProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: any;
  isLoading?: boolean;
}

export default function DeleteModel({
  title,
  description,
  isOpen,
  onClose,
  onDelete,
  isLoading,
}: DeleteAlertProps) {
  return (
    <Alert
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div dir="rtl" className="flex justify-end gap-2">
        <Button disabled={isLoading} onClick={onClose} variant="outline">
          إلغاء
        </Button>
        <Button disabled={isLoading} onClick={onDelete} variant="destructive">
          حذف
        </Button>
      </div>
    </Alert>
  );
}
