import { ListingStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ListingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<ListingStatus, string> = {
    available: "bg-lagoon/20 text-lagoon border-lagoon/30",
    pending: "bg-amber/20 text-amber border-amber/30",
    rented: "bg-sand/20 text-sand/70 border-sand/30",
    sold: "bg-sand/20 text-sand/70 border-sand/30",
  };

  return (
    <span
      className={`inline-block rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 ${styles[status]}`}
    >
      {status}
    </span>
  );
}
