"use client";

import { rooms, alerts, getCriticalAlerts } from "./lib/mock-data";
import RoomCard from "./components/RoomCard";
import SensorIcon from "./components/SensorIcon";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Wifi,
  WifiOff,
  ArrowRight,
  Map,
  FileBarChart,
} from "lucide-react";
import DashboardFloorPlan from "./components/DashboardFloorPlan";

export default function Dashboard() {
  const criticalRooms = rooms.filter((r) => r.status === "alarm");
  const warningRooms = rooms.filter((r) => r.status === "warnung");
  const okRooms = rooms.filter((r) => r.status === "ok");
  const offlineRooms = rooms.filter((r) => r.status === "offline");
  const openAlerts = alerts.filter((a) => !a.acknowledged);
  const criticalAlerts = getCriticalAlerts();
  const heroAlert = criticalAlerts[0];

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Guten Morgen"
      : hour < 18
        ? "Guten Tag"
        : "Guten Abend";

  return (
    <div className="px-4 py-5 stagger">
      {/* Greeting */}
      <div className="mb-5">
        <h1 className="text-[22px] font-bold text-text-primary tracking-tight">
          {greeting}, Maria
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Schicht: Nachmittag &middot; Erdgeschoss & 1. OG
        </p>
      </div>

      {/* HERO ALERT CARD */}
      {heroAlert && (
        <Link href={`/room/${heroAlert.roomId}`}>
          <div className="glass glow-danger p-4 mb-5 relative overflow-hidden">
            {/* Pulsing background glow */}
            <div
              className="absolute inset-0 opacity-[0.06] animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, var(--danger) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-danger-dim flex items-center justify-center">
                    <SensorIcon
                      type={heroAlert.sensorType}
                      size={20}
                      className="text-danger"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-danger">
                      Kritischer Alarm
                    </p>
                    <p className="text-base font-bold text-text-primary">
                      Sturz erkannt
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-danger block animate-pulse-glow" />
                  <span className="absolute inset-0 w-3 h-3 rounded-full bg-danger animate-breathe" />
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-1">
                {heroAlert.roomName} &middot;{" "}
                {heroAlert.residentName}
              </p>
              <p className="text-[11px] text-text-tertiary mb-3">
                {heroAlert.timeAgo}
              </p>

              <button className="w-full flex items-center justify-center gap-2 bg-danger text-white text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]">
                Jetzt pruefen
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Floor Plan Overview */}
      <DashboardFloorPlan />

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="glass p-3 text-center">
          <Activity
            size={18}
            className="mx-auto text-accent mb-1.5"
          />
          <p className="text-lg font-bold text-text-primary">
            {rooms.length}
          </p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Raeume
          </p>
        </div>
        <div className="glass p-3 text-center" style={{ background: "var(--danger-dim)" }}>
          <AlertTriangle
            size={18}
            className="mx-auto text-danger mb-1.5"
          />
          <p className="text-lg font-bold text-danger">
            {openAlerts.length}
          </p>
          <p className="text-[10px] text-danger/70 font-medium">
            Alarme
          </p>
        </div>
        <div className="glass p-3 text-center">
          <Wifi
            size={18}
            className="mx-auto text-accent mb-1.5"
          />
          <p className="text-lg font-bold text-text-primary">
            {rooms.length - offlineRooms.length}
          </p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Online
          </p>
        </div>
        <div className="glass p-3 text-center">
          <WifiOff
            size={18}
            className="mx-auto text-offline mb-1.5"
          />
          <p className="text-lg font-bold text-text-primary">
            {offlineRooms.length}
          </p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Offline
          </p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <Link
          href="/floorplan"
          className="glass p-4 flex items-center gap-3 transition-all active:scale-[0.98]"
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--accent-dim)" }}
          >
            <Map size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Grundriss
            </p>
            <p className="text-[10px] text-text-tertiary">Raumkarte</p>
          </div>
        </Link>
        <Link
          href="/reports"
          className="glass p-4 flex items-center gap-3 transition-all active:scale-[0.98]"
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--info-dim)" }}
          >
            <FileBarChart size={20} className="text-info" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Berichte
            </p>
            <p className="text-[10px] text-text-tertiary">Tagesbericht</p>
          </div>
        </Link>
      </div>

      {/* Kritisch */}
      {criticalRooms.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold text-danger uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-danger rounded-full animate-pulse-glow" />
            Kritisch ({criticalRooms.length})
          </h2>
          <div className="space-y-3 stagger">
            {criticalRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* Warnung */}
      {warningRooms.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold text-warning uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-warning rounded-full" />
            Warnung ({warningRooms.length})
          </h2>
          <div className="space-y-3 stagger">
            {warningRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* Normal */}
      {okRooms.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Normal ({okRooms.length})
          </h2>
          <div className="space-y-3 stagger">
            {okRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* Offline */}
      {offlineRooms.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-offline rounded-full" />
            Offline ({offlineRooms.length})
          </h2>
          <div className="space-y-3 stagger">
            {offlineRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
