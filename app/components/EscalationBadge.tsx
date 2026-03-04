"use client";

import { AlertTriangle, Clock, ChevronRight } from "lucide-react";

interface EscalationBadgeProps {
  level: 1 | 2 | 3;
  minutesSinceAlert: number;
  compact?: boolean;
}

const levelConfig = {
  1: {
    label: "Stufe 1",
    sublabel: "Pflegekraft",
    color: "var(--warning)",
    bg: "var(--warning-dim)",
  },
  2: {
    label: "Stufe 2",
    sublabel: "Schichtleitung",
    color: "var(--danger)",
    bg: "var(--danger-dim)",
  },
  3: {
    label: "Stufe 3",
    sublabel: "Einrichtungsleitung",
    color: "var(--danger)",
    bg: "var(--danger-dim)",
  },
};

export default function EscalationBadge({
  level,
  minutesSinceAlert,
  compact = false,
}: EscalationBadgeProps) {
  const config = levelConfig[level];
  const mins = Math.floor(minutesSinceAlert);
  const secs = Math.floor((minutesSinceAlert % 1) * 60);
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg"
        style={{ background: config.bg, color: config.color }}
      >
        <AlertTriangle size={10} />
        {config.label}
      </span>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{ background: config.bg }}
    >
      <div className="flex items-center gap-1.5">
        <AlertTriangle size={14} style={{ color: config.color }} />
        <span
          className="text-xs font-bold"
          style={{ color: config.color }}
        >
          {config.label}
        </span>
        <span className="text-[10px] text-text-tertiary">
          ({config.sublabel})
        </span>
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <Clock size={11} style={{ color: config.color }} />
        <span
          className="text-[11px] font-mono font-bold"
          style={{ color: config.color }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}
