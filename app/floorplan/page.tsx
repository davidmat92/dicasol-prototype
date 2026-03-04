"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/app/lib/mock-data";
import FloorPlanSVG from "@/app/components/FloorPlanSVG";
import {
  ArrowLeft,
  Map,
  AlertTriangle,
  CheckCircle2,
  WifiOff,
} from "lucide-react";

export default function FloorPlanPage() {
  const router = useRouter();
  const [activeFloor, setActiveFloor] = useState(1);

  const floorRooms = rooms.filter((r) => r.floor === activeFloor);
  const alarmCount = floorRooms.filter((r) => r.status === "alarm").length;
  const warningCount = floorRooms.filter((r) => r.status === "warnung").length;
  const okCount = floorRooms.filter((r) => r.status === "ok").length;
  const offlineCount = floorRooms.filter(
    (r) => r.status === "offline"
  ).length;

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        Zurueck
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--accent-dim)" }}
        >
          <Map size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Grundriss
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Interaktive Raumkarte
          </p>
        </div>
      </div>

      {/* Floor tabs */}
      <div
        className="flex rounded-2xl p-1 mb-5"
        style={{ background: "var(--bg-elevated)" }}
      >
        {[
          { floor: 1, label: "Erdgeschoss" },
          { floor: 2, label: "1. Obergeschoss" },
        ].map((f) => (
          <button
            key={f.floor}
            onClick={() => setActiveFloor(f.floor)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background:
                activeFloor === f.floor ? "var(--accent)" : "transparent",
              color:
                activeFloor === f.floor ? "white" : "var(--text-secondary)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Floor summary stats */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {alarmCount > 0 && (
          <div
            className="p-2.5 rounded-xl text-center"
            style={{ background: "var(--danger-dim)" }}
          >
            <AlertTriangle size={14} className="mx-auto text-danger mb-1" />
            <p className="text-sm font-bold text-danger">{alarmCount}</p>
            <p className="text-[9px] text-danger/70 font-medium">Alarm</p>
          </div>
        )}
        {warningCount > 0 && (
          <div
            className="p-2.5 rounded-xl text-center"
            style={{ background: "var(--warning-dim)" }}
          >
            <AlertTriangle size={14} className="mx-auto text-warning mb-1" />
            <p className="text-sm font-bold text-warning">{warningCount}</p>
            <p className="text-[9px] text-warning/70 font-medium">Warnung</p>
          </div>
        )}
        <div
          className="p-2.5 rounded-xl text-center"
          style={{ background: "var(--accent-dim)" }}
        >
          <CheckCircle2 size={14} className="mx-auto text-accent mb-1" />
          <p className="text-sm font-bold text-accent">{okCount}</p>
          <p className="text-[9px] text-accent/70 font-medium">Normal</p>
        </div>
        {offlineCount > 0 && (
          <div
            className="p-2.5 rounded-xl text-center"
            style={{ background: "var(--offline-dim)" }}
          >
            <WifiOff size={14} className="mx-auto text-offline mb-1" />
            <p className="text-sm font-bold text-offline">{offlineCount}</p>
            <p className="text-[9px] text-offline/70 font-medium">Offline</p>
          </div>
        )}
      </div>

      {/* SVG Floor Plan */}
      <div className="glass p-4 mb-5">
        <FloorPlanSVG floor={activeFloor} />
      </div>

      {/* Legend */}
      <div className="glass p-4">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
          Legende
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { color: "var(--danger)", label: "Alarm" },
            { color: "var(--warning)", label: "Warnung" },
            { color: "var(--accent)", label: "Normal" },
            { color: "var(--offline)", label: "Offline" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-xs text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-text-tertiary mt-3">
          Tippen Sie auf einen Raum, um die Detailansicht zu oeffnen.
        </p>
      </div>
    </div>
  );
}
