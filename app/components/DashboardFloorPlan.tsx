"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { rooms } from "@/app/lib/mock-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const floorConfig = [
  {
    floor: 1,
    label: "EG",
    rooms: [
      { roomId: "101", x: 8, y: 24, w: 82, h: 52 },
      { roomId: "102", x: 98, y: 24, w: 82, h: 52 },
      { roomId: "103", x: 8, y: 92, w: 82, h: 52 },
      { roomId: "104", x: 98, y: 92, w: 82, h: 52 },
    ],
  },
  {
    floor: 2,
    label: "1.OG",
    rooms: [
      { roomId: "201", x: 8, y: 24, w: 82, h: 52 },
      { roomId: "202", x: 98, y: 24, w: 82, h: 52 },
      { roomId: "203", x: 8, y: 92, w: 82, h: 52 },
      { roomId: "204", x: 98, y: 92, w: 82, h: 52 },
    ],
  },
];

function getStatusColor(status: string): string {
  switch (status) {
    case "alarm":
      return "var(--danger)";
    case "warnung":
      return "var(--warning)";
    case "offline":
      return "var(--offline)";
    default:
      return "var(--accent)";
  }
}

function getStatusDimColor(status: string): string {
  switch (status) {
    case "alarm":
      return "var(--danger-dim)";
    case "warnung":
      return "var(--warning-dim)";
    case "offline":
      return "var(--offline-dim)";
    default:
      return "var(--bg-elevated)";
  }
}

export default function DashboardFloorPlan() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="glass p-4 mb-5">
      {/* Header */}
      <Link
        href="/floorplan"
        className="flex items-center justify-between mb-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            {t("dashboard.floorplanLive")}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-dim text-accent font-semibold">
            {t("dashboard.live")}
          </span>
        </div>
        <ChevronRight size={16} className="text-text-tertiary" />
      </Link>

      {/* Two floors side by side */}
      <div className="flex gap-2">
        {floorConfig.map((fc) => (
          <div key={fc.floor} className="flex-1 min-w-0">
            <svg viewBox="0 0 188 156" className="w-full">
              {/* Floor outline */}
              <rect
                x="1"
                y="1"
                width="186"
                height="154"
                rx="10"
                fill="none"
                stroke="var(--border-light)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />

              {/* Floor label */}
              <text
                x="94"
                y="16"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.5"
              >
                {fc.floor === 1 ? t("floorplan.eg") : t("floorplan.og")}
              </text>

              {/* Hallway */}
              <rect
                x="8"
                y="79"
                width="172"
                height="10"
                rx="2"
                fill="var(--bg-elevated)"
                opacity="0.4"
              />

              {/* Rooms */}
              {fc.rooms.map((pos) => {
                const room = rooms.find((r) => r.id === pos.roomId);
                if (!room) return null;

                const color = getStatusColor(room.status);
                const dimColor = getStatusDimColor(room.status);
                const isAlarm = room.status === "alarm";
                const isWarning = room.status === "warnung";

                return (
                  <g
                    key={pos.roomId}
                    onClick={() => router.push(`/room/${pos.roomId}`)}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Room box */}
                    <rect
                      x={pos.x}
                      y={pos.y}
                      width={pos.w}
                      height={pos.h}
                      rx="6"
                      fill={dimColor}
                      stroke={color}
                      strokeWidth={isAlarm || isWarning ? 1.5 : 0.5}
                      opacity={room.status === "offline" ? 0.4 : 1}
                    >
                      {isAlarm && (
                        <animate
                          attributeName="opacity"
                          values="1;0.5;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      )}
                    </rect>

                    {/* Pulse ring for alarm */}
                    {isAlarm && (
                      <rect
                        x={pos.x - 1}
                        y={pos.y - 1}
                        width={pos.w + 2}
                        height={pos.h + 2}
                        rx="7"
                        fill="none"
                        stroke={color}
                        strokeWidth="0.8"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.5;0;0.5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    )}

                    {/* Room number */}
                    <text
                      x={pos.x + pos.w / 2}
                      y={pos.y + 22}
                      textAnchor="middle"
                      fill={color}
                      fontSize="11"
                      fontWeight="700"
                    >
                      {room.name.replace("Zimmer ", "")}
                    </text>

                    {/* Resident last name */}
                    <text
                      x={pos.x + pos.w / 2}
                      y={pos.y + 37}
                      textAnchor="middle"
                      fill="var(--text-secondary)"
                      fontSize="8"
                      fontWeight="500"
                    >
                      {room.resident.name.split(" ").pop()}
                    </text>

                    {/* Status dot */}
                    <circle
                      cx={pos.x + pos.w / 2}
                      cy={pos.y + 46}
                      r="2.5"
                      fill={color}
                    >
                      {isAlarm && (
                        <animate
                          attributeName="r"
                          values="2.5;4;2.5"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--danger)" }}
          />
          <span className="text-[9px] text-text-tertiary">{t("status.alarm")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--warning)" }}
          />
          <span className="text-[9px] text-text-tertiary">{t("status.warning")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="text-[9px] text-text-tertiary">{t("status.normal")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--offline)" }}
          />
          <span className="text-[9px] text-text-tertiary">{t("status.offline")}</span>
        </div>
      </div>
    </div>
  );
}
