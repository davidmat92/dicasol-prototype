"use client";

import { useRouter } from "next/navigation";
import { rooms, type Room } from "@/app/lib/mock-data";

interface FloorPlanSVGProps {
  floor: number;
}

const floorLayouts: Record<
  number,
  { roomId: string; x: number; y: number; w: number; h: number }[]
> = {
  1: [
    { roomId: "101", x: 20, y: 60, w: 160, h: 120 },
    { roomId: "102", x: 200, y: 60, w: 160, h: 120 },
    { roomId: "103", x: 20, y: 220, w: 160, h: 120 },
    { roomId: "104", x: 200, y: 220, w: 160, h: 120 },
  ],
  2: [
    { roomId: "201", x: 20, y: 60, w: 160, h: 120 },
    { roomId: "202", x: 200, y: 60, w: 160, h: 120 },
    { roomId: "203", x: 20, y: 220, w: 160, h: 120 },
    { roomId: "204", x: 200, y: 220, w: 160, h: 120 },
  ],
};

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
      return "var(--accent-dim)";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "alarm":
      return "ALARM";
    case "warnung":
      return "Warnung";
    case "offline":
      return "Offline";
    default:
      return "Normal";
  }
}

export default function FloorPlanSVG({ floor }: FloorPlanSVGProps) {
  const router = useRouter();
  const layout = floorLayouts[floor] || [];

  const getRoomData = (roomId: string): Room | undefined => {
    return rooms.find((r) => r.id === roomId);
  };

  return (
    <svg
      viewBox="0 0 380 400"
      className="w-full"
      style={{ maxHeight: "calc(100dvh - 320px)" }}
    >
      {/* Building outline */}
      <rect
        x="8"
        y="8"
        width="364"
        height="384"
        rx="16"
        fill="none"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="6 3"
      />

      {/* Floor label */}
      <text
        x="190"
        y="38"
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1"
      >
        {floor === 1 ? "ERDGESCHOSS" : "1. OBERGESCHOSS"}
      </text>

      {/* Hallway */}
      <rect
        x="20"
        y="185"
        width="340"
        height="30"
        rx="4"
        fill="var(--bg-elevated)"
        opacity="0.5"
      />
      <text
        x="190"
        y="205"
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize="9"
        fontWeight="500"
      >
        FLUR
      </text>

      {/* Rooms */}
      {layout.map((pos) => {
        const room = getRoomData(pos.roomId);
        if (!room) return null;

        const color = getStatusColor(room.status);
        const dimColor = getStatusDimColor(room.status);
        const isAlarm = room.status === "alarm";

        return (
          <g
            key={pos.roomId}
            onClick={() => router.push(`/room/${pos.roomId}`)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
          >
            {/* Room background */}
            <rect
              x={pos.x}
              y={pos.y}
              width={pos.w}
              height={pos.h}
              rx="12"
              fill={dimColor}
              stroke={color}
              strokeWidth={isAlarm ? 2 : 1}
              opacity={room.status === "offline" ? 0.5 : 1}
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

            {/* Pulsing glow for alarm */}
            {isAlarm && (
              <rect
                x={pos.x - 2}
                y={pos.y - 2}
                width={pos.w + 4}
                height={pos.h + 4}
                rx="14"
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity="0.4"
              >
                <animate
                  attributeName="opacity"
                  values="0.4;0;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            )}

            {/* Room name */}
            <text
              x={pos.x + pos.w / 2}
              y={pos.y + 28}
              textAnchor="middle"
              fill={color}
              fontSize="13"
              fontWeight="700"
            >
              {room.name}
            </text>

            {/* Resident name */}
            <text
              x={pos.x + pos.w / 2}
              y={pos.y + 50}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="10"
              fontWeight="500"
            >
              {room.resident.name}
            </text>

            {/* Status indicator */}
            <circle
              cx={pos.x + pos.w / 2 - 22}
              cy={pos.y + 74}
              r="4"
              fill={color}
            >
              {isAlarm && (
                <animate
                  attributeName="r"
                  values="4;6;4"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <text
              x={pos.x + pos.w / 2 - 12}
              y={pos.y + 78}
              fill={color}
              fontSize="10"
              fontWeight="600"
            >
              {getStatusLabel(room.status)}
            </text>

            {/* Sensor count */}
            <text
              x={pos.x + pos.w / 2}
              y={pos.y + 100}
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="9"
            >
              {room.sensors.length} Sensoren
            </text>
          </g>
        );
      })}

      {/* Staircase / Elevator indicator */}
      <rect
        x="155"
        y="355"
        width="70"
        height="30"
        rx="8"
        fill="var(--bg-elevated)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x="190"
        y="375"
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize="9"
        fontWeight="500"
      >
        🛗 Aufzug
      </text>
    </svg>
  );
}
