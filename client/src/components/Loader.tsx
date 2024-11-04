import { cn } from "@/lib/utils";

export default function Loader() {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        "bg-background/75",
        "z-50"
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "h-12 w-12 rounded-full border-4 border-t-transparent",
            "border-t-primary",
            "animate-spin"
          )}
        />

        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
}
