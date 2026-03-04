"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Room } from "@/app/lib/mock-data";
import StatusBadge from "./StatusBadge";
import SensorIcon from "./SensorIcon";
import Sparkline from "./Sparkline";

const borderColors: Record<string, string> = {
  alarm: "border-l-danger",
  warnung: "border-l-warning",
  ok: "border-l-accent",
  offline: "border-l-offline",
};

const sparkColors: Record<string, string> = {
  alarm: "var(--danger)",
  warnung: "var(--warning)",
  ok: "var(--accent)",
  offline: "var(--offline)",
};

const iconColors: Record<string, string> = {
  alarm: "text-danger",
  warnung: "text-warning",
  ok: "text-accent",
  offline: "text-offline",
};

export default function RoomCard({ room }: { room: Room }) {
  const borderColor = borderColors[room.status] ?? "border-l-accent";

  // Find the temperature sensor for the sparkline
  const tempSensor = room.sensors.find((s) => s.type === "temperatur");

  return (
    <Link href={`/room/${room.id}`}>
      <div
        className={`glass border-l-[3px] ${borderColor} p-4 transition-all duration-200 active:scale-[0.98] hover:bg-bg-card-hover cursor-pointer ${
          room.status === "alarm" ? "glow-danger" : ""
        }`}
      >
        {/* Top row: room name + status */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-semibold text-[15px] text-text-primary">
                {room.name}
              </h3>
              <span className="text-[10px] font-medium text-text-tertiary px-2 py-0.5 rounded-md bg-bg-elevated">
                {room.floorLabel}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {room.resident.name}, {room.resident.age} J.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={room.status} />
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        </div>

        {/* Sensor mini-readouts */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          {room.sensors.slice(0, 4).map((sensor) => {
            const ic = iconColors[sensor.status] ?? "text-accent";
            return (
              <div key={sensor.id} className="flex items-center gap-1.5">
                <SensorIcon type={sensor.type} size={13} className={ic} />
                <span className="text-[11px] text-text-secondary font-medium">
                  {sensor.value}
                  {sensor.unit ?? ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sparkline + last event */}
        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-text-tertiary leading-none block truncate">
              {room.lastEvent}
            </span>
            <span className="text-[10px] text-text-tertiary mt-0.5 block">
              {room.lastEventTime}
            </span>
          </div>
          {tempSensor && (
            <div className="ml-3 shrink-0">
              <Sparkline
                data={tempSensor.sparkline}
                color={sparkColors[room.status] ?? "var(--accent)"}
                height={24}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
