import type { SensorStatus } from "@/app/lib/mock-data";

const statusConfig: Record<
  SensorStatus,
  { dot: string; text: string; bg: string; label: string }
> = {
  ok: {
    dot: "bg-accent",
    text: "text-accent",
    bg: "bg-accent-dim",
    label: "Normal",
  },
  warnung: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning-dim",
    label: "Warnung",
  },
  alarm: {
    dot: "bg-danger animate-pulse",
    text: "text-danger",
    bg: "bg-danger-dim",
    label: "Alarm",
  },
  offline: {
    dot: "bg-offline",
    text: "text-offline",
    bg: "bg-offline-dim",
    label: "Offline",
  },
};

export default function StatusBadge({ status }: { status: SensorStatus }) {
  const c = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold tracking-wide ${c.text} ${c.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
