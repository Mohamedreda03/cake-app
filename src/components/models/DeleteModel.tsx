import Alert from "./Alert";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Models");
  return (
    <Alert
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div dir="rtl" className="flex justify-end gap-2">
        <Button disabled={isLoading} onClick={onClose} variant="outline">
          {t("cancel")}
        </Button>
        <Button disabled={isLoading} onClick={onDelete} variant="destructive">
          {t("delete")}
        </Button>
      </div>
    </Alert>
  );
}
