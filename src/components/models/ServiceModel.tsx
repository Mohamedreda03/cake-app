import Alert from "./Alert";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

interface DeleteAlertProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModel({
  title,
  isOpen,
  onClose,
}: DeleteAlertProps) {
  const t = useTranslations("Footer");
  return (
    <Alert title={""} isOpen={isOpen} onClose={onClose}>
      <div className="order-2 md:order-1">
        <p className="font-medium text-color-2 text-2xl text-center">
          {t("Customer_Service")}
        </p>

        <div className="mt-6 space-y-4">
          {t("Customer_Service_Desc")}
          <a
            href="tel:0531458314"
            className="text-xl mt-5 flex items-center justify-center"
          >
            <Button variant="main" size="lg">
              {t("Customer_Service")}: 0531458314
            </Button>
          </a>
        </div>
      </div>
    </Alert>
  );
}
