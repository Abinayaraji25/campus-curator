import { cn } from "@/lib/utils";

export function AvailabilityBadge({
  available,
  className,
}: {
  available: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        available
          ? "bg-success/12 text-success"
          : "bg-destructive/12 text-destructive",
        className,
      )}
    >
      <span
        className={cn("h-2 w-2 rounded-full", available ? "bg-success" : "bg-destructive")}
      />
      {available ? "Available" : "Currently Unavailable"}
    </span>
  );
}
