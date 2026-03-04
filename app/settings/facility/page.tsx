"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Bed,
  Wifi,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { rooms } from "@/app/lib/mock-data";

export default function FacilityPage() {
  const router = useRouter();

  const totalSensors = rooms.reduce((sum, r) => sum + r.sensors.length, 0);
  const onlineRooms = rooms.filter((r) => r.status !== "offline").length;
  const offlineRooms = rooms.filter((r) => r.status === "offline").length;
  const alarmRooms = rooms.filter((r) => r.status === "alarm").length;

  return (
    <div className="px-4 py-5 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        Zurueck
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--accent-dim)" }}
        >
          <Building2 size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Einrichtung
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Seniorenheim Sonnenschein
          </p>
        </div>
      </div>

      {/* Facility info */}
      <div className="glass p-4 mb-5">
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-dim)" }}
          >
            <Building2 size={24} className="text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-[16px] text-text-primary">
              Seniorenheim Sonnenschein
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-text-tertiary" />
              <p className="text-xs text-text-secondary">
                Musterstrasse 42, 52062 Aachen
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            className="p-3 rounded-xl text-center"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Users size={18} className="mx-auto text-accent mb-1" />
            <p className="text-lg font-bold text-text-primary">
              {rooms.length}
            </p>
            <p className="text-[10px] text-text-tertiary font-medium">
              Bewohner
            </p>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Bed size={18} className="mx-auto text-accent mb-1" />
            <p className="text-lg font-bold text-text-primary">
              {rooms.length}
            </p>
            <p className="text-[10px] text-text-tertiary font-medium">
              Zimmer
            </p>
          </div>
        </div>
      </div>

      {/* System status */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Systemstatus
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-5">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Wifi size={18} className="text-accent" />
            <span className="text-sm text-text-primary">Sensoren Online</span>
          </div>
          <span className="text-sm font-semibold text-accent">
            {onlineRooms}/{rooms.length}
          </span>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-accent" />
            <span className="text-sm text-text-primary">
              Gesamtsensoren
            </span>
          </div>
          <span className="text-sm font-semibold text-text-primary">
            {totalSensors}
          </span>
        </div>
        {offlineRooms > 0 && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-warning" />
              <span className="text-sm text-text-primary">Offline</span>
            </div>
            <span className="text-sm font-semibold text-warning">
              {offlineRooms}
            </span>
          </div>
        )}
        {alarmRooms > 0 && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-danger" />
              <span className="text-sm text-text-primary">Aktive Alarme</span>
            </div>
            <span className="text-sm font-semibold text-danger">
              {alarmRooms}
            </span>
          </div>
        )}
      </div>

      {/* Floors */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Stockwerke
      </h3>
      <div className="space-y-2 mb-5 stagger">
        {[
          {
            name: "Erdgeschoss",
            rooms: rooms.filter((r) => r.floor === 1),
          },
          {
            name: "1. Obergeschoss",
            rooms: rooms.filter((r) => r.floor === 2),
          },
        ].map((floor, i) => (
          <div key={i} className="glass p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-text-primary">
                {floor.name}
              </p>
              <span className="text-xs text-text-tertiary">
                {floor.rooms.length} Zimmer
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {floor.rooms.map((room) => (
                <span
                  key={room.id}
                  className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    background:
                      room.status === "alarm"
                        ? "var(--danger-dim)"
                        : room.status === "warnung"
                          ? "var(--warning-dim)"
                          : room.status === "offline"
                            ? "var(--offline-dim)"
                            : "var(--accent-dim)",
                    color:
                      room.status === "alarm"
                        ? "var(--danger)"
                        : room.status === "warnung"
                          ? "var(--warning)"
                          : room.status === "offline"
                            ? "var(--offline)"
                            : "var(--accent)",
                  }}
                >
                  {room.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* License info */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Lizenz
      </h3>
      <div className="glass p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-text-primary">SaaS-Lizenz</p>
          <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-lg bg-accent-dim">
            Aktiv
          </span>
        </div>
        <p className="text-xs text-text-secondary">
          {rooms.length} Zimmer-Lizenzen &middot; Verlaengerung: 01.04.2026
        </p>
      </div>
    </div>
  );
}
