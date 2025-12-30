import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  );
}
