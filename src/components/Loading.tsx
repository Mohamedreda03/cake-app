import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-color-2 animate-spin" />;
    </div>
  );
}
